import { Link } from "react-router-dom";
import { assets } from "../../assets/assets";

const CallToAction = () => {
  return (
    <div className="flex flex-col items-center gap-4 pt-10 pb-24 px-8 md:px-0">
      <h1 className="text-xl md:text-4xl text-gray-800 font-semibold">
        Learn anything, anytime, anywhere
      </h1>
      <p className="text-gray-500 sm:text-lg">
        Thousands of online courses, expert teachers, and personalized learning
        paths. Start your journey now!
      </p>
      <div className="flex gap-6 items-center font-medium mt-4">
        <Link
          to={`/course-list`}
          onClick={() => scrollTo(0, 0)}
          className="custom-btn"
        >
          Get started
        </Link>
        <button className="flex items-center gap-2 shadow-md px-8 py-3">
          Learn more <img src={assets.arrow_icon} alt="arrow icon"></img>
        </button>
      </div>
    </div>
  );
};

export default CallToAction;
