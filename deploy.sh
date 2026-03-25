#!/bin/bash
# Deployment Helper Script for Academic Publishing Platform

echo "🚀 Academic Publishing Platform - Free Deployment Setup"
echo "=================================================="
echo ""

# Check if git is configured
if ! git config user.name > /dev/null 2>&1; then
    echo "Setting up Git configuration..."
    git config user.name "Saayon"
    git config user.email "saayon@example.com"
fi

echo "✅ Current branch: $(git branch --show-current)"
echo "✅ Latest commit: $(git log -1 --pretty=format:'%h - %s')"
echo ""

echo "📋 Deployment Instructions:"
echo "=================================================="
echo ""
echo "1️⃣  DEPLOY BACKEND TO RAILWAY (Free)"
echo "   → Visit: https://railway.app"
echo "   → Connect GitHub & select this repository"
echo "   → Add environment variables:"
echo "      PORT=5000"
echo "      NODE_ENV=production"
echo "      CONTRACT_ID=CDDOFRJSIYSF5QD2KFYNE4BPZPBH7YWJKOIXQC2M7JBX7LMYL7OK5FCT"
echo "      STELLAR_RPC_URL=https://soroban-testnet.stellar.org"
echo ""

echo "2️⃣  DEPLOY FRONTEND TO VERCEL (Free)"
echo "   → Visit: https://vercel.com"
echo "   → Choose 'New Project' → Import this repository"
echo "   → Add environment variable:"
echo "      REACT_APP_API_URL=Your-Railway-Backend-URL/api"
echo ""

echo "📂 Key Files for Deployment:"
echo "=================================================="
ls -la | grep -E "package.json|vercel.json|.env|server.js"
echo ""

echo "🔗 Useful Links:"
echo "=================================================="
echo "Railway Docs: https://docs.railway.app"
echo "Vercel Docs: https://vercel.com/docs"
echo "GitHub Repo: https://github.com/Saayon22/AcademicPublishingPlatform"
echo ""

echo "✨ For detailed instructions, see: FREE_DEPLOYMENT_GUIDE.md"
