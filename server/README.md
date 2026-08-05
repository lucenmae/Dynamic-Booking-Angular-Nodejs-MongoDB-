# Dynamic Booking — Server

Phase 1 scaffold for the Node/Express + MongoDB API.

Quick start

1. Copy `.env.example` to `.env` and set `MONGO_URI`.
2. Install dependencies: `npm install`.
3. Run in dev: `npm run dev` (requires `nodemon`).

API

- `GET /api/health` health check
- `GET /api/bookings` list bookings (limit 50)
- `POST /api/bookings` create booking (basic)

Next steps: add authentication, validation, and booking conflict checks.
