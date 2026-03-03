const { sql } = require('@vercel/postgres');
const { Resend } = require('resend');

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

// ---------------------------------------------------------------------------
// Slack
// ---------------------------------------------------------------------------
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

// ---------------------------------------------------------------------------
// Auto-reply email templates
// ---------------------------------------------------------------------------
const SIGNATURE = `
  <table style="margin-top:32px;border-top:1px solid #e5e7eb;padding-top:16px;width:100%;">
    <tr>
      <td>
        <p style="margin:0;font-weight:600;color:#111827;">Subhasis Behera</p>
        <p style="margin:4px 0 0;color:#6b7280;font-size:13px;">Revelectrik</p>
        <p style="margin:4px 0 0;color:#6b7280;font-size:13px;">
          <a href="tel:+14084779526" style="color:#00d4aa;text-decoration:none;">+1 (408) 477-9526</a>
        </p>
      </td>
    </tr>
  </table>`;

const EMAIL_FOOTER = `
  <div style="margin-top:40px;padding-top:16px;border-top:1px solid #e5e7eb;text-align:center;font-size:12px;color:#9ca3af;">
    <a href="https://revelectrik.com" style="color:#00d4aa;text-decoration:none;">revelectrik.com</a>
    &nbsp;&nbsp;|&nbsp;&nbsp;
    <a href="tel:+14084779526" style="color:#00d4aa;text-decoration:none;">+1 (408) 477-9526</a>
  </div>`;

function wrapEmail(bodyHtml) {
  return `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:#f9fafb;font-family:Arial,sans-serif;">
  <div style="max-width:560px;margin:40px auto;background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 1px 4px rgba(0,0,0,0.08);">
    <div style="height:4px;background:#00d4aa;"></div>
    <div style="padding:36px 40px;">
      ${bodyHtml}
      ${SIGNATURE}
    </div>
    ${EMAIL_FOOTER}
  </div>
</body>
</html>`;
}

const AUTO_REPLY = {
  book_demo: (name) => ({
    subject: 'Your demo request is confirmed - Revelectrik',
    html: wrapEmail(`
      <p style="color:#111827;font-size:16px;margin:0 0 16px;">Hi ${name},</p>
      <p style="color:#374151;line-height:1.6;margin:0 0 16px;">
        Thanks for requesting a demo of <strong>RADAR + SIGNAL</strong>. We'll reach out within
        24 hours to schedule a time that works for you.
      </p>
      <p style="color:#374151;line-height:1.6;margin:0 0 16px;">
        In the demo, you'll see live CAN bus telemetry streaming from a real vehicle to the
        cloud dashboard — battery state of charge, motor thermals, and drivetrain diagnostics
        across your fleet in real time.
      </p>`),
  }),

  pilot: (name) => ({
    subject: 'Your pilot request - Revelectrik',
    html: wrapEmail(`
      <p style="color:#111827;font-size:16px;margin:0 0 16px;">Hi ${name},</p>
      <p style="color:#374151;line-height:1.6;margin:0 0 16px;">
        Thanks for your interest in a <strong>RADAR pilot</strong>. We'll be in touch within
        24 hours to discuss next steps for getting your fleet connected.
      </p>
      <p style="color:#374151;line-height:1.6;margin:0 0 16px;">
        We look forward to working with you.
      </p>`),
  }),

  municipal_demo: (name) => ({
    subject: 'Municipal demo request received - Revelectrik',
    html: wrapEmail(`
      <p style="color:#111827;font-size:16px;margin:0 0 16px;">Hi ${name},</p>
      <p style="color:#374151;line-height:1.6;margin:0 0 16px;">
        Thanks for reaching out about <strong>RADAR + SIGNAL</strong> for your fleet.
        We'll contact you within 24 hours to schedule a demo tailored to municipal
        fleet operations.
      </p>
      <p style="color:#374151;line-height:1.6;margin:0 0 16px;">
        We look forward to showing you how FleetPulse handles multi-OEM fleets and
        generates FTA-ready compliance reports automatically.
      </p>`),
  }),

  live_demo: (name) => ({
    subject: 'Live demo request confirmed - Revelectrik',
    html: wrapEmail(`
      <p style="color:#111827;font-size:16px;margin:0 0 16px;">Hi ${name},</p>
      <p style="color:#374151;line-height:1.6;margin:0 0 16px;">
        Thanks for your interest in seeing <strong>RADAR + SIGNAL</strong> in action.
        We'll reach out within 24 hours to set up a live demo.
      </p>
      <p style="color:#374151;line-height:1.6;margin:0 0 16px;">
        We look forward to connecting with you.
      </p>`),
  }),

  contact: (name) => ({
    subject: 'We received your message - Revelectrik',
    html: wrapEmail(`
      <p style="color:#111827;font-size:16px;margin:0 0 16px;">Hi ${name},</p>
      <p style="color:#374151;line-height:1.6;margin:0 0 16px;">
        Thanks for reaching out to Revelectrik. We'll get back to you within 24 hours.
      </p>`),
  }),
};

async function sendAutoReply(data) {
  const resend = new Resend(process.env.RESEND_API_KEY);
  const template = AUTO_REPLY[data.form_type];
  if (!template) return;

  const { subject, html } = template(data.name);

  await resend.emails.send({
    from:    'Revelectrik <contact@revelectrik.com>',
    to:      data.email,
    subject,
    html,
  });
}

// ---------------------------------------------------------------------------
// Handler
// ---------------------------------------------------------------------------
module.exports = async function handler(req, res) {
  const origin = req.headers.origin || '';
  const corsHeaders = getCorsHeaders(origin);

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

  // 1. Save to DB
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

  // 2. Slack notification
  try {
    await sendSlack(data);
  } catch (slackErr) {
    console.error('Slack notification failed:', slackErr.message);
    errors.push('slack');
  }

  // 3. Auto-reply email (failure does not affect success response)
  try {
    await sendAutoReply(data);
  } catch (emailErr) {
    console.error('Auto-reply email failed:', emailErr.message);
  }

  if (errors.length === 2) {
    res.status(500).json({ error: 'Failed to process submission. Please email contact@revelectrik.com directly.' });
    return;
  }

  res.status(200).json({ success: true });
};
