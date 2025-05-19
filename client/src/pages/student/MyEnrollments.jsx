import { useContext, useState } from "react";
import { AppContext } from "../../context/AppContext";
import { Line } from "rc-progress";
import Footer from "../../components/student/Footer";

const MyEnrollments = () => {
  const { enrolledCourses, calculateCourseDuration, navigate } =
    useContext(AppContext);

  // Initialize progressArray based on enrolledCourses
  const [progressArray, setProgressArray] = useState([
    { lectureCompleted: 10, lectureTotal: 10 },
    { lectureCompleted: 2, lectureTotal: 10 },
    { lectureCompleted: 2, lectureTotal: 10 },
    { lectureCompleted: 5, lectureTotal: 10 },
    { lectureCompleted: 4, lectureTotal: 10 },
    { lectureCompleted: 10, lectureTotal: 10 },
    { lectureCompleted: 5, lectureTotal: 10 },
    { lectureCompleted: 1, lectureTotal: 10 },
  ]);

  return (
    <>
      <div className="md:px-36 px-10 pt-10">
        <h1 className="text-2xl font-semibold">My Enrollments</h1>
        <table className="md:table-auto table-fixed w-full overflow-hidden border mt-10">
          <thead className="text-gray-900 border-b border-gray-500/20 text-sm text-left max-sm:hidden">
            <tr>
              <th className="px-4 py-3 font-semibold truncate">Course</th>
              <th className="px-4 py-3 font-semibold truncate">Duration</th>
              <th className="px-4 py-3 font-semibold truncate">Completed</th>
              <th className="px-4 py-3 font-semibold truncate">Status</th>
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {enrolledCourses.map((course, index) => (
              <tr key={index} className="border-b border-gray-500/20">
                <td className="md:px-4 pl-2 md:pl-4 py-3 flex items-center space-x-3">
                  <img
                    src={course.courseThumbnail}
                    alt="course thumbnail"
                    className="w-14 sm:w-24 md:w-28"
                  />
                  <div className="flex-1">
                    <p className="mb-1 max-sm:text-sm">{course.courseTitle}</p>
                    <Line
                      strokeWidth={2}
                      percent={
                        (progressArray[index].lectureCompleted /
                          progressArray[index].lectureTotal) *
                        100
                      }
                      className="bg-gray-300 rounded-full"
                    ></Line>
                  </div>
                </td>
                <td className="px-4 py-3 max-sm:hidden">
                  {calculateCourseDuration(course)}
                </td>
                <td className="px-4 py-3 max-sm:hidden">
                  {progressArray[index].lectureCompleted} /{" "}
                  {progressArray[index].lectureTotal} <span>Lectures</span>
                </td>
                <td className="px-3 py-2.5 max-sm:text-right">
                  <button
                    className="custom-btn rounded-md!"
                    onClick={() => navigate(`/player/` + course._id)}
                  >
                    {progressArray[index].lectureCompleted ===
                    progressArray[index].lectureTotal
                      ? "Completed"
                      : "On Going"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Footer />
    </>
  );
};

export default MyEnrollments;
