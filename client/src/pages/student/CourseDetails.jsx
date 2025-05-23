import { useContext, useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";
import humanizeDuration from "humanize-duration";
import Footer from "../../components/student/Footer";
import Youtube from "react-youtube";

const CourseDetails = () => {
  const { id } = useParams();
  const [courseData, setCourseData] = useState(null);
  const [openSections, setOpenSections] = useState({});
  const [isAlreadyEnrolled, seIsAlreadyEnrolled] = useState(false);
  const [playerData, setPlayerData] = useState(null);

  const [loading, setLoading] = useState(true);

  const {
    allCourses,
    calculateAverageRating,
    calculateChapterTime,
    calculateCourseDuration,
    calculateNumberOfLecture,
  } = useContext(AppContext);
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

  // toggle section
  const toggleSection = (sectionId) => {
    setOpenSections((prevOpenSections) => ({
      ...prevOpenSections,
      [sectionId]: !prevOpenSections[sectionId],
    }));
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!courseData) {
    return <div>Course not found</div>;
  }

  return (
    <>
      <div className="flex md:flex-row flex-col-reverse gap-10 relative items-start justify-between md:px-36 px-8 pt-20 md:pt-30 text-left ">
        <div className="absolute top-0 left-0 w-full h-[70%] -z-1 bg-gradient-to-b from-cyan-100/70"></div>
        {/* Left column */}
        <div className="max-w-xl z-10 text-gray-500">
          <h1 className="md:course-details-heading-large course-details-heading-small font-semibold text-gray-600">
            {courseData?.courseTitle}
          </h1>
          <p
            dangerouslySetInnerHTML={{
              __html: courseData.courseDescription.slice(0, 200),
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
            <h2 className="text-xl font-semibold">Course Structure</h2>
            <div className="pt-5">
              {courseData.courseContent.map((chapter, index) => (
                <div
                  key={index}
                  className="border border-gray-300 mb-2 bg-white rounded"
                >
                  <div
                    className="flex items-center justify-between px-4 py-3 cursor-pointer select-none"
                    onClick={() => toggleSection(index)}
                  >
                    <div className="flex items-center gap-2">
                      <img
                        className={`transform transition-transform ${
                          openSections[index] ? "rotate-180" : "rotate-0"
                        }`}
                        src={assets.down_arrow_icon}
                        alt="arrow icon"
                      />
                      <p className="font-medium md:text-base text-sm">
                        {chapter.chapterTitle}
                      </p>
                    </div>
                    <p className="text-sm md:text-base text-gray-500">
                      {chapter.chapterContent.length} lectures -{" "}
                      {calculateChapterTime(chapter)}
                    </p>
                  </div>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      openSections[index] ? "max-h-96" : "max-h-0"
                    } `}
                  >
                    <ul className="list-disc md:pl-10 pl-4 pr-4 py-2 text-gray-600 border-t border-gray-300">
                      {chapter.chapterContent.map((lecture, lectureIndex) => (
                        <li
                          key={lectureIndex}
                          className="flex items-start gap-2 py-1"
                        >
                          <img
                            src={assets.play_icon}
                            alt="play icon"
                            className="w-3 h-4"
                          />
                          <div className="flex items-center justify-between w-full text-gray-800 text-xs md:text-balance">
                            <p>{lecture.lectureTitle}</p>
                            <div className="flex gap-2">
                              {lecture.isPreviewFree && (
                                <p
                                  onClick={() => {
                                    setPlayerData({
                                      videoId: lecture.lectureUrl
                                        .split("/")
                                        .pop(),
                                    });
                                  }}
                                  className="text-blue-500 cursor-pointer"
                                >
                                  Preview
                                </p>
                              )}
                              <p>
                                {humanizeDuration(
                                  lecture.lectureDuration * 60 * 1000,
                                  { units: ["h", "m"] }
                                )}
                              </p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* display course description */}
          <div className="pt-8 py-20 text-sm">
            <h3 className="text-xl font-semibold text-gray-800">
              Course Description
            </h3>
            <p
              dangerouslySetInnerHTML={{
                __html: courseData.courseDescription,
              }}
              className="pt-4"
            ></p>
          </div>
        </div>
        {/* Right column */}
        <div className="shadow-2xl rounded-t md:rounded-none overflow-hidden bg-white min-w-[300px] sm:min-w-[400px]">
          {playerData ? (
            <Youtube
              videoId={playerData.videoId}
              opts={{ playerVars: { autoplay: 1 } }}
              iframeClassName="w-full aspect-video"
            />
          ) : (
            <img src={courseData.courseThumbnail} alt="course thumbnail" />
          )}

          {/* <img src={courseData.courseThumbnail} alt="course thumbnail" /> */}
          <div className="p-5">
            <div className="flex items-center gap-2">
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

            <div className="flex items-center text-lg md:text-balance gap-4 pt-2 md:pt-4 text-gray-500">
              <div className="flex items-center gap-1">
                <img className="w-3" src={assets.star} alt="star icon" />
                <p>{calculateAverageRating(courseData)}</p>
              </div>
              <div className="h-4 w-px bg-gray-500/40"></div>
              <div className="flex items-center gap-1">
                <img src={assets.time_clock_icon} alt="clock icon" />
                <p>{calculateCourseDuration(courseData)}</p>
              </div>
              <div className="h-4 w-px bg-gray-500/40"></div>
              <div className="flex items-center gap-1">
                <img src={assets.lesson_icon} alt="lesson icon" />
                <p>{calculateNumberOfLecture(courseData)} lessons</p>
              </div>
            </div>
            <button className="custom-btn w-full my-5">
              {isAlreadyEnrolled ? "Already Enrolled" : "Enroll Now"}
            </button>
            <div className="">
              <p className="font-medium text-lg md:text-xl text-gray-800">
                What is in the course?
              </p>
              <ul className="ml-4 pt-2 text-sm md:text-base list-disc text-gray-500">
                <li>Lifetime access with free updates.</li>
                <li>Step-by-step, hands-on project guidance.</li>
                <li>Downloadable resources and source code.</li>
                <li>Quizzes to test your knowledge.</li>
                <li>Certificate of completion.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CourseDetails;
