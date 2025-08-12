# 🏡 Real Estate Portal

A **full-stack real estate portal** built with **ASP.NET Core (.NET)** for the backend and **React** for the frontend.

---

## 📂 Project Structure
/backend → ASP.NET Core Web API (Database + API)
/client → React Frontend


---

## 🚀 Getting Started

Follow these steps to run the project locally.

---


Start the database using Docker:

docker compose up -d
### **1️⃣ Backend Setup**
1. Navigate to the backend folder:
   ```bash
   cd backend

   dotnet ef database update
dotnet run
2️⃣ Frontend Setup
1-Navigate to the client folder:
    cd client
2-Install dependencies:

npm install

3-Start the frontend application:
npm run

🔑 Test Login Credentials
Test User

Username: bob@test.com

Email: bob@test.com

Password: (Use the password from your seed data or Identity config)

📌 Notes
Backend default URL: https://localhost:5001

Frontend default URL: http://localhost:3000

Ensure Docker is installed and running before starting the backend.

Run backend first so the frontend can connect to the API.
