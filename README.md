<div align="center">

#  Zerodha Clone

### A full-stack trading platform inspired by Zerodha Kite.

Built on the **MERN stack** with a strong focus on secure API routing, robust state management, and a clean, responsive trading UI.

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![Node.js](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg?style=for-the-badge)

[Demo](#) · [Report Bug](../../issues) · [Request Feature](../../issues)

</div>

---

##  Preview

<div align="center">

<img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSbVtFSvsjru_oKWthdPxE6UMJezJa3HViLaA&s" alt="Zerodha Clone preview" width="85%" />

</div>

---

##  Repository Structure

This project is a **monorepo** containing both backend services and the frontend application:

```
zerodha-clone/
├── backend/         # Node.js & Express API + MongoDB integration
└── frontend/         # React 19 SPA — main user portal
```

---

##  Architecture & Tech Stack

<div align="center">

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white)
![React Hook Form](https://img.shields.io/badge/React%20Hook%20Form-%23EC5990.svg?style=for-the-badge&logo=reacthookform&logoColor=white)
![Zod](https://img.shields.io/badge/Zod-3E67B1?style=for-the-badge&logo=zod&logoColor=white)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-black?style=for-the-badge&logo=framer&logoColor=blue)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)
![Node.js](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)
![Nodemailer](https://img.shields.io/badge/Nodemailer-22B573?style=for-the-badge&logo=gmail&logoColor=white)

</div>

### Frontend (`/frontend`)
| Concern | Choice |
|---|---|
| Core | React 19, React Router DOM v7 (SPA routing) |
| Forms & Validation | React Hook Form + Zod schemas (strict client-side validation) |
| UI & Animation | Framer Motion (smooth transitions), React Icons, React Avatar |
| Data Fetching | Axios, configured with `withCredentials` for cookie-based auth |

### Backend (`/backend`)
| Concern | Choice |
|---|---|
| Runtime & Framework | Node.js + Express.js |
| Database | MongoDB via Mongoose object modeling |
| Auth | JWT in HTTP-only cookies, `cookie-parser` |
| Transactional Email | **Nodemailer** — signup verification, login OTP, and forgot-password reset links |
| Security | `helmet` (header hardening), `hpp` (parameter-pollution protection) |
| Performance | `compression` (gzip responses) |

---

##  Key Features

*  **Secure Authentication** — JWT-based auth flow using HTTP-only cookies to mitigate XSS risks.
*  **Email-Powered Auth Flows** — Nodemailer handles signup verification, login alerts, and forgot-password reset emails.
*  **Dashboard Ecosystem** — Integrated views for Watchlists, Holdings, and live Positions.
*  **Input Enforcement** — Strict 10kb payload limits on API endpoints to prevent basic DoS vectors.
*  **Environment-Isolated Errors** — Verbose errors in development, generic safe failures in production.

---

##  Authentication & Email Flow

```
Signup  ──▶  Account created  ──▶  Nodemailer sends verification email ──▶  Account activated
Login   ──▶  Credentials checked ──▶  JWT issued in HTTP-only cookie
Forgot Password ──▶  Nodemailer sends reset link ──▶  Token verified ──▶  Password updated
```

> Configure your transactional email provider (Gmail SMTP, SendGrid, Mailtrap, etc.) via the backend `.env` — see setup below.

---

## ⚙️ Local Development Setup

### 1. Backend Setup

```bash
cd backend
npm install
cp .env.example .env
```

Fill in your backend `.env`:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
COOKIE_EXPIRES=7
NODE_ENV=development

# Nodemailer / SMTP config
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password
EMAIL_FROM="Zerodha Clone <no-reply@zerodhaclone.com>"
```

```bash
npm run dev
```

### 2. Frontend Setup

```bash
cd frontend
npm install
cp .env.example .env
```

Fill in your frontend `.env`:

```env
VITE_API_BASE_URL=http://localhost:5000/api
```

```bash
npm run dev
```



---

## Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the project
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---



##  License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

<div align="center">

Made with ❤️ by **[Your Name](https://github.com/your-username)**

 If you like this project, consider giving it a star!

</div>
