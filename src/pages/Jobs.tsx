import { Briefcase, Building2, MapPin, Clock } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

export default function Jobs() {
  const jobs = [
    {
      title: "Digital Content Creator",
      company: "TechCorp India",
      location: "Remote",
      type: "Full-time",
      accessibility: ["Screen Reader Compatible", "Flexible Hours"]
    },
    {
      title: "Customer Support Specialist",
      company: "ServiceHub",
      location: "Mumbai",
      type: "Part-time",
      accessibility: ["Voice-Enabled Tools", "Work from Home"]
    },
    {
      title: "Data Entry Specialist",
      company: "DataFirst Solutions",
      location: "Hybrid",
      type: "Full-time",
      accessibility: ["Keyboard Navigation", "Flexible Schedule"]
    },
    {
      title: "Virtual Assistant",
      company: "Global Services Inc",
      location: "Remote",
      type: "Contract",
      accessibility: ["Screen Reader", "Voice Commands"]
    }
  ];

  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Inclusive Job Opportunities
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Find jobs that match your skills and accessibility needs
          </p>
        </div>

        <div className="mt-12 space-y-6">
          {jobs.map((job) => (
            <Card key={job.title} className="hover:shadow-xl transition-shadow">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="flex-1">
                  <div className="flex items-center">
                    <Briefcase className="h-6 w-6 text-indigo-600" />
                    <h3 className="ml-2 text-xl font-semibold text-gray-900">{job.title}</h3>
                  </div>
                  <div className="mt-2 flex flex-wrap gap-4 text-sm text-gray-500">
                    <span className="flex items-center">
                      <Building2 className="h-4 w-4 mr-1" />
                      {job.company}
                    </span>
                    <span className="flex items-center">
                      <MapPin className="h-4 w-4 mr-1" />
                      {job.location}
                    </span>
                    <span className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {job.type}
                    </span>
                  </div>
                  <div className="mt-4">
                    <h4 className="text-sm font-medium text-gray-700">Accessibility Features:</h4>
                    <div className="mt-1 flex flex-wrap gap-2">
                      {job.accessibility.map((feature) => (
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
          ))}
        </div>
      </div>
    </div>
  );
}