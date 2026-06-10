# Zerodha Clone

A full-stack trading web application inspired by the Zerodha Kite platform. Built using the MERN stack with a strong focus on secure API routing, state management, and clean user interfaces.

## Repository Structure

This project is organized as a monorepo containing both backend services and frontend applications:

* `/backend` — Node.js & Express API with MongoDB integration.
* `/frontend` — React 19 web application for the main user portal.

---

## Architecture & Tech Stack

### Frontend (`/frontend`)
* **Core:** React 19, React Router DOM v7 (Single Page Application routing)
* **Form Handling & Validation:** React Hook Form coupled with Zod schemas for strict client-side validation.
* **UI & Animations:** Framer Motion (for liquid smooth transitions), React Icons, and React Avatar.
* **Data Fetching:** Axios (configured with credentials for cookie-based auth).

### Backend (`/backend`)
* **Runtime & Framework:** Node.js + Express.js
* **Database:** MongoDB via Mongoose object modeling.
* **Security & Optimization:**
    * `helmet` — HTTP header protection (Clickjacking defense, sniffing protection).
    * `hpp` — HTTP Parameter Pollution protection.
    * `compression` — Gzip compression for faster response payloads.
    * `cookie-parser` — To parse secure, HTTP-only authentication cookies.

---

##  Key Features

* **Secure Authentication:** JWT-based auth flow utilizing HTTP-only cookies to mitigate XSS risks.
* **Dashboard Ecosystem:** Integrated views for user Watchlists, Holdings, and current Positions.
* **Input Enforcement:** Strict 10kb payload limits on API endpoints to prevent basic DoS vectors.
* **Environment Isolated Errors:** Verbose error handling in development, converting to generic safe failures in production.

---

## Local Development Setup

### 1. Backend Setup
Navigate to the backend directory, create a `.env` file, and install dependencies:

```bash
cd backend
npm install