import { assets } from "../../assets/assets";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

const CourseCard = ({ course }) => {
  //console.log(course);
  const { calculateAverageRating } = useContext(AppContext);
  return (
    <Link
      to={`/course/${course._id}`}
      onClick={() => window.scrollTo(0, 0)}
      className="border border-gray-500/30 rounded-lg pb-6 overflow-hidden"
    >
      <img
        src={course.courseThumbnail}
        alt="course thumbnail"
        className="w-full"
      />
      <div className="p-3 text-left">
        <h3 className="text-base font-semibold">{course.courseTitle}</h3>
        <p className="text-gray-500">
          {course.educator.name || "Instructor: Shakil"}
        </p>
        <div className="flex items-center space-x-2">
          <p>{calculateAverageRating(course)}</p>
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <img
                key={i}
                src={
                  i < Math.floor(calculateAverageRating(course))
                    ? assets.star
                    : assets.star_blank
                }
                alt=""
                className="w-3.5 h-3.5"
              />
            ))}
          </div>
          <p className="text-gray-500">
            {course.courseRatings?.length || 0}{" "}
            {course.courseRatings?.length > 1 ? "Ratings" : "Rating"}
          </p>
        </div>
        <p className="text-base font-semibold text-gray-800">
          ${" "}
          {(
            course.coursePrice -
            (course.discount * course.coursePrice) / 100
          ).toFixed(2)}
        </p>
      </div>
    </Link>
  );
};

export default CourseCard;

CourseCard.propTypes = {
  course: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    courseThumbnail: PropTypes.string.isRequired,
    courseTitle: PropTypes.string.isRequired,
    educator: PropTypes.string.isRequired,
    courseRatings: PropTypes.array,
    coursePrice: PropTypes.number.isRequired,
    discount: PropTypes.number.isRequired,
  }).isRequired,
};
