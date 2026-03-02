import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const isDev = process.env.NODE_ENV !== 'production';
const PORT = 5000;

async function main() {
  const app = express();
  app.use(express.json());

  app.get('/api/tally-submissions', async (req, res) => {
    const TALLY_API_KEY = process.env.TALLY_API_KEY;
    if (!TALLY_API_KEY) {
      return res.status(500).json({ error: 'TALLY_API_KEY is not configured' });
    }

    const formId = typeof req.query.formId === 'string' ? req.query.formId : '';
    if (!formId || !/^[a-zA-Z0-9_-]+$/.test(formId)) {
      return res.status(400).json({ error: 'Invalid or missing formId' });
    }

    const rawPage = typeof req.query.page === 'string' ? req.query.page : '1';
    const pageNum = parseInt(rawPage, 10);
    if (isNaN(pageNum) || pageNum < 1 || pageNum > 1000) {
      return res.status(400).json({ error: 'Invalid page number' });
    }

    try {
      const tallyUrl = `https://api.tally.so/forms/${encodeURIComponent(formId)}/submissions?page=${pageNum}`;
      const response = await fetch(tallyUrl, {
        headers: { Authorization: `Bearer ${TALLY_API_KEY}` },
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Tally API error [${response.status}]: ${errorText}`);
      }

      const data = await response.json();
      return res.json(data);
    } catch (error: unknown) {
      console.error('Error fetching Tally submissions:', error);
      const message = error instanceof Error ? error.message : 'Unknown error';
      return res.status(500).json({ error: message });
    }
  });

  if (isDev) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, '../dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

main().catch(console.error);
