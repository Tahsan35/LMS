import Course from "../models/course.js";
import User from "../models/user.js";

// Get educator courses
export const getEducatorCourses = async (req, res) => {
  try {
    const courses = await Course.find({ instructor: req.user._id })
      .sort({ createdAt: -1 })
      .exec();
    res.json(courses);
  } catch (err) {
    console.error(err);
    res.status(400).send("Error fetching educator courses");
  }
};

// Create course
export const createCourse = async (req, res) => {
  try {
    const course = await new Course({
      title: req.body.title,
      description: req.body.description,
      instructor: req.user._id,
      image: req.body.image,
    }).save();
    res.json(course);
  } catch (err) {
    console.error(err);
    res.status(400).send("Error creating course");
  }
};

// Get single course
export const getCourse = async (req, res) => {
  try {
    const course = await Course.findOne({ slug: req.params.slug })
      .populate("instructor", "_id name")
      .exec();
    res.json(course);
  } catch (err) {
    console.error(err);
    res.status(400).send("Error fetching course");
  }
};

// Update course
export const updateCourse = async (req, res) => {
  try {
    const { slug } = req.params;
    const course = await Course.findOneAndUpdate({ slug }, req.body, {
      new: true,
    }).exec();
    res.json(course);
  } catch (err) {
    console.error(err);
    res.status(400).send("Error updating course");
  }
};

// Delete course
export const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findOneAndDelete({
      slug: req.params.slug,
    }).exec();
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(400).send("Error deleting course");
  }
};

// Add lesson
export const addLesson = async (req, res) => {
  try {
    const { slug } = req.params;
    const { title, content, video } = req.body;
    
    const updated = await Course.findOneAndUpdate(
      { slug },
      {
        $push: { lessons: { title, content, video, slug: slugify(title) } },
      },
      { new: true }
    ).exec();
    
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(400).send("Error adding lesson");
  }
};

// Update lesson
export const updateLesson = async (req, res) => {
  try {
    const { slug, lessonId } = req.params;
    const { title, content, video, free_preview } = req.body;
    
    const updated = await Course.findOneAndUpdate(
      { "slug": slug, "lessons._id": lessonId },
      {
        $set: {
          "lessons.$.title": title,
          "lessons.$.content": content,
          "lessons.$.video": video,
          "lessons.$.free_preview": free_preview,
        },
      },
      { new: true }
    ).exec();
    
    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(400).send("Error updating lesson");
  }
};

// Delete lesson
export const deleteLesson = async (req, res) => {
  try {
    const { slug, lessonId } = req.params;
    
    const updated = await Course.findOneAndUpdate(
      { slug },
      {
        $pull: { lessons: { _id: lessonId } },
      }
    ).exec();
    
    res.json({ ok: true });
  } catch (err) {
    console.error(err);
    res.status(400).send("Error deleting lesson");
  }
};
