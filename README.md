# ISS-Senior
# Infinite Dimensions

Infinite Dimensions is a 3D printing and design platform. This repository contains both the back-end API and the front-end application.

## Project Structure

```
infinite-dimensions/
├── infinite-dimensions-backend/
│   ├── .env
│   ├── migrations/
│   │   └── init.sql
│   ├── package.json
│   ├── Readme.md
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── index.js
│   │   ├── middleware/
│   │   ├── routes/
│   └── uploads/
├── infinite-dimensions-Front-end/
│   ├── .gitignore
│   ├── .next/
│   ├── app/
│   ├── components/
│   ├── components.json
│   ├── hooks/
│   ├── lib/
│   ├── next-env.d.ts
│   ├── next.config.mjs
│   ├── package.json
│   ├── postcss.config.mjs
│   ├── public/
│   ├── src/
│   ├── styles/
│   ├── tailwind.config.js
│   ├── tsconfig.json
│   └── v0-user-next.config.js
├── .gitignore
└── README.md
```

## Back-End

### Features

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

### Installation

1. **Clone the Repository**

   ```bash
   git clone <repository-url>
   ```

2. **Install Dependencies**

   ```bash
   cd infinite-dimensions-backend
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

### Running the Application

#### Development Mode

Run the server with Nodemon for auto-reloading:

```bash
npm run dev
```

#### Production Mode

Start the server with:

```bash
npm run start
```

The API will be available at `http://localhost:3000/`.

### Environment Variables

The application uses the following environment variables (configured in your `.env` file):

- **PORT**: The port number on which the server listens (default: 3000).
- **DB_HOST**: The hostname for your MySQL database.
- **DB_USER**: The MySQL database username.
- **DB_PASS**: The MySQL database password.
- **DB_NAME**: The name of the MySQL database.
- **JWT_SECRET**: Secret key used to sign JWT tokens.

## Front-End

### Installation

1. **Install Dependencies**

   ```bash
   cd infinite-dimensions-Front-end
   npm install
   ```

### Running the Application

#### Development Mode

Run the development server:

```bash
npm run dev
```

#### Production Mode

Build the application:

```bash
npm run build
```

Start the server:

```bash
npm run start
```

### Environment Variables

The front-end application uses environment variables configured in the `.env.local` file.

---

This project is licensed under the MIT License.