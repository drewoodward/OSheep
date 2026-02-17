# O'Sheep 🐑

https://o-sheep.vercel.app

**Your Personal Ollama Chat Interface via Tailscale**

A beautiful, privacy-focused web application that lets you chat with AI models running on your own Ollama instance, accessible anywhere via Tailscale Funnel.

## 🌟 Features

- 🔒 **Privacy First**: Direct browser-to-Ollama connection, no third-party servers
- 🌐 **Remote Access**: Connect to your home/office Ollama via Tailscale Funnel
- 💬 **Modern UI**: Clean, responsive chat interface with dark mode
- 🎨 **Multi-Model**: Switch between available models on the fly
- 💾 **Persistent**: Remembers your connection settings
- 🚀 **Serverless**: Deploy on Vercel for free

## 🏗️ Project Structure

```
O'Sheep/
├── frontend/           # Next.js web application
│   ├── src/
│   │   ├── app/       # Next.js App Router pages
│   │   └── components/ # React components
│   ├── README.md      # Frontend documentation
│   └── DEPLOYMENT.md  # Vercel deployment guide
└── test/              # API testing scripts
    └── api-test.py    # Python test script for Ollama API
```

## 🚀 Quick Start

### Prerequisites

1. **Ollama** installed and running ([ollama.ai](https://ollama.ai))
2. **Tailscale** with Funnel enabled ([tailscale.com](https://tailscale.com))
3. **Node.js 18+** for local development

### Setup Ollama with Tailscale

```bash
# Pull a model
ollama pull llama3.2

# Enable Tailscale Funnel (makes Ollama accessible remotely)
tailscale funnel 11434
```

Your Ollama is now accessible at: `https://your-machine.your-tailnet.ts.net`

### Run Frontend Locally

```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) and enter your Tailscale Funnel URL.

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

See [frontend/DEPLOYMENT.md](frontend/DEPLOYMENT.md) for detailed instructions.

## 🧪 Testing

Test your Ollama instance before deploying:

```bash
cd test
python api-test.py
```

## 🔧 Technology Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **Backend**: None! Direct client-to-Ollama communication
- **Deployment**: Vercel (free tier)
- **Icons**: Lucide React

## 🔐 Security

- All AI interactions happen between your browser and your Ollama instance
- No data passes through third-party servers
- Connection URL stored only in browser localStorage
- Secured by Tailscale's zero-trust network

## 📖 Documentation

- [Frontend README](frontend/README.md) - Detailed usage guide
- [Deployment Guide](frontend/DEPLOYMENT.md) - Vercel deployment steps

## 🤝 Contributing

Contributions welcome! Feel free to open issues or submit pull requests.

## 📝 License

MIT

## 🙏 Acknowledgments

- [Ollama](https://ollama.ai) - Amazing local AI runtime
- [Tailscale](https://tailscale.com) - Secure remote access
- [Next.js](https://nextjs.org) - React framework
- [Vercel](https://vercel.com) - Hosting platform

---

Built with ❤️ for privacy-conscious AI enthusiasts
