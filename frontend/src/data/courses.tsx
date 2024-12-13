// src/data/courses.ts

import { BookOpen, Video, FileText, Award } from 'lucide-react';
import React from 'react';

export interface Course {
    title: string;
    description: string;
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
    level: string;
    duration: string;
}

export const courses: Course[] = [
    {
        title: "Digital Literacy Basics",
        description: "Learn fundamental computer and internet skills",
        icon: BookOpen,
        level: "Beginner",
        duration: "4 weeks"
    },
    {
        title: "Web Development Fundamentals",
        description: "Introduction to HTML, CSS, and JavaScript",
        icon: FileText,
        level: "Intermediate",
        duration: "8 weeks"
    },
    {
        title: "Mobile App Usage",
        description: "Master essential mobile applications",
        icon: Video,
        level: "Beginner",
        duration: "3 weeks"
    },
    {
        title: "Digital Marketing Skills",
        description: "Learn to market products and services online",
        icon: Award,
        level: "Intermediate",
        duration: "6 weeks"
    }
];
