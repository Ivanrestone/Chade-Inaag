# Change Inaag — System Flow Notes

## Overview
- Frontend: React + Vite in frontend/
- Backend: Express API in backend/
- Connection: Frontend calls /api/* which Vite proxies to the backend

## Backend
- Entry: backend/server.js
- Controllers: backend/controllers/menuController.js
- Model: backend/models/menuModel.js
- Data: backend/data/menu.json (JSON persistence)
- Endpoints:
  - GET /api/menu
  - POST /api/menu
  - PATCH /api/menu/:id
  - DELETE /api/menu/:id
- Port behavior:
  - Tries 4000 first; if busy, auto-falls back to 4001… up to 10 attempts

## Frontend
- Admin portal: frontend/src/components/AdminPortal.tsx
  - Loads menu from /api/menu on mount
  - Add new item via a form (name, category, price, description, image, active)
  - Update price and active state using PATCH /api/menu/:id
  - Admin Users page in sidebar: list current admins and add by email
- Landing page: frontend/src/App.tsx
  - Fetches /api/menu and renders first 3 active items in “Our Best Sellers”
  - Clicking “View Full Menu” switches the grid to show all active items
- Dev proxy: frontend/vite.config.ts
  - '/api' → http://localhost:4005 (current backend port)

## Run Instructions
- Backend:
  - cd backend
  - npm install
  - npm start
- Frontend:
  - cd frontend
  - npm install
  - npm run dev
  - Open the URL Vite prints (e.g., http://localhost:5173 or http://localhost:5175)

## Troubleshooting
- EADDRINUSE (port in use) on backend:
  - Another backend may be running; stop it or let fallback use 4001
  - You can set a specific port: set PORT=4002 && npm start (PowerShell)
- Proxy mismatch:
  - If backend changes port, update frontend/vite.config.ts proxy target accordingly and restart Vite
- Stopping dev servers:
  - Use Ctrl+C in the terminal where the server is running

## Demo Admin
- Login: admin@gmail.com / admin123
- Auth is stored in localStorage; intended for demo only

## Next Work Ideas
- Add delete support in AdminPortal
- Render full dynamic menu on landing page
- Server-side validation and rate limiting

## Admin Login (MongoDB + JWT)
- Endpoint: POST /api/auth/login
- Uses MongoDB if MONGODB_URI is set; otherwise falls back to demo login
- On first login with demo credentials, seeds admin in DB if missing
- Returns JSON with token and user; token saved to localStorage as change_inaag_token
- Menu mutations (POST/PATCH/DELETE) require Authorization: Bearer <token>
- Env vars (backend):
  - MONGODB_URI="mongodb+srv://rebatoivan5_db_user:YOUR_PASSWORD@chadeinaagdb.mp35w9y.mongodb.net/?retryWrites=true&w=majority"
  - JWT_SECRET="set-a-strong-secret"

## Admin Users Management
- Endpoints (JWT required):
  - GET /api/admin/users — returns list of admin users (email + id)
  - POST /api/admin/users — body: { email, password? }, creates admin; if password omitted, defaults to "admin123"
- Frontend:
  - Sidebar “Admin Users” with form to add admin email
  - Displays current admins in a table
