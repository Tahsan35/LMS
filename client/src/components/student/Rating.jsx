import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const Rating = ({ initialRating, onRate }) => {
  const [rating, setRating] = useState(initialRating || 0);

  const handleRating = (value) => {
    setRating(value);
    if (onRate) {
      onRate(value);
    }
  };

  useEffect(() => {
    if (initialRating !== undefined) {
      // Check if initialRating is provided
      setRating(initialRating);
    }
  }, [initialRating]);

  return (
    <div className="flex">
      {Array.from({ length: 5 }, (_, index) => {
        const starValue = index + 1;
        return (
          <span
            key={index}
            className={`text-xl sm:text-2xl cursor-pointer transition-colors ${
              starValue <= rating ? "text-yellow-500" : "text-gray-300"
            } hover:text-yellow-400`}
            onClick={() => handleRating(starValue)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                handleRating(starValue);
              }
            }}
            aria-label={`Rate ${starValue} out of 5 stars`}
          >
            &#9733; {/* Star character */}
          </span>
        );
      })}
    </div>
  );
};

Rating.propTypes = {
  initialRating: PropTypes.number,
  onRate: PropTypes.func,
};

export default Rating;
