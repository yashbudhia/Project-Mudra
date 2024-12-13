import { ArrowRight, BookOpen, Briefcase, Users, Award } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Home() {
  const features = [
    {
      icon: BookOpen,
      title: 'Skill Development',
      description: 'Access curated courses and educational content tailored to your needs.'
    },
    {
      icon: Briefcase,
      title: 'Job Opportunities',
      description: 'Find inclusive job listings that match your skills and accessibility requirements.'
    },
    {
      icon: Users,
      title: 'Community Support',
      description: 'Connect with a supportive community and share success stories.'
    },
    {
      icon: Award,
      title: 'Rewards System',
      description: 'Earn points through learning and redeem them for valuable benefits.'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative bg-indigo-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-white sm:text-5xl md:text-6xl">
              Empowering Communities
            </h1>
            <p className="mt-3 max-w-md mx-auto text-xl text-indigo-200 sm:text-2xl md:mt-5 md:max-w-3xl">
              Building bridges through technology for an inclusive digital future.
            </p>
            <div className="mt-10 flex justify-center gap-4">
              <Link
                to="/learning"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-white hover:bg-indigo-50"
              >
                Start Learning
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/about"
                className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Our Features
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Comprehensive solutions for accessibility and empowerment
            </p>
          </div>

          <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature) => (
              <div
                key={feature.title}
                className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition-shadow"
              >
                <feature.icon className="h-12 w-12 text-indigo-600" />
                <h3 className="mt-4 text-xl font-medium text-gray-900">{feature.title}</h3>
                <p className="mt-2 text-center text-gray-500">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-indigo-50">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="bg-indigo-700 rounded-lg shadow-xl overflow-hidden">
            <div className="px-6 py-12 sm:px-12 sm:py-16 lg:flex lg:items-center lg:justify-between">
              <div>
                <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                  Ready to get started?
                </h2>
                <p className="mt-3 max-w-3xl text-lg text-indigo-100">
                  Join our community today and take the first step towards digital inclusion.
                </p>
              </div>
              <div className="mt-8 lg:mt-0 lg:flex-shrink-0">
                <Link
                  to="/register"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-indigo-700 bg-white hover:bg-indigo-50"
                >
                  Join Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}