import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  const data = await request.formData();

  const name    = data.get('nume')?.toString().trim() || '';
  const email   = data.get('email')?.toString().trim() || '';
  const service = data.get('serviciu')?.toString().trim() || '';
  const message = data.get('mesaj')?.toString().trim() || '';

  if (!name || !email || !message) {
    return new Response(JSON.stringify({ error: 'Campuri obligatorii lipsa.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Cloudflare-compatible email sending using a third-party service
  // Option 1: Use SendGrid (recommended for Cloudflare Workers)
  // Option 2: Use Web2Mail, EmailJS, or similar service that provides HTTP API
  // Option 3: Use Cloudflare's Email Routing (if you have a verified domain)

  const emailService = process.env.EMAIL_SERVICE || 'sendgrid';
  const apiKey = import.meta.env.EMAIL_API_KEY || process.env.SENDGRID_API_KEY;
  const senderEmail = import.meta.env.SENDER_EMAIL || 'noreply@echilibru.ro';
  const recipientEmail = import.meta.env.RECIPIENT_EMAIL || 'terapie.echilibru@gmail.com';

  if (!apiKey) {
    return new Response(JSON.stringify({ error: 'Email service not configured.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    let emailResponse: Response;

    switch (emailService) {
      case 'sendgrid':
        // SendGrid HTTP API (Cloudflare-compatible)
        emailResponse = await fetch('https://api.sendgrid.com/v3/mail/send', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            personalizations: [{
              to: [{ email: recipientEmail }],
              subject: `[Echilibru] Mesaj nou de la ${name} — ${service || 'General'}`,
            }],
            from: { email: senderEmail, name: 'ECHILIBRU Contact Form' },
            reply_to: { email, name },
            content: [{
              type: 'text/html',
              value: `
                <h2 style="font-family:sans-serif;color:#7E4E27;">Mesaj nou de pe echilibru.ro</h2>
                <table style="font-family:sans-serif;font-size:15px;border-collapse:collapse;width:100%;">
                  <tr><td style="padding:8px;font-weight:bold;color:#555;">Nume:</td><td style="padding:8px;">${name}</td></tr>
                  <tr><td style="padding:8px;font-weight:bold;color:#555;">Email:</td><td style="padding:8px;"><a href="mailto:${email}">${email}</a></td></tr>
                  <tr><td style="padding:8px;font-weight:bold;color:#555;">Serviciu:</td><td style="padding:8px;">${service || '—'}</td></tr>
                  <tr><td style="padding:8px;font-weight:bold;color:#555;vertical-align:top;">Mesaj:</td><td style="padding:8px;white-space:pre-wrap;">${message}</td></tr>
                </table>
              `,
            }],
          }),
        });
        break;

      case 'emailjs':
        // EmailJS HTTP API
        emailResponse = await fetch('https://api.emailjs.com/api/v1.0/send', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            service_id: import.meta.env.EMAILJS_SERVICE_ID,
            template_id: import.meta.env.EMAILJS_TEMPLATE_ID,
            user_id: import.meta.env.EMAILJS_USER_ID,
            template_params: {
              name,
              email,
              service,
              message,
            },
          }),
        });
        break;

      case 'webhook':
        // Generic webhook
        emailResponse = await fetch(import.meta.env.WEBHOOK_URL || '', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...(apiKey ? { 'Authorization': `Bearer ${apiKey}` } : {}),
          },
          body: JSON.stringify({
            name,
            email,
            service,
            message,
          }),
        });
        break;

      default:
        throw new Error(`Unknown email service: ${emailService}`);
    }

    if (!emailResponse.ok) {
      const errorText = await emailResponse.text();
      console.error('Email service error:', emailResponse.status, errorText);
      throw new Error(`Email service responded with ${emailResponse.status}`);
    }

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    console.error('Email error:', err);
    return new Response(JSON.stringify({ error: 'Eroare la trimiterea emailului.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
