// api/predict.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';
import { IncomingForm, File } from 'formidable';
import fs from 'fs';
import FormData from 'form-data';
import axios from 'axios';

export const config = {
  api: { bodyParser: false },
};

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const form = new IncomingForm({ keepExtensions: true });

  form.parse(req, async (err, _fields, files) => {
    if (err) return res.status(500).json({ error: 'Parse error', detail: err.message });

    try {
      const uploaded = files.file as File | File[];
      const file = Array.isArray(uploaded) ? uploaded[0] : uploaded;

      const formData = new FormData();
      formData.append('file', fs.createReadStream(file.filepath), {
        filename: file.originalFilename ?? 'upload',
        contentType: file.mimetype ?? 'application/octet-stream',
        knownLength: fs.statSync(file.filepath).size, // ← prevents length mismatch
      });

      // Use axios — handles multipart headers + boundary reliably
      const backendRes = await axios.post(
        `${process.env.BACKEND_URL}/predict`,
        formData,
        {
          headers: {
            ...formData.getHeaders(), // ← correct Content-Type: multipart/form-data; boundary=...
          },
          maxBodyLength: Infinity,
          maxContentLength: Infinity,
        }
      );

      return res.status(200).json(backendRes.data);
    } catch (e: any) {
      const status = e?.response?.status ?? 500;
      const detail = e?.response?.data ?? e.message;
      return res.status(status).json({ error: 'Backend error', detail });
    }
  });
}
