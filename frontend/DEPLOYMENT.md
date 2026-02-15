# Vercel Deployment Guide

## Quick Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/osheep)

## Manual Deployment Steps

1. **Install Vercel CLI** (optional):
   ```bash
   npm i -g vercel
   ```

2. **Build locally** (test first):
   ```bash
   cd frontend
   npm install
   npm run build
   ```

3. **Deploy**:
   
   Via CLI:
   ```bash
   cd frontend
   vercel --prod
   ```
   
   Via Dashboard:
   - Go to https://vercel.com/new
   - Import your Git repository
   - Set Root Directory: `frontend`
   - Framework Preset: Next.js (auto-detected)
   - Click Deploy

## Configuration

### Build Settings (auto-detected)
- **Framework**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: `.next`
- **Install Command**: `npm install`

### Environment Variables
None required! The app connects directly to user-provided Ollama URLs.

## Post-Deployment

1. Visit your deployment URL
2. Enter your Tailscale Funnel URL
3. Start chatting!

## Custom Domain

1. In Vercel Dashboard, go to your project
2. Settings > Domains
3. Add your custom domain
4. Follow DNS configuration steps

## Troubleshooting

### Build Errors
- Ensure Node.js 18+ is used (Vercel default)
- Check `package.json` dependencies are valid
- Review build logs in Vercel dashboard

### Runtime Errors
- Check browser console for CORS errors
- Verify Ollama URL is accessible from browser
- Test connection manually: `curl https://your-url/api/tags`
