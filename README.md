# Kisaan Mitra

A full-stack agricultural web platform connecting local farmers directly with consumers to buy and sell fresh vegetables without middlemen.

---

## Features

- **User & Farmer Authentication**: Role-based access control (Consumer vs. Farmer) secured with JWT and cookie sessions.
- **Farmer Dashboard**: Add, update, view, and manage listed crops and vegetables with pricing, stock quantities, and descriptions.
- **Consumer Marketplace**: Browse newly arrived and best-selling vegetables, search/filter crops, and view farmer profiles.
- **Cart & Checkout**: Manage cart items and place direct orders.
- **DevOps & CI/CD**: Containerized with Docker, deployable via Kubernetes manifests, and automated with Jenkins pipeline.

---

## Tech Stack

- **Frontend**: React.js, React Router, React Bootstrap, MDBReact, Bootstrap
- **Backend**: Node.js, Express.js, Mongoose, JWT (`jsonwebtoken`, `express-jwt`), Express Validator, Winston Logger
- **Database**: MongoDB
- **DevOps**: Docker, Kubernetes, Jenkins

---

## Project Structure

```text
kissan-mitra/
├── backend/                # Express API server
│   ├── controllers/        # Route controllers (auth, user, farmer, vegetables)
│   ├── helpers/            # Error handlers
│   ├── logger/             # Winston logging configuration
│   ├── models/             # Mongoose schemas (User, Farmer, Vegetables)
│   ├── routes/             # API routes
│   ├── test/               # Mocha/Chai integration tests
│   ├── validator/          # Request validation middleware
│   ├── app.js              # Server entry point
│   ├── Dockerfile          # Backend container image definition
│   └── package.json
├── frontend/               # React client application
│   ├── public/             # Static HTML assets
│   ├── src/
│   │   ├── auth/           # Authentication helpers and Private/Farmer routes
│   │   ├── core/           # Layout, Marketplace, Cart, and Card components
│   │   ├── farmer/         # Farmer vegetable management views
│   │   ├── user/           # Consumer and Farmer dashboards
│   │   └── Routes.js       # React router definitions
│   ├── Dockerfile          # Frontend container image definition
│   └── package.json
├── k8s-manifests/          # Kubernetes deployment and service manifests
├── Jenkinsfile             # CI/CD automation pipeline
└── README.md
```

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v16+ or newer)
- [npm](https://www.npmjs.com/)
- [MongoDB](https://www.mongodb.com/) (local instance or MongoDB Atlas URI)

---

### Backend Setup

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the `backend` directory:
   ```env
   PORT=8000
   JWT_SECRET=your_jwt_secret_key
   ONLINE_DATABASE=mongodb://127.0.0.1:27017/kisaan-portal
   ```
   *(Replace `ONLINE_DATABASE` with your MongoDB Atlas connection string if using a cloud database).*

4. Start the backend server:
   ```bash
   npm start
   ```
   The API will run on `http://localhost:8000`.

---

### Frontend Setup

1. Navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the React development server:
   ```bash
   npm start
   ```
   The application will open on `http://localhost:3000`.

---

## API Endpoints Overview

| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| `POST` | `/api/signup` | Register a new user (Consumer or Farmer) | Public |
| `POST` | `/api/signin` | Log in and receive JWT token | Public |
| `GET` | `/api/signout` | Clear user session / cookie | Authenticated |
| `GET` | `/api/farmers` | List all registered farmers | Public |
| `GET` | `/api/farmer/:farmerId` | Get farmer profile details | Public |
| `GET` | `/api/vegetables` | List vegetables (with sorting & filters) | Public |
| `POST` | `/api/vegetable/create/:userId` | Add a new vegetable | Farmer |
| `DELETE` | `/api/vegetable/:vegetableId/:userId` | Delete a vegetable listing | Farmer |
| `GET` | `/api/user/:userId` | Get customer profile details | Authenticated |

---

## Running Tests

To run the backend test suite:
```bash
cd backend
npm test
```

---

## Docker & Deployment

### Build Docker Images

```bash
# Build Backend Image
docker build -t kissan-mitra-backend ./backend

# Build Frontend Image
docker build -t kissan-mitra-frontend ./frontend
```

### Kubernetes Deployment

Apply manifests located in `k8s-manifests/`:
```bash
kubectl apply -f k8s-manifests/
```

---

## License

This project is licensed under the ISC License.
