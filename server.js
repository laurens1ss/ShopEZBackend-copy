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
//more session management 
app.use((req, res, next) => {
    if (req.session) {
        const now = Date.now();
        const sessionExpiration = 1 * 60 * 1000; // 30 minutes (1 FOR TESTING)

        if (req.session.lastAccess && now - req.session.lastAccess > sessionExpiration) {
            req.session.destroy(err => {
                if (err) return next(err);
                res.status(401).json({ message: 'Session expired, please log in again.' });
            });
        } else {
            req.session.lastAccess = now; // Update last access time
            next();
        }
    } else {
        next();
    }
});
//more session management (timeout policy)
app.post('/logout', (req, res) => {
    req.session.destroy(err => {
        if (err) return res.status(500).json({ message: 'Error logging out' });
        res.status(200).json({ message: 'Logged out successfully' });
    });
});


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
