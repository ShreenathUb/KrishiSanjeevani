// backend/api/index.js
const serverless = require('serverless-http');
const express    = require('express');
const cors       = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

// ---- import your route modules exactly as before ----
app.use('/api/farmer',   require('../routes/farmer'));
app.use('/api/merchant', require('../routes/merchant'));
app.use('/api/deal',     require('../routes/deal'));
app.use('/api/public',   require('../routes/public'));

// optional health check
app.get('/api/health', (_, res) => res.json({ ok: true }));

// Vercel: export ONE handler
module.exports = serverless(app);
