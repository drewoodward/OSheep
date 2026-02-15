# O'Sheep 🐑

A beautiful web interface for chatting with your personal Ollama AI models via Tailscale.

## Features

- 🌐 Connect to any Ollama instance via Tailscale Funnel URL
- 💬 Clean, modern chat interface
- 🎨 Dark mode support
- 🔄 Real-time model switching
- 💾 Persistent connection settings (localStorage)
- 📱 Responsive design

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- An Ollama instance running and accessible via Tailscale Funnel

### Setting up Ollama with Tailscale Funnel

1. Install Ollama on your machine: https://ollama.ai
2. Pull a model: `ollama pull llama3.2`
3. Enable Tailscale Funnel:
   ```bash
   tailscale funnel 11434
   ```
4. Your Ollama will be accessible at: `https://your-machine.your-tailnet.ts.net`

### Local Development

1. Install dependencies:
   ```bash
   cd frontend
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

4. Enter your Tailscale Funnel URL and start chatting!

## Deploying to Vercel

### Option 1: Deploy via Vercel CLI

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Deploy:
   ```bash
   cd frontend
   vercel
   ```

### Option 2: Deploy via GitHub

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Set the root directory to `frontend`
6. Click "Deploy"

### Environment Variables

No environment variables needed! Users provide their own Ollama URLs directly in the app.

## Usage

1. **Connect**: Enter your Tailscale Funnel URL (e.g., `https://mochi.tail0212b6.ts.net`)
2. **Test**: Click "Connect" to verify the connection
3. **Chat**: Start chatting with your AI models
4. **Switch Models**: Click the settings icon to change models
5. **Disconnect**: Click the logout icon to change your Ollama URL

## Project Structure

```
frontend/
├── src/
│   ├── app/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   └── components/
│       ├── ConnectionSetup.tsx
│       └── ChatInterface.tsx
├── package.json
├── tsconfig.json
├── tailwind.config.ts
└── next.config.js
```

## Technologies

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **Ollama API** - AI model inference

## API Endpoints Used

- `GET /api/tags` - List available models
- `POST /api/generate` - Generate text responses

## Security Notes

- All communication happens directly between the user's browser and their Ollama instance
- No data is stored on the Vercel server
- Ollama URL is stored only in the browser's localStorage
- Ensure your Tailscale Funnel is properly secured

## Troubleshooting

### Connection Failed
- Verify Ollama is running: `curl http://localhost:11434/api/tags`
- Ensure Tailscale Funnel is active: `tailscale status`
- Check your Funnel URL is correct

### No Models Found
- Pull a model: `ollama pull llama3.2`
- Verify models exist: `ollama list`

### CORS Issues
- Ollama should allow CORS by default for browser requests
- If issues persist, check your Ollama version (update to latest)

## License

MIT

## Contributing

Contributions welcome! Feel free to open issues or submit pull requests.
