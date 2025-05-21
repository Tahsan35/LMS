import { useEffect, useRef, useState } from "react";
import uniqid from "uniqid";
import Quill from "quill";
import { assets } from "../../assets/assets";

const AddCourse = () => {
  const quillRef = useRef(null);
  const editorRef = useRef(null);

  const [courseTitle, setCourseTitle] = useState("");
  const [coursePrice, setCoursePrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [image, setImage] = useState(null);
  const [chapters, setChapters] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [currentChapterId, setCurrentChapterId] = useState(null);
  const [lectureDetails, setLectureDetails] = useState({
    lectureTitle: "",
    lectureDuration: "",
    lectureUrl: "",
    isPreviewFree: false,
  });

  const handleChapter = (action, chapterId) => {
    if (action === "add") {
      const title = prompt("Enter chapter title:");
      if (title) {
        const newChapter = {
          chapterId: uniqid(),
          chapterTitle: title,
          chapterContent: [],
          collapsed: false, // Or true if you want them initially collapsed
          chapterOrder:
            chapters.length > 0 ? chapters.slice(-1)[0].chapterOrder + 1 : 1,
        };
        setChapters((prevChapters) => [...prevChapters, newChapter]);
      }
    } else if (action === "remove") {
      setChapters((prevChapters) =>
        prevChapters.filter((chapter) => chapter.chapterId !== chapterId)
      );
    } else if (action === "toggle") {
      setChapters((prevChapters) =>
        prevChapters.map((chapter) =>
          chapter.chapterId === chapterId
            ? { ...chapter, collapsed: !chapter.collapsed }
            : chapter
        )
      );
    }
  };

  const handleAddLectureToChapter = () => {
    if (!currentChapterId || !lectureDetails.lectureTitle) {
      alert(
        "Please ensure you have a chapter selected and lecture title is filled."
      );
      return;
    }
    setChapters((prevChapters) =>
      prevChapters.map((chapter) =>
        chapter.chapterId === currentChapterId
          ? {
              ...chapter,
              chapterContent: [
                ...chapter.chapterContent,
                { ...lectureDetails, lectureId: uniqid() }, // Add a unique ID to lectures too
              ],
            }
          : chapter
      )
    );
    // Reset lecture details and close popup
    setLectureDetails({
      lectureTitle: "",
      lectureDuration: "",
      lectureUrl: "",
      isPreviewFree: false,
    });
    setShowPopup(false);
    setCurrentChapterId(null);
  };

  //initiate quill only once
  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
      });
    }
  }, []);

  return (
    <div className="h-screen overflow-scroll flex flex-col items-start justify-between md:p-8 p-4 pt-8 pb-0">
      <form className="w-full flex flex-col gap-4 max-w-md text-gray-500">
        <div className="flex flex-col gap-2">
          <p>Course Title</p>
          <input
            onChange={(e) => setCourseTitle(e.target.value)}
            value={courseTitle}
            type="text"
            placeholder="Enter Course Title"
            className="outline-none py-2 px-3 w-full border border-gray-500 rounded"
            required
          />
        </div>
        <div className="flex flex-col gap-2">
          <p>Course Description</p>
          <div ref={editorRef}></div>
        </div>

        <div className="flex flex-wrap items-center justify-between">
          <div className="flex flex-col gap-1">
            <p>Course Price</p>
            <input
              onChange={(e) => setCoursePrice(e.target.value)}
              value={coursePrice}
              type="number"
              placeholder="0"
              min={0}
              className="outline-none py-2 md:py-2.5 px-3 w-28 border border-gray-500 rounded"
              required
            />
          </div>

          <div className="flex flex-col md:flex-row items-center gap-3">
            <p>Course Thumbnail</p>
            <label htmlFor="thumbnailImage" className="flex items-center gap-3">
              <img
                className="p-3 bg-blue-500 rounded"
                src={assets.file_upload_icon}
                alt="upload_icon"
              />
              <input
                type="file"
                id="thumbnailImage"
                onChange={(e) => setImage(e.target.files[0])}
                accept="image/*"
                hidden
              />
              <img
                className="min-h-10"
                src={image ? URL.createObjectURL(image) : ""}
                alt=""
              />
            </label>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <p>Discount %</p>
          <input
            onChange={(e) => setDiscount(e.target.value)}
            value={discount}
            type="number"
            placeholder="0"
            min={0}
            max={100}
            className="outline-none py-2 md:py-2.5 px-3 w-28 border border-gray-500 rounded"
            required
          />
        </div>

        {/* adding chapter and lectures */}
        <div className="flex flex-col gap-1">
          {chapters.map((chapter, chapterIndex) => (
            <div
              key={chapter.chapterId}
              className="bg-white border rounded-lg mb-4"
            >
              {" "}
              {/* Use chapter.chapterId as key */}
              <div className="flex items-center justify-between p-4 border-b">
                <div className="flex items-center">
                  <img
                    src={assets.dropdown_icon}
                    width={14}
                    alt="Toggle chapter"
                    className={`mr-2 cursor-pointer transition-all ${
                      chapter.collapsed ? "-rotate-90" : "" // Ensure class is applied correctly
                    }`}
                    onClick={() => handleChapter("toggle", chapter.chapterId)} // Use handleChapter
                  />
                  <span className="font-semibold">
                    {chapterIndex + 1}. {chapter.chapterTitle}
                  </span>
                </div>
                <div className="flex items-center">
                  <span className="text-gray-500 text-sm mr-3">
                    {chapter.chapterContent?.length || 0} Lectures
                  </span>
                  <img
                    src={assets.cross_icon}
                    alt="Delete chapter"
                    className="cursor-pointer w-4 h-4" // Adjust size as needed
                    onClick={() => handleChapter("remove", chapter.chapterId)} // Use handleChapter
                  />
                </div>
              </div>{" "}
              {/* This div was misplaced, it should close the header of the chapter card */}
              {!chapter.collapsed && (
                <div className="p-4">
                  {/* Lectures for this chapter would be mapped and displayed here */}
                  {chapter.chapterContent.map(
                    (
                      lecture,
                      lectureIndex // Added parentheses for implicit return
                    ) => (
                      <div
                        key={lecture.lectureId || lectureIndex} // Use a unique lectureId if available
                        className="flex items-center justify-between mb-2"
                      >
                        <span>
                          {lectureIndex + 1}.{" "}
                          {/* Added a period for numbering */}
                          {lecture.lectureTitle} - {lecture.lectureDuration}{" "}
                          mins -{" "}
                          <a
                            href={lecture.lectureUrl}
                            target="_blank"
                            rel="noopener noreferrer" // Added rel for security
                            className="text-blue-500 hover:underline"
                          >
                            Link
                          </a>{" "}
                          - {lecture.isPreviewFree ? "Free Preview" : "Paid"}
                        </span>
                        <img
                          src={assets.cross_icon}
                          alt="Delete lecture" // More specific alt text
                          className="cursor-pointer w-3 h-3" // Adjusted size
                          // onClick={() => handleDeleteLecture(chapter.chapterId, lecture.lectureId)} // You'll need a handler for this
                        />
                      </div>
                    )
                  )}
                  <div
                    className="inline-flex bg-gray-100 p-2 mt-2 rounded cursor-pointer hover:bg-gray-200"
                    onClick={() => {
                      setCurrentChapterId(chapter.chapterId);
                      setShowPopup(true);
                    }}
                  >
                    + Add Lecture
                  </div>
                </div>
              )}
            </div> // This div closes the chapter card
          ))}
          <div
            className="flex items-center justify-center bg-blue-100 p-2 rounded-lg cursor-pointer"
            onClick={() => handleChapter("add")}
          >
            + Add Chapter
          </div>
          {showPopup && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
              <div className="bg-white text-gray-700 p-4 rounded relative w-full max-w-80">
                <h2 className="text-lg font-semibold mb-4">Add Lecture</h2>
                <div className="mb-2">
                  <p>Lecture Title</p>
                  <input
                    onChange={(e) =>
                      setLectureDetails({
                        ...lectureDetails,
                        lectureTitle: e.target.value,
                      })
                    }
                    value={lectureDetails.lectureTitle}
                    type="text"
                    placeholder="Enter Lecture Title"
                    className="outline-none py-2 px-3 w-full border border-gray-500 rounded"
                    required
                  />
                </div>
                <div className="mb-2">
                  <p>Lecture Duration (mins)</p>
                  <input
                    onChange={(e) =>
                      setLectureDetails({
                        ...lectureDetails,
                        lectureDuration: e.target.value,
                      })
                    }
                    value={lectureDetails.lectureDuration}
                    type="number"
                    placeholder="0"
                    min={0}
                    className="outline-none py-2 px-3 w-full border border-gray-500 rounded"
                    required
                  />
                </div>
                <div className="mb-2">
                  <p>Lecture Url</p>
                  <input
                    onChange={(e) =>
                      setLectureDetails({
                        ...lectureDetails,
                        lectureUrl: e.target.value,
                      })
                    }
                    value={lectureDetails.lectureUrl}
                    type="text"
                    placeholder="Enter Lecture Url"
                    className="outline-none py-2 px-3 w-full border border-gray-500 rounded"
                    required
                  />
                </div>
                <div className="flex items-center gap-2 my-4">
                  <p>Is Preview Free?</p>
                  <input
                    className="mt-1 scale-125"
                    onChange={(e) =>
                      setLectureDetails({
                        ...lectureDetails,
                        isPreviewFree: e.target.checked,
                      })
                    }
                    type="checkbox"
                    checked={lectureDetails.isPreviewFree}
                  />
                </div>
                <button
                  onClick={handleAddLectureToChapter} // Call the handler to add lecture
                  type="button"
                  className=" w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Add Lecture
                </button>
                <img
                  onClick={() => setShowPopup(false)} // Corrected onClick handler
                  src={assets.cross_icon}
                  alt="icon"
                  className="absolute top-4 right-4 w-4 cursor-pointer"
                />
                {/* <div className="flex items-center justify-end gap-4 mt-4">
                <button
                  onClick={() => setShowPopup(false)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    // Add the lecture to the current chapter
                    setChapters((prevChapters) =>
                      prevChapters.map((chapter) =>
                        chapter.id === currentChapterId
                          ? {
                              ...chapter,
                              chapterContent: [
                                ...chapter.chapterContent,
                                lectureDetails,
                              ],
                            }
                          : chapter
                      )
                    );
                  }} */}
              </div>
            </div>
          )}
        </div>
        <button type="submit" className="custom-btn  w-28">
          Add
        </button>
      </form>
    </div>
  );
};

export default AddCourse;
