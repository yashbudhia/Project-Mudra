import { Menu, X, Home, BookOpen, Briefcase, Users, Award, Heart, LogIn, UserPlus } from 'lucide-react';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navigation = [
    { name: 'Home', href: '/', icon: Home },
    { name: 'Learning', href: '/learning', icon: BookOpen },
    { name: 'Jobs', href: '/jobs', icon: Briefcase },
    { name: 'Community', href: '/community', icon: Users },
    { name: 'Rewards', href: '/rewards', icon: Award },
    { name: 'Support', href: '/support', icon: Heart },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="bg-indigo-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <span className="text-white text-xl font-bold">Project Mudra</span>
            </Link>
          </div>
          
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`${
                    isActive(item.href)
                      ? 'bg-indigo-700 text-white'
                      : 'text-white hover:bg-indigo-500'
                  } px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2`}
                >
                  <item.icon className="h-4 w-4" />
                  {item.name}
                </Link>
              ))}
            </div>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/login"
              className="text-white hover:bg-indigo-500 px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2"
            >
              <LogIn className="h-4 w-4" />
              Sign in
            </Link>
            <Link
              to="/signup"
              className="bg-white text-indigo-600 hover:bg-indigo-50 px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2"
            >
              <UserPlus className="h-4 w-4" />
              Sign up
            </Link>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:bg-indigo-500 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`${
                  isActive(item.href)
                    ? 'bg-indigo-700 text-white'
                    : 'text-white hover:bg-indigo-500'
                } block px-3 py-2 rounded-md text-base font-medium flex items-center gap-2`}
                onClick={() => setIsOpen(false)}
              >
                <item.icon className="h-4 w-4" />
                {item.name}
              </Link>
            ))}
            <Link
              to="/login"
              className="text-white hover:bg-indigo-500 block px-3 py-2 rounded-md text-base font-medium flex items-center gap-2"
              onClick={() => setIsOpen(false)}
            >
              <LogIn className="h-4 w-4" />
              Sign in
            </Link>
            <Link
              to="/signup"
              className="bg-white text-indigo-600 hover:bg-indigo-50 block px-3 py-2 rounded-md text-base font-medium flex items-center gap-2"
              onClick={() => setIsOpen(false)}
            >
              <UserPlus className="h-4 w-4" />
              Sign up
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}