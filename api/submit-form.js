const { sql } = require('@vercel/postgres');

const ALLOWED_ORIGINS = [
  'https://revelectrik.com',
  'https://www.revelectrik.com',
];

function getCorsHeaders(origin) {
  const allowed =
    ALLOWED_ORIGINS.includes(origin) ||
    (origin && (origin.startsWith('http://localhost') || origin.includes('.vercel.app')));
  return {
    'Access-Control-Allow-Origin': allowed ? origin : 'https://revelectrik.com',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

const FORM_META = {
  book_demo:      { emoji: '\uD83C\uDFAF', label: 'Demo Request' },
  pilot:          { emoji: '\uD83D\uDE80', label: 'Pilot Request' },
  municipal_demo: { emoji: '\uD83C\uDFDB\uFE0F', label: 'Municipal Demo Request' },
  live_demo:      { emoji: '\uD83D\uDCFA', label: 'Live Demo Request' },
  contact:        { emoji: '\uD83D\uDCEC', label: 'Contact Form' },
};

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function sanitize(val, maxLen = 500) {
  if (typeof val !== 'string') return '';
  return val.trim().slice(0, maxLen);
}

async function sendSlack(data) {
  const webhookUrl = process.env.SLACK_WEBHOOK_URL;
  if (!webhookUrl) throw new Error('SLACK_WEBHOOK_URL not set');

  const meta = FORM_META[data.form_type];
  const header = meta.emoji + ' New ' + meta.label;

  const payload = {
    blocks: [
      {
        type: 'header',
        text: { type: 'plain_text', text: header, emoji: true },
      },
      {
        type: 'section',
        fields: [
          { type: 'mrkdwn', text: '*Name:*\n' + data.name },
          { type: 'mrkdwn', text: '*Email:*\n' + data.email },
          { type: 'mrkdwn', text: '*Company:*\n' + (data.company || 'N/A') },
          { type: 'mrkdwn', text: '*Phone:*\n' + (data.phone || 'N/A') },
          { type: 'mrkdwn', text: '*Fleet Size:*\n' + (data.fleet_size || 'N/A') },
          { type: 'mrkdwn', text: '*Vehicle Types:*\n' + (data.vehicle_types || 'N/A') },
        ],
      },
      {
        type: 'section',
        text: { type: 'mrkdwn', text: '*Message:*\n' + (data.message || 'None') },
      },
    ],
  };

  const res = await fetch(webhookUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });

  if (!res.ok) throw new Error('Slack webhook returned ' + res.status);
}

module.exports = async function handler(req, res) {
  const origin = req.headers.origin || '';
  const corsHeaders = getCorsHeaders(origin);

  // Handle preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204, corsHeaders);
    res.end();
    return;
  }

  Object.entries(corsHeaders).forEach(([k, v]) => res.setHeader(k, v));

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  let body;
  try {
    body = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  } catch {
    res.status(400).json({ error: 'Invalid JSON body' });
    return;
  }

  // Sanitize inputs
  const data = {
    form_type:     sanitize(body.form_type, 50),
    name:          sanitize(body.name, 100),
    email:         sanitize(body.email, 254),
    company:       sanitize(body.company, 200),
    phone:         sanitize(body.phone, 30),
    fleet_size:    sanitize(body.fleet_size, 50),
    vehicle_types: sanitize(body.vehicle_types, 200),
    message:       sanitize(body.message, 2000),
  };

  // Validate required fields
  if (!data.name || !data.email || !data.form_type) {
    res.status(400).json({ error: 'name, email, and form_type are required' });
    return;
  }

  if (!EMAIL_REGEX.test(data.email)) {
    res.status(400).json({ error: 'Invalid email address' });
    return;
  }

  if (!FORM_META[data.form_type]) {
    res.status(400).json({ error: 'Invalid form_type' });
    return;
  }

  const errors = [];

  // 1. Save to DB (graceful degradation)
  try {
    await sql`
      INSERT INTO form_submissions
        (form_type, name, email, company, phone, fleet_size, vehicle_types, message)
      VALUES
        (${data.form_type}, ${data.name}, ${data.email}, ${data.company || null},
         ${data.phone || null}, ${data.fleet_size || null}, ${data.vehicle_types || null},
         ${data.message || null})
    `;
  } catch (dbErr) {
    console.error('DB insert failed:', dbErr.message);
    errors.push('db');
  }

  // 2. Send Slack notification (graceful degradation)
  try {
    await sendSlack(data);
  } catch (slackErr) {
    console.error('Slack notification failed:', slackErr.message);
    errors.push('slack');
  }

  if (errors.length === 2) {
    res.status(500).json({ error: 'Failed to process submission. Please email contact@revelectrik.com directly.' });
    return;
  }

  res.status(200).json({ success: true });
};
