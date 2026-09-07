/**
 * Professional HTML email templates for WebCraft Studio
 */

/**
 * Generate the admin notification email when a contact form is submitted
 */
const contactFormAdminEmail = (data) => {
  const { name, email, phone, company, service, budget, timeline, website, message } = data;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>New Contact Form Submission</title>
</head>
<body style="margin:0; padding:0; background-color:#0f0f0f; font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#0f0f0f; padding:40px 20px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="background-color:#1a1a1a; border-radius:16px; overflow:hidden; box-shadow:0 20px 60px rgba(0,0,0,0.5);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #FFD60A 0%, #FFA726 100%); padding:30px 40px; text-align:center;">
              <h1 style="margin:0; color:#1a1a1a; font-size:24px; font-weight:800; letter-spacing:-0.5px;">
                ⚡ New Contact Form Submission
              </h1>
              <p style="margin:8px 0 0; color:#333; font-size:14px;">
                Someone wants to work with WebCraft Studio!
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:32px 40px;">
              
              <!-- Contact Details -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="padding:12px 16px; background:#252525; border-radius:10px; margin-bottom:12px;">
                    <p style="margin:0 0 4px; color:#888; font-size:11px; text-transform:uppercase; letter-spacing:1px;">Full Name</p>
                    <p style="margin:0; color:#fff; font-size:16px; font-weight:600;">${name}</p>
                  </td>
                </tr>
                <tr><td style="height:8px;"></td></tr>
                <tr>
                  <td style="padding:12px 16px; background:#252525; border-radius:10px;">
                    <p style="margin:0 0 4px; color:#888; font-size:11px; text-transform:uppercase; letter-spacing:1px;">Email Address</p>
                    <p style="margin:0; color:#FFD60A; font-size:16px; font-weight:600;">
                      <a href="mailto:${email}" style="color:#FFD60A; text-decoration:none;">${email}</a>
                    </p>
                  </td>
                </tr>
                <tr><td style="height:8px;"></td></tr>

                ${phone ? `
                <tr>
                  <td style="padding:12px 16px; background:#252525; border-radius:10px;">
                    <p style="margin:0 0 4px; color:#888; font-size:11px; text-transform:uppercase; letter-spacing:1px;">Phone Number</p>
                    <p style="margin:0; color:#fff; font-size:16px; font-weight:600;">
                      <a href="tel:${phone}" style="color:#fff; text-decoration:none;">${phone}</a>
                    </p>
                  </td>
                </tr>
                <tr><td style="height:8px;"></td></tr>
                ` : ''}

                ${company ? `
                <tr>
                  <td style="padding:12px 16px; background:#252525; border-radius:10px;">
                    <p style="margin:0 0 4px; color:#888; font-size:11px; text-transform:uppercase; letter-spacing:1px;">Company / Business</p>
                    <p style="margin:0; color:#fff; font-size:16px; font-weight:600;">${company}</p>
                  </td>
                </tr>
                <tr><td style="height:8px;"></td></tr>
                ` : ''}

                ${service ? `
                <tr>
                  <td style="padding:12px 16px; background:#252525; border-radius:10px;">
                    <p style="margin:0 0 4px; color:#888; font-size:11px; text-transform:uppercase; letter-spacing:1px;">Service Interested In</p>
                    <p style="margin:0; color:#fff; font-size:16px; font-weight:600;">${service}</p>
                  </td>
                </tr>
                <tr><td style="height:8px;"></td></tr>
                ` : ''}

                ${budget ? `
                <tr>
                  <td style="padding:12px 16px; background:#252525; border-radius:10px;">
                    <p style="margin:0 0 4px; color:#888; font-size:11px; text-transform:uppercase; letter-spacing:1px;">Budget Range</p>
                    <p style="margin:0; color:#10B981; font-size:16px; font-weight:600;">${budget}</p>
                  </td>
                </tr>
                <tr><td style="height:8px;"></td></tr>
                ` : ''}

                ${timeline ? `
                <tr>
                  <td style="padding:12px 16px; background:#252525; border-radius:10px;">
                    <p style="margin:0 0 4px; color:#888; font-size:11px; text-transform:uppercase; letter-spacing:1px;">Project Timeline</p>
                    <p style="margin:0; color:#fff; font-size:16px; font-weight:600;">${timeline}</p>
                  </td>
                </tr>
                <tr><td style="height:8px;"></td></tr>
                ` : ''}

                ${website ? `
                <tr>
                  <td style="padding:12px 16px; background:#252525; border-radius:10px;">
                    <p style="margin:0 0 4px; color:#888; font-size:11px; text-transform:uppercase; letter-spacing:1px;">Existing Website</p>
                    <p style="margin:0; color:#3B82F6; font-size:16px; font-weight:600;">
                      <a href="${website}" style="color:#3B82F6; text-decoration:none;">${website}</a>
                    </p>
                  </td>
                </tr>
                <tr><td style="height:8px;"></td></tr>
                ` : ''}
              </table>

              <!-- Message -->
              <div style="margin-top:20px; padding:20px; background:linear-gradient(135deg, #252525 0%, #1f1f1f 100%); border-radius:10px; border-left:4px solid #FFD60A;">
                <p style="margin:0 0 8px; color:#888; font-size:11px; text-transform:uppercase; letter-spacing:1px;">Message</p>
                <p style="margin:0; color:#e0e0e0; font-size:15px; line-height:1.7; white-space:pre-wrap;">${message}</p>
              </div>

              <!-- Quick Actions -->
              <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-top:24px;">
                <tr>
                  <td align="center" style="padding:0 4px;">
                    <a href="mailto:${email}?subject=Re: Your inquiry to WebCraft Studio" style="display:inline-block; padding:12px 28px; background:linear-gradient(135deg, #FFD60A, #FFA726); color:#1a1a1a; text-decoration:none; border-radius:8px; font-weight:700; font-size:14px;">
                      ✉️ Reply to ${name.split(' ')[0]}
                    </a>
                  </td>
                  ${phone ? `
                  <td align="center" style="padding:0 4px;">
                    <a href="tel:${phone}" style="display:inline-block; padding:12px 28px; background:#252525; color:#fff; text-decoration:none; border-radius:8px; font-weight:700; font-size:14px; border:1px solid #333;">
                      📞 Call Now
                    </a>
                  </td>
                  ` : ''}
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:20px 40px; background:#151515; text-align:center; border-top:1px solid #252525;">
              <p style="margin:0; color:#555; font-size:12px;">
                This email was sent from the WebCraft Studio contact form.
              </p>
              <p style="margin:4px 0 0; color:#444; font-size:11px;">
                ${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
};


/**
 * Generate the auto-reply email sent to the person who submitted the form
 */
const contactFormAutoReply = (data) => {
  const { name } = data;
  const companyName = process.env.COMPANY_NAME || 'WebCraft Studio';
  const companyPhone = process.env.COMPANY_PHONE || '+91 98765 43210';
  const companyEmail = process.env.COMPANY_EMAIL || 'hello@webcraftstudio.com';

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Thank You - ${companyName}</title>
</head>
<body style="margin:0; padding:0; background-color:#0f0f0f; font-family:'Segoe UI',Tahoma,Geneva,Verdana,sans-serif;">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background-color:#0f0f0f; padding:40px 20px;">
    <tr>
      <td align="center">
        <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="background-color:#1a1a1a; border-radius:16px; overflow:hidden; box-shadow:0 20px 60px rgba(0,0,0,0.5);">
          
          <!-- Header -->
          <tr>
            <td style="background: linear-gradient(135deg, #FFD60A 0%, #FFA726 100%); padding:40px; text-align:center;">
              <h1 style="margin:0; color:#1a1a1a; font-size:28px; font-weight:800;">
                Thank You, ${name.split(' ')[0]}! 🎉
              </h1>
              <p style="margin:12px 0 0; color:#333; font-size:16px;">
                We've received your message and we're excited to connect.
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:36px 40px;">
              <p style="margin:0 0 20px; color:#ccc; font-size:15px; line-height:1.8;">
                Hi <strong style="color:#fff;">${name.split(' ')[0]}</strong>,
              </p>
              <p style="margin:0 0 20px; color:#ccc; font-size:15px; line-height:1.8;">
                Thank you for reaching out to <strong style="color:#FFD60A;">${companyName}</strong>! We've received your inquiry and our team is already reviewing it.
              </p>
              
              <div style="padding:20px; background:#252525; border-radius:12px; border-left:4px solid #FFD60A; margin:24px 0;">
                <p style="margin:0 0 8px; color:#FFD60A; font-size:14px; font-weight:700;">⏱️ What happens next?</p>
                <ul style="margin:0; padding:0 0 0 20px; color:#bbb; font-size:14px; line-height:2;">
                  <li>Our team will review your requirements</li>
                  <li>You'll receive a detailed response within <strong style="color:#fff;">24 hours</strong></li>
                  <li>We may schedule a free consultation call</li>
                </ul>
              </div>

              <p style="margin:20px 0; color:#ccc; font-size:15px; line-height:1.8;">
                In the meantime, feel free to reach out directly:
              </p>

              <table role="presentation" width="100%" cellspacing="0" cellpadding="0">
                <tr>
                  <td style="padding:10px 0;">
                    <span style="color:#888; font-size:13px;">📞 Phone:</span>
                    <a href="tel:${companyPhone}" style="color:#FFD60A; text-decoration:none; font-size:14px; margin-left:8px;">${companyPhone}</a>
                  </td>
                </tr>
                <tr>
                  <td style="padding:10px 0;">
                    <span style="color:#888; font-size:13px;">✉️ Email:</span>
                    <a href="mailto:${companyEmail}" style="color:#FFD60A; text-decoration:none; font-size:14px; margin-left:8px;">${companyEmail}</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="padding:24px 40px; background:#151515; text-align:center; border-top:1px solid #252525;">
              <p style="margin:0 0 8px; color:#FFD60A; font-size:16px; font-weight:700;">${companyName}</p>
              <p style="margin:0; color:#555; font-size:12px;">
                Building Digital Experiences That Drive Growth
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
};

module.exports = { contactFormAdminEmail, contactFormAutoReply };
