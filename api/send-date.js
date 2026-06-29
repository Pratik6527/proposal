export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({
      success: false,
      message: 'Method not allowed. Use POST.',
    });
  }

  const { name, email, selectedDate, location, mealType, foods } = req.body;

  // Validate required fields
  if (
    !name ||
    !email ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ||
    !selectedDate ||
    !location ||
    !mealType ||
    !Array.isArray(foods) ||
    foods.length === 0
  ) {
    return res.status(400).json({
      success: false,
      message: 'Please fill all required fields.',
    });
  }

  const apiKey = process.env.ELASTIC_EMAIL_API_KEY;
  const fromEmail = process.env.ELASTIC_EMAIL_FROM_EMAIL;
  const fromName = process.env.ELASTIC_EMAIL_FROM_NAME;
  const pratikEmail = process.env.PRATIK_EMAIL;
  const whatsappNumber = process.env.PRATIK_WHATSAPP;

  if (!apiKey || !fromEmail || !pratikEmail) {
    console.error('Missing required environment variables for Elastic Email.');
    return res.status(500).json({
      success: false,
      message: 'Email service configuration error.',
    });
  }

  const selectedItems = foods.join(', ');

  // Helper to send email using Elastic Email v4 Transactional endpoint
  const sendElasticEmail = async ({ to, subject, html }) => {
    const payload = {
      Recipients: {
        To: [to],
      },
      Content: {
        Body: [
          {
            ContentType: 'HTML',
            Charset: 'utf-8',
            Content: html,
          },
        ],
        From: fromEmail,
        ReplyTo: fromEmail,
        Subject: subject,
      },
    };

    const response = await fetch('https://api.elasticemail.com/v4/emails/transactional', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-ElasticEmail-ApiKey': apiKey,
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error(`Elastic Email API Error for ${to}:`, errorText);
      throw new Error('Email API responded with an error');
    }

    return await response.json();
  };

  // 1. Email to Girl
  const guestSubject = 'Your date with Pratik is confirmed ❤️';
  const guestHtml = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #fdf2f8; padding: 40px 20px; text-align: center;">
      <div style="max-width: 500px; margin: 0 auto; background: #ffffff; border-radius: 20px; padding: 40px 30px; box-shadow: 0 10px 25px rgba(244, 63, 94, 0.1);">
        <h1 style="color: #e11d48; margin-top: 0; font-size: 24px; font-weight: bold;">Hi ${name},</h1>
        <p style="color: #4b5563; font-size: 16px; margin-bottom: 25px;">You confirmed a <strong>${mealType}</strong> with Pratik on <strong>${selectedDate}</strong>.</p>
        
        <div style="text-align: left; background: #fff1f2; padding: 20px; border-radius: 12px; margin-bottom: 25px;">
          <p style="color: #9f1239; margin: 0 0 5px 0; font-size: 14px; font-weight: 600;">Selected Location:</p>
          <p style="color: #4b5563; margin: 0 0 15px 0;">${location}</p>
          
          <p style="color: #9f1239; margin: 0 0 5px 0; font-size: 14px; font-weight: 600;">Selected Food and Drinks:</p>
          <p style="color: #4b5563; margin: 0; white-space: pre-wrap;">${selectedItems}</p>
        </div>

        <p style="color: #4b5563; font-size: 15px;">Please contact Pratik on WhatsApp:</p>
        <p style="margin: 15px 0;"><a href="https://wa.me/${whatsappNumber}" style="display: inline-block; background-color: #25d366; color: #ffffff; text-decoration: none; padding: 12px 25px; border-radius: 50px; font-weight: bold; font-size: 16px;">+${whatsappNumber}</a></p>
        
        <p style="color: #4b5563; font-size: 15px; margin-top: 30px;">With love,<br/><strong style="color: #e11d48; font-size: 18px;">Pratik ❤️</strong></p>
      </div>
    </div>
  `;

  // 2. Email to Pratik
  const ownerSubject = 'New date confirmed ❤️';
  const ownerHtml = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f3f4f6; padding: 40px 20px;">
      <div style="max-width: 500px; margin: 0 auto; background: #ffffff; border-radius: 12px; padding: 30px; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);">
        <h2 style="color: #111827; margin-top: 0; border-bottom: 2px solid #f3f4f6; padding-bottom: 15px;">Hi Pratik,</h2>
        <p style="color: #374151; font-size: 16px;"><strong>${name}</strong> fixed a date with you.</p>
        
        <table style="width: 100%; margin-top: 20px; border-collapse: collapse;">
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280; font-weight: 600; width: 140px;">Her Email:</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #111827;"><a href="mailto:${email}" style="color: #2563eb;">${email}</a></td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280; font-weight: 600;">Selected Date:</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #111827;">${selectedDate}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280; font-weight: 600;">Location:</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #111827;">${location}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #6b7280; font-weight: 600;">Meal Type:</td>
            <td style="padding: 10px 0; border-bottom: 1px solid #f3f4f6; color: #111827;">${mealType}</td>
          </tr>
          <tr>
            <td style="padding: 10px 0; color: #6b7280; font-weight: 600; vertical-align: top;">Food & Drinks:</td>
            <td style="padding: 10px 0; color: #111827;">${selectedItems}</td>
          </tr>
        </table>
        
        <p style="color: #4b5563; margin-top: 25px; font-size: 14px; padding-top: 15px; border-top: 2px solid #f3f4f6;">Contact her through the submitted email address.</p>
      </div>
    </div>
  `;

  try {
    // Send both emails concurrently
    await Promise.all([
      sendElasticEmail({ to: email, subject: guestSubject, html: guestHtml }),
      sendElasticEmail({ to: pratikEmail, subject: ownerSubject, html: ownerHtml }),
    ]);

    return res.status(200).json({
      success: true,
      message: 'Date confirmed and emails sent successfully.',
    });
  } catch (error) {
    console.error('Failed to send confirmation emails:', error);
    return res.status(500).json({
      success: false,
      message: 'Email sending failed. Please try again.',
    });
  }
}
