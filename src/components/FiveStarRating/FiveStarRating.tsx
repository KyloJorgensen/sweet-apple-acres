import Star from "~/components/Star";


const FiveStarRating: React.FC<{
  rating: number;
  className?: string;
  activeClass?: string;
  inactiveClass?: string;
}> = ({
  rating,
  className = "",
  activeClass = "text-yellow-400",
  inactiveClass = "text-gray-300 dark:text-gray-500",
}) => {
  return (
    <div className={`flex-rox inline-flex items-center ${className}`}>
      <Star
        className={`h-5 w-5 ${rating >= 1 ? activeClass : inactiveClass}`}
        title="First star"
      />
      <Star
        className={`h-5 w-5 ${rating >= 2 ? activeClass : inactiveClass}`}
        title="Second star"
      />
      <Star
        className={`h-5 w-5 ${rating >= 3 ? activeClass : inactiveClass}`}
        title="Third star"
      />
      <Star
        className={`h-5 w-5 ${rating >= 4 ? activeClass : inactiveClass}`}
        title="Fourth star"
      />
      <Star
        className={`h-5 w-5 ${rating >= 5 ? activeClass : inactiveClass}`}
        title="Fifth star"
      />
    </div>
  );
};

export default FiveStarRating;