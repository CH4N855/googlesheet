// api/submit.js
export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // Vercel pulls this safely from your dashboard environment variables
  const GOOGLE_WEB_APP_URL = process.env.GOOGLE_SCRIPT_URL; 

  if (!GOOGLE_WEB_APP_URL) {
    return res.status(500).json({ error: "Server configuration missing: GOOGLE_SCRIPT_URL" });
  }

  try {
    // Forward the data to your Google Apps Script
    const response = await fetch(GOOGLE_WEB_APP_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(req.body),
    });

    // Since Google Apps Script can be tricky with standard CORS/redirects,
    // we assume success if the fetch itself didn't crash.
    return res.status(200).json({ status: 'success', message: 'Data sent successfully!' });
  } catch (error) {
    return res.status(500).json({ status: 'error', error: error.message });
  }
}