// src/pages/Confirmation.tsx

import React, { FC, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { usePoints } from './PointsContext';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { courses, Course } from '../data/courses';

interface LocationState {
    courseTitle: string;
}

const Confirmation: FC = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { completeCourse } = usePoints();

    const state = location.state as LocationState | undefined;
    const courseTitle = state?.courseTitle;

    // Find the course based on title
    const course: Course | undefined = courses.find(c => c.title === courseTitle);

    useEffect(() => {
        if (courseTitle && course) {
            completeCourse(courseTitle);
        } else {
            // If no valid course is provided, redirect to Learning page
            navigate('/learning');
        }
    }, [courseTitle, course, completeCourse, navigate]);

    if (!course) {
        return null; // Optionally, render a loading indicator or an error message
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <Card className="max-w-md text-center p-8">
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Course Completed!</h2>
                <p className="text-gray-600 mb-6">
                    Congratulations! You have successfully completed the <strong>{course.title}</strong> course.
                </p>
                <Button variant="primary" onClick={() => navigate('/learning')}>
                    Continue Learning
                </Button>
            </Card>
        </div>
    );
};

export default Confirmation;
