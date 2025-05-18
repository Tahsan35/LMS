import humanizeDuration from "humanize-duration";

export const calculateChapterTime = (chapter) => {
  let time = 0;
  chapter.chapterContent.map((lecture) => (time += lecture.lectureDuration));
  return humanizeDuration(time * 60 * 1000, { units: ["h", "m"] });
};

export const calculateCourseDuration = (course) => {
  if (!course.courseContent || !Array.isArray(course.courseContent))
    return "0m";
  const totalSeconds = course.courseContent.reduce(
    (total, chapter) => total + calculateChapterTime(chapter),
    0
  );
  return humanizeDuration(totalSeconds * 1000, {
    units: ["h", "m"],
    round: true,
  });
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
