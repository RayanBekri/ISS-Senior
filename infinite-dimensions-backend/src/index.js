require('dotenv').config();
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const morgan = require('morgan');
const { errorHandler } = require('./middleware/errorHandler');

const authRoutes = require('./routes/authRoutes');
const itemRoutes = require('./routes/itemRoutes');
const orderRoutes = require('./routes/orderRoutes');
const customOrderRoutes = require('./routes/customOrderRoutes');
const inventoryRoutes = require('./routes/inventoryRoutes');
const printerRoutes = require('./routes/printersRoutes');
const printingsRoutes = require("./routes/printingsRoutes");
const financeRoutes = require('./routes/financeRoutes');
const consultationRoutes = require('./routes/consultationRoutes');
const chatbotRoutes = require('./routes/chatbotRoutes');
// const notificationRoutes = require('./routes/notificationRoutes'); // Optional

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan('combined'));
app.get('/api/health-check', (req, res) => {
  res.sendStatus(200);
});

app.use('/api/auth', authRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/custom-orders', customOrderRoutes);
app.use('/api/inventory', inventoryRoutes);
app.use('/api/printers', printerRoutes);
app.use("/api/printings", printingsRoutes);
app.use('/api/finance', financeRoutes);
app.use('/api/consultations', consultationRoutes);
app.use('/api/chatbot', chatbotRoutes);
// app.use('/api/notifications', notificationRoutes); // Optional

app.get('/health', (req, res) => {
  res.json({ status: 'OK' });
});

app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  const employeeRoutes = require('./routes/employeeRoutes');
app.use('/api/employees', employeeRoutes);

});
