// src/contexts/PointsContext.tsx

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';

interface PointsContextType {
    points: number;
    addPoints: (amount: number) => void;
    completeCourse: (courseTitle: string) => void;
    isCourseCompleted: (courseTitle: string) => boolean;
}

const PointsContext = createContext<PointsContextType | undefined>(undefined);

interface PointsProviderProps {
    children: ReactNode;
}

export const PointsProvider: React.FC<PointsProviderProps> = ({ children }) => {
    const [points, setPoints] = useState<number>(0);
    const [completedCourses, setCompletedCourses] = useState<string[]>([]);

    // Load points and completed courses from localStorage on mount
    useEffect(() => {
        const storedPoints = localStorage.getItem('userPoints');
        if (storedPoints) {
            setPoints(Number(storedPoints));
        }

        const storedCompleted = localStorage.getItem('completedCourses');
        if (storedCompleted) {
            setCompletedCourses(JSON.parse(storedCompleted));
        }
    }, []);

    // Save points to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem('userPoints', points.toString());
    }, [points]);

    // Save completed courses to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem('completedCourses', JSON.stringify(completedCourses));
    }, [completedCourses]);

    const addPoints = (amount: number) => {
        setPoints((prevPoints) => prevPoints + amount);
    };

    const completeCourse = (courseTitle: string) => {
        if (!completedCourses.includes(courseTitle)) {
            addPoints(250); // Add 500 points for completing a course
            setCompletedCourses([...completedCourses, courseTitle]);
        }
    };

    const isCourseCompleted = (courseTitle: string) => {
        return completedCourses.includes(courseTitle);
    };

    return (
        <PointsContext.Provider value={{ points, addPoints, completeCourse, isCourseCompleted }}>
            {children}
        </PointsContext.Provider>
    );
};

export const usePoints = (): PointsContextType => {
    const context = useContext(PointsContext);
    if (!context) {
        throw new Error('usePoints must be used within a PointsProvider');
    }
    return context;
};
