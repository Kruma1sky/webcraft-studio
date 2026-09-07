const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '.env') });

const cors = require('cors');
const helmet = require('helmet');
const contactRoutes = require('./src/routes/contactRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

// ─── Security Middleware ──────────────────────────────
app.use(helmet({
  contentSecurityPolicy: false, // Disabled for inline styles/scripts in the frontend
  crossOriginEmbedderPolicy: false,
}));
app.use(cors());

// ─── Body Parsing ─────────────────────────────────────
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

// ─── Static Files ─────────────────────────────────────
app.use(express.static(path.join(__dirname, 'public')));

// ─── API Routes ───────────────────────────────────────
app.use('/api', contactRoutes);

// ─── Catch-all: Serve index.html for SPA ──────────────
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ─── Global Error Handler ─────────────────────────────
app.use((err, req, res, next) => {
  console.error('❌ Server Error:', err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal server error. Please try again later.',
  });
});

// ─── Start Server ─────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🚀 WebCraft Studio Server running at:`);
  console.log(`   ➜ Local:   http://localhost:${PORT}`);
  console.log(`   ➜ API:     http://localhost:${PORT}/api/contact`);
  console.log(`   ➜ Mode:    ${process.env.NODE_ENV || 'development'}\n`);
});

module.exports = app;
