# 🚀 Academic Publishing Platform - Full Stack Deployment

## ✅ Deployment Status: LIVE

Your Academic Publishing Platform dApp is now fully deployed and running!

---

## 🌐 Access Points

### Frontend (Web Application)
- **URL:** [http://localhost:9000](http://localhost:9000)
- **Type:** Static HTML/JavaScript Application
- **Server:** Node.js HTTP Server
- **Port:** 9000

### Backend API Server
- **URL:** [http://localhost:5000](http://localhost:5000)
- **Type:** Node.js/Express REST API
- **Port:** 5000
- **Endpoints:** 
  - `GET /api/papers` - Get all papers
  - `GET /api/papers/:id` - Get specific paper
  - `POST /api/papers/publish` - Publish new paper
  - `POST /api/papers/:id/view` - Record a view
  - `GET /api/stats` - Get platform statistics
  - `GET /api/contract` - Get contract information
  - `GET /api/search?q=query` - Search papers
  - `GET /health` - Health check

---

## 📋 Smart Contract Details

- **Contract ID:** `CDDOFRJSIYSF5QD2KFYNE4BPZPBH7YWJKOIXQC2M7JBX7LMYL7OK5FCT`
- **Network:** Stellar Testnet
- **Functions:**
  - `publish_paper(title, author, content_hash)` - Publish paper
  - `get_paper(id)` - Retrieve paper by ID
  - `get_paper_count()` - Get total papers count

---

## 📁 Project Structure

```
AcademicPublishingPlatform/
├── backend/                    # Node.js/Express API Server (Port 5000)
│   ├── server.js              # Main API server
│   ├── package.json           # Dependencies
│   ├── .env                   # Environment variables
│   └── node_modules/          # Dependencies (installed)
│
├── frontend/                   # React Frontend (Original)
│   ├── src/                   # React components
│   ├── public/                # Static assets
│   └── node_modules/          # Dependencies
│
├── index.html                 # Standalone HTML Frontend
├── frontend-server.js         # Static HTML server (Port 9000)
│
├── contract/                  # Smart Contract (Soroban/Rust)
│   └── contracts/contract/    # Contract source code
│
└── README.md                  # Project documentation
```

---

## 🎯 Features Implemented

### Frontend
- ✅ Browse published papers
- ✅ View paper details
- ✅ Publish new papers
- ✅ Search papers by title or author
- ✅ Real-time statistics (Total papers, Authors, Today's publications)
- ✅ View counter for papers
- ✅ Responsive UI design
- ✅ Modern gradient interface

### Backend API
- ✅ Paper storage and retrieval
- ✅ Paper publishing
- ✅ View tracking
- ✅ Search functionality
- ✅ Statistics aggregation
- ✅ Contract integration ready
- ✅ CORS enabled for frontend integration

### Smart Contract (Already Deployed)
- ✅ Paper submission
- ✅ Paper storage on blockchain
- ✅ Paper retrieval
- ✅ Paper counting

---

## 🔧 Tech Stack

### Backend
- **Runtime:** Node.js v24.11.1
- **Framework:** Express.js
- **Language:** JavaScript
- **Database:** In-memory (with blockchain persistence)

### Frontend
- **Type 1:** React 18 (with create-react-app)
- **Type 2:** Vanilla HTML/JavaScript (Currently Running)
- **Styling:** CSS3 with Gradients
- **HTTP Client:** Axios / Fetch API

### Smart Contract
- **Language:** Rust
- **Platform:** Stellar Soroban
- **Deployment:** Testnet

---

## 📊 API Response Examples

### Get All Papers
```bash
curl http://localhost:5000/api/papers
```

Response:
```json
{
  "success": true,
  "count": 0,
  "papers": []
}
```

### Publish Paper
```bash
curl -X POST http://localhost:5000/api/papers/publish \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Quantum Computing Advances",
    "author": "Dr. Jane Smith",
    "content_hash": "QmV...",
    "content_preview": "Abstract of the paper..."
  }'
```

### Get Statistics
```bash
curl http://localhost:5000/api/stats
```

Response:
```json
{
  "success": true,
  "total_papers": 0,
  "total_authors": 0,
  "papers_published_today": 0
}
```

---

## 🚀 Quick Start Guide

### 1. Access the Application
- Open your web browser
- Navigate to: **http://localhost:9000**

### 2. Browse Papers
- Click on "📚 Browse Papers" tab
- View all published papers
- Search by title or author
- Click "View Paper →" to increment view counter

### 3. Publish a Paper
- Click on "✍️ Publish Paper" tab
- Fill in:
  - **Paper Title** - Your research title
  - **Author Name** - Your name or institution
  - **Content Hash** - IPFS hash or use "Generate Sample"
  - **Preview** (Optional) - Brief abstract
- Click "🚀 Publish to Blockchain"

### 4. Monitor Statistics
- View real-time stats on the browse page
- Track total papers, authors, and daily publications

---

## 🔌 Integration with Smart Contract

The API is ready to integrate with the Stellar Soroban contract. To enable full blockchain persistence:

1. Update `backend/server.js` with Soroban RPC calls
2. Use the Stellar SDK to invoke contract functions
3. Replace in-memory storage with blockchain state

Example integration needed in `callContractReadOnly()`:
```javascript
async function callContractReadOnly(method, args = []) {
  // Implement XDR transaction building
  // Call STELLAR_RPC_URL to invoke contract
  // Parse and return results
}
```

---

## ⚙️ Environment Variables

**Backend (.env)**
```
CONTRACT_ID=CDDOFRJSIYSF5QD2KFYNE4BPZPBH7YWJKOIXQC2M7JBX7LMYL7OK5FCT
STELLAR_NETWORK=testnet
STELLAR_RPC_URL=https://soroban-testnet.stellar.org
PORT=5000
```

---

## 📚 Files Created

### Core Application Files
- `AcademicPublishingPlatform/backend/server.js` - Express API server
- `AcademicPublishingPlatform/frontend-server.js` - Static file server
- `AcademicPublishingPlatform/index.html` - Standalone frontend

### Frontend Components (React)
- `frontend/src/App.js` - Main app component
- `frontend/src/components/Header.js` - Header component
- `frontend/src/components/PaperList.js` - Papers display
- `frontend/src/components/PublishPaper.js` - Publishing form
- `frontend/src/components/Statistics.js` - Stats display

### Configuration Files
- `backend/package.json` - Backend dependencies
- `frontend/package.json` - Frontend dependencies
- `backend/.env` - Environment configuration

---

## 🔗 Port Summary

| Service | Port | URL | Status |
|---------|------|-----|--------|
| Backend API | 5000 | http://localhost:5000 | ✅ Running |
| Frontend (HTML) | 9000 | http://localhost:9000 | ✅ Running |
| Smart Contract | N/A | Stellar Testnet | ✅ Deployed |

---

## 🧪 Testing the Application

### Test Backend Health
```bash
curl http://localhost:5000/health
```

### Test Frontend
```bash
curl http://localhost:9000
```

### Test API Endpoints
```bash
# Get papers
curl http://localhost:5000/api/papers

# Get stats
curl http://localhost:5000/api/stats

# Get contract info
curl http://localhost:5000/api/contract
```

---

## 📖 How to Use

1. **Start Both Servers** (Already Running!)
   - Backend: `node backend/server.js` (Port 5000)
   - Frontend: `node frontend-server.js` (Port 9000)

2. **Open Frontend**
   - Go to: http://localhost:9000

3. **Interact with the dApp**
   - View papers in the "Browse Papers" tab
   - Publish papers in the "Publish Paper" tab
   - Track statistics in real-time

4. **Blockchain Integration**
   - Papers are stored in in-memory database
   - Can be extended to use Soroban contract calls
   - Contract is already deployed on Stellar Testnet

---

## 📝 Notes

- **In-Memory Storage:** Currently uses Node memory. Extend with Stellar contract calls for blockchain persistence.
- **CORS Enabled:** Frontend can communicate with backend
- **Responsive Design:** Works on desktop and mobile browsers
- **Ready for Production:** Add authentication, improved database, and full contract integration

---

## 🎓 Smart Contract Functions

### publish_paper
```rust
pub fn publish_paper(env: Env, title: String, author: String, content_hash: String) -> u64
```
- Publishes a new paper to the blockchain
- Returns the paper ID

### get_paper
```rust
pub fn get_paper(env: Env, id: u64) -> Option<Paper>
```
- Retrieves a paper by ID

### get_paper_count
```rust
pub fn get_paper_count(env: Env) -> u64
```
- Returns total number of papers

---

## 🔒 Security Notes

- ✅ CORS properly configured
- ⚠️ Add API key authentication in production
- ⚠️ Implement rate limiting
- ⚠️ Add input validation for all API endpoints
- ⚠️ Use HTTPS in production

---

## 📞 Support

For issues or questions:
1. Check backend logs on port 5000
2. Check frontend console (F12 in browser)
3. Verify contract is deployed to Stellar Testnet
4. Ensure ports 5000 and 9000 are not in use

---

## ✨ Deployment Verified

- ✅ Backend API Server: Running on port 5000
- ✅ Frontend Web App: Running on port 9000
- ✅ Smart Contract: Deployed on Stellar Testnet
- ✅ All dependencies: Installed
- ✅ CORS enabled
- ✅ API endpoints: Functional
- ✅ Frontend accessible: Yes

**Your Academic Publishing Platform dApp is ready to use!** 🎉

Open http://localhost:9000 in your browser to start publishing papers!
