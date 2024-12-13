import { Briefcase, Building2, MapPin, Clock } from 'lucide-react';
import Card from '../ui/Card';
import Button from '../ui/Button';

interface JobCardProps {
  title: string;
  company: string;
  location: string;
  type: string;
  accessibility: string[];
}

export default function JobCard({ title, company, location, type, accessibility }: JobCardProps) {
  return (
    <Card className="hover:shadow-xl transition-shadow">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div className="flex-1">
          <div className="flex items-center">
            <Briefcase className="h-6 w-6 text-indigo-600" />
            <h3 className="ml-2 text-xl font-semibold text-gray-900">{title}</h3>
          </div>
          <div className="mt-2 flex flex-wrap gap-4 text-sm text-gray-500">
            <span className="flex items-center">
              <Building2 className="h-4 w-4 mr-1" />
              {company}
            </span>
            <span className="flex items-center">
              <MapPin className="h-4 w-4 mr-1" />
              {location}
            </span>
            <span className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              {type}
            </span>
          </div>
          <div className="mt-4">
            <h4 className="text-sm font-medium text-gray-700">Accessibility Features:</h4>
            <div className="mt-1 flex flex-wrap gap-2">
              {accessibility.map((feature) => (
                <span
                  key={feature}
                  className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800"
                >
                  {feature}
                </span>
              ))}
            </div>
          </div>
        </div>
        <div className="mt-4 md:mt-0 md:ml-6">
          <Button variant="primary" showArrow>
            Apply Now
          </Button>
        </div>
      </div>
    </Card>
  );
}