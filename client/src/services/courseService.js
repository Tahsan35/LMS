import { dummyCourses } from "../assets/assets";

export const fetchAllCourses = async () => {
  try {
    // Replace with actual API call
    return dummyCourses;
  } catch (error) {
    console.error("Failed to fetch courses:", error);
    throw error;
  }
};

export const fetchEnrolledCourses = async (userId) => {
  try {
    // Replace with actual API call
    return dummyCourses;
  } catch (error) {
    console.error("Failed to fetch enrolled courses:", error);
    throw error;
  }
};