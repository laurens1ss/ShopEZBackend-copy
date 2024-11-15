require('dotenv').config();
const express = require('express');
const authRoutes = require('./routes/authRoutes');
const transactionRoutes= require('./routes/transactionRoutes');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.json());
app.use(cors());

app.use('/auth', authRoutes);
app.use('/api/transactions',transactionRoutes);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
}); 
