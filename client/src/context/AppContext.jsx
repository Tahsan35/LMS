//import humanizeDuration from "humanize-duration";
/* eslint-disable react/prop-types */
import { createContext, useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import {
  fetchAllCourses,
  fetchEnrolledCourses,
} from "../services/courseService";
import {
  calculateCourseDuration,
  calculateChapterTime,
  calculateNumberOfLecture,
} from "../utils/timeUtils";

// Create context for sharing global state and functions
export const AppContext = createContext();

// Custom hook to access AppContext
export const useApp = () => useContext(AppContext);

export const AppContextProvider = ({ children }) => {
  // Get user state and functions from useAuth hook
  const { currentUser, loading, authError, signup, login, logout } = useAuth();
  const navigate = useNavigate();

  // Course-related state
  const [allCourses, setAllCourses] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  const [isEducator, setIsEducator] = useState(false); // Default to false for safety

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

  // Initialize isEducator based on user role
  useEffect(() => {
    // Load courses regardless of user state
    loadCourses();
  }, []); // Remove currentUser dependency

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
