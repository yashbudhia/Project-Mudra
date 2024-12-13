// src/pages/Rewards.tsx

import React, { FC } from 'react';
import { Gift, Star, Trophy, Coins } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { usePoints } from '../context/PointsContext';

interface Reward {
  title: string;
  points: number;
  description: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

interface Benefit {
  title: string;
  cost: string;
  description: string;
  icon: React.FC<React.SVGProps<SVGSVGElement>>;
}

const Rewards: FC = () => {
  const { points } = usePoints(); // Access current points

  const rewards: Reward[] = [
    {
      title: "Course Completion Bonus",
      points: 500,
      description: "Complete any course to earn points",
      icon: Star
    },
    {
      title: "Community Participation",
      points: 100,
      description: "Engage in community discussions",
      icon: Trophy
    },
    {
      title: "Referral Rewards",
      points: 200,
      description: "Invite friends to join the platform",
      icon: Gift
    }
  ];

  const benefits: Benefit[] = [
    {
      title: "Training Certificates",
      cost: "0 points",
      description: "Complete Course to Avail",
      icon: Coins
    },
    {
      title: "Premium Courses",
      cost: "0 Points",
      description: "Complete Specified Normal Course to Avail ",
      icon: Star
    },
    {
      title: "Career Counseling",
      cost: "1500 points",
      description: "One-on-one session with experts",
      icon: Trophy
    }
  ];

  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Rewards Program
          </h1>
          <p className="mt-4 text-xl text-gray-600">
            Earn points and unlock valuable benefits
          </p>
        </div>

        <Card className="mt-12 text-center">
          <h2 className="text-2xl font-bold text-gray-900">Your Points</h2>
          <div className="mt-4 text-4xl font-bold text-indigo-600">{points}</div>
          <p className="mt-2 text-gray-600">Keep learning to earn more!</p>
        </Card>

        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Earn Points</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {rewards.map((reward) => (
              <Card key={reward.title} className="hover:shadow-xl transition-shadow">
                <div className="flex flex-col items-center text-center">
                  <reward.icon className="h-12 w-12 text-indigo-600" />
                  <h3 className="mt-4 text-lg font-semibold text-gray-900">{reward.title}</h3>
                  <p className="mt-2 text-gray-600">{reward.description}</p>
                  <div className="mt-4 text-2xl font-bold text-indigo-600">
                    +{reward.points} pts
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Redeem Benefits */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Redeem Benefits</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {benefits.map((benefit) => (
              <Card key={benefit.title} className="hover:shadow-xl transition-shadow">
                <div className="flex flex-col items-center text-center">
                  <benefit.icon className="h-12 w-12 text-indigo-600" />
                  <h3 className="mt-4 text-lg font-semibold text-gray-900">{benefit.title}</h3>
                  <p className="mt-2 text-gray-600">{benefit.description}</p>
                  <div className="mt-4 text-xl font-semibold text-indigo-600">
                    {benefit.cost}
                  </div>
                  <Button variant="outline" className="mt-4" showArrow>
                    Redeem
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Rewards;
