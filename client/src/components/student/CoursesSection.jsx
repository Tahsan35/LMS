import { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import CourseCard from "./CourseCard";

const CoursesSection = () => {
  const { allCourses } = useContext(AppContext);

  return (
    <div className="py-16 px-8 md:px-40">
      <h2 className="text-3xl font-medium text-gray-800">
        Learn from the best
      </h2>
      <p className="md:text-lg mt-3 text-gray-500 text-base">
        Discover our top-rated courses across various categories.
        <br /> From coding and design to business and creativity, find the
        perfect course for you.
      </p>
      <div className="grid lg:grid-cols-4 md:grid-cols-2 sm:grid-cols-1 px-4 md:px-0 my-10 md:my-16 gap-4">
        {allCourses.slice(0, 4).map((course, index) => (
          <CourseCard key={index} course={course}></CourseCard>
        ))}
      </div>
      <Link
        to={`/course-list`}
        onClick={() => scrollTo(0, 0)}
        className="text-gray-500 border border-gray-500/30 px-10 py-3 rounded hover:text-white hover:bg-blue-950"
      >
        Show all Courses
      </Link>
    </div>
  );
};

export default CoursesSection;
