# 🧠 Brain-dock — Second Brain App

A full-stack **Second Brain** application to save, organize, and share your knowledge — tweets, links, videos, and documents — all in one place.

**Live Demo:** [brain-dock.vercel.app](https://brain-dock-eosin.vercel.app/) &nbsp;|&nbsp; **Backend API:** [brain-dock-4.onrender.com](https://brain-dock-4.onrender.com)

---

## 🚀 Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 19, TypeScript, Vite, Tailwind CSS v4 |
| **Backend** | Node.js, Express 5, TypeScript |
| **Database** | MongoDB Atlas (Mongoose) |
| **Auth** | JWT (JSON Web Tokens) + bcryptjs |
| **Deployment** | Vercel (Frontend) + Render (Backend) |

---

## ✨ Features

- 🔐 **User Authentication** — Register, Login with JWT-based auth
- 📝 **Save Content** — Add tweets, links, videos, and documents
- 🏷️ **Tags** — Organize content with custom tags
- 🔗 **Share Brain** — Generate shareable links to your second brain
- 📱 **Responsive UI** — Works on all screen sizes

---

## 📁 Project Structure

```
Brain-dock/
├── Frontend/               # React + Vite frontend
│   ├── src/
│   │   ├── components/     # Reusable UI components
│   │   ├── pages/          # Route pages        
│   │   └── main.tsx
│   ├── .env
│   └── package.json
│
├── Backend/                # Express + TypeScript backend
│   ├── src/
│   │   ├── routes/         # API routes (auth, content, brain)
│   │   ├── middleware/      # JWT auth middleware
│   │   ├── models/         # Mongoose models
│   │   ├── types/          # TypeScript interfaces
│   │   └── server.ts
│   ├── .env
│   └── package.json
│
└── README.md
```

---

## ⚙️ Local Setup

### Prerequisites
- Node.js v18+
- MongoDB Atlas account (or local MongoDB)

### 1. Clone the repo

```bash
git clone https://github.com/coder-Yash886/Brain-dock.git
cd Brain-dock
```

### 2. Backend Setup

```bash
cd Backend
npm install
```

Create `.env` in `Backend/`:

```env
PORT=5000
MONGO_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/braindock?retryWrites=true&w=majority
JWT_SECRET=your_super_secret_key_minimum_32_characters
NODE_ENV=development
```

```bash
npm run dev
```

Backend runs on `http://localhost:5000`

### 3. Frontend Setup

```bash
cd Frontend
npm install
```

Create `.env` in `Frontend/`:

```env
VITE_API_URL=http://localhost:5000/api
```

```bash
npm run dev
```

Frontend runs on `http://localhost:5173`

---

## 🌐 API Endpoints

### Auth
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/signup` | Register new user |
| POST | `/api/auth/signin` | Login user |

### Content
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/content` | Get all user content |
| POST | `/api/content` | Add new content |
| DELETE | `/api/content/:id` | Delete content |

### Brain (Share)
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/brain/share` | Generate share link |
| GET | `/api/brain/:hash` | Get shared brain |

---

## 🚢 Deployment

### Backend — Render

| Setting | Value |
|---|---|
| Build Command | `npm install --include=dev && npm run build` |
| Start Command | `node dist/server.js` |
| Environment | `NODE_ENV=production` + all env vars |

### Frontend — Vercel

| Setting | Value |
|---|---|
| Root Directory | `Frontend` |
| Build Command | `npm run build` |
| Output Directory | `dist` |
| Install Command | `npm install --include=dev` |
| Env Variable | `VITE_API_URL=https://brain-dock-4.onrender.com/api` |

---

## 🔐 Environment Variables

### Backend
```env
PORT=5000
MONGO_URL=          # MongoDB Atlas connection string
JWT_SECRET=         # Min 32 character secret key
NODE_ENV=           # development | production
```

### Frontend
```env
VITE_API_URL=       # Backend API base URL
```

---

## 🛠️ Available Scripts

### Backend
```bash
npm run dev      # Development with ts-node
npm run build    # Compile TypeScript → dist/
npm start        # Run compiled JS
```

### Frontend
```bash
npm run dev      # Vite dev server
npm run build    # Production build
npm run preview  # Preview production build
```

---
