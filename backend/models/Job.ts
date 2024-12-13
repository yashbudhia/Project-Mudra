import express from 'express';
import asyncHandler from '../utils/asyncHandler';

const router = express.Router();

router.get(
    '/',
    asyncHandler(async (req, res) => {
        const jobs = [
            {
                title: 'Digital Content Creator',
                company: 'TechCorp India',
                location: 'Remote',
                type: 'Full-time',
                accessibility: ['Screen Reader Compatible', 'Flexible Hours'],
            },
            {
                title: 'Customer Support Specialist',
                company: 'ServiceHub',
                location: 'Mumbai',
                type: 'Part-time',
                accessibility: ['Voice-Enabled Tools', 'Work from Home'],
            },
            {
                title: 'Data Entry Specialist',
                company: 'DataFirst Solutions',
                location: 'Hybrid',
                type: 'Full-time',
                accessibility: ['Keyboard Navigation', 'Flexible Schedule'],
            },
        ];
        res.json(jobs);
    })
);

export default router;
