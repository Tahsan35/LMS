import { useNavigate } from "react-router-dom";
import { assets } from "../../assets/assets";
import { useState } from "react";

import PropTypes from "prop-types";

const SearchBar = ({ data }) => {
  SearchBar.propTypes = {
    data: PropTypes.string,
  };
  const navigate = useNavigate();
  const [input, setInput] = useState(data ? data : "");

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/course-list/` + input);
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl w-full md:h-14 h-12 flex items-center bg-white border border-gray-500/20 rounded"
    >
      <img
        src={assets.search_icon}
        alt="search icon"
        className="md:w-auto w-10 px-3"
      />
      <input
        type="text"
        placeholder="Search for courses"
        onChange={(e) => setInput(e.target.value)}
        value={input}
        className="w-full h-full outline-none text-gray-500/80"
      />
      <button type="submit" className="custom-btn">
        Search
      </button>
    </form>
  );
};

export default SearchBar;
