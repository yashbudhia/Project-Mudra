import { Users, MessageSquare, Heart, Share2 } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

export default function Community() {
  const successStories = [
    {
      author: "Priya Sharma",
      role: "Web Developer",
      story: "After completing the web development course, I secured a remote position as a front-end developer. The accessibility tools made learning possible despite my visual impairment.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    },
    {
      author: "Rahul Verma",
      role: "Digital Marketing Specialist",
      story: "The digital marketing program helped me transition to a new career. The flexible learning approach accommodated my needs perfectly.",
      image: "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
    }
  ];

  const upcomingEvents = [
    {
      title: "Virtual Job Fair",
      date: "March 15, 2024",
      description: "Connect with inclusive employers and explore job opportunities.",
      attendees: 150
    },
    {
      title: "Accessibility Workshop",
      date: "March 20, 2024",
      description: "Learn about the latest accessibility tools and technologies.",
      attendees: 80
    }
  ];

  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Community Hub
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Connect, share, and grow with our inclusive community
          </p>
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          {/* Success Stories */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Success Stories</h2>
            <div className="space-y-6">
              {successStories.map((story) => (
                <Card key={story.author} className="hover:shadow-xl transition-shadow">
                  <div className="flex space-x-4">
                    <img
                      src={story.image}
                      alt={story.author}
                      className="h-12 w-12 rounded-full"
                    />
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">{story.author}</h3>
                      <p className="text-sm text-indigo-600">{story.role}</p>
                      <p className="mt-2 text-gray-600">{story.story}</p>
                      <div className="mt-4 flex space-x-4">
                        <button className="text-gray-400 hover:text-gray-500">
                          <Heart className="h-5 w-5" />
                        </button>
                        <button className="text-gray-400 hover:text-gray-500">
                          <MessageSquare className="h-5 w-5" />
                        </button>
                        <button className="text-gray-400 hover:text-gray-500">
                          <Share2 className="h-5 w-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>

          {/* Upcoming Events */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Upcoming Events</h2>
            <div className="space-y-6">
              {upcomingEvents.map((event) => (
                <Card key={event.title} className="hover:shadow-xl transition-shadow">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{event.title}</h3>
                    <p className="text-sm text-indigo-600">{event.date}</p>
                    <p className="mt-2 text-gray-600">{event.description}</p>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-500">
                        <Users className="h-5 w-5 mr-2" />
                        {event.attendees} attending
                      </div>
                      <Button variant="outline" showArrow>
                        Join Event
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}