import express from 'express';
import Course from '../models/Course';

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const courses = await Course.find();
        res.json(courses);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
});

export default router;