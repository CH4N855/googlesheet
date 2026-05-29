// api/submit.js
export default async function handler(req, res) {
  const GOOGLE_WEB_APP_URL = process.env.GOOGLE_SCRIPT_URL;

  if (!GOOGLE_WEB_APP_URL) {
    return res.status(500).json({ error: "Server configuration missing: GOOGLE_SCRIPT_URL" });
  }

  // CASE 1: FETCH DATA (GET)
  if (req.method === 'GET') {
    try {
      const response = await fetch(GOOGLE_WEB_APP_URL);
      const data = await response.json();
      return res.status(200).json(data);
    } catch (error) {
      return res.status(500).json({ status: 'error', error: error.message });
    }
  }

  // CASE 2: SAVE/UPDATE DATA (POST)
  if (req.method === 'POST') {
    try {
      const response = await fetch(GOOGLE_WEB_APP_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(req.body),
      });
      return res.status(200).json({ status: 'success' });
    } catch (error) {
      return res.status(500).json({ status: 'error', error: error.message });
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
}