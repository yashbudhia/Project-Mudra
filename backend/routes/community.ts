import express from 'express';
import asyncHandler from '../utils/asyncHandler';

const router = express.Router();

router.get(
    '/',
    asyncHandler(async (req, res) => {
        const successStories = [
            {
                author: 'Priya Sharma',
                role: 'Web Developer',
                story: 'After completing the web development course, I secured a remote position as a front-end developer.',
                image: 'https://example.com/image1.jpg',
            },
            {
                author: 'Rahul Verma',
                role: 'Digital Marketing Specialist',
                story: 'The digital marketing program helped me transition to a new career.',
                image: 'https://example.com/image2.jpg',
            },
        ];
        res.json(successStories);
    })
);

router.get(
    '/events',
    asyncHandler(async (req, res) => {
        const upcomingEvents = [
            {
                title: 'Virtual Job Fair',
                date: 'March 15, 2024',
                description: 'Connect with inclusive employers and explore job opportunities.',
                attendees: 150,
            },
            {
                title: 'Accessibility Workshop',
                date: 'March 20, 2024',
                description: 'Learn about the latest accessibility tools and technologies.',
                attendees: 80,
            },
        ];
        res.json(upcomingEvents);
    })
);

export default router;
