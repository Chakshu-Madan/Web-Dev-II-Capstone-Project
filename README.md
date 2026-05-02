# 👗 StyleHub — Fashion E-Commerce Platform

A modern, full-featured fashion e-commerce web application built with React, Redux Toolkit, and Tailwind CSS. StyleHub includes a customer-facing storefront and a fully functional admin dashboard with analytics.

---

## 🌐 Live Demo

🔗 [View Live on Vercel](#) ← _Replace with your Vercel link_

---

## 📸 Screenshots

> Home Page   <img width="1354" height="605" alt="image" src="https://github.com/user-attachments/assets/1741b9e5-6d66-46a1-8de7-24350eba9ca0" />

> | Products Page   <img width="1351" height="607" alt="image" src="https://github.com/user-attachments/assets/0c00fb98-f04d-4ce2-8989-f0d3c3c07317" />

> | Admin Dashboard   <img width="1351" height="602" alt="image" src="https://github.com/user-attachments/assets/8916cd91-f437-4572-a8a6-c0269b08c598" />

---

## ✨ Features

### Customer Side
- 🏠 **Home Page** — Hero section, featured products, category browsing, promo banner
- 🛍️ **Products Page** — Real product data from FakeStoreAPI
- 🔍 **Search, Filter & Sort** — Debounced search, category filter, price/rating sort
- 📄 **Product Detail Page** — Full product info with quantity selector
- 🛒 **Cart** — Add, remove, update quantity, order summary
- 🔐 **Authentication** — Login & Register with form validation
- 🔒 **Protected Routes** — Cart accessible only to logged-in users

### Admin Side
- 📊 **Dashboard** — Stat cards, bar charts, pie chart, product table
- 📦 **Manage Products** — Full CRUD (Create, Read, Update, Delete)
- 🔑 **Role-Based Access** — Admin routes blocked from regular users

---

## 🛠️ Tech Stack

| Technology | Usage |
|---|---|
| React 18 (Vite) | Frontend framework |
| Redux Toolkit | Global state management |
| React Router v6 | Client-side routing |
| Axios | API calls |
| Tailwind CSS | Styling |
| Recharts | Admin dashboard charts |
| FakeStoreAPI | Product data source |
| Vercel | Deployment |

---

## 📁 Project Structure

```
src/
├── assets/          # Static assets
├── components/      # Reusable components
│   ├── Navbar.jsx
│   ├── ProductCard.jsx
│   └── ProtectedRoute.jsx
├── hooks/           # Custom React hooks
├── pages/           # Page components
│   ├── Home.jsx
│   ├── Products.jsx
│   ├── ProductDetail.jsx
│   ├── Cart.jsx
│   ├── Login.jsx
│   ├── Register.jsx
│   └── admin/
│       ├── Dashboard.jsx
│       └── ManageProducts.jsx
├── store/           # Redux store
│   ├── store.js
│   └── slices/
│       ├── authSlice.js
│       ├── cartSlice.js
│       └── productSlice.js
├── utils/           # Helper functions
├── App.jsx          # Routes
└── main.jsx         # Entry point
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- npm

### Installation

```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/stylehub.git

# Navigate into the project
cd stylehub

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🔑 Test Credentials

| Role | Email | Password |
|---|---|---|
| 👤 Customer | john@gmail.com | john123 |
| 🔧 Admin | admin@stylehub.com | admin123 |

---

## 📦 Available Scripts

```bash
npm run dev       # Start development server
npm run build     # Build for production
npm run preview   # Preview production build
```

---

## 🌐 API Reference

This project uses [FakeStoreAPI](https://fakestoreapi.com/) — a free REST API for e-commerce product data.

| Endpoint | Description |
|---|---|
| `GET /products` | Fetch all products |
| `GET /products/:id` | Fetch single product |

---

## 📋 Project Requirements Fulfilled

- ✅ React (Vite) + JavaScript ES6+
- ✅ Redux Toolkit for state management
- ✅ React Router for navigation
- ✅ Axios for API integration
- ✅ Tailwind CSS for styling
- ✅ Authentication & role-based access
- ✅ Search + filter + sort
- ✅ Dashboard with charts
- ✅ Error handling
- ✅ Protected routes
- ✅ Deployed on Vercel

---

## 👨‍💻 Author

**Your Name**
- GitHub: [@Chakshu-Madan][(https://github.com/Chakshu-Madan)]

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
