const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 5000;
const CONTRACT_ID = process.env.CONTRACT_ID;
const STELLAR_RPC_URL = process.env.STELLAR_RPC_URL;

app.use(cors());
app.use(bodyParser.json());

// In-memory storage for papers (for demo purposes)
let papers = [];

// Stellar RPC helper functions
async function callContractReadOnly(method, args = []) {
  try {
    const payload = {
      jsonrpc: '2.0',
      id: 1,
      method: 'simulateTransaction',
      params: {
        transaction: buildTransaction(method, args),
      },
    };

    const response = await axios.post(STELLAR_RPC_URL, payload);
    return response.data;
  } catch (error) {
    console.error('RPC Error:', error.message);
    throw error;
  }
}

function buildTransaction(method, args) {
  // This is a simplified version. In production, you'd properly construct XDR transactions
  return {
    tx: `soroban_${method}_${args.join('_')}`,
  };
}

// Routes
app.get('/health', (req, res) => {
  res.json({ status: 'Backend is running', timestamp: new Date() });
});

// Get all papers
app.get('/api/papers', (req, res) => {
  res.json({
    success: true,
    count: papers.length,
    papers: papers,
  });
});

// Get paper by ID
app.get('/api/papers/:id', (req, res) => {
  const paperId = parseInt(req.params.id);
  const paper = papers.find((p) => p.id === paperId);

  if (!paper) {
    return res.status(404).json({ success: false, message: 'Paper not found' });
  }

  res.json({ success: true, paper });
});

// Publish a new paper
app.post('/api/papers/publish', (req, res) => {
  const { title, author, content_hash, content_preview } = req.body;

  if (!title || !author || !content_hash) {
    return res
      .status(400)
      .json({ success: false, message: 'Missing required fields' });
  }

  const newPaper = {
    id: papers.length + 1,
    title,
    author,
    content_hash,
    content_preview: content_preview || '',
    timestamp: new Date().toISOString(),
    views: 0,
    citations: 0,
  };

  papers.push(newPaper);

  res.status(201).json({
    success: true,
    message: 'Paper published successfully',
    paper: newPaper,
  });
});

// Get contract info
app.get('/api/contract', (req, res) => {
  res.json({
    success: true,
    contract_id: CONTRACT_ID,
    network: process.env.STELLAR_NETWORK,
    api_url: STELLAR_RPC_URL,
  });
});

// Get statistics
app.get('/api/stats', (req, res) => {
  res.json({
    success: true,
    total_papers: papers.length,
    total_authors: new Set(papers.map((p) => p.author)).size,
    papers_published_today: papers.filter(
      (p) =>
        new Date(p.timestamp).toDateString() === new Date().toDateString()
    ).length,
  });
});

// Search papers
app.get('/api/search', (req, res) => {
  const query = req.query.q?.toLowerCase() || '';

  if (!query) {
    return res.json({ success: true, papers: [] });
  }

  const results = papers.filter(
    (p) =>
      p.title.toLowerCase().includes(query) ||
      p.author.toLowerCase().includes(query)
  );

  res.json({ success: true, papers: results });
});

// View a paper (increment views)
app.post('/api/papers/:id/view', (req, res) => {
  const paperId = parseInt(req.params.id);
  const paper = papers.find((p) => p.id === paperId);

  if (!paper) {
    return res.status(404).json({ success: false, message: 'Paper not found' });
  }

  paper.views = (paper.views || 0) + 1;
  res.json({ success: true, paper });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err);
  res
    .status(err.status || 500)
    .json({ success: false, message: err.message || 'Server error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`
╔═══════════════════════════════════════════════════════╗
║   Academic Publishing Platform - Backend Server       ║
╠═══════════════════════════════════════════════════════╣
║  Server running at: http://localhost:${PORT}
║  Contract ID: ${CONTRACT_ID}
║  Network: ${process.env.STELLAR_NETWORK}
║  RPC URL: ${STELLAR_RPC_URL}
╚═══════════════════════════════════════════════════════╝
  `);
});
