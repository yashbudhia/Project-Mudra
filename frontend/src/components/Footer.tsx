import { Mail, Phone, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Project Mudra</h3>
            <p className="text-gray-400">
              Empowering Communities Through Inclusive Digital Platforms
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="/about" className="text-gray-400 hover:text-white">About Us</a>
              </li>
              <li>
                <a href="/accessibility" className="text-gray-400 hover:text-white">Accessibility Tools</a>
              </li>
              <li>
                <a href="/partners" className="text-gray-400 hover:text-white">Our Partners</a>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <div className="space-y-2">
              <p className="flex items-center gap-2 text-gray-400">
                <Mail className="h-5 w-5" />
                contact@projectmudra.com
              </p>
              <p className="flex items-center gap-2 text-gray-400">
                <Phone className="h-5 w-5" />
                +91 123 456 7890
              </p>
              <p className="flex items-center gap-2 text-gray-400">
                <MapPin className="h-5 w-5" />
                Mumbai, India
              </p>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Project Mudra. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}