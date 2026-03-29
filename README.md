# City Lab 🧪

**City Lab** is a modern, responsive diagnostic center web application built for a healthcare lab in Durgapur. It allows patients to browse a catalog of medical tests, register accounts, and book 30-minute appointment slots online. It also features a secure Admin Dashboard for managing all incoming bookings.

---

## 🌟 Features

### 🧑‍⚕️ For Patients
- **Modern UI/UX**: Premium dark-teal design system with micro-animations.
- **Test Catalog**: Browse 20+ diagnostic tests seamlessly mapped across 6 categories (Blood, Urine, Swab, etc.).
- **Slot Booking Engine**: Pick a date and book from available 30-minute time slots (9:00 AM – 7:00 PM). Prevents double booking.
- **User Dashboard**: View all pending, confirmed, and cancelled appointments. Cancel future appointments with a single click.
- **Secure Authentication**: JWT-based login and registration system.

### 🛡️ For Administrators
- **Admin Dashboard**: View all patient bookings system-wide.
- **Status Management**: Instantly update appointment statuses (Pending → Confirmed → Cancelled).
- **Search & Filters**: Search bookings by patient name, email, or test type.

---

## 🛠️ Technology Stack

- **Frontend**: Vanilla HTML5, CSS3 (Custom Properties & Animations), Vanilla JavaScript (ES6 Modules).
- **Backend API**: Node.js & Express.js.
- **Database**: MySQL (using `mysql2` and compiled prepared statements/promises).
- **Security**: `bcrypt` for password hashing, `jsonwebtoken` for stateless auth middleware.

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v16+)
- MySQL Server (XAMPP, WAMP, or standalone) installed and running locally.

### 1. Database Setup
1. Create a `.env` file inside the `backend/` folder and configure your database credentials:
   ```env
   PORT=5000
   JWT_SECRET=citylab_super_secret
   DB_HOST=localhost
   DB_USER=root
   DB_PASS=
   DB_NAME=citylab
   ```
2. Import the database schema and seed data into your MySQL server using the provided SQL file:
   ```bash
   mysql -u root -p < backend/config/setup.sql
   ```
   *This automatically creates the `citylab` database, sets up all tables, seeds 24 tests, and creates the default Admin user.*

### 2. Backend Setup
Install the necessary backend dependencies and start the Express server.
```bash
npm install
npm start
```
The backend API will run on `http://localhost:5000`.

### 3. Frontend Setup
The frontend uses standard HTML files, but should be served via a local web server to avoid CORS/API path issues. Open a new terminal and run:
```bash
npx serve frontend
```
The website will now be accessible at `http://localhost:3000`.

---

## 🔑 Default Accounts

If you seeded the database using `setup.sql`, the following admin account will be available:
- **Admin Email**: `admin@citylab.com`
- **Admin Password**: `admin123`

---

## 📁 Project Structure

```text
citylab/
├── backend/
│   ├── config/          # Database connection (db.js) & schema (setup.sql)
│   ├── controllers/     # Route logic (booking, auth, tests, admin)
│   ├── middleware/      # JWT & Admin validation guards
│   ├── models/          # MySQL direct queries
│   ├── routes/          # Express route definitions
│   ├── .env             # Environment variables
│   └── server.js        # Main Express entry point
├── frontend/
│   ├── css/             # Global design system (style.css)
│   ├── js/              # API wrapper & frontend helpers (api.js)
│   ├── index.html       # Landing page
│   ├── tests.html       # Catalog search & filtering
│   ├── book.html        # Date picker & slot selection
│   ├── dashboard.html   # Patient dashboard
│   ├── admin.html       # Admin control panel
│   ├── login.html       
│   └── register.html    
├── package.json         # Project dependencies & scripts
└── README.md            # Project documentation
```
