const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');


const app = express();

// Define allowed origins
const allowedOrigins = ['http://localhost:3000', 'http://localhost:5173'];

app.use(express.json());

// CORS Configuration
app.use(cors({
    origin: function (origin, callback) {
        // Allow requests with no origin (like mobile apps, curl requests)
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = `The CORS policy for this site does not allow access from the specified Origin: ${origin}`;
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    credentials: true, // Allow cookies to be sent
}));

const JWT_SECRET = 'f0e43f7d026e0ecc3dac2b66f33ab09b77cf703b1d103a15f1a6131518a76ff7';

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/mudra', {

}).then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// User Schema
const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true }, // Hashed password
    points: { type: Number, default: 0 },
    completedCourses: { type: [String], default: [] },
});

const User = mongoose.model('User', UserSchema);

// Register Endpoint
app.post('/auth/register', async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(400).json({ error: 'User already exists.' });

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ name, email, password: hashedPassword });
        res.status(201).json({ message: 'User registered successfully!' });
    } catch (err) {
        console.error('Registration error:', err);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

// Login Endpoint
app.post('/auth/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ error: 'Invalid email or password' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ error: 'Invalid email or password' });

        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

// Middleware to Validate Token
const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: 'Unauthorized' });

    const token = authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Unauthorized' });

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        console.error('Token verification error:', err);
        res.status(403).json({ error: 'Invalid or expired token' });
    }
};

// Fetch User Points and Courses
app.get('/user/data', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id, 'points completedCourses');
        if (!user) return res.status(404).json({ error: 'User not found' });
        res.json(user);
    } catch (err) {
        console.error('Fetching user data error:', err);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

// Update Points and Courses
app.post('/user/complete-course', authMiddleware, async (req, res) => {
    const { courseTitle } = req.body;

    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ error: 'User not found' });

        if (!user.completedCourses.includes(courseTitle)) {
            user.completedCourses.push(courseTitle);
            user.points += 500;
            await user.save();
            res.json({ message: 'Course completed!', points: user.points });
        } else {
            res.status(400).json({ error: 'Course already completed' });
        }
    } catch (err) {
        console.error('Completing course error:', err);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

// Logout Endpoint (Optional)
app.post('/auth/logout', authMiddleware, (req, res) => {
    // Since JWT is stateless, logout can be handled on the client side by deleting the token
    res.json({ message: 'Logged out successfully!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Backend running on http://localhost:${PORT}`));
