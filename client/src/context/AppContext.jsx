import humanizeDuration from "humanize-duration";
/* eslint-disable react/prop-types */
import { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import {
  fetchAllCourses,
  fetchEnrolledCourses,
} from "../services/courseService";
// import {
//   calculateCourseDuration,
//   calculateChapterTime,
//   calculateNumberOfLecture,
// } from "../utils/timeUtils";

// Create context for sharing global state and functions
export const AppContext = createContext();

// Custom hook to access AppContext
export const useApp = () => useContext(AppContext);

export const AppContextProvider = ({ children }) => {
  // Get user state and functions from useAuth hook
  const {
    currentUser,
    loading,
    authError,
    signup,
    login,
    logout,
    loginWithGoogle,
  } = useAuth();
  const navigate = useNavigate();

  // Course-related state
  const [allCourses, setAllCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  const [isEducator, setIsEducator] = useState(true); // Default to false for safety

  // Load all courses and enrolled courses
  const loadCourses = async () => {
    try {
      // const courses = await fetchAllCourses();
      // setAllCourses(courses);
      // const enrolled = await fetchEnrolledCourses(currentUser?.uid);
      // setEnrolledCourses(enrolled);
      const courses = await fetchAllCourses();
      setAllCourses(Array.isArray(courses) ? courses : []);
      const enrolled = await fetchEnrolledCourses(currentUser?.uid || null);
      setEnrolledCourses(Array.isArray(enrolled) ? enrolled : []);
    } catch (error) {
      //
      console.error("Failed to load courses:", error);
    }
  };

  // Function to get the current user's Firebase ID token
  const getCurrentUserToken = async () => {
    if (currentUser) {
      try {
        const token = await currentUser.getIdToken();
        return token;
      } catch (error) {
        console.error("Error getting ID token:", error);
        return null;
      }
    }
    return null;
  };

  // Initialize isEducator based on user role
  useEffect(() => {
    // Load courses regardless of user state
    loadCourses();
  });

  // // Initialize isEducator based on user role
  // useEffect(() => {
  //   if (currentUser) {
  //     // Replace with actual role check logic from your backend or user data
  //     setIsEducator(currentUser.role === "educator" || false);
  //   } else {
  //     setIsEducator(false);
  //   }
  // }, [currentUser]);

  // // Load courses on mount and when currentUser changes
  // useEffect(() => {
  //   loadCourses();
  // }, [currentUser]);

  //funtion to calculate average rating of a course
  const calculateAverageRating = (course) => {
    // console.log(course);
    if (!course.courseRatings || course.courseRatings.length === 0) {
      return 0;
    }
    const totalRating = course.courseRatings.reduce(
      (sum, review) => sum + review.rating,
      0
    );
    return totalRating / course.courseRatings.length;
  };

  // calculate course chapter time
  const calculateChapterTime = (chapter) => {
    let time = 0;
    chapter.chapterContent.map((lecture) => (time += lecture.lectureDuration));
    return humanizeDuration(time * 60 * 1000, { units: ["h", "m"] });
  };

  // calculate course duration
  const calculateCourseDuration = (course) => {
    let time = 0;
    course.courseContent.map((chapter) =>
      chapter.chapterContent.map((lecture) => (time += lecture.lectureDuration))
    );
    return humanizeDuration(time * 60 * 1000, { units: ["h", "m"] });
  };

  // calculate number of lecture
  const calculateNumberOfLecture = (course) => {
    let count = 0;
    course.courseContent.forEach((chapter) => {
      if (Array.isArray(chapter.chapterContent)) {
        count += chapter.chapterContent.length;
      }
    });
    return count;
  };

  const value = {
    calculateAverageRating,
    currentUser,
    loading,
    authError,
    signup,
    login,
    logout,
    loginWithGoogle,
    allCourses,
    navigate,
    isEducator,
    setIsEducator,
    calculateNumberOfLecture,
    calculateCourseDuration,
    calculateChapterTime,
    enrolledCourses,
    loadCourses,
    getCurrentUserToken, // Expose the new function
  };

  return (
    <AppContext.Provider value={value}>
      {!loading && children}
    </AppContext.Provider>
  );
};
