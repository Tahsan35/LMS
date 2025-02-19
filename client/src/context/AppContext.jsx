import humanizeDuration from "humanize-duration";
/* eslint-disable react/prop-types */
import { createContext, useState, useContext, useEffect } from "react";
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

  const [allCourses, setAllCourses] = useState([]);
  const [isEducator, setIsEducator] = useState(true);
  const [enrolledCourses, setEnrolledCourses] = useState([]);


  //const navigate = useNavigate();

  // Fetch all courses
  const fetchAllCourses = async () => {
    setAllCourses(dummyCourses);
    fetchEnrolledCourses();
  };

  //function to calculate courses chapter time
  const calculateChapterTime = (chapter) => {
    let time = 0;
    chapter.chapterContent.map((lecture) => (time += lecture.lectureDuration));
    return humanizeDuration(time * 60 * 1000, { units: ["h", "m"] });
  };

  //calculate duration
  const calculateCourseDuration = (course) => {
    let time = 0;
    course.courseContent.map(
      (chapter) => (time += calculateChapterTime(chapter))
    );
    return humanizeDuration(time * 60 * 1000, { units: ["h", "m"] });
  };

  // number of lecture in the course
  const calculateNumberOfLecture = (course) => {
    let numberOfLecture = 0;
    course.courseContent.forEach((chapter) => {
      if (Array.isArray(chapter.chapterContent)) {
        numberOfLecture += chapter.chapterContent.length;
      }
    });
    return numberOfLecture;
  };
  // Auth state listener
  useEffect(() => fetchAllCourses(), []);

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
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    loading,
    authError,
    signup,
    login,
    logout,
    allCourses,
    // navigate,
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
