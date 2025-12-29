const mailchimp = require('@mailchimp/mailchimp_marketing');

export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { email } = req.body;

  // Validate email
  if (!email || !email.includes('@')) {
    return res.status(400).json({ error: 'Valid email is required' });
  }

  try {
    // Configure Mailchimp
    mailchimp.setConfig({
      apiKey: process.env.MAILCHIMP_API_KEY,
      server: process.env.MAILCHIMP_SERVER_PREFIX,
    });

    // Add contact to audience
    const response = await mailchimp.lists.addListMember(
      process.env.MAILCHIMP_AUDIENCE_ID,
      {
        email_address: email,
        status: 'subscribed',
      }
    );

    return res.status(200).json({
      success: true,
      message: 'Successfully subscribed!'
    });
  } catch (error) {
    console.error('Mailchimp error:', error);

    // Handle duplicate email
    if (error.status === 400 && error.response?.body?.title === 'Member Exists') {
      return res.status(200).json({
        success: true,
        message: 'You are already subscribed!'
      });
    }

    return res.status(500).json({
      error: 'Failed to subscribe. Please try again.'
    });
  }
}
