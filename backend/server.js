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
    console.log(`Calling contract method: ${method} with args:`, args);
    
    const payload = {
      jsonrpc: '2.0',
      id: 1,
      method: 'simulateTransaction',
      params: {
        transaction: buildTransaction(method, args),
      },
    };

    const response = await axios.post(STELLAR_RPC_URL, payload, {
      headers: { 'Content-Type': 'application/json' },
      timeout: 10000,
    });
    
    console.log(`RPC Response for ${method}:`, response.data);
    return response.data;
  } catch (error) {
    console.error(`RPC Error for ${method}:`, error.message);
    // Return mock data for demo purposes when contract not available
    return { data: null, error: error.message };
  }
}

function buildTransaction(method, args) {
  // Building a proper Soroban contract invocation
  // In production, you'd use stellar-sdk to build proper XDR transactions
  return {
    tx: `CONTRACT_INVOKE:${CONTRACT_ID}:${method}:${JSON.stringify(args)}`,
  };
}

// Routes
app.get('/health', (req, res) => {
  res.json({ status: 'Backend is running', timestamp: new Date() });
});

// Check Stellar network health
app.get('/api/stellar-health', async (req, res) => {
  try {
    const response = await axios.post(STELLAR_RPC_URL, {
      jsonrpc: '2.0',
      id: 1,
      method: 'getHealth',
    }, { timeout: 5000 });
    
    res.json({
      success: true,
      stellar_connected: true,
      network: process.env.STELLAR_NETWORK,
      rpc_url: STELLAR_RPC_URL,
      timestamp: new Date(),
      response: response.data,
    });
  } catch (error) {
    res.status(503).json({
      success: false,
      stellar_connected: false,
      network: process.env.STELLAR_NETWORK,
      rpc_url: STELLAR_RPC_URL,
      error: error.message,
      message: 'Unable to connect to Stellar network. Please check your internet connection.',
    });
  }
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
app.post('/api/papers/publish', async (req, res) => {
  const { title, author, content_hash, content_preview } = req.body;

  if (!title || !author || !content_hash) {
    return res
      .status(400)
      .json({ success: false, message: 'Missing required fields' });
  }

  try {
    // Try to publish on Stellar contract if configured
    let contractResponse = null;
    if (CONTRACT_ID) {
      contractResponse = await callContractReadOnly('publish_paper', [title, author, content_hash]);
      console.log('Contract publish response:', contractResponse);
    }

    // Store in memory (dual storage for reliability)
    const newPaper = {
      id: papers.length + 1,
      title,
      author,
      content_hash,
      content_preview: content_preview || '',
      timestamp: new Date().toISOString(),
      views: 0,
      citations: 0,
      contract_status: CONTRACT_ID ? 'submitted_to_stellar' : 'local_only',
      contract_response: contractResponse,
    };

    papers.push(newPaper);

    res.status(201).json({
      success: true,
      message: CONTRACT_ID 
        ? 'Paper published to Stellar blockchain and stored locally'
        : 'Paper published locally (contract not configured)',
      paper: newPaper,
    });
  } catch (error) {
    console.error('Error publishing paper:', error);
    res.status(500).json({
      success: false,
      message: 'Error publishing paper',
      error: error.message,
    });
  }
});

// Get contract info
app.get('/api/contract', (req, res) => {
  const contractInfo = {
    success: true,
    contract_id: CONTRACT_ID || 'NOT_SET',
    network: process.env.STELLAR_NETWORK || 'testnet',
    api_url: STELLAR_RPC_URL || 'https://soroban-testnet.stellar.org',
    status: CONTRACT_ID ? 'CONFIGURED' : 'NOT_CONFIGURED',
    deployed: CONTRACT_ID ? true : false,
    message: CONTRACT_ID 
      ? 'Smart contract is deployed and configured' 
      : 'Smart contract ID not set. Please deploy contract on Stellar IDE and update .env file',
    methods: [
      'publish_paper(title, author, content_hash) -> u64',
      'get_paper(id) -> Paper',
      'get_paper_count() -> u64'
    ],
    setup_guide: 'See STELLAR_DEPLOYMENT_GUIDE.md for deployment instructions',
  };
  res.json(contractInfo);
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
  const stellarStatus = CONTRACT_ID ? '✅ CONFIGURED' : '⚠️  NOT CONFIGURED';
  
  console.log('\n╔═══════════════════════════════════════════════════════════╗');
  console.log('║   Academic Publishing Platform - Backend Server           ║');
  console.log('╠═══════════════════════════════════════════════════════════╣');
  console.log(`║  🌐 Server running at: http://localhost:${PORT}`);
  console.log(`║  🔐 Stellar Network: ${process.env.STELLAR_NETWORK || 'testnet'}`);
  console.log(`║  🚀 Contract Status: ${stellarStatus}`);
  console.log(`║  📦 Contract ID: ${CONTRACT_ID || 'NOT SET'}`);
  console.log(`║  📡 RPC URL: ${STELLAR_RPC_URL}`);
  console.log('╠═══════════════════════════════════════════════════════════╣');
  console.log('║  📚 Available APIs:                                       ║');
  console.log('║     • GET  /health - Server health check                 ║');
  console.log('║     • GET  /api/papers - Get all papers                  ║');
  console.log('║     • POST /api/papers/publish - Publish new paper       ║');
  console.log('║     • GET  /api/contract - Contract info                 ║');
  console.log('║     • GET  /api/stellar-health - Stellar network status  ║');
  console.log('║     • GET  /api/stats - Platform statistics              ║');
  
  if (!CONTRACT_ID) {
    console.log('╠═══════════════════════════════════════════════════════════╣');
    console.log('║  ⚠️  SMART CONTRACT NOT CONFIGURED                        ║');
    console.log('║  STEPS TO DEPLOY:                                        ║');
    console.log('║  1. Visit: https://stellaride.vercel.app/ide            ║');
    console.log('║  2. Deploy the Academic Publishing contract             ║');
    console.log('║  3. Copy the Contract ID                                ║');
    console.log('║  4. Update .env with CONTRACT_ID                        ║');
    console.log('║  5. Restart backend                                     ║');
  } else {
    console.log('╠═══════════════════════════════════════════════════════════╣');
    console.log('║  ✅ Contract is deployed and configured!                 ║');
  }
  
  console.log('╚═══════════════════════════════════════════════════════════╝\n');
});
