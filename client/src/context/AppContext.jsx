import humanizeDuration from "humanize-duration";
/* eslint-disable react/prop-types */
import { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { fetchAllCourses, fetchEnrolledCourses } from "../services/courseService";
import { calculateCourseDuration, calculateChapterTime, calculateNumberOfLecture } from "../utils/timeUtils";

export const AppContext = createContext();

export const useApp = () => useContext(AppContext);

export const AppContextProvider = ({ children }) => {
  const { currentUser, loading, authError, signup, login, logout } = useAuth();
  const [allCourses, setAllCourses] = useState([]);
  const [isEducator, setIsEducator] = useState(true);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const navigate = useNavigate();

  const loadCourses = async () => {
    try {
      const courses = await fetchAllCourses();
      setAllCourses(courses);
      const enrolled = await fetchEnrolledCourses(currentUser?.uid);
      setEnrolledCourses(enrolled);
    } catch (error) {
      console.error("Failed to load courses:", error);
    }
  };

  useEffect(() => {
    if (currentUser) {
      loadCourses();
    }
  }, [currentUser]);

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
    loadCourses,
  };

  return (
    <AppContext.Provider value={value}>
      {!loading && children}
    </AppContext.Provider>
  );
};
