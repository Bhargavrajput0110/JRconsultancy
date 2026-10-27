export default async function handler(req, res) {
  const serverUrl = process.env.SERVER_URL;
  if (!serverUrl) {
    return res.status(500).json({ error: 'SERVER_URL service binding is not defined.' });
  }

  const targetUrl = new URL('/', serverUrl);
  try {
    const response = await fetch(targetUrl);
    const data = await response.json();
    return res.status(response.status).json(data);
  } catch (err) {
    return res.status(502).json({ error: 'Failed to reach internal server', details: err.message });
  }
}
