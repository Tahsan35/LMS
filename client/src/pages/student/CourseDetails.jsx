import { useContext, useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";

const CourseDetails = () => {
  const { id } = useParams();
  const [courseData, setCourseData] = useState(null);
  const [loading, setLoading] = useState(true);

  const { allCourses, calculateChapterTime, calculateAverageRating } =
    useContext(AppContext);
  // console.log(courseData);

  const fetchCourseData = useCallback(() => {
    setLoading(true);
    const findCourse = allCourses.find((course) => course._id === id);
    setCourseData(findCourse);
    setLoading(false);
  }, [allCourses, id]);

  useEffect(() => {
    fetchCourseData();
  }, [fetchCourseData]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!courseData) {
    return <div>Course not found</div>;
  }

  return (
    <div className="flex md:flex-row flex-col-reverse gap-10 relative items-start justify-between md:px-36 px-8 pt-20 md:pt-20 text-left bg-gradient-to-b from-cyan-100/70">
      {/* Left column */}
      <div className="max-w-xl z-10 text-gray-500">
        <h1 className="md:course-details-heading-large course-details-heading-small font-semibold text-gray-600">
          {courseData?.courseTitle}
        </h1>
        <p
          dangerouslySetInnerHTML={{
            __html: courseData.courseDescription.slice(0, 400),
          }}
          className="pt-4 md:text-base text-sm"
        ></p>
        {/* Review and rating */}
        <div className="flex items-center space-x-2 pt-3 pb-1 text-sm">
          <p>{calculateAverageRating(courseData)}</p>
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <img
                key={i}
                src={
                  i < Math.floor(calculateAverageRating(courseData))
                    ? assets.star
                    : assets.star_blank
                }
                alt=""
                className="w-3.5 h-3.5"
              />
            ))}
          </div>
          <p className="text-yellow-600">
            ( {courseData.courseRatings?.length || 0}{" "}
            {courseData.courseRatings?.length > 1 ? "Ratings" : "Rating"})
          </p>
          <p>
            {courseData.enrolledStudents?.length || 0}{" "}
            {courseData.enrolledStudents?.length > 1 ? "Students" : "Student"}
          </p>
        </div>
        <p className="text-sm">
          Course by
          <span className="text-blue-600 underline p-0.5">
            {courseData.instructor || "Tahsan Shakil"}
          </span>
        </p>
        <div className="pt-8 text-gray-800">
          <h1 className="text-xl font-semibold">Course Structure</h1>
          <div className="pt-5">
            {courseData.courseContent.map((chapter, index) => (
              <div
                key={index}
                className="border border-gray-300 mb-2 bg-white rounded"
              >
                <div className="flex items-center justify-between px-4 py-3 cursor-pointer select-none">
                  <div className="flex items-center gap-2">
                    <img src={assets.down_arrow_icon} alt="arrow icon" />
                    <p className="font-medium md:text-base text-sm">
                      {chapter.chapterTitle}
                    </p>
                  </div>
                  <p className="text-sm md:text-base text-gray-500">
                    {chapter.chapterContent.length} lectures -{" "}
                    {calculateChapterTime(chapter)}
                  </p>
                </div>
                <div>
                  <ul>
                    {chapter.chapterContent.map((lecture, lectureIndex) => (
                      <li key={lectureIndex} className="px-4 py-2 text-sm">
                        {lecture.title}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Right column */}
      <div className="shadow-2xl rounded-t md:rounded-none overflow-hidden bg-white min-w-[300px] sm:min-w-[420px]">
        <img src={courseData.courseThumbnail} alt="course thumbnail" />
        <div className="p-4">
          <div className="flex items-center gap-2">
            <img
              src={assets.time_left_clock_icon}
              alt="clock icon"
              className="w-3.5"
            />
            <p className="text-red-500">
              <span className="font-medium">5 days</span> left at this price!
            </p>
          </div>
          <div className="flex gap-3 items-center pt-2">
            <p className="text-gray-800 md:text-4xl text-2xl font-semibold">
              $
              {(
                courseData.coursePrice -
                (courseData.discount * courseData.coursePrice) / 100
              ).toFixed(2)}
            </p>
            <p className="md:text-lg text-gray-500 line-through">
              ${courseData.coursePrice}
            </p>
            <p className="md:text-lg text-gray-500">
              {courseData.discount}% off
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
