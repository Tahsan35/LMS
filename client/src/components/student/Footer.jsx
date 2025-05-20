import { assets } from "../../assets/assets";

const Footer = () => {
  return (
    <footer className="bg-gray-900  md:px-36 text-left w-full mt-10">
      <div className="flex flex-col md:flex-row items-start px-5 md:px-0 justify-center gap-10 md:gap-32 py-10 border-b border-white/30">
        {/* Logo and Description Section */}

        <div className="flex flex-col md:items-start items-center w-full">
          <img src={assets.logo_dark} alt="Logo"></img>
          <p className="text-sm mt-6 text-center md:text-left text-white/80">
            Edemy is an online learning platform that offers a wide range of
            courses on various topics. Whether you are a student, a teacher, or
            an educator, you can find the courses you need here.
          </p>
        </div>

        {/* Company Links Section */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">Company</h3>
          <nav className="space-y-3 text-white/80">
            <a
              href="#"
              className="block text-sm hover:text-white transition-colors"
            >
              Home
            </a>
            <a
              href="#"
              className="block text-sm hover:text-white transition-colors"
            >
              About us
            </a>
            <a
              href="#"
              className="block text-sm hover:text-white transition-colors"
            >
              Contact us
            </a>
            <a
              href="#"
              className="block text-sm hover:text-white transition-colors"
            >
              Privacy policy
            </a>
          </nav>
        </div>

        {/* Newsletter Section */}
        <div>
          <h3 className="text-white text-lg font-semibold mb-4">
            Subscribe to our newsletter
          </h3>
          <p className="text-sm mb-4 text-white/80">
            The latest news, articles, and resources, sent to your inbox weekly.
          </p>
          <form className="space-y-2 text-white/80">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-4 py-2 rounded bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500"
            />
            <button
              type="submit"
              className="w-full lg:w-auto px-6 py-2 custom-btn"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Copyright Section */}
      {/* <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-gray-800"> */}
      <p className="text-center text-xs md:text-sm text-white/60 py-4">
        Copyright {new Date().getFullYear()} © Edemy. All Right Reserved.
      </p>
    </footer>
  );
};

export default Footer;
