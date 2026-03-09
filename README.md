# 🦷 Dental Clinic Website & Dashboard with AI Agent Assistant

> A full-stack dental clinic management system with a patient-facing website, doctor dashboard, appointment booking, and an AI-powered chat assistant.

🌐 **Live Demo:** [https://demodental-care.vercel.app](https://demodental-care.vercel.app)  
📁 **GitHub:** [https://github.com/Mahesh7Kumar/Dental-Clinic-website-and-Dashboard-with-Ai-Agent-Assistant](https://github.com/Mahesh7Kumar/Dental-Clinic-website-and-Dashboard-with-Ai-Agent-Assistant)

---

## 📸 Screenshots

| Patient Website | Appointment Booking | Doctor Dashboard |
|---|---|---|
| Public-facing clinic website with services, blog & booking | Interactive appointment booking modal | Doctor's admin panel with calendar & analytics |

---

## ✨ Features

### 🏥 Patient Website
- Landing page with clinic info, services, and stats
- Doctor listing with specializations
- Appointment booking modal with date & time slot selection
- AI Agent chatbot for appointment assistance
- Mobile-responsive design

### 🩺 Doctor Dashboard
- Personalized greeting with live date & time
- Appointment statistics (Total, Completed, Cancelled, Balance)
- Today's appointments view
- Profile editor (name, specialization, phone, location)
- Available date & time slot management via calendar
- My Calendar view

### 🤖 AI Agent Assistant
- AI-powered chat widget on the patient website
- Supports: Book Appointment, Check Status, Available Times
- Conversational appointment booking flow

 Frontend Chat ---> N8N WorkFlow ----> Chat Response  

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React.js (Vite), Tailwind CSS |
| **Backend** | Node.js, Express.js (ES Modules) |
| **Database** | MySQL with Sequelize ORM |
| **Auth** | JWT (JSON Web Tokens), bcryptjs |
| **AI Agent** | Claude / OpenAI API (chat assistant) |
| **File Upload** | Multer |
| **Security** | Helmet, CORS, Cookie-Parser |
| **Frontend Deploy** | Vercel |
| **Backend Deploy** | Render |

---

## 📁 Project Structure

```
root/
├── client/                  # React frontend (Vite)
│   ├── src/
│   │   ├── assets/          # Images and static files
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/
│   │   │   ├── User/        # Patient-facing pages
│   │   │   └── Admin/       # Doctor dashboard pages
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env                 # Frontend environment variables
│   └── package.json
│
├── server/                  # Node.js + Express backend
│   ├── models/              # Sequelize models
│   ├── routes/              # API routes
│   ├── controllers/         # Route handlers
│   ├── middleware/          # Auth & error middleware
│   ├── server.js            # Entry point
│   ├── .env                 # Backend environment variables
│   └── package.json
│
└── README.md
```

---

## ⚙️ Local Setup

### Prerequisites
- Node.js v18+
- MySQL database
- npm

---

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/Mahesh7Kumar/Dental-Clinic-website-and-Dashboard-with-Ai-Agent-Assistant.git
cd Dental-Clinic-website-and-Dashboard-with-Ai-Agent-Assistant
```

---

### 2️⃣ Backend Setup

```bash
cd server
npm install
```

Create a `.env` file in the `server/` folder:

```env
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_mysql_password
DB_NAME=dental_clinic
JWT_SECRET=your_jwt_secret_key
CLIENT_URL=http://localhost:5173
OPENAI_API_KEY=your_openai_or_claude_api_key
```

Start the backend:

```bash
npm run dev       # Development (nodemon)
npm start         # Production
```

---

### 3️⃣ Frontend Setup

```bash
cd client
npm install
```

Create a `.env` file in the `client/` folder:

```env
VITE_API_URL=http://localhost:5000
```

Start the frontend:

```bash
npm run dev
```

Visit: [http://localhost:5173](http://localhost:5173)

---

### 4️⃣ Database Setup

Create the MySQL database:

```sql
CREATE DATABASE dental_clinic;
```

Sequelize will auto-sync the tables when the server starts (if `sync: true` is configured).

---

## 🚀 Deployment

### Frontend → Vercel

1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com) → New Project → Import your repo
3. Set **Root Directory** to `client`
4. Add Environment Variable:
   ```
   VITE_API_URL = https://your-backend.onrender.com
   ```
5. Click **Deploy**

---

### Backend → Render

1. Go to [render.com](https://render.com) → New Web Service → Connect your repo
2. Set **Root Directory** to `server`
3. Set the following:
   ```
   Build Command:  npm install
   Start Command:  node server.js
   ```
4. Add all Environment Variables from your `.env` file
5. Click **Deploy**

---

### CORS Configuration

In `server.js`, make sure CORS allows your Vercel domain:

```js
app.use(cors({
  origin: "https://Your-Frontend-live-link.vercel.app",
  credentials: true
}));
```

---

## 🔑 Environment Variables Summary

### Backend (`server/.env`)

| Variable | Description |
|---|---|
| `PORT` | Server port (default: 5000) |
| `DB_HOST` | MySQL host |
| `DB_USER` | MySQL username |
| `DB_PASSWORD` | MySQL password |
| `DB_NAME` | Database name |
| `JWT_SECRET` | Secret key for JWT tokens |
| `CLIENT_URL` | Frontend URL (for CORS) |
| `OPENAI_API_KEY` | API key for AI agent |

### Frontend (`client/.env`)

| Variable | Description |
|---|---|
| `VITE_API_URL` | Backend API base URL |

---

## 📡 API Endpoints (Overview)

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/login` | Doctor login |
| `POST` | `/api/auth/register` | Doctor registration |
| `GET` | `/api/doctors` | Get all doctors |
| `GET` | `/api/doctors/:id` | Get doctor by ID |
| `PUT` | `/api/doctors/:id` | Update doctor profile |
| `GET` | `/api/appointments` | Get all appointments |
| `POST` | `/api/appointments` | Book appointment |
| `PUT` | `/api/appointments/:id` | Update appointment |
| `POST` | `/api/agent/chat` | AI agent chat |

---

## 🐛 Common Issues & Fixes

| Issue | Fix |
|---|---|
| `ERR_NETWORK` on frontend | Set `VITE_API_URL` in Vercel env variables |
| `CORS error` | Add Vercel URL to CORS origin in `server.js` |
| `Module not found` (images) | Ensure all assets are committed to Git |
| DB connection error | Check MySQL credentials in `.env` |
| Render app sleeping | Render free tier sleeps after 15 min of inactivity |

---

## 👨‍💻 Author

**Mahesh Kumar**  
GitHub: [@Mahesh7Kumar](https://github.com/Mahesh7Kumar)

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).