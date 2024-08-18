const Admin = require('../models/Admin');

// Register Admin
exports.registerAdmin = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const admin = new Admin({ username, email, password });
        await admin.save();
        res.status(201).json({ message: 'Admin registered successfully', admin });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Login Admin
exports.loginAdmin = async (req, res) => {
    try {
        const { username, password } = req.body;
        const admin = await Admin.findOne({ username });
        if (!admin) return res.status(400).json({ error: 'Invalid username or password' });

        const isMatch = await admin.comparePassword(password);
        if (!isMatch) return res.status(400).json({ error: 'Invalid username or password' });

        // Set up a session or token 
        req.session.admin = admin; 
        res.status(200).json({ message: 'Login successful', admin });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Logout Admin
exports.logoutAdmin = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ error: 'Unable to log out' });
        } else {
            res.status(200).json({ message: 'Logged out successfully' });
        }
    });
};

// Admin Dashboard (Protected Route Example)
exports.dashboard = (req, res) => {
    if (!req.session.admin) {
        return res.status(401).json({ error: 'Unauthorized access' });
    }
    res.status(200).json({ message: 'Welcome to the admin dashboard', admin: req.session.admin });
};

