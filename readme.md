# 🛍️ Shopperman Frontend

A sleek, AI-powered shopping assistant interface that lets users chat with products, request voice concierge calls, handle post-sales support, and interact via a Chrome extension. Built for a delightful shopping experience.

---

## ✨ Features

### 💬 Product Chat Assistant

- Chat with an AI to get details, compare, and analyze products.
- Context-aware responses based on product summary.

### 📞 AI Voice Concierge

- Initiate AI calls to sellers for price negotiation, custom needs, or shipping queries.
- Real-time phone calls using Omnidimension agents.

### 🛠️ Custom Requests

- Fill out special need forms (bulk, specs, timeline).
- AI will handle communication behind the scenes.

### ✅ Post-Sales Support

- Tracks order status, return windows, warranty registration.
- Request support calls with one click.

### 🧩 Chrome Extension Compatible

- Send the current product page directly to AI backend via extension.
- Overlay concierge access on any page.

---

## 🧰 Tech Stack

- **React + Vite**
- **Tailwind CSS** + **ShadCN UI**
- **Axios** for API requests
- **Clerk** (optional) for authentication
- **Framer Motion** for animations
- **Lucide Icons** for elegant visuals

---

## 🔧 Local Setup

### 1. Clone the repo

```bash
git clone https://github.com/yourusername/shopperman-frontend.git
cd shopperman-frontend

npm install

VITE_API_URL=backend-hosted-url

npm run dev
```
