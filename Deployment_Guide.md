# 🚀 AgniDrishti Deployment Guide

This guide provides a step-by-step walkthrough for deploying both the **FastAPI Backend** and the **React (Vite) Frontend** of AgniDrishti to production using **Render** and **Vercel**.

---

## 📋 Prerequisites & Accounts

Before beginning, you will need:
1. A **GitHub Repository** containing your code (already configured at `https://github.com/MirajB1/AgniDrishti`).
2. A **MongoDB Atlas** account (free tier works perfectly).
3. An **OpenWeatherMap** API key (for fetching live weather details).
4. A **NASA FIRMS** API map key (for real-time satellite fire hotspots).
5. A **Gmail** account with an **App Password** configured (for SMTP automated emails).
6. Accounts on **Render** (for backend hosting) and **Vercel** (for frontend hosting).

---

## 🗄️ Step 1: Database Setup (MongoDB Atlas)

1. Log in to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas).
2. Create a new project and build a database cluster (Shared/Free tier M0).
3. In the **Network Access** tab, click **Add IP Address** and choose **Allow Access from Anywhere** (`0.0.0.0/0`) since serverless runtimes change IPs dynamically.
4. In the **Database Access** tab, create a database user with read/write privileges and copy the username/password.
5. Click **Connect** -> **Drivers** -> Copy the connection string. It will look like:
   ```
   mongodb+srv://<username>:<password>@cluster0.xxxx.mongodb.net/agnidrishti?retryWrites=true&w=majority
   ```
   *(Be sure to replace `<username>` and `<password>` with your database user credentials).*

---

## ⚙️ Step 2: Backend Deployment (Render)

Render is recommended for hosting the Python FastAPI server as it supports continuous, long-running processes (perfect for background loops and APIs).

1. Log in to [Render Dashboard](https://dashboard.render.com/).
2. Click **New +** -> **Web Service**.
3. Select **Connect a repository** and link your GitHub repository: `MirajB1/AgniDrishti`.
4. Configure the Web Service settings:
   - **Name**: `agnidrishti-backend`
   - **Region**: Select the region closest to Nepal (e.g., Singapore).
   - **Branch**: `main`
   - **Root Directory**: `backend` (⚠️ *Crucial: specifies the subfolder for Render to run in*).
   - **Runtime**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`
5. Scroll down and click **Advanced** -> **Add Environment Variables**:
   
   | Key | Value Description |
   |-----|-------------------|
   | `MONGO_URI` | Your MongoDB Atlas connection string |
   | `SECRET_KEY` | A long, secure random string (used to sign JWT tokens) |
   | `OPENWEATHER_KEY` | Your OpenWeatherMap API key |
   | `FRONTEND_URL` | The URL of your deployed frontend (e.g., `https://agnidrishti.vercel.app`) |
   | `SMTP_SENDER` | Your Gmail address (e.g., `sender@gmail.com`) |
   | `SMTP_PASSWORD` | Your 16-character Gmail App Password |
   | `FIRMS_MAP_KEY` | Your NASA FIRMS API key |
   | `PYTHON_VERSION` | `3.11` (or your preferred Python version) |

6. Click **Deploy Web Service**.
7. Once the deployment finishes, copy the live URL provided by Render (e.g., `https://agnidrishti-backend.onrender.com`).

---

## 💻 Step 3: Frontend Deployment (Vercel)

Vercel is optimized for building and serving Vite-based React static frontends.

1. Log in to [Vercel](https://vercel.com/).
2. Click **Add New** -> **Project**.
3. Select your linked GitHub repository: `MirajB1/AgniDrishti` and click **Import**.
4. Configure the Project settings:
   - **Project Name**: `agnidrishti`
   - **Framework Preset**: `Vite`
   - **Root Directory**: `frontend` (⚠️ *Crucial: specifies the subfolder for Vercel to build*)
5. Under **Build and Development Settings**, verify the defaults:
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
6. Expand **Environment Variables** and add:
   
   | Key | Value |
   |-----|-------|
   | `VITE_API_URL` | Your Render backend URL (e.g., `https://agnidrishti-backend.onrender.com`) |

7. Click **Deploy**.
8. Once the build finishes, Vercel will generate your live production URL (e.g., `https://agnidrishti.vercel.app`).

---

## 🔄 Step 4: Add Frontend URL to Backend Config

To prevent CORS issues, you must update the backend configuration with the final frontend URL:

1. Copy your live frontend URL from Vercel.
2. Go back to your Render Dashboard -> Select `agnidrishti-backend` -> **Environment Variables**.
3. Update the `FRONTEND_URL` environment variable value to match your Vercel URL.
4. Save changes. Render will automatically redeploy the service with CORS access granted to your frontend.

---

## 🧪 Step 5: Verification & Post-Deployment Checklist

Once both services are active:
1. **API Health Check**: Navigate to `<your-backend-url>/health` in your browser. It should return:
   ```json
   { "status": "healthy" }
   ```
2. **Access Web Application**: Load your frontend URL in the browser. Verify the live maps and prediction indicators render.
3. **Database Seeding**: On first load, access the login page and authenticate using the default admin account:
   - **Email**: `admin@gmail.com`
   - **Password**: `example`
   *Change this password immediately in your database user collection for security.*
