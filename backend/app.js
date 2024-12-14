// server.js


const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const NodeCache = require('node-cache');
const { GoogleGenerativeAI } = require("@google/generative-ai");

const app = express();

// Middleware
app.use(helmet());
app.use(morgan('combined'));
app.use(express.json());

const allowedOrigins = ['http://localhost:3000', 'http://localhost:5173']; // Add your frontend URLs here

app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = `The CORS policy does not allow access from origin: ${origin}`;
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    credentials: true,
}));

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/mudra';
const JWT_SECRET = process.env.JWT_SECRET || 'default_jwt_secret';
const GEMINI_API_KEY = "AIzaSyDYifQV30CKihbQqkrdTsoDNUe2biUbpR8";

if (!GEMINI_API_KEY) {
    console.error('Error: GEMINI_API_KEY is not set.');
    process.exit(1);
}

mongoose.connect(MONGODB_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => {
        console.error('MongoDB connection error:', err);
        process.exit(1);
    });

const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    points: { type: Number, default: 0 },
    completedCourses: { type: [String], default: [] },
});

const User = mongoose.model('User', UserSchema);

const genAI = new GoogleGenerativeAI(GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const apiLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 30,
    message: { error: 'Too many requests, please try again later.' },
});

const commandCache = new NodeCache({ stdTTL: 300 });

const supportedRoutes = [
    '/community',
    '/rewards',
    '/learning',
    '/jobs',
    '/support',
    '/login',
    '/signup',
    '/',
];

const authMiddleware = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: 'Unauthorized. Token missing.' });

    const token = authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'Unauthorized. Token missing.' });

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;
        next();
    } catch (err) {
        console.error('Token verification error:', err);
        res.status(403).json({ error: 'Invalid or expired token.' });
    }
};

// Auth routes
app.post('/auth/register', async (req, res) => {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
        return res.status(400).json({ error: 'Name, email, and password are required.' });
    }

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

app.post('/auth/login', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: 'Email and password are required.' });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(401).json({ error: 'Invalid email or password.' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ error: 'Invalid email or password.' });

        const token = jwt.sign({ id: user._id }, JWT_SECRET, { expiresIn: '1h' });
        res.json({ token });
    } catch (err) {
        console.error('Login error:', err);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

app.post('/auth/logout', authMiddleware, (req, res) => {
    res.json({ message: 'Logged out successfully!' });
});

// User data routes
app.get('/user/data', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id, 'points completedCourses');
        if (!user) return res.status(404).json({ error: 'User not found.' });
        res.json(user);
    } catch (err) {
        console.error('Fetching user data error:', err);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

app.post('/user/complete-course', authMiddleware, async (req, res) => {
    const { courseTitle } = req.body;
    if (!courseTitle) {
        return res.status(400).json({ error: 'Course title is required.' });
    }

    try {
        const user = await User.findById(req.user.id);
        if (!user) return res.status(404).json({ error: 'User not found.' });

        if (!user.completedCourses.includes(courseTitle)) {
            user.completedCourses.push(courseTitle);
            user.points += 500;
            await user.save();
            res.json({ message: 'Course completed!', points: user.points });
        } else {
            res.status(400).json({ error: 'Course already completed.' });
        }
    } catch (err) {
        console.error('Completing course error:', err);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

// Gemini-based command interpretation
app.post('/api/interpret-command', apiLimiter, async (req, res) => {
    const { transcript, language } = req.body;

    if (!transcript || !language) {
        console.error('Transcript or language missing.');
        return res.status(400).json({ error: 'Transcript and language are required.' });
    }

    const cacheKey = `${language}:${transcript.toLowerCase()}`;
    const cachedRoute = commandCache.get(cacheKey);

    if (cachedRoute) {
        console.log(`Cache hit for key: ${cacheKey}`);
        return res.json({ route: cachedRoute });
    }

    try {
        const prompt = `
You are an assistant that helps navigate a website based on voice commands.

Only provide a JSON object with a "route" key if the command is related to navigation.

If the command is not related to navigation (e.g., requesting content to be read aloud), respond with an empty JSON object.

Ensure that the JSON is properly formatted and contains only the "route" key when applicable.

Supported routes:
${supportedRoutes.map(route => `- ${route}`).join('\n')}

Command: "${transcript}"
Language: "${language}"
`;

        console.log(`Sending prompt to Gemini: ${prompt}`);

        const result = await model.generateContent(prompt);
        let aiResponse = result.response.text().trim();

        // Remove code fences if present
        // This regex removes ```json ... ``` blocks and their content, leaving what's inside the block.
        aiResponse = aiResponse.replace(/```json\s*([\s\S]*?)```/g, '$1').trim();

        // Now parse JSON
        try {
            parsedResponse = JSON.parse(aiResponse);
        } catch (parseError) {
            console.error('Failed to parse Gemini response as JSON:', parseError.message);
            // Attempt regex extraction fallback
            const routeMatch = aiResponse.match(/"route"\s*:\s*"([^"]+)"/);
            if (routeMatch) {
                parsedResponse = { route: routeMatch[1] };
                console.log(`Extracted route using regex: ${parsedResponse.route}`);
            } else {
                return res.status(400).json({ error: 'Command not recognized for navigation.' });
            }
        }

        if (!parsedResponse.route || !supportedRoutes.includes(parsedResponse.route)) {
            console.warn(`Unrecognized or unsupported route received: ${parsedResponse.route}`);
            return res.status(400).json({ error: 'Unrecognized route.' });
        }

        commandCache.set(cacheKey, parsedResponse.route);
        console.log(`Cached route for key: ${cacheKey}`);

        res.json(parsedResponse);
    } catch (error) {
        if (error.response) {
            console.error('Gemini API Error Response:', error.response.data);
            res.status(error.response.status).json({ error: error.response.data.message || 'Gemini API error.' });
        } else if (error.request) {
            console.error('No response from Gemini API:', error.request);
            res.status(502).json({ error: 'No response from Gemini API.' });
        } else {
            console.error('Error:', error.message);
            res.status(500).json({ error: 'Failed to process the command.' });
        }
    }
});

app.listen(PORT, () => {
    console.log(`Backend running on http://localhost:${PORT}`);
});
