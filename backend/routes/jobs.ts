import express from 'express';
import asyncHandler from '../utils/asyncHandler';
import { authMiddleware } from './auth';

const router = express.Router();

router.get(
    '/',
    authMiddleware,
    asyncHandler(async (req, res) => {
        const rewards = [
            {
                title: 'Course Completion Bonus',
                points: 500,
                description: 'Complete any course to earn points',
            },
            {
                title: 'Community Participation',
                points: 100,
                description: 'Engage in community discussions',
            },
            {
                title: 'Referral Rewards',
                points: 200,
                description: 'Invite friends to join the platform',
            },
        ];
        res.json(rewards);
    })
);

router.get(
    '/redeemable',
    authMiddleware,
    asyncHandler(async (req, res) => {
        const benefits = [
            {
                title: 'Training Certificates',
                cost: '0 points',
                description: 'Complete Course to Avail',
            },
            {
                title: 'Career Counseling',
                cost: '1500 points',
                description: 'One-on-one session with experts',
            },
        ];
        res.json(benefits);
    })
);

export default router;
