
# Infinite Dimensions Back-End

Infinite Dimensions is a 3D printing and design platform. This Node.js back-end API provides a robust, secure, and production-ready solution for managing users, items, orders (both standard and custom), inventory, printers, finance, consultations, and notifications. It is built with Express and MySQL, and leverages JWT-based authentication along with role-based access control to ensure that only authorized users can access protected endpoints.

---

## Features

- **User Authentication & Authorization**
  - Register and login endpoints with JWT-based authentication.
  - Role-based access control for CLIENT, EMPLOYEE, and ADMIN roles.
- **RESTful API Endpoints**
  - CRUD operations for Items.
  - Order management for both standard and custom orders.
  - File upload support for custom 3D model orders.
  - Inventory, printer, finance, consultation, and notification management.
- **Security**
  - Secure HTTP headers via Helmet.
  - Cross-Origin Resource Sharing (CORS) enabled.
  - Input validation using express-validator.
- **Database**
  - MySQL connection using mysql2 with connection pooling.
  - SQL migration script provided for schema initialization.
- **Logging**
  - Request and error logging using Morgan.
- **File Uploads**
  - Multer configured for handling 3D model file uploads.

---

## Project Structure

```
infinite-dimensions-backend/
├── package.json
├── .env.example
├── migrations/
│   └── init.sql
├── uploads/                
└── src/
    ├── index.js
    ├── config/
    │   └── db.js
    ├── controllers/
    │   ├── authController.js
    │   ├── itemController.js
    │   ├── orderController.js
    │   ├── customOrderController.js
    │   ├── inventoryController.js
    │   ├── printerController.js
    │   ├── financeController.js
    │   ├── consultationController.js
    │   └── notificationController.js
    ├── middleware/
    │   ├── auth.js
    │   └── errorHandler.js
    └── routes/
        ├── authRoutes.js
        ├── itemRoutes.js
        ├── orderRoutes.js
        ├── customOrderRoutes.js
        ├── inventoryRoutes.js
        ├── printerRoutes.js
        ├── financeRoutes.js
        ├── consultationRoutes.js
        └── notificationRoutes.js
```

---

## Installation

1. **Clone the Repository**

   ```bash
   git clone 
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Configure Environment Variables**

   - Copy the `.env.example` file to `.env`:

     ```bash
     cp .env.example .env
     ```

   - Update the following values in `.env` as needed:

     ```env
     PORT=3000
     DB_HOST=localhost
     DB_USER=your_mysql_username
     DB_PASS=your_mysql_password
     DB_NAME=infinite_dimensions
     JWT_SECRET=your_jwt_secret
     ```

4. **Set Up the Database**

   - Create a MySQL database named `infinite_dimensions` (or update the `DB_NAME` in your `.env`).
   - Run the SQL migration script located in `migrations/init.sql` to initialize the schema. For example, using the MySQL CLI:

     ```bash
     mysql -u your_mysql_username -p infinite_dimensions < migrations/init.sql
     ```

5. **Create the Uploads Folder**

   - At the root of the project, create an `uploads` folder. This folder will store uploaded 3D model files.

   ```bash
   mkdir uploads
   ```

---

## Running the Application

### Development Mode

Run the server with Nodemon for auto-reloading:

```bash
npm run dev
```

### Production Mode

Start the server with:

```bash
npm run start
```

The API will be available at `http://localhost:3000/`.

---

## Environment Variables

The application uses the following environment variables (configured in your `.env` file):

- **PORT**: The port number on which the server listens (default: 3000).
- **DB_HOST**: The hostname for your MySQL database.
- **DB_USER**: The MySQL database username.
- **DB_PASS**: The MySQL database password.
- **DB_NAME**: The name of the MySQL database.
- **JWT_SECRET**: Secret key used to sign JWT tokens.

---

## API Endpoints

For full details of each endpoint, please refer to the source code under the `src/routes/` directory. Key endpoints include:

- **Authentication**
  - `POST /api/auth/register` — Register a new user (supports individual or company registration).
  - `POST /api/auth/login` — Authenticate a user and return a JWT token.
- **Items**
  - `GET /api/items` — Retrieve a list of available items (open endpoint).
  - `POST /api/items` — Create a new item (restricted to EMPLOYEE/ADMIN).
  - `PUT /api/items/:id` — Update an existing item (restricted to EMPLOYEE/ADMIN).
  - `DELETE /api/items/:id` — Delete an item (restricted to EMPLOYEE/ADMIN).
- **Orders**
  - `POST /api/orders` — Place an order (standard orders).
  - `PUT /api/orders/:id` — Update order status or assign printers (restricted to EMPLOYEE/ADMIN).
- **Custom Orders**
  - `POST /api/custom-orders` — Submit a custom 3D printing order with a file upload.
- **Inventory**
  - `GET /api/inventory` — Check current inventory (restricted to EMPLOYEE/ADMIN).
  - `PUT /api/inventory` — Update inventory details (restricted to EMPLOYEE/ADMIN).
- **Printers**
  - `GET /api/printers` — Retrieve printer details (restricted to EMPLOYEE/ADMIN).
  - `POST /api/printers` — Add a new printer (restricted to EMPLOYEE/ADMIN).
  - `PUT /api/printers/:id` — Update printer information (restricted to EMPLOYEE/ADMIN).
  - `DELETE /api/printers/:id` — Remove a printer (restricted to EMPLOYEE/ADMIN).
- **Finance**
  - `POST /api/finance` — Record an income or expense transaction (restricted to EMPLOYEE/ADMIN).
- **Consultations**
  - `POST /api/consultations` — Request a consultation timeslot.
  - `PUT /api/consultations/:id` — Update a consultation status (restricted to EMPLOYEE/ADMIN).
- **Notifications** (Optional)
  - `POST /api/notifications` — Send a notification (placeholder).

---

## Production Deployment

- **Security Considerations**
  - Ensure that your `.env` file is not committed to version control.
  - Use environment-specific configurations.
  - Consider deploying behind a reverse proxy (e.g., Nginx) for enhanced security.
  - Use process managers like PM2 or Docker for managing the Node.js application in production.

- **Scaling**
  - Monitor performance and scale your MySQL and Node.js instances as necessary.
  - Utilize logging and monitoring tools to maintain system health.

---
