import { useEffect, useRef, useState } from "react";
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

  //initiate quill only once
  useEffect(() => {
    if (!quillRef.current && editorRef.current) {
      quillRef.current = new Quill(editorRef.current, {
        theme: "snow",
      });
    }
  }, []);

  return (
    <div className='h-screen overflow-scroll flex flex-col items-start justify-between md:p-8 p-4 pt-8 pb-0'>
      <form className='w-full flex flex-col gap-4 max-w-md text-gray-500'>
        <div className='flex flex-col gap-2'>
          <p>Course Title</p>
          <input
            onChange={(e) => setCourseTitle(e.target.value)}
            value={courseTitle}
            type='text'
            placeholder='Enter Course Title'
            className='outline-none py-2 px-3 w-full border border-gray-500 rounded'
            required
          />
        </div>
        <div className='flex flex-col gap-2'>
          <p>Course Description</p>
          <div ref={editorRef}></div>
        </div>

        <div className='flex flex-wrap items-center justify-between'>
          <div className='flex flex-col gap-1'>
            <p>Course Price</p>
            <input
              onChange={(e) => setCoursePrice(e.target.value)}
              value={coursePrice}
              type='number'
              placeholder='0'
              className='outline-none py-2 px-3 w-full border border-gray-500 rounded'
              required
            />
          </div>

          <div className='flex flex-col md:flex-row items-center gap-3'>
            <p>Course Thumbnail</p>
            <label htmlFor='thumbnailImage' className='flex items-center gap-3'>
              <img
                className='p-3 bg-blue-500 rounded'
                src={assets.file_upload_icon}
                alt='upload_icon'
              />
              <input
                type='file'
                id='thumbnailImage'
                onChange={(e) => setImage(e.target.files[0])}
                accept='image/*'
                hidden
              />
              <img
                className='min-h-10'
                src={image ? URL.createObjectURL(image) : ""}
                alt=''
              />
            </label>
          </div>
        </div>

        <div className='flex flex-col gap-1'>
          <p>Discount %</p>
          <input
            onChange={(e) => setDiscount(e.target.value)}
            value={discount}
            type='number'
            placeholder='0'
            min={0}
            max={100}
            className='outline-none py-2 px-3 w-full border border-gray-500 rounded'
            required
          />
        </div>
        {/* adding chapter and lectures */}
        <div className='flex flex-col gap-1'>
          {chapters.map((chapter, chapterIndex) => (
            <div key={chapterIndex} className='bg-white border rounded-lg mb-4'>
              <div className='flex items-center justify-between p-4 border-b'>
                <div className='flex items-center'>
                  <img src={assets.dropdown_icon} width={14} alt='' />
                  <span className='font-semibold'>
                    {chapterIndex + 1} {chapter.chapterTitle}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </form>
    </div>
  );
};

export default AddCourse;
