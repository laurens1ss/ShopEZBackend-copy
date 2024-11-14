require('dotenv').config();
const express = require('express');
const authRoutes = require('./routes/authRoutes');
const transactionRoutes= require('./routes/transactionRoutes');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Lauren adding code for session management
const session = require('express-session');

app.use(session({
    secret: 'your-secret-key', // Replace with a secure key
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 1 * 60 * 1000 } // Session expires in 1 minutes (FOR TESTING)
}));

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
