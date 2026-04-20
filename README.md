# 💬 Chatify - Real-time Chat Application

<div align="center">

![Chatty Logo](https://img.shields.io/badge/Chatty-Real--time%20Chat-667eea?style=for-the-badge&logo=chat&logoColor=white)

**A modern, full-stack real-time chat application built with React, Node.js, and MongoDB**

[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-20.x-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18.x-61dafb.svg)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Latest-47A248.svg)](https://www.mongodb.com/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178c6.svg)](https://www.typescriptlang.org/)

[Features](#-features) • [Demo](#-demo) • [Tech Stack](#-tech-stack) • [Installation](#-installation) • [Deployment](#-deployment) • [API Documentation](#-api-documentation)

</div>

---

## 📸 Screenshots

### Light Theme
![Light Theme Chat Interface](https://via.placeholder.com/800x500/ffffff/667eea?text=Light+Theme+Chat)

### Dark Theme
![Dark Theme Chat Interface](https://via.placeholder.com/800x500/0a0a0a/ffffff?text=Dark+Theme+Chat)

### Profile Management
![Profile Picture Upload](https://via.placeholder.com/400x400/667eea/ffffff?text=Profile+Upload)

---

## ✨ Features

### 🔐 Authentication & Security
- ✅ **Email-based Registration** with OTP verification
- ✅ **JWT Authentication** with secure token management
- ✅ **Password Hashing** using bcrypt
- ✅ **Session Management** with HTTP-only cookies
- ✅ **Secure Password Reset** (future feature)

### 💬 Real-time Messaging
- ✅ **WebSocket Integration** for instant message delivery
- ✅ **Direct Messaging** between users
- ✅ **Typing Indicators** (in development)
- ✅ **Read Receipts** (single/double tick)
- ✅ **Message Delivery Status**
- ✅ **Emoji Support** with custom picker
- ✅ **Message Timestamps**

### 👥 User Management
- ✅ **Friend System** (add/remove friends)
- ✅ **Block/Unblock Users**
- ✅ **Online/Offline Status** tracking
- ✅ **User Search** functionality
- ✅ **Profile Pictures** (Base64 upload, max 5MB)
- ✅ **Custom Bio** (200 characters)
- ✅ **Status Messages** (100 characters)

### 🎨 User Interface
- ✅ **Dark/Light Theme** toggle
- ✅ **Responsive Design** (mobile, tablet, desktop)
- ✅ **Modern UI** with Tailwind CSS
- ✅ **Smooth Animations** and transitions
- ✅ **Intuitive Navigation**
- ✅ **Custom Emoji Picker**
- ✅ **Profile Modal** with image upload

### 🔔 Notifications
- ✅ **Browser Notifications** for new messages
- ✅ **Sound Alerts** for incoming messages
- ✅ **Unread Message Count**
- ✅ **Visual Indicators** for online users

### 🛡️ Privacy & Safety
- ✅ **Block Functionality** with confirmation
- ✅ **Blocked Users List** management
- ✅ **Message Privacy** (blocked users can't message)
- ✅ **Profile Visibility Control** (future)

---

## 🎯 Tech Stack

### Frontend
- **Framework:** React 18.x
- **Build Tool:** Vite 5.x
- **Language:** TypeScript 5.x
- **Styling:** Tailwind CSS 4.0
- **State Management:** React Context API
- **HTTP Client:** Axios
- **Icons:** Lucide React
- **Date Formatting:** date-fns
- **WebSocket:** Native WebSocket API

### Backend
- **Runtime:** Node.js 20.x
- **Framework:** Express 5.x
- **Language:** TypeScript 5.x
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT (jsonwebtoken)
- **Password Hashing:** bcryptjs
- **Email:** Nodemailer (Gmail SMTP)
- **WebSocket:** ws library
- **Process Manager:** PM2 (production)

### Infrastructure & Deployment
- **Frontend Hosting:** AWS S3 + CloudFront
- **Backend Hosting:** AWS EC2 (Ubuntu 22.04)
- **Database:** MongoDB Atlas (M0 Free Tier)
- **SSL/TLS:** Let's Encrypt (Certbot)
- **Reverse Proxy:** Nginx
- **CI/CD:** GitHub Actions (future)

---

## 📋 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** 20.x or higher ([Download](https://nodejs.org/))
- **npm** or **yarn** package manager
- **MongoDB** (local or Atlas account)
- **Git** for version control
- **Gmail Account** with App Password for OTP emails

---

## 🚀 Installation

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/chatty.git
cd chatty
```

### 2. Backend Setup

```bash
cd Backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env
```

**Edit `.env` file:**

```env
# Server Configuration
PORT=3000
NODE_ENV=development

# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/chatty
# OR use MongoDB Atlas:
# MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/chatty

# JWT Secret (use a strong random string)
JWT_SECRET=your_super_secure_jwt_secret_change_this_in_production

# Email Configuration (Gmail)
EMAIL_USER=your.email@gmail.com
EMAIL_PASSWORD=your_16_character_app_password
```

**Start the backend:**

```bash
# Development mode (auto-reload)
npm run dev

# Production mode
npm run build
npm start
```

Backend will run on: `http://localhost:3000`

### 3. Frontend Setup

```bash
cd ../Frontend

# Install dependencies
npm install

# Create .env file
cp .env.example .env
```

**Edit `.env` file:**

```env
VITE_API_URL=http://localhost:3000
VITE_WS_URL=ws://localhost:3000
```

**Start the frontend:**

```bash
# Development mode
npm run dev

# Build for production
npm run build
npm run preview
```

Frontend will run on: `http://localhost:5173`

### 4. Access the Application

Open your browser and navigate to:
- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:3000/api/health

---

## 🗂️ Project Structure

```
chatty/
├── Backend/
│   ├── src/
│   │   ├── controllers/          # Request handlers
│   │   │   ├── authController.ts
│   │   │   ├── friendsController.ts
│   │   │   ├── dmController.ts
│   │   │   ├── profileController.ts
│   │   │   ├── blockController.ts
│   │   │   └── wsController.ts
│   │   ├── models/               # MongoDB schemas
│   │   │   ├── User.ts
│   │   │   └── Message.ts
│   │   ├── middleware/           # Custom middleware
│   │   │   └── auth.ts
│   │   ├── utils/                # Utility functions
│   │   │   ├── config.ts
│   │   │   ├── db.ts
│   │   │   ├── email.ts
│   │   │   └── otpService.ts
│   │   ├── types/                # TypeScript types
│   │   │   └── index.ts
│   │   └── server.ts             # Express app entry
│   ├── .env                      # Environment variables
│   ├── package.json
│   └── tsconfig.json
│
├── Frontend/
│   ├── src/
│   │   ├── pages/                # Main pages
│   │   │   ├── Auth.tsx
│   │   │   └── ChatApp.tsx
│   │   ├── components/           # Reusable components
│   │   │   ├── AddFriendModal.tsx
│   │   │   ├── ProfileModal.tsx
│   │   │   ├── SettingsModal.tsx
│   │   │   ├── BlockedUsersModal.tsx
│   │   │   ├── BlockConfirmModal.tsx
│   │   │   ├── OTPInput.tsx
│   │   │   └── EmojiPicker.tsx
│   │   ├── context/              # React Context
│   │   │   ├── AuthContext.tsx
│   │   │   ├── WebSocketContext.tsx
│   │   │   └── ThemeContext.tsx
│   │   ├── hooks/                # Custom hooks
│   │   │   └── useThemeClasses.ts
│   │   ├── api/                  # API calls
│   │   │   └── api.ts
│   │   ├── App.tsx               # Main app component
│   │   ├── main.tsx              # Entry point
│   │   └── index.css             # Global styles
│   ├── .env                      # Environment variables
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
│
├── README.md                     # This file
├── LICENSE                       # MIT License
└── .gitignore                    # Git ignore rules
```

---

## 📡 API Documentation

### Authentication Endpoints

#### Register User
```http
POST /api/register
Content-Type: application/json

{
  "username": "John Doe",
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "OTP sent to john@example.com"
}
```

#### Verify OTP
```http
POST /api/verify-registration
Content-Type: application/json

{
  "identifier": "john@example.com",
  "otp": "123456"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Registration successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

#### Login
```http
POST /api/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Friend Management

#### Get Friends List
```http
GET /api/friends
Authorization: Cookie (token)
```

**Response:**
```json
{
  "success": true,
  "friends": [
    {
      "username": "Alice Smith",
      "identifier": "alice@example.com",
      "isOnline": true,
      "profilePicture": "data:image/png;base64,...",
      "bio": "Hello there!",
      "status": "Available"
    }
  ],
  "onlineCount": 1
}
```

#### Add Friend
```http
POST /api/friends/add
Content-Type: application/json
Authorization: Cookie (token)

{
  "friendEmail": "alice@example.com"
}
```

### Direct Messaging

#### Get Messages
```http
GET /api/dm/messages/:otherUserId
Authorization: Cookie (token)
```

**Response:**
```json
{
  "success": true,
  "messages": [
    {
      "id": "msg_123",
      "from": "john@example.com",
      "to": "alice@example.com",
      "text": "Hello!",
      "timestamp": "2026-03-10T10:30:00Z",
      "isRead": true
    }
  ]
}
```

#### Send Message
```http
POST /api/dm/send
Content-Type: application/json
Authorization: Cookie (token)

{
  "to": "alice@example.com",
  "text": "Hello, how are you?"
}
```

### Profile Management

#### Get Own Profile
```http
GET /api/profile
Authorization: Cookie (token)
```

#### Update Profile
```http
PUT /api/profile
Content-Type: application/json
Authorization: Cookie (token)

{
  "username": "John Doe",
  "bio": "Software developer from NYC",
  "status": "Busy coding",
  "profilePicture": "data:image/png;base64,iVBORw0KGgoAAAANS..."
}
```

### Block Management

#### Block User
```http
POST /api/block
Content-Type: application/json
Authorization: Cookie (token)

{
  "userEmail": "spam@example.com"
}
```

#### Get Blocked Users
```http
GET /api/blocked-users
Authorization: Cookie (token)
```

---

## 🔌 WebSocket Events

### Client → Server

```javascript
// Authenticate
{
  "type": "auth",
  "token": "jwt_token_here"
}

// Send Direct Message
{
  "type": "dm",
  "to": "alice@example.com",
  "text": "Hello!",
  "messageId": "msg_123",
  "timestamp": "2026-03-10T10:30:00Z"
}

// Typing Indicator
{
  "type": "dm-typing",
  "to": "alice@example.com",
  "isTyping": true
}
```

### Server → Client

```javascript
// Authentication Success
{
  "type": "auth-success",
  "payload": {
    "username": "John Doe",
    "identifier": "john@example.com"
  }
}

// New Direct Message
{
  "type": "new-dm",
  "payload": {
    "from": "alice@example.com",
    "fromUsername": "Alice Smith",
    "to": "john@example.com",
    "text": "Hi John!",
    "messageId": "msg_456",
    "timestamp": "2026-03-10T10:31:00Z"
  }
}

// User Status Change
{
  "type": "status-change",
  "userId": "alice@example.com",
  "isOnline": true
}

// Message Delivered
{
  "type": "dm-delivered",
  "payload": {
    "messageId": "msg_123",
    "to": "alice@example.com",
    "delivered": true
  }
}
```

---

## 🌐 Deployment

### Quick Deployment Guide

For detailed deployment instructions, see our [AWS Deployment Guide PDF](./Chatty_AWS_Deployment_Guide.pdf).

#### Prerequisites
- AWS Account (Free tier eligible)
- MongoDB Atlas Account (Free M0 cluster)
- Domain name (optional)

#### Deployment Steps

1. **MongoDB Atlas** (Database)
   - Create M0 free cluster
   - Configure network access (0.0.0.0/0)
   - Get connection string

2. **AWS EC2** (Backend)
   - Launch t2.micro instance (Ubuntu 22.04)
   - Install Node.js 20.x, PM2
   - Upload backend code
   - Configure environment variables
   - Start with PM2

3. **AWS S3 + CloudFront** (Frontend)
   - Create S3 bucket
   - Enable static website hosting
   - Upload built frontend
   - Create CloudFront distribution

4. **Custom Domain** (Optional)
   - Get SSL certificate from ACM
   - Configure CloudFront with domain
   - Setup DNS records

#### Environment Variables for Production

**Backend `.env`:**
```env
PORT=3000
NODE_ENV=production
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/chatty
JWT_SECRET=super_secure_random_string_min_32_chars
EMAIL_USER=your.email@gmail.com
EMAIL_PASSWORD=app_specific_password
```

**Frontend `.env`:**
```env
VITE_API_URL=https://api.yourdomain.com
VITE_WS_URL=wss://api.yourdomain.com
```

#### Deployment Commands

**Backend (on EC2):**
```bash
# Install dependencies
npm install --production

# Build TypeScript
npm run build

# Start with PM2
pm2 start dist/server.js --name chatty-backend
pm2 save
pm2 startup
```

**Frontend (local → S3):**
```bash
# Build for production
npm run build

# Upload to S3
aws s3 sync dist/ s3://your-bucket-name --delete

# Invalidate CloudFront cache
aws cloudfront create-invalidation --distribution-id YOUR_ID --paths "/*"
```

---

## 🧪 Testing

### Running Tests

```bash
# Backend tests
cd Backend
npm test

# Frontend tests
cd Frontend
npm test

# E2E tests
npm run test:e2e
```

### Test User Accounts

For development/testing:
```
Email: test1@example.com
Password: Test123456

Email: test2@example.com
Password: Test123456
```

---

## 🔧 Configuration

### Email Configuration (Gmail)

1. Enable 2-Factor Authentication on Gmail
2. Generate App Password:
   - Google Account → Security → 2-Step Verification
   - App Passwords → Select App: Mail
   - Copy 16-character password
3. Add to `.env`:
   ```env
   EMAIL_USER=your.email@gmail.com
   EMAIL_PASSWORD=your_16_char_app_password
   ```

### MongoDB Configuration

**Local MongoDB:**
```env
MONGODB_URI=mongodb://localhost:27017/chatty
```

**MongoDB Atlas:**
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/chatty?retryWrites=true&w=majority
```

### CORS Configuration

Update `Backend/src/server.ts` for production:
```typescript
app.use(cors({
  origin: 'https://yourdomain.com',
  credentials: true,
}));
```

---

## 🐛 Troubleshooting

### Common Issues

#### Backend won't start
```bash
# Check Node.js version
node --version  # Should be 20.x

# Check MongoDB connection
# Verify MONGODB_URI in .env

# Check logs
pm2 logs chatty-backend
```

#### Frontend can't connect to backend
```bash
# Check API URL in .env
echo $VITE_API_URL

# Check CORS settings
# Verify backend allows frontend origin

# Check network/firewall
# Ensure port 3000 is open
```

#### WebSocket connection fails
```bash
# Check WebSocket URL
echo $VITE_WS_URL

# Verify EC2 security group
# Ensure port 3000 allows WebSocket

# Check Nginx config (if using reverse proxy)
# WebSocket upgrade headers must be set
```

#### OTP emails not received
```bash
# Check Gmail settings
# Verify 2FA and App Password

# Check spam folder

# Verify EMAIL_USER and EMAIL_PASSWORD in .env

# Check backend logs for email errors
```

---

## 🛣️ Roadmap

### Version 1.0 (Current) ✅
- [x] User authentication with OTP
- [x] Real-time messaging
- [x] Friend system
- [x] Block functionality
- [x] Profile pictures
- [x] Dark/Light theme
- [x] Read receipts

### Version 1.1 (Q2 2026)
- [ ] **Group Chats** - Create and manage group conversations
- [ ] **Message Editing** - Edit sent messages
- [ ] **Message Deletion** - Delete messages for everyone
- [ ] **File Sharing** - Send images, documents, videos
- [ ] **Voice Messages** - Record and send audio
- [ ] **Message Search** - Search through chat history
- [ ] **Typing Indicators** - See when others are typing

### Version 1.2 (Q3 2026)
- [ ] **Video Calls** - One-on-one video calling
- [ ] **Voice Calls** - Audio-only calls
- [ ] **Screen Sharing** - Share screen in calls
- [ ] **Message Reactions** - React to messages with emojis
- [ ] **Message Threading** - Reply to specific messages
- [ ] **Pinned Messages** - Pin important messages
- [ ] **Custom Themes** - User-defined color schemes

### Version 2.0 (Q4 2026)
- [ ] **End-to-End Encryption** - Enhanced privacy
- [ ] **Stories** - WhatsApp-style status updates
- [ ] **Channels** - Broadcast messages to subscribers
- [ ] **Bots & Automation** - Create custom bots
- [ ] **Advanced Analytics** - Usage statistics
- [ ] **Multi-device Sync** - Use on multiple devices
- [ ] **Mobile Apps** - React Native iOS/Android apps

### Future Enhancements
- [ ] **AI Assistant** - ChatGPT integration for smart replies
- [ ] **Translation** - Auto-translate messages
- [ ] **Polls & Surveys** - Create polls in chats
- [ ] **Scheduled Messages** - Send messages at specific times
- [ ] **Message Backup** - Cloud backup & restore
- [ ] **Two-Factor Authentication** - Enhanced security
- [ ] **Social Login** - Google, Facebook, GitHub login
- [ ] **Custom Stickers** - Upload and share sticker packs

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

### Getting Started

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Commit with conventional commits**
   ```bash
   git commit -m "feat: add amazing feature"
   ```
5. **Push to your fork**
   ```bash
   git push origin feature/amazing-feature
   ```
6. **Open a Pull Request**

### Commit Convention

We use [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting)
- `refactor:` - Code refactoring
- `test:` - Adding tests
- `chore:` - Maintenance tasks

### Code Style

- **TypeScript** for type safety
- **ESLint** for code quality
- **Prettier** for formatting
- **Comments** for complex logic

### Pull Request Guidelines

- Clear description of changes
- Link related issues
- Add tests for new features
- Update documentation
- Ensure all tests pass

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2026 Chatty

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## 👥 Authors & Contributors

### Main Developer
- **Yash Kumar** - [GitHub](https://github.com/coder-yash886) - [Email](mailto:yashkumar.967565@gmail.com)

### Contributors
We appreciate all contributors who have helped make Chatty better!

<!-- ALL-CONTRIBUTORS-LIST:START -->
<!-- Add your contributors here -->
<!-- ALL-CONTRIBUTORS-LIST:END -->

---

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - UI framework
- [Node.js](https://nodejs.org/) - Runtime environment
- [MongoDB](https://www.mongodb.com/) - Database
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Lucide Icons](https://lucide.dev/) - Beautiful icons
- [Vite](https://vitejs.dev/) - Build tool
- [AWS](https://aws.amazon.com/) - Cloud hosting

---

## 📞 Support & Contact

### Get Help

- 📧 **Email:** yashkumar.967565@gmail.com
- 🐛 **Bug Reports:** [GitHub Issues](https://github.com/yourusername/chatty/issues)
- 💬 **Discussions:** [GitHub Discussions](https://github.com/yourusername/chatty/discussions)
- 📖 **Documentation:** [Wiki](https://github.com/yourusername/chatty/wiki)

### Community

- 💬 **Discord:** [Join our Discord](https://discord.gg/chatty) (coming soon)
- 🐦 **Twitter:** [@ChattyApp](https://twitter.com/chattyapp) (coming soon)
- 📺 **YouTube:** [Chatty Tutorials](https://youtube.com/chatty) (coming soon)

---

## 📊 Project Status

![GitHub last commit](https://img.shields.io/github/last-commit/yourusername/chatty)
![GitHub issues](https://img.shields.io/github/issues/yourusername/chatty)
![GitHub pull requests](https://img.shields.io/github/issues-pr/yourusername/chatty)
![GitHub stars](https://img.shields.io/github/stars/yourusername/chatty)
![GitHub forks](https://img.shields.io/github/forks/yourusername/chatty)

**Current Version:** 1.0.0  
**Status:** Active Development  
**Last Updated:** March 10, 2026

---

## 🌟 Star History

If you find this project useful, please consider giving it a star! ⭐

[![Star History Chart](https://api.star-history.com/svg?repos=yourusername/chatty&type=Date)](https://star-history.com/#yourusername/chatty&Date)

---

## 📈 Stats

```
Total Lines of Code: ~15,000
Frontend Components: 20+
Backend Routes: 30+
API Endpoints: 25+
Database Models: 3
Features Implemented: 25+
```

---

<div align="center">

### Made with ❤️ by [Yash Kumar](https://github.com/coder-yash886)

**⭐ Star this repo if you find it helpful!**

[Report Bug](https://github.com/yourusername/chatty/issues) • 
[Request Feature](https://github.com/yourusername/chatty/issues) • 
[Documentation](https://github.com/yourusername/chatty/wiki)

---

**© 2026 Chatty. All rights reserved.**

</div>
