import { useNavigate, useParams } from "react-router-dom";
import SearchBar from "../../components/student/SearchBar";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../../context/AppContext";
import CourseCard from "../../components/student/CourseCard";
import { assets } from "../../assets/assets";
import Footer from "../../components/student/Footer";

const CoursesList = () => {
  const { allCourses } = useContext(AppContext);
  const [filteredCourse, setFilteredCourse] = useState([]);

  const navigation = useNavigate();
  const { input } = useParams();

  // useEffect(() => {
  //   if (allCourses && allCourses.length > 0) {
  //     const tempCourses = allCourses.slice();
  //     input
  //       ? setFilteredCourse(
  //           tempCourses.filter((item) =>
  //             item.courseTitle.toLowerCase().includes(input.toLowerCase())
  //           )
  //         )
  //       : setFilteredCourse(tempCourses);
  //   }
  // }, [allCourses, input]);

  useEffect(() => {
    if (!allCourses?.length) return;

    const searchTerm = input?.toLowerCase().trim() || "";
    const filteredResults = searchTerm
      ? allCourses.filter((item) =>
          item.courseTitle.toLowerCase().includes(searchTerm)
        )
      : allCourses;

    setFilteredCourse(filteredResults);
  }, [allCourses, input]);
  return (
    <>
      <div className="relative md:px-36 px-8 pt-20 text-left">
        <div className="flex md:flex-row flex-col gap-6 items-start justify-between w-full">
          <div>
            <h1 className="text-4xl font-semibold text-gray-800">
              Course List
            </h1>
            <p className="text-gray-500">
              <span
                className="text-blue-600 cursor-pointer"
                onClick={() => navigation("/")}
              >
                Home
              </span>
              /Course List
            </p>
          </div>
          <SearchBar data={input} />
        </div>
        {input && (
          <div className="inline-flex items-center gap-4 px-4 bg-gray-100 py-2 rounded-md mt-8 text-gray-600">
            <p>{input}</p>
            <img
              src={assets.cross_icon}
              alt=""
              className="cursor-pointer"
              onClick={() => navigation("/course-list")}
            />
          </div>
        )}
        <div className="grid md:grid-cols-3 sm:grid-cols-2 lg:grid-cols-4 grid-cols-1 my-16 gap-6 mt-10 px-2 md:p-0">
          {/* {filteredCourse.map((course, index) => (
            <CourseCard key={index} course={course}></CourseCard>
          ))} */}
          {filteredCourse.length > 0 ? (
            filteredCourse.map((course, index) => (
              <CourseCard key={index} course={course}></CourseCard> // Render your course data here
            ))
          ) : (
            <p>No courses found matching </p> // A message if no courses match
          )}
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default CoursesList;
