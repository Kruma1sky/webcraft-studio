const nodemailer = require('nodemailer');

/**
 * Create and configure the Nodemailer transporter
 * Supports Gmail, SendGrid, Mailgun, and custom SMTP
 */
const createTransporter = () => {
  const isGmail = process.env.SMTP_HOST === 'smtp.gmail.com' || (process.env.SMTP_USER && process.env.SMTP_USER.includes('gmail.com'));

  const config = isGmail
    ? {
        service: 'gmail',
        auth: {
          user: process.env.SMTP_USER,
          pass: (process.env.SMTP_PASS || '').replace(/\s+/g, ''),
        },
      }
    : {
        host: process.env.SMTP_HOST,
        port: parseInt(process.env.SMTP_PORT, 10) || 587,
        secure: process.env.SMTP_SECURE === 'true',
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASS || '',
        },
        tls: {
          rejectUnauthorized: false,
        },
      };

  const transporter = nodemailer.createTransport(config);

  // Verify connection on startup (non-blocking)
  transporter.verify((error, success) => {
    if (error) {
      console.warn('⚠️  Email transporter verification failed:', error.message);
      console.warn('   → Contact form emails will fail until SMTP is configured correctly.');
      console.warn('   → Update your .env file with valid SMTP credentials.\n');
    } else {
      console.log('✅ Email transporter is ready to send messages\n');
    }
  });

  return transporter;
};

const transporter = createTransporter();

/**
 * Send an email using the configured transporter
 * @param {Object} options - Email options
 * @param {string} options.to - Recipient email
 * @param {string} options.subject - Email subject
 * @param {string} options.html - HTML body
 * @param {string} [options.text] - Plain text fallback
 * @param {string} [options.replyTo] - Reply-to address
 */
const sendEmail = async ({ to, subject, html, text, replyTo }) => {
  const mailOptions = {
    from: `"${process.env.MAIL_FROM_NAME || 'WebCraft Studio'}" <${process.env.MAIL_FROM_ADDRESS || process.env.SMTP_USER}>`,
    to,
    subject,
    html,
    text: text || html.replace(/<[^>]*>/g, ''), // Strip HTML for plain text
  };

  if (replyTo) {
    mailOptions.replyTo = replyTo;
  }

  return await transporter.sendMail(mailOptions);
};

module.exports = { sendEmail, transporter };
