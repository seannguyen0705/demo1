import { Star } from 'lucide-react';
import React from 'react';
interface IProps {
  rating: number;
  icon: React.ReactNode;
}
export default function StarRating({ rating, icon }: IProps) {
  const renderStars = () => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const remaining = rating - fullStars;

    for (let i = 0; i < fullStars; i++) {
      stars.push(<React.Fragment key={i}>{icon}</React.Fragment>);
    }

    if (remaining > 0) {
      stars.push(<PartialStar key={5} icon={icon} remaining={remaining} />);
    }

    const emptyStars = 5 - fullStars - (remaining > 0 ? 1 : 0);
    for (let i = 0; i < emptyStars; i++) {
      stars.push(<EmptyStar key={fullStars + i} />);
    }
    return stars;
  };
  return <div className="flex items-center">{renderStars()}</div>;
}

interface PartialStarProps {
  icon: React.ReactNode;
  remaining: number;
}
const PartialStar = ({ icon, remaining }: PartialStarProps) => {
  const percentageFilled = Math.round(remaining * 100);
  return (
    <div className="relative">
      {icon}
      <div
        className="absolute top-0 right-0 h-full opacity-50 bg-light-green dark:bg-gray-900"
        style={{
          width: `${100 - percentageFilled}%`,
          clipPath: 'inset(0 0 0 0)',
        }}
      />
    </div>
  );
};

const EmptyStar = () => {
  return <Star size={16} className="text-yellow-500 fill-yellow-500 opacity-50" />;
};
