import { MessageCircle, Phone, Mail, Video } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

export default function Support() {
  const supportChannels = [
    {
      title: "Live Chat",
      description: "Get instant help from our support team",
      icon: MessageCircle,
      availability: "24/7"
    },
    {
      title: "Video Call",
      description: "Schedule a video call with our accessibility experts",
      icon: Video,
      availability: "Mon-Fri, 9AM-6PM"
    },
    {
      title: "Phone Support",
      description: "Talk to our support representatives",
      icon: Phone,
      availability: "24/7"
    },
    {
      title: "Email Support",
      description: "Send us your queries and feedback",
      icon: Mail,
      availability: "24-48 hours response"
    }
  ];

  const faqs = [
    {
      question: "How can I access the accessibility tools?",
      answer: "Our accessibility tools are available in the settings menu. You can customize them according to your needs."
    },
    {
      question: "What support is available for course completion?",
      answer: "We provide various support options including screen readers, voice commands, and keyboard navigation tools."
    },
    {
      question: "How do I claim my rewards?",
      answer: "Rewards can be claimed from your profile dashboard once you've earned enough points."
    }
  ];

  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Support Center
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            We're here to help you succeed
          </p>
        </div>

        {/* Support Channels */}
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {supportChannels.map((channel) => (
            <Card key={channel.title} className="hover:shadow-xl transition-shadow">
              <div className="flex flex-col items-center text-center">
                <channel.icon className="h-12 w-12 text-indigo-600" />
                <h3 className="mt-4 text-lg font-semibold text-gray-900">{channel.title}</h3>
                <p className="mt-2 text-gray-600">{channel.description}</p>
                <p className="mt-2 text-sm text-indigo-600">{channel.availability}</p>
                <Button variant="outline" className="mt-4" showArrow>
                  Connect
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {/* FAQs */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            {faqs.map((faq) => (
              <Card key={faq.question}>
                <h3 className="text-lg font-semibold text-gray-900">{faq.question}</h3>
                <p className="mt-2 text-gray-600">{faq.answer}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Contact Form */}
        <Card className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Send us a Message</h2>
          <form className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                Message
              </label>
              <textarea
                id="message"
                rows={4}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <Button variant="primary" type="submit" className="w-full">
              Send Message
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
}