import nodemailer from 'nodemailer';
import { config } from '../config/index.js';

let transporter;

function getTransporter() {
  if (!transporter) {
    transporter = nodemailer.createTransport(config.smtp);
  }
  return transporter;
}

function buildEmailHtml({ name, email, subject, message }) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </head>
    <body style="margin:0;padding:0;background:#f4f4f8;font-family:'Segoe UI',Arial,sans-serif;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f8;padding:40px 20px;">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.08);">
              <tr>
                <td style="background:linear-gradient(135deg,#0984e3,#6c5ce7,#00cec9);padding:32px 40px;">
                  <h1 style="margin:0;color:#ffffff;font-size:22px;font-weight:700;">New Contact Form Submission</h1>
                  <p style="margin:8px 0 0;color:rgba(255,255,255,0.85);font-size:14px;">From your portfolio website</p>
                </td>
              </tr>
              <tr>
                <td style="padding:32px 40px;">
                  <table width="100%" cellpadding="0" cellspacing="0">
                    <tr>
                      <td style="padding:12px 0;border-bottom:1px solid #eee;">
                        <span style="color:#888;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Name</span><br/>
                        <span style="color:#1a1a2e;font-size:15px;font-weight:600;">${name}</span>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:12px 0;border-bottom:1px solid #eee;">
                        <span style="color:#888;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Email</span><br/>
                        <a href="mailto:${email}" style="color:#6c5ce7;font-size:15px;font-weight:600;text-decoration:none;">${email}</a>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:12px 0;border-bottom:1px solid #eee;">
                        <span style="color:#888;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Subject</span><br/>
                        <span style="color:#1a1a2e;font-size:15px;font-weight:600;">${subject}</span>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:12px 0;">
                        <span style="color:#888;font-size:12px;text-transform:uppercase;letter-spacing:1px;">Message</span><br/>
                        <p style="color:#1a1a2e;font-size:15px;line-height:1.7;margin:8px 0 0;white-space:pre-wrap;">${message}</p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
              <tr>
                <td style="background:#f8f9fa;padding:20px 40px;border-top:1px solid #eee;">
                  <p style="margin:0;color:#999;font-size:12px;text-align:center;">
                    Sent from your portfolio contact form &mdash; ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
                  </p>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
}

export async function sendContactEmail({ name, email, subject, message }) {
  const transport = getTransporter();

  const info = await transport.sendMail({
    from: `"Portfolio Contact Form" <${config.smtp.auth.user}>`,
    to: config.contactEmail,
    replyTo: `"${name}" <${email}>`,
    subject: `[Portfolio] ${subject}`,
    text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\n${message}`,
    html: buildEmailHtml({ name, email, subject, message }),
  });

  return info;
}

export async function verifyTransport() {
  try {
    await getTransporter().verify();
    return true;
  } catch {
    return false;
  }
}
