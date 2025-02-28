import humanizeDuration from "humanize-duration";

export const calculateChapterTime = (chapter) => {
  if (!chapter.chapterContent || !Array.isArray(chapter.chapterContent)) return 0;
  return chapter.chapterContent.reduce(
    (total, lecture) => total + (lecture.lectureDuration || 0),
    0
  );
};

export const calculateCourseDuration = (course) => {
  if (!course.courseContent || !Array.isArray(course.courseContent)) return "0m";
  const totalSeconds = course.courseContent.reduce(
    (total, chapter) => total + calculateChapterTime(chapter),
    0
  );
  return humanizeDuration(totalSeconds * 1000, { units: ["h", "m"], round: true });
};

export const calculateNumberOfLecture = (course) => {
  if (!course.courseContent || !Array.isArray(course.courseContent)) return 0;
  return course.courseContent.reduce((total, chapter) => {
    if (Array.isArray(chapter.chapterContent)) {
      return total + chapter.chapterContent.length;
    }
    return total;
  }, 0);
};