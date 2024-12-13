import { Heart, MessageSquare, Share2 } from 'lucide-react';
import Card from '../ui/Card';

interface SuccessStoryProps {
  author: string;
  role: string;
  story: string;
  image: string;
}

export default function SuccessStory({ author, role, story, image }: SuccessStoryProps) {
  return (
    <Card className="hover:shadow-xl transition-shadow">
      <div className="flex space-x-4">
        <img
          src={image}
          alt={author}
          className="h-12 w-12 rounded-full"
        />
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900">{author}</h3>
          <p className="text-sm text-indigo-600">{role}</p>
          <p className="mt-2 text-gray-600">{story}</p>
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
  );
}