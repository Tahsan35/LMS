import humanizeDuration from "humanize-duration";
/* eslint-disable react/prop-types */
import { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import { dummyCourses } from "../assets/assets";

export const AppContext = createContext();

export const useApp = () => useContext(AppContext);

export const AppContextProvider = ({ children }) => {
  // Auth states
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(null);

    // Course states
  const [allCourses, setAllCourses] = useState([]);
  const [isEducator, setIsEducator] = useState(true);
  const [enrolledCourses, setEnrolledCourses] = useState([]);


  const navigate = useNavigate();

  // Fetch all courses
  // const fetchAllCourses = async () => {
  //   setAllCourses(dummyCourses);
  //   fetchEnrolledCourses();
  // };
  const fetchAllCourses = async () => {
    try {
      // Replace with API call or dynamic data fetching
      setAllCourses(dummyCourses);
      fetchEnrolledCourses(); // Fetch enrolled courses after all courses are loaded
    } catch (error) {
      console.error("Failed to fetch courses:", error);
    }
  };


  //function to calculate courses chapter time
  // const calculateChapterTime = (chapter) => {
  //   let time = 0;
  //   chapter.chapterContent.map((lecture) => (time += lecture.lectureDuration));
  //   return humanizeDuration(time * 60 * 1000, { units: ["h", "m"] });
  // };

  //calculate duration
  // const calculateCourseDuration = (course) => {
  //   let time = 0;
  //   course.courseContent.map(
  //     (chapter) => (time += calculateChapterTime(chapter))
  //   );
  //   return humanizeDuration(time * 60 * 1000, { units: ["h", "m"] });
  // };

  // number of lecture in the course
  // const calculateNumberOfLecture = (course) => {
  //   let numberOfLecture = 0;
  //   course.courseContent.forEach((chapter) => {
  //     if (Array.isArray(chapter.chapterContent)) {
  //       numberOfLecture += chapter.chapterContent.length;
  //     }
  //   });
  //   return numberOfLecture;
  // };

   // Calculate total duration of a chapter in seconds
   const calculateChapterTime = (chapter) => {
    if (!chapter.chapterContent || !Array.isArray(chapter.chapterContent)) return 0;
    return chapter.chapterContent.reduce((total, lecture) => total + (lecture.lectureDuration || 0), 0);
  };

  // Calculate total duration of a course in seconds and format it
  const calculateCourseDuration = (course) => {
    if (!course.courseContent || !Array.isArray(course.courseContent)) return "0m";
    const totalSeconds = course.courseContent.reduce((total, chapter) => total + calculateChapterTime(chapter), 0);
    return humanizeDuration(totalSeconds * 1000, { units: ["h", "m"], round: true });
  };

  // Calculate the total number of lectures in a course
  const calculateNumberOfLecture = (course) => {
    if (!course.courseContent || !Array.isArray(course.courseContent)) return 0;
    return course.courseContent.reduce((total, chapter) => {
      if (Array.isArray(chapter.chapterContent)) {
        return total + chapter.chapterContent.length;
      }
      return total;
    }, 0);
  };

  // Fetch enrolled courses for the current user
  // const fetchEnrolledCourses = async () => {
  //   try {
  //     // Replace with API call or dynamic data fetching based on currentUser
  //     setEnrolledCourses(dummyCourses.filter(course => course.isEnrolled)); // Example: Filter enrolled courses
  //   } catch (error) {
  //     console.error("Failed to fetch enrolled courses:", error);
  //   }
  // };

   // Auth state listener
   useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  // Fetch all courses on mount
  useEffect(() => {
    fetchAllCourses();
  }, []);



  // Auth state listener
  //useEffect(() => fetchAllCourses(), []);


  //auth functions
  const signup = async (email, password) => {
    try {
      setAuthError(null);
      const result = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      return result;
    } catch (error) {
      setAuthError(error.message);
      throw error;
    }
  };

  const login = async (email, password) => {
    try {
      setAuthError(null);
      const result = await signInWithEmailAndPassword(auth, email, password);
      return result;
    } catch (error) {
      setAuthError(error.message);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      setAuthError(error.message);
      throw error;
    }
  };

  //fetch enrolled courses
   const fetchEnrolledCourses = async () => {
      setEnrolledCourses(dummyCourses);
   };

  // Monitor auth state
  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (user) => {
  //     setCurrentUser(user);
  //     setLoading(false);
  //   });

  //   return unsubscribe;
  // }, []);

  const value = {
    currentUser,
    loading,
    authError,
    signup,
    login,
    logout,
    allCourses,
     navigate,
    isEducator,
    setIsEducator,
    calculateNumberOfLecture,
    calculateCourseDuration,
    calculateChapterTime,
    enrolledCourses,
    fetchEnrolledCourses,
  };

  //

  return (
    <AppContext.Provider value={value}>
      {!loading && children}
    </AppContext.Provider>
  );
};
