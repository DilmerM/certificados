// Vercel Serverless Function - Listar certificados desde Cloudinary
// Requiere: CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET

module.exports = async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    return res.status(500).json({ error: 'Cloudinary credentials not configured', resources: [] });
  }

  try {
    const auth = Buffer.from(apiKey + ':' + apiSecret).toString('base64');
    const response = await fetch(
      'https://api.cloudinary.com/v1_1/' + cloudName + '/resources/image?prefix=certificados&type=upload&max_results=100&context=true&tags=true',
      {
        headers: {
          'Authorization': 'Basic ' + auth
        }
      }
    );

    if (!response.ok) {
      throw new Error('Cloudinary API error: ' + response.statusText);
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching certificates:', error);
    return res.status(500).json({ error: 'Failed to fetch certificates', resources: [] });
  }
};
