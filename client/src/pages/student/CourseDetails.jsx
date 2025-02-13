import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";

const CourseDetails = () => {
  const { id } = useParams();

  const [courseData, setCourseData] = useState(null);

  const { allCourses } = useContext(AppContext);

  const fetchCourseData = async () => {
    const findCourse = allCourses.find((course) => course._id === id);
    setCourseData(findCourse);
  };

  useEffect(() => {
    fetchCourseData();
  });

  return (
    <div className="flex md:flex-row flex-col-reverse gap-10 relative items-start justify-between md:px-36 px-8 pt-20 md:pt-20 text-left">
      <div className=""></div>
      {/* left column */}
      <div className="max-w-xl z-10 text-gray-500">
        <h1 className=" font-semibold text-gray-800">
          {courseData?.courseTitle}
        </h1>
        <p
          className="pt-4 md:text-base text-sm"
          dangerouslySetInnerHTML={{
            __html: courseData?.courseDescription.slice(0, 400),
          }}
        ></p>
        {/* review and rating */}
        <div className="flex items-center space-x-2">
          <p>4.5</p>
          <div className="flex">
            {[...Array(5)].map((_, i) => (
              <img key={i} src={assets.star} alt="" className="w-3.5 h-3.5" />
            ))}
          </div>
          {/* <p className="text-gray-500">4.3</p> */}
        </div>
        <p className="text-sm">
          Course by
          <span className="text-blue-600 underline p-0.5">Tahsan Shakil</span>
        </p>
      </div>
      {/* right column */}
    </div>
  );
};

export default CourseDetails;
