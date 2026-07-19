import type { APIRoute } from 'astro';
import nodemailer from 'nodemailer';

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

  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: import.meta.env.GMAIL_USER,
      pass: import.meta.env.GMAIL_APP_PASSWORD,
    },
  });

  try {
    await transporter.sendMail({
      from: `"${name}" <${import.meta.env.GMAIL_USER}>`,
      replyTo: email,
      to: 'terapie.echilibru@gmail.com',
      subject: `[Echilibru] Mesaj nou de la ${name} — ${service || 'General'}`,
      html: `
        <h2 style="font-family:sans-serif;color:#7E4E27;">Mesaj nou de pe echilibru.ro</h2>
        <table style="font-family:sans-serif;font-size:15px;border-collapse:collapse;width:100%;">
          <tr><td style="padding:8px;font-weight:bold;color:#555;">Nume:</td><td style="padding:8px;">${name}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;color:#555;">Email:</td><td style="padding:8px;"><a href="mailto:${email}">${email}</a></td></tr>
          <tr><td style="padding:8px;font-weight:bold;color:#555;">Serviciu:</td><td style="padding:8px;">${service || '—'}</td></tr>
          <tr><td style="padding:8px;font-weight:bold;color:#555;vertical-align:top;">Mesaj:</td><td style="padding:8px;white-space:pre-wrap;">${message}</td></tr>
        </table>
      `,
    });

    return new Response(JSON.stringify({ ok: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Email error:', err);
    return new Response(JSON.stringify({ error: 'Eroare la trimiterea emailului.' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
};
