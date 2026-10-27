export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  const serverUrl = process.env.SERVER_URL;
  if (!serverUrl) {
    return res.status(500).json({ error: 'SERVER_URL service binding is not defined.' });
  }

  // Construct target URL using the bound internal server URL
  const targetUrl = new URL(req.url, serverUrl);

  const headers = {};
  for (const [key, value] of Object.entries(req.headers)) {
    if (key.toLowerCase() !== 'host' && key.toLowerCase() !== 'connection') {
      headers[key] = value;
    }
  }

  try {
    const fetchOptions = {
      method: req.method,
      headers,
    };

    if (req.method !== 'GET' && req.method !== 'HEAD') {
      fetchOptions.body = req;
      fetchOptions.duplex = 'half';
    }

    const response = await fetch(targetUrl, fetchOptions);

    res.status(response.status);
    response.headers.forEach((value, key) => {
      const lower = key.toLowerCase();
      if (lower !== 'transfer-encoding' && lower !== 'content-encoding' && lower !== 'content-length') {
        res.setHeader(key, value);
      }
    });

    const buffer = await response.arrayBuffer();
    return res.send(Buffer.from(buffer));
  } catch (err) {
    console.error('BFF Proxy Error calling internal service:', err);
    return res.status(502).json({ error: 'Internal service communication error', details: err.message });
  }
}
