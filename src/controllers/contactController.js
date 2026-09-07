const { sendEmail } = require('../config/email');
const { contactFormAdminEmail, contactFormAutoReply } = require('../utils/emailTemplates');

/**
 * Handle contact form submission
 * - Sends notification email to admin
 * - Sends auto-reply to the submitter
 */
const handleContactForm = async (req, res) => {
  try {
    const { name, email, phone, company, service, budget, timeline, website, message } = req.body;

    const formData = { name, email, phone, company, service, budget, timeline, website, message };
    const recipientEmail = process.env.MAIL_TO_ADDRESS || process.env.SMTP_USER;

    // 1. Send notification to admin
    const adminInfo = await sendEmail({
      to: recipientEmail,
      subject: `🔔 New Inquiry from ${name} — ${service || 'General'}`,
      html: contactFormAdminEmail(formData),
      replyTo: email,
    });
    console.log(`✅ Admin notification sent to: ${recipientEmail} (ID: ${adminInfo.messageId})`);

    // 2. Send auto-reply to the submitter asynchronously (non-blocking)
    if (email && email.toLowerCase() !== recipientEmail.toLowerCase()) {
      sendEmail({
        to: email,
        subject: `Thank you for contacting ${process.env.COMPANY_NAME || 'WebCraft Studio'}! 🎉`,
        html: contactFormAutoReply(formData),
      })
      .then((info) => console.log(`✅ Auto-reply sent to submitter: ${email} (ID: ${info.messageId})`))
      .catch((err) => console.warn('⚠️  Auto-reply email failed:', err.message));
    }

    res.status(200).json({
      success: true,
      message: 'Thank you! Your message has been sent successfully. We\'ll get back to you within 24 hours.',
    });

  } catch (error) {
    console.error('❌ Contact form error:', error.message);

    // Provide helpful error message based on error type
    let userMessage = 'Sorry, we couldn\'t send your message right now. Please try again or contact us directly.';
    
    if (error.code === 'EAUTH') {
      console.error('   → SMTP authentication failed. Check SMTP_USER and SMTP_PASS in .env');
    } else if (error.code === 'ESOCKET') {
      console.error('   → SMTP connection failed. Check SMTP_HOST and SMTP_PORT in .env');
    }

    res.status(500).json({
      success: false,
      message: userMessage,
      errorDetail: error.message,
      errorCode: error.code || null,
    });
  }
};

module.exports = { handleContactForm };
