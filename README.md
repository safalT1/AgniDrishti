# 🔥 AgniDrishti Nepal (अग्निदृष्टि नेपाल)

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Python 3.9+](https://img.shields.io/badge/python-3.9+-blue.svg)](https://www.python.org/downloads/)
[![Node.js 14+](https://img.shields.io/badge/node.js-14+-green.svg)](https://nodejs.org/)

**AgniDrishti Nepal** is a full-stack, AI-powered wildfire monitoring and prediction platform built for Nepal. It combines satellite fire hotspot data, real-time weather APIs, elevation data, and custom-trained machine learning models to predict and visualize wildfire risk across Nepal.

> *"AgniDrishti" means "Fire Vision" in Nepali — seeing fires before they spread.*

**Tech Stack:** React + FastAPI + MongoDB + Machine Learning (Random Forest & Naive Bayes)

---

## 📑 Table of Contents

- [Screenshots](#-screenshots)
- [Features](#-features)
- [Roles & Permissions](#-roles--permissions)
- [ML Prediction System](#-ml-prediction-system)
- [Technology Stack](#-technology-stack)
- [Installation & Setup](#-installation--setup)
- [Admin Login](#-admin-login)
- [API Endpoints](#-api-endpoints)
- [Project Structure](#-project-structure)
- [Deployment](#-deployment)
- [Testing](#-testing)
- [Contributing](#-contributing)
- [License](#-license)
- [Authors](#-authors)
- [Support & Questions](#-support--questions)
- [Acknowledgments](#-acknowledgments)

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
- Fire awareness content, statistics, and educational metrics.
- Critical emergency contact numbers (Police, Fire Brigade, NEOC, Red Cross).
- Active wildfire alert banners published by administrators.

### 🗺️ Live Map
- Real-time fire hotspots visualization updated via the NASA FIRMS API.
- Selectable monitoring time window (current / past 7 days).
- Interactive Nepal map with detailed fire markers and popups.

### 🔮 Predict (Fire Risk)
- Click-to-select coordinates directly on the interactive map of Nepal.
- Auto-fetches weather data (OpenWeatherMap) and elevation (Open-Elevation).
- Manual parameters tuner: `latitude`, `longitude`, `temperature`, `humidity`, `wind speed`, `precipitation`, `elevation`, and `VPD`.
- Custom-trained **Random Forest** model predicts fire risk with risk levels (**Low / Moderate / High**) and probability scores.

### 📊 Statistics
- Historical fire stats, monthly/yearly counts, and top districts.
- Detection confidence bands and geographic distribution metrics.

### 🚨 Alerts & Reports
- Public safety warnings issued by administrators.
- Registered users can submit live wildfire reports with geographic pins.

### 🔐 Authentication
- JWT-based user registration, login, and email OTP-based password resets.
- Role-based dashboards for Admins and Registered Users.

---

## 👥 Roles & Permissions

### 👑 Admin
- View and respond to user messages and fire reports.
- Run full Nepal forest fire risk scans using the **Naive Bayes** model.
- Auto-create public alerts for high-risk forests.
- Create, read, update, and delete (CRUD) alert instances.
- Mark submitted wildfire reports as resolved.

### 👤 Registered User
- Submit live wildfire reports with coordinates and details.
- Access prediction tooling, live map, stats, and alert dashboards.

### 👀 Visitor (Unauthenticated)
- Access predictions, live map, stats, alerts, and contact form.
- Cannot submit live wildfire reports.

---

## 🤖 ML Prediction System

### Input Parameters
```
latitude, longitude, temperature, humidity, wind_speed, precipitation, elevation, VPD
```

### Models

| Model | Purpose |
|-------|---------|
| **Random Forest** (custom implementation) | User-facing individual fire risk predictions |
| **Naive Bayes** | Automated full-country forest scans for admins |

### Workflow
1. User selects a location or inputs parameters manually.
2. Weather and elevation data are automatically pulled via APIs.
3. VPD (Vapour Pressure Deficit) is computed from temperature and humidity.
4. Parameters are scaled and normalized using custom scalers.
5. The model outputs fire risk category: **Low** (<40%), **Moderate** (40–75%), or **High** (>75%).

---

## 🛠️ Technology Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 18 (Vite), Tailwind CSS, Leaflet, Axios |
| **Backend** | FastAPI, Uvicorn, PyJWT, Joblib |
| **ML/AI** | Scikit-learn, Pandas, NumPy, Random Forest, Naive Bayes |
| **Database** | MongoDB (Motor asynchronous driver) |
| **APIs** | NASA FIRMS, OpenWeatherMap, Open-Elevation |

---

## 🚀 Installation & Setup

### 1. Clone Repository
```bash
git clone https://github.com/MirajB1/AgniDrishti.git
cd AgniDrishti
```

### 2. Backend Setup
Navigate to the backend directory, initialize a virtual environment, and install package dependencies:
```bash
cd backend
python -m venv venv

# On Windows
venv\Scripts\activate

# On macOS/Linux
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

Create a `.env` file in the `backend/` directory (example values shown — keep secrets out of source control):
```env
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/wildfire_db
SECRET_KEY=your_super_secret_jwt_key_here
OPENWEATHER_KEY=your_openweathermap_api_key
SMTP_SENDER=your_gmail@gmail.com
SMTP_PASSWORD=your_gmail_app_password
FRONTEND_URL=http://localhost:5173
```

Start the backend API server:
```bash
uvicorn main:app --reload
```
The API server will run at: `http://localhost:8000`

### 3. Frontend Setup
Navigate to the frontend directory, install npm packages, and spin up the developer server:
```bash
cd ../frontend
npm install
```

Create a `.env` file in the `frontend/` directory:
```env
VITE_API_URL=http://localhost:8000
```

Start the development build:
```bash
npm run dev
```
The web application will run at: `http://localhost:5173`

---

## 🔑 Admin Login

The administrator account is auto-seeded on first server startup (development only). It is strongly recommended to change or remove this default in production.

| Field | Seed Value |
|-------|-------|
| **Email** | `admin@gmail.com` |
| **Password** | `example` |

> ⚠️ **Security Warning**: Change the default password immediately after the first login. In production, set up an admin account using environment variables or a secure provisioning mechanism; do not rely on seeded credentials.

---

## 🔌 API Endpoints

### Public Endpoints
```http
GET  /                          # API health check
POST /predict-manual            # Predict fire risk (manual inputs)
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
AgniDrishti/
├── frontend/                   # React.js frontend (Vite + Tailwind)
│   ├── public/                 # Static assets & GeoJSON maps
│   ├── src/
│   │   ├── components/         # Reusable charts, maps, navigation components
│   │   ├── pages/              # Page layouts (Home, Live Map, Predict, Dashboard)
│   │   ├── context/            # AuthContext (JWT state management)
│   │   ├── config/             # API settings and URLs
│   │   ├── utils/              # Client side helper utilities
│   │   └── App.jsx             # React routing & core assembly
│   ├── package.json
│   └── vite.config.js
│
├── backend/                    # FastAPI backend
│   ├── main.py                 # Application entry point
│   ├── custom_rf.py            # Random Forest custom model code
│   ├── auth/                   # JWT configurations and dependencies
│   ├── models/                 # Pydantic schemas and models
│   ├── routes/                 # Router entrypoints
│   ├── services/               # Weather, fire stats business logic
│   ├── database/               # Mongo Atlas connection setup
│   ├── model/                  # Serialized .pkl files
│   ├── tests/                  # Backend unit tests
│   └── requirements.txt
│
├── jupyter notebooks/         # Model training Jupyter notebooks
│   ├── Prototype_model.ipynb
│   ├── Last Model RF.ipynb
│   └── Enrich Features.ipynb
│
├── screenshots/                # App UI screenshots
└── README.md                   # This file
```

---

## 🌐 Deployment

### Frontend (Vercel)
```bash
cd frontend
npm run build
```
Deploy the generated `dist/` directory via the Vercel CLI or via GitHub CI/CD integration.

### Backend (Render)
- Add backend environment variables in the Render dashboard.
- Render uses a `Procfile` for startup instructions.
- Set the appropriate Python runtime (e.g., `python-3.9`) in Render's settings or `runtime.txt`.

---

## 🧪 Testing

```bash
cd backend
pytest tests/
```

---

## 🤝 Contributing

1. **Fork** the repository.
2. **Create** a features branch (`git checkout -b feature/your-feature`).
3. **Commit** your modifications (`git commit -m 'Add your feature'`).
4. **Push** to the branch (`git push origin feature/your-feature`).
5. **Open** a Pull Request.

---

## 📄 License

This project is licensed under the **MIT License**.

---

## 👨‍💻 Authors

**Miraj Bhattarai**
- GitHub: [@MirajB1](https://github.com/MirajB1)

**Safal Tamang**
- GitHub: [@SafalT1](https://github.com/SafalT1)

---

## 💬 Support & Questions

For issues, bugs, or feature suggestions:
- Open a GitHub [Issue](https://github.com/MirajB1/AgniDrishti/issues)
- Contact us via the in-app contact form.

---

## 🙏 Acknowledgments

- **NASA FIRMS** for satellite fire detection data.
- **OpenWeatherMap** for real-time weather details.
- **Open-Elevation** for elevation data.
- **MongoDB Atlas** for database hosting.
- **Vercel & Render** for deployment infrastructure.
