import { BookOpen, Video, FileText, Award } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

export default function Learning() {
  const courses = [
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

  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Learn and Grow
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Access our curated courses designed for accessibility and skill development
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-2">
          {courses.map((course) => (
            <Card key={course.title} className="hover:shadow-xl transition-shadow">
              <div className="flex items-start space-x-4">
                <course.icon className="h-8 w-8 text-indigo-600" />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900">{course.title}</h3>
                  <p className="mt-2 text-gray-600">{course.description}</p>
                  <div className="mt-4 flex items-center justify-between">
                    <div className="flex space-x-4 text-sm text-gray-500">
                      <span>{course.level}</span>
                      <span>•</span>
                      <span>{course.duration}</span>
                    </div>
                    <Button variant="outline" showArrow>
                      Start Course
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}