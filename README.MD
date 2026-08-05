# Dynamic Booking

A booking management system with a customer-facing booking flow and a staff/admin dashboard, built as a single Angular application with role-based routing, backed by a Node/Express + MongoDB API.

## Tech Stack

**Frontend:** Angular, TypeScript
**Backend:** Node.js, Express, MongoDB (Mongoose)
**Auth:** JWT-based, role-based access control

## Project Structure

```
dynamic-booking/
├── client/                    # Angular app (client + admin, role-based routing)
│   ├── src/
│   │   ├── app/
│   │   │   ├── core/             # auth guards, interceptors, singleton services
│   │   │   ├── features/
│   │   │   │   ├── booking/       # customer-facing booking flow
│   │   │   │   ├── admin/         # staff dashboard (lazy-loaded, role-guarded)
│   │   │   │   └── auth/          # login, register
│   │   │   ├── shared/            # shared components, pipes, directives
│   │   │   ├── app.routes.ts
│   │   │   └── app.component.ts
│   │   ├── assets/
│   │   └── environments/
│   └── package.json
│
├── server/                      # Node/Express API
│   ├── src/
│   │   ├── routes/
│   │   ├── controllers/
│   │   ├── models/                # Booking, User, etc.
│   │   ├── middleware/            # auth, role guard, error handling
│   │   ├── services/
│   │   └── config/
│   └── package.json
│
├── .gitignore
└── README.md
```

## Development Phases

### Phase 1 — Planning & Setup

- Define booking data model (fields, statuses, time slots/availability rules)
- Define user roles: `customer`, `admin`
- Scaffold `client/` (Angular) and `server/` (Express) as separate folders
- Set up MongoDB connection, base Express server, base Angular app shell
- Set up environment configs (`.env` for server, `environments/` for Angular)

### Phase 2 — Core Booking Flow (Customer-Facing)

- Customer auth: register / login
- View available slots/services
- Create a booking
- View / cancel own bookings
- Basic form validation and confirmation states (success, conflict, error)

### Phase 3 — Admin Dashboard

- Admin auth + role guard (route-level protection in `features/admin`)
- View all bookings (list/table, filters by date/status)
- Approve, reject, reschedule, or cancel bookings
- Manage availability/time slots
- Basic reporting (bookings per day/week, cancellations)

### Phase 4 — Auth & Access Control Hardening

- Route guards for both customer and admin areas
- Role-based UI rendering (hide admin nav/actions from customers)
- JWT refresh/expiry handling
- Server-side authorization checks on every protected endpoint (never trust the client-side guard alone)

### Phase 5 — Polish & Edge Cases

- Handle double-booking / slot conflicts gracefully
- Loading states, empty states, error states across booking and admin views
- Responsive design pass (mobile booking flow especially)
- Email/notification hooks for booking confirmation (optional, if scoped in)

### Phase 6 — Testing

- Unit tests for booking logic (slot conflict detection, status transitions)
- API endpoint tests (auth, booking CRUD, admin actions)
- Manual QA pass on customer flow and admin flow separately

### Phase 7 — Deployment

- Build and deploy `server/` (e.g. Render, Railway, or similar Node host)
- Build and deploy `client/` (e.g. Vercel, Netlify, or static hosting)
- Set production environment variables (DB URI, JWT secret, API base URL)
- Smoke test both customer and admin flows in production

## Getting Started

```bash
# Install dependencies
cd server && npm install
cd ../client && npm install

# Run in development
cd server && npm run dev
cd client && ng serve
```
