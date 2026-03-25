# 🚀 Free Deployment Guide for Academic Publishing Platform

This guide will help you deploy your application completely free using Vercel (frontend) and Railway (backend).

## Tech Stack
- **Frontend**: Static HTML/CSS/JavaScript → **Vercel**
- **Backend**: Node.js Express → **Railway**
- **Smart Contract**: Stellar Soroban Testnet (already deployed)
- **Database**: In-memory + Blockchain

---

## Part 1: Deploy Backend to Railway (Free)

### Prerequisites
- GitHub account
- Railway account (https://railway.app)

### Steps:

1. **Create a new GitHub repository**
   ```
   Your repo: https://github.com/Saayon22/AcademicPublishingPlatform
   (Already created! ✅)
   ```

2. **Go to Railway.app and sign up**
   - Visit https://railway.app
   - Click "Start for free"
   - Sign in with GitHub

3. **Deploy Backend**
   - Click "Create New Project"
   - Select "Deploy from GitHub"
   - Choose "AcademicPublishingPlatform" repository
   - Click "Deploy"

4. **Configure Environment Variables in Railway**
   - Click on your deployment
   - Go to "Variables" tab
   - Add these variables:
   ```
   PORT=5000
   NODE_ENV=production
   CONTRACT_ID=CDDOFRJSIYSF5QD2KFYNE4BPZPBH7YWJKOIXQC2M7JBX7LMYL7OK5FCT
   STELLAR_RPC_URL=https://soroban-testnet.stellar.org
   ```

5. **Get Your Backend URL**
   - After deployment, Railway assigns you a public URL
   - Example: `https://academicpublishing-production.railway.app`
   - *Save this URL - you'll need it for the frontend*

---

## Part 2: Deploy Frontend to Vercel (Free)

### Prerequisites
- Backend URL from Railway (from Part 1)

### Steps:

1. **Go to Vercel.com and sign up**
   - Visit https://vercel.com
   - Click "Sign Up"
   - Sign in with GitHub

2. **Create New Project**
   - Click "New Project"
   - Select "AcademicPublishingPlatform" from your repositories
   - Click "Import"

3. **Configure Frontend Setup**
   - **Project Name**: academic-publishing
   - **Framework**: "Other" (since it's vanilla HTML)
   - **Build Command**: Leave empty
   - **Output Directory**: `.` (root directory)

4. **Set Environment Variables**
   - Before deploying, add this environment variable:
   ```
   API_URL = https://your-railway-backend-url.railway.app/api
   ```
   (Replace with actual Railway URL from Part 1)

5. **Deploy**
   - Click "Deploy"
   - Vercel automatically deploys on every GitHub push ✅

6. **Get Your Frontend URL**
   - After deployment completes, you'll get a URL like:
   - `https://academic-publishing.vercel.app`

---

## Part 3: Update Frontend Configuration

The frontend needs to know where the backend is:

### Option A: Using Environment Variable (Recommended)
In Vercel dashboard:
1. Go to Settings → Environment Variables
2. Add: `API_URL=https://your-railway-url.railway.app/api`

### Option B: Update index.html directly
Edit line in `index.html`:
```javascript
const API_URL = 'https://your-railway-url.railway.app/api';
```

Then push to GitHub (Vercel auto-redeploys)

---

## Part 4: Test Your Deployment

1. **Visit your frontend URL**
   - https://academic-publishing.vercel.app

2. **Test the features**
   - Connect wallet ("Connect" button)
   - Publish a paper
   - View papers list
   - Search functionality

3. **Check browser console for errors** (F12)
   - Press F12 → Console tab
   - Should show successful API calls

---

## Part 5: Custom Domain (Optional - Free)

### Add custom domain to Vercel:
1. Go to Vercel project → Settings → Domains
2. Add your domain
3. Update DNS settings with your domain registrar
4. Example: `app.yourdomain.com` instead of `vercel.app`

---

## Troubleshooting

### Backend not connecting
- Check Railway deployment status
- Verify environment variables in Railway
- Check API_URL in frontend matches Railway URL
- Look for CORS errors in browser console

### "Cannot reach server" error
- Ensure Railway backend is running
- Check that PORT is set to 5000 in Railway
- Verify CONTRACT_ID and STELLAR_RPC_URL are correct

### Deployments not updating
- Force refresh: Ctrl+Shift+R (Windows) or Cmd+Shift+R (Mac)
- Check GitHub commits are pushed
- Verify webhook is connected in Vercel/Railway

---

## Free Tier Limits

| Platform | Limit | Details |
|----------|-------|---------|
| **Vercel** | Unlimited | 100GB bandwidth/month for static sites |
| **Railway** | $5/month free credit | ~15GB storage, ~500 hours compute |
| **Stellar** | Unlimited | Free testnet for development |

**Total Cost: FREE** (within free tier usage)

---

## Next Steps for Production

1. **Switch to Stellar Mainnet** (when ready)
   - Update STELLAR_RPC_URL
   - Update CONTRACT_ID (deploy on mainnet)
   - Get real funding for transactions

2. **Add Database** (optional)
   - Railway offers free PostgreSQL
   - Or use MongoDB Atlas free tier

3. **Enable HTTPS** (automatic on Vercel/Railway)

4. **Setup Analytics** (free options)
   - Google Analytics
   - Plausible Analytics

5. **Monitor Uptime** (free)
   - UptimeRobot (free tier)

---

## Quick Checklist

- [ ] GitHub repo committed with latest changes
- [ ] Railway account created
- [ ] Backend deployed to Railway
- [ ] Environment variables set in Railway
- [ ] Backend URL copied
- [ ] Vercel account created
- [ ] Frontend deployed to Vercel
- [ ] API_URL environment variable set in Vercel
- [ ] Backend and frontend connected and tested
- [ ] Custom domain added (optional)

---

## Support & Resources

- **Vercel Docs**: https://vercel.com/docs
- **Railway Docs**: https://docs.railway.app
- **Stellar Docs**: https://developers.stellar.org
- **Express Documentation**: https://expressjs.com

---

**Your platform is now live and completely free!** 🎉

For questions or issues, check the logs in Railway and Vercel dashboards.
