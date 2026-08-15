const { S3Client, ListObjectsV2Command } = require('@aws-sdk/client-s3');

module.exports = async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

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
    const command = new ListObjectsV2Command({
      Bucket: bucketName,
      Prefix: 'certificados/'
    });

    const response = await s3Client.send(command);
    
    // We only return the URLs for now. 
    // The actual certificate metadata (title, category) is still stored in localStorage/DB.
    // This endpoint is just a helper if we wanted to list raw files.
    // However, our app relies on the JSON array stored in localStorage/DB.
    
    const files = (response.Contents || []).map(item => ({
      publicId: item.Key,
      url: `${publicUrl}/${item.Key}`,
      lastModified: item.LastModified
    }));

    return res.status(200).json({ success: true, files });

  } catch (error) {
    console.error('Error listing R2:', error);
    return res.status(500).json({ error: 'Failed to list Cloudflare R2', details: error.message });
  }
};
