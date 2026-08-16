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

  // Cloudflare Workers environment variables
  // RESEND_API_KEY should be set to your Resend API key
  const apiKey    = import.meta.env.RESEND_API_KEY || '';
  const senderEmail = import.meta.env.SENDER_EMAIL || 'onboarding@resend.dev';
  const recipientEmail = import.meta.env.RECIPIENT_EMAIL || 'terapie.echilibru@gmail.com';

  if (!apiKey) {
    console.error('RESEND_API_KEY is not configured');
    return new Response(JSON.stringify({ error: 'Email service not configured.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  try {
    const emailResponse = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: senderEmail,
        to: [recipientEmail],
        reply_to: email,
        subject: `[Echilibru] Mesaj nou de la ${name} — ${service || 'General'}`,
        html: `
          <html>
            <body style="font-family:sans-serif;color:#2d2d2d;line-height:1.75;">
              <h2 style="font-family:serif;color:#7E4E27;margin-bottom:20px;">Mesaj nou de pe echilibru.ro</h2>
              <table style="font-size:15px;border-collapse:collapse;margin-bottom:20px;">
                <tr><td style="padding:8px;font-weight:bold;color:#555;">Nume:</td><td style="padding:8px;">${name}</td></tr>
                <tr><td style="padding:8px;font-weight:bold;color:#555;">Email:</td><td style="padding:8px;"><a href="mailto:${email}" style="color:#0092B1;">${email}</a></td></tr>
                <tr><td style="padding:8px;font-weight:bold;color:#555;">Serviciu:</td><td style="padding:8px;">${service || '—'}</td></tr>
                <tr><td style="padding:8px;font-weight:bold;color:#555;vertical-align:top;">Mesaj:</td><td style="padding:8px;white-space:pre-wrap;">${message}</td></tr>
              </table>
              <p style="color:#888;font-size:13px;">Acest mesaj a fost trimis prin formularul de contact de pe echilibru.ro</p>
            </body>
          </html>
        `,
      }),
    });

    if (!emailResponse.ok) {
      const errorText = await emailResponse.text();
      console.error('Resend error:', emailResponse.status, errorText);
      throw new Error(`Email service responded with ${emailResponse.status}`);
    }

    console.log(`Contact form submitted: ${name} (${email}) - ${service || 'General'}`);

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