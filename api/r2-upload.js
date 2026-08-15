const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  // Use environment variables or fallback to hardcoded ones for local dev
  const accessKeyId = process.env.R2_ACCESS_KEY_ID || '333a14947a9208666b4ccf20ceee87db';
  const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY || '92c1a5af833c80f876777de272bc32fa3f85e214c7eb7198308621f5084ac880';
  const accountId = process.env.R2_ACCOUNT_ID || '0dc56db90ffac9c990e822627f5f4524';
  const bucketName = process.env.R2_BUCKET_NAME || 'proyectoanalisis';
  const publicUrl = process.env.R2_PUBLIC_URL || 'https://pub-ada139691018466fa48df5ea9f22ee6c.r2.dev';

  if (!accessKeyId || !secretAccessKey || !accountId) {
    return res.status(500).json({ error: 'Cloudflare R2 credentials missing' });
  }

  const s3Client = new S3Client({
    region: 'auto',
    endpoint: `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: accessKeyId,
      secretAccessKey: secretAccessKey
    }
  });

  try {
    const { fileData, fileName, contentType } = req.body;
    if (!fileData) {
      return res.status(400).json({ error: 'No file data provided' });
    }

    // The fileData is expected to be a base64 string
    // Format: "data:image/png;base64,iVBORw0KGgo..."
    let base64Data = fileData;
    let mimeType = contentType || 'image/png';

    if (fileData.includes(',')) {
      const parts = fileData.split(',');
      const match = parts[0].match(/:(.*?);/);
      if (match) mimeType = match[1];
      base64Data = parts[1];
    }

    const buffer = Buffer.from(base64Data, 'base64');
    const safeFileName = `certificados/${Date.now()}-${fileName || 'image.png'}`.replace(/\s+/g, '-');

    const command = new PutObjectCommand({
      Bucket: bucketName,
      Key: safeFileName,
      Body: buffer,
      ContentType: mimeType,
    });

    await s3Client.send(command);

    const fileUrl = `${publicUrl}/${safeFileName}`;

    return res.status(200).json({ 
      success: true, 
      url: fileUrl, 
      publicId: safeFileName 
    });

  } catch (error) {
    console.error('Error uploading to R2:', error);
    return res.status(500).json({ error: 'Failed to upload to Cloudflare R2', details: error.message });
  }
};
