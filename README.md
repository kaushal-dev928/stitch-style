# Stitch & Style 👗

> Custom stitched ethnic wear for women — made to your exact measurements.

A full-stack e-commerce platform for a custom clothing startup based in Pune, Maharashtra.

---

## Live Demo

- Frontend: [stitch-style.vercel.app](https://stitch-style.vercel.app)
- Backend API: [stitch-style-api.onrender.com](https://stitch-style-api.onrender.com)

---

## Features

- Custom order placement with measurements
- Email OTP verification
- Razorpay payment integration
- Order tracking — real time status
- WhatsApp notifications
- Admin dashboard — products, orders, reviews
- User reviews with star ratings
- JWT authentication

---

## Tech Stack

**Frontend**
- React.js
- React Query (TanStack)
- Axios
- React Router DOM
- React Hot Toast

**Backend**
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- Bcrypt
- Nodemailer (OTP)
- Razorpay

**Deployment**
- Frontend → Vercel
- Backend → Render
- Database → MongoDB Atlas

---

## Project Structure
---

## Getting Started

### Prerequisites
- Node.js v18+
- MongoDB Atlas account
- Razorpay account
- Gmail account (for OTP)

### Backend Setup
```bash
cd backend
npm install
```

Create `.env` file:

```bash
npm run dev
```

### Frontend Setup
```bash
cd frontend
npm install
npm start
```

---

## API Endpoints

### Auth
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register + send OTP |
| POST | `/api/auth/verify-otp` | Verify OTP |
| POST | `/api/auth/login` | Login |
| POST | `/api/auth/resend-otp` | Resend OTP |

### Orders
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/orders` | Place order |
| GET | `/api/orders` | Get my orders |
| GET | `/api/orders/:id` | Track order |
| PUT | `/api/orders/:id/status` | Update status (admin) |

### Products
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | Get all products |
| POST | `/api/products` | Add product (admin) |
| PUT | `/api/products/:id` | Update product (admin) |
| DELETE | `/api/products/:id` | Delete product (admin) |

### Reviews
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/reviews` | Get approved reviews |
| POST | `/api/reviews` | Submit review |
| PUT | `/api/reviews/:id/approve` | Approve review (admin) |
| DELETE | `/api/reviews/:id` | Delete review (admin) |

---

## Screenshots

> Add screenshots here after deployment

---

## Developer

Made with love by **Kabir** — Pune, Maharashtra

---

## License

MIT License — feel free to use and modify
