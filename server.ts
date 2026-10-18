import path from 'path';
import express from 'express';
import { backendApp } from './server/app';

const PORT = parseInt(process.env.PORT || '3000', 10);
const app = express();

// Mount backend API
app.use(backendApp);

// Static assets from built frontend
const distPath = path.resolve(process.cwd(), 'dist');
app.use(express.static(distPath));

// Fallback to index.html for client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(distPath, 'index.html'));
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Full-stack server listening on http://0.0.0.0:${PORT}`);
  });
}

export default app;
