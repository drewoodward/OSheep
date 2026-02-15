# Ollama Setup Guide for O'Sheep

This guide helps you configure Ollama to work with the O'Sheep web interface deployed on Vercel.

## Prerequisites

- Ollama installed on your machine ([ollama.ai](https://ollama.ai))
- Tailscale installed and configured ([tailscale.com](https://tailscale.com))
- At least one model pulled (e.g., `ollama pull llama3.2`)

## Step 1: Enable Tailscale Funnel

Tailscale Funnel makes your Ollama instance accessible via a public HTTPS URL.

```bash
tailscale funnel 11434
```

You'll get a URL like: `https://your-machine.your-tailnet.ts.net`

**Verify it works:**
```bash
curl https://your-machine.your-tailnet.ts.net/api/tags
```

## Step 2: Configure Ollama CORS

By default, Ollama blocks requests from web browsers. You need to tell Ollama to allow requests from:
- Your Vercel deployment (e.g., `https://o-sheep.vercel.app`)
- Local development (e.g., `http://localhost:3000`)

### Windows

**Option A: Set environment variable permanently (recommended)**

Run PowerShell **as Administrator**:

```powershell
# Set the environment variable
[System.Environment]::SetEnvironmentVariable('OLLAMA_ORIGINS', 'https://o-sheep.vercel.app,http://localhost:3000', 'Machine')

# Restart Ollama service
Stop-Service Ollama
Start-Service Ollama

# Verify Ollama is running
Get-Service Ollama
```

**Option B: Set for current session only**

If
 running Ollama manually:

```powershell
$env:OLLAMA_ORIGINS = "https://o-sheep.vercel.app,http://localhost:3000"
ollama serve
```

### macOS / Linux

Add to your shell profile (`~/.bashrc`, `~/.zshrc`, etc.):

```bash
export OLLAMA_ORIGINS="https://o-sheep.vercel.app,http://localhost:3000"
```

Then restart Ollama:

```bash
# If running as a service
sudo systemctl restart ollama

# Or manually
ollama serve
```

### Docker

If running Ollama in Docker:

```bash
docker run -d \
  -v ollama:/root/.ollama \
  -p 11434:11434 \
  -e OLLAMA_ORIGINS="https://o-sheep.vercel.app,http://localhost:3000" \
  --name ollama \
  ollama/ollama
```

## Step 3: Test the Setup

1. **Test Tailscale Funnel** - Visit your Tailscale URL in browser:
   ```
   https://your-machine.your-tailnet.ts.net/api/tags
   ```
   You should see JSON with your models.

2. **Test from Vercel** - Go to your deployed app:
   ```
   https://o-sheep.vercel.app
   ```
   Enter your Tailscale URL and click Connect.

## Troubleshooting

### "Failed to fetch" or "Connection failed"

**Check 1: Is Tailscale Funnel running?**
```bash
tailscale status
# Should show "Funnel on" for port 11434
```

**Check 2: Can you reach it from browser?**
Open: `https://your-machine.your-tailnet.ts.net/api/tags`
- If you see JSON: Good! Funnel works.
- If you see an error: Funnel isn't working.

**Check 3: Is OLLAMA_ORIGINS set?**

Windows:
```powershell
[System.Environment]::GetEnvironmentVariable('OLLAMA_ORIGINS', 'Machine')
```

Linux/Mac:
```bash
echo $OLLAMA_ORIGINS
```

**Check 4: Is Ollama actually using it?**

Look at Ollama logs when you try to connect. You should see:
- ✅ `200 GET /api/tags` = Success!
- ❌ CORS error or blocked = OLLAMA_ORIGINS not set correctly

### CORS errors in browser console

This means OLLAMA_ORIGINS isn't configured or Ollama wasn't restarted after setting it.

1. Set OLLAMA_ORIGINS (see Step 2)
2. **Restart Ollama** (very important!)
3. Try again

### "No models found"

```bash
# Pull a model first
ollama pull llama3.2

# Verify it's there
ollama list
```

## Custom Vercel Domain

If you deploy to a custom domain (e.g., `https://ai.mydomain.com`), update OLLAMA_ORIGINS:

```bash
OLLAMA_ORIGINS=https://ai.mydomain.com,https://o-sheep.vercel.app,http://localhost:3000
```

## Security Notes

- **Tailscale Funnel** creates a public HTTPS endpoint. Anyone with the URL can access your Ollama.
- Consider using **Tailscale Serve** instead if you only want tailnet access.
- OLLAMA_ORIGINS restricts which web apps can make requests, but anyone can still curl your API directly.
- For production use, consider adding authentication middleware.

## Alternative: Tailscale Serve (Private Access)

If you want to keep Ollama private to your tailnet:

```bash
# Use serve instead of funnel
tailscale serve https / http://localhost:11434

# Access only works from devices on your tailnet
https://your-machine.your-tailnet.ts.net
```

Then you can only use O'Sheep when connected to your tailnet (via Tailscale VPN).

## Reference

- [Ollama Environment Variables](https://github.com/ollama/ollama/blob/main/docs/faq.md#how-do-i-configure-ollama-server)
- [Tailscale Funnel](https://tailscale.com/kb/1223/tailscale-funnel)
- [Tailscale Serve](https://tailscale.com/kb/1242/tailscale-serve)
