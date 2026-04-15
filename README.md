# AgniDrishti Nepal 🔥

**AI-Powered Forest Fire Prediction and Alert System for Nepal**

An intelligent web-based early warning system designed to predict forest fire risks, monitor active fire hotspots, and enable community-driven reporting — helping protect Nepal’s forests and communities.

---

## 🚀 Project Overview

AgniDrishti Nepal is a full-stack web application that combines real-time environmental data with advanced machine learning models to provide accurate forest fire risk predictions across Nepal.

### Key Features
- **Real-time Fire Risk Prediction** (Auto + Manual mode)
- **Live Fire Hotspot Monitoring** using NASA FIRMS (MODIS & VIIRS)
- **Vapor Pressure Deficit (VPD)** calculation for better accuracy
- **Community Fire Reporting** system
- **Admin Dashboard** for alert management and report handling
- **Historical Fire Trend Analysis** with interactive charts
- **JWT-based Authentication** for secure admin access

---

## 🧠 Machine Learning Models

The system uses an **ensemble approach**:

- **CatBoost** & **Random Forest** (Primary models)
- **LSTM-RNN** (Recurrent Neural Network) – to capture **temporal patterns** in weather data
- Features: Latitude, Longitude, Temperature, Humidity, Wind Speed, Precipitation, Elevation, VPD

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Interactive Maps
- Chart.js
- Responsive UI

### Backend
- **FastAPI** (Python)
- JWT Authentication
- RESTful APIs

### Database
- **MongoDB Atlas**

### Machine Learning
- CatBoost
- Scikit-learn (Random Forest)
- TensorFlow / Keras (LSTM-RNN)

### External APIs
- OpenWeatherMap
- OpenElevation
- NASA FIRMS (Fire Information for Resource Management System)

---

## 📁 Project Structure
agnidrishti-nepal/
├── frontend/                  # React.js application
├── backend/                   # FastAPI backend
│   ├── app/
│   │   ├── main.py
│   │   ├── models/
│   │   ├── routers/
│   │   ├── ml_models/         # Trained models + LSTM
│   │   └── utils/
│   └── requirements.txt
├── data/                      # Datasets & preprocessing
├── docs/                      # Documentation & proposal
├── README.md
└── .gitignore


---

## 🚀 How to Run Locally

### Prerequisites
- Python 3.9+
- Node.js 18+
- MongoDB Atlas account
- OpenWeatherMap API key

### Backend Setup

cd backend
python -m venv venv
source venv/bin/activate    # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn app.main:app --reload


### frontend Setup
cd frontend
npm install
npm run dev


📊 Key Highlights

RNN Integration: LSTM model added to capture temporal dependencies in weather patterns (as suggested by viva examiner)
Real-time VPD Calculation
Fully Responsive web application
Secure Admin Panel with JWT
Nepal-specific geospatial focus


📄 Documentation

Project Proposal
System Architecture
Use Case Diagram
Fire Prediction Workflow

👥 Team Members

Safal Tamang
Miraj Bhattarai
Erika Bista

Project Supervisor: Rishav Poudyal
Institution: Madan Bhandari Memorial College
Course: Project Work (CSC412)
