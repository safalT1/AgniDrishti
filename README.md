# 🔥 AgniDrishti Nepal

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Python 3.9+](https://img.shields.io/badge/python-3.9+-blue.svg)](https://www.python.org/downloads/)
[![Node.js 14+](https://img.shields.io/badge/node.js-14+-green.svg)](https://nodejs.org/)

**AgniDrishti Nepal** (अग्निदृष्टि नेपाल) is a **full-stack AI-powered wildfire monitoring and prediction platform** built for Nepal. It combines satellite data, real-time weather APIs, and custom-trained machine learning models to detect, predict, and alert about forest fire risks across the country.

> *"AgniDrishti" means "Fire Vision" in Nepali — seeing fires before they spread.*

**Tech Stack:** React + FastAPI + MongoDB + Machine Learning (Random Forest & Naive Bayes)

---

## 📑 Table of Contents

- [Screenshots](#-screenshots)
- [Features](#-features)
- [Technology Stack](#-technology-stack)
- [Installation](#-installation)
- [Admin Login](#-admin-login)
- [API Endpoints](#-api-endpoints)
- [ML Models](#-ml-models)
- [Project Structure](#-project-structure)
- [Roles & Permissions](#-roles--permissions)
- [Deployment](#-deployment)
- [Contributing](#-contributing)
- [License](#-license)

---

## 📸 Screenshots

### Homepage
**Emergency contacts • Fire awareness content • Alert banner**

![Homepage](./screenshots/Homepage.png)

---

### Live Map
**Real-time fire hotspot visualization (NASA FIRMS API) • Interactive map of Nepal • Selectable time window**

![Live Map](./screenshots/live_map.png)

---

### Predict
**Select any location in Nepal • Auto-fetch weather & elevation • Fire risk prediction with confidence score**

![Predict](./screenshots/predict.png)

---

### Contact
**User contact form • FAQs & support information**

![Contact](./screenshots/contact.png)

---

## ✨ Features

### 🏠 Homepage
- Fire awareness content and statistics
- Emergency contact numbers (Police, Fire Brigade, NEOC, Red Cross)
- Active alert banner from admin

### 🗺️ Live Map
- Real-time fire hotspots via NASA FIRMS API
- Selectable time window (current / past 7 days)
- Interactive Nepal map with fire markers

### 🔮 Predict (Fire Risk)
- Click any location on Nepal map to select coordinates
- Auto-fetches weather (OpenWeatherMap) and elevation (Open-Elevation)
- Manual parameter adjustment: `latitude, longitude, temperature, humidity, wind speed, precipitation, elevation, VPD`
- **Random Forest** model predicts fire risk
- Risk level output: **Low / Moderate / High** with probability score

### 📊 Statistics
- Historical fire statistics and trends
- Yearly & monthly fire counts
- Detection confidence breakdown
- Top districts by fire count

### 🚨 Alerts
- Public alerts issued by admins
- Safety tips and emergency contacts

### 📞 Contact
- User contact form with admin reply system
- FAQs and support information

### 🔐 Authentication
- User registration & login (email or username)
- Role-based dashboards (Admin & User)
- JWT-based authentication
- Password reset via OTP email

---

## 👥 Roles & Permissions

### 👑 Admin
- View and respond to user messages and fire reports
- Run full Nepal forest scan using **Naive Bayes** model
- Auto-create alerts for high-risk forests
- Manage alerts (create, update, delete)
- Mark fire reports as resolved

### 👤 Registered User
- Submit wildfire reports with location
- Access prediction, live map, stats, contact, and alerts

### 👀 Visitor
- Access prediction, live map, stats, contact, and alerts
- Cannot submit fire reports

---

## 🤖 ML Prediction System

### Input Parameters
```
latitude, longitude, temperature, humidity,
wind_speed, precipitation, elevation, VPD
```

### Models
| Model | Purpose |
|-------|---------|
| **Random Forest** (custom implementation) | User fire risk prediction |
| **Naive Bayes** | Admin full Nepal forest scan |

### Workflow
1. User selects a location or provides manual inputs
2. Weather data auto-fetched from OpenWeatherMap
3. Elevation data retrieved from Open-Elevation API
4. VPD (Vapour Pressure Deficit) calculated from temperature & humidity
5. Data scaled and normalized
6. Random Forest predicts fire probability
7. Risk level: **Low** (<40%) · **Moderate** (40–75%) · **High** (>75%)

---

## 🛠️ Technology Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 18 (Vite), Tailwind CSS, Leaflet, Axios |
| **Backend** | FastAPI, Uvicorn, PyJWT, Joblib |
| **ML/AI** | Scikit-learn, Pandas, NumPy, Random Forest, Naive Bayes |
| **Database** | MongoDB (Motor async driver) |
| **External APIs** | NASA FIRMS, OpenWeatherMap, Open-Elevation |
| **DevOps** | Vercel (Frontend), Render (Backend) |

---

## 🚀 Installation

### 1. Clone Repository
```bash
git clone https://github.com/dipak-shaaki/AgniDrishti-Nepal.git
cd AgniDrishti-Nepal
```

### 2. Backend Setup

```bash
cd backend
python -m venv venv

# On Windows
venv\Scripts\activate

# On macOS/Linux
source venv/bin/activate

pip install -r requirements.txt
```

Create a `.env` file in the `backend/` directory:
```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/wildfire_db
SECRET_KEY=your_super_secret_jwt_key_here
OPENWEATHER_KEY=your_openweathermap_api_key
SMTP_SENDER=your_gmail@gmail.com
SMTP_PASSWORD=your_gmail_app_password
FRONTEND_URL=http://localhost:5173
```

Start the backend server:
```bash
uvicorn main:app --reload
```
Backend runs on: `http://localhost:8000`

### 3. Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file in the `frontend/` directory:
```env
VITE_API_URL=http://localhost:8000
```

Start the dev server:
```bash
npm run dev
```
Frontend runs on: `http://localhost:5173`

---

## 🔑 Admin Login

The admin account is **automatically created** on first server startup.

| Field | Value |
|-------|-------|
| **Email** | `admin@gmail.com` |
| **Password** | `example` |

> ⚠️ **Change the default password** after your first login via the database or by updating `backend/models/admin.py`.

To log in as admin: go to the login page and enter the credentials above. You will be redirected to the Admin Dashboard.

---

## 🔌 API Endpoints

### Public Endpoints
```http
GET  /                          # API health check
POST /predict-manual            # Predict fire risk (manual input)
GET  /fires                     # Real-time NASA fire hotspots
GET  /fires/yearly              # Yearly fire statistics
GET  /fires/monthly             # Monthly fire statistics
GET  /fires/confidence          # Confidence level breakdown
POST /contact                   # Submit contact form
GET  /admin/public/alerts       # Get active public alerts
```

### Authentication Endpoints
```http
POST /register                  # User registration
POST /login                     # User login (email/username + password)
POST /admin/login               # Admin login (email + password)
POST /forgot-password           # Request password reset OTP
POST /reset-password            # Reset password with OTP
```

### Admin Endpoints (JWT Required)
```http
POST /admin/scan-nepal          # Run full Nepal forest fire scan
GET  /admin/alerts              # Get all alerts
POST /admin/alerts              # Create alert
PUT  /admin/alerts/{id}         # Update alert
DELETE /admin/alerts/{id}       # Delete alert
POST /admin/alerts/cleanup      # Mark expired alerts
POST /admin/reply               # Reply to contact form email
```

---

## 📁 Project Structure

```
AgniDrishti-Nepal/
├── frontend/                   # React.js frontend (Vite)
│   ├── public/                 # Static assets
│   ├── src/
│   │   ├── components/         # Reusable UI components
│   │   ├── pages/              # Page components
│   │   ├── context/            # AuthContext (JWT state)
│   │   ├── config/             # API config & admin API helpers
│   │   ├── utils/              # Utility functions
│   │   └── App.jsx             # Main app + routing
│   ├── index.html
│   └── package.json
│
├── backend/                    # FastAPI backend (Python)
│   ├── main.py                 # App entry point + ML prediction
│   ├── custom_rf.py            # Custom Random Forest implementation
│   ├── requirements.txt
│   ├── auth/                   # JWT auth & dependencies
│   ├── models/                 # Pydantic + MongoDB models
│   ├── routes/                 # API route handlers
│   │   ├── auth_routes.py      # Register, login, OTP, password reset
│   │   ├── admin_routes.py     # Admin alerts, scan, email
│   │   ├── fire_routes.py      # NASA FIRMS fire data
│   │   ├── fire_report_routes.py
│   │   └── contact_routes.py
│   ├── services/               # Business logic
│   ├── utils/                  # Hashing, JWT, enrich helpers
│   ├── database/               # MongoDB (Motor) connection
│   └── model/                  # Trained ML model files (.pkl)
│
├── jupter notebooks/           # Model training notebooks
│   ├── Prototype_model.ipynb
│   ├── Last Model RF.ipynb
│   └── Enrich Features.ipynb
│
├── screenshots/                # App screenshots
└── README.md
```

---

## 🌐 Deployment

### Frontend (Vercel)
```bash
cd frontend
npm run build
# Deploy via Vercel CLI or GitHub integration
```

### Backend (Render)
- Set environment variables in Render dashboard
- Uses `Procfile` for startup command
- `runtime.txt` specifies Python version

---

## 🧪 Testing

```bash
cd backend
pytest tests/
```

---

## 🤝 Contributing

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/your-feature`)
3. **Commit** your changes (`git commit -m 'Add your feature'`)
4. **Push** to the branch (`git push origin feature/your-feature`)
5. **Open** a Pull Request

---

## 📄 License

This project is licensed under the **MIT License**.

---



## 🙏 Acknowledgments

- **NASA FIRMS** for satellite fire detection data
- **OpenWeatherMap** for real-time weather data
- **Open-Elevation** for elevation data
- **MongoDB Atlas** for database hosting
- **Vercel & Render** for deployment infrastructure

---

*Last Updated: April 2026*
