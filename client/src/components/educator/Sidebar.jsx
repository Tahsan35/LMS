import { useContext } from "react";
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const { isEducator } = useContext(AppContext);

  const menuItems = [
    {
      name: "Dashboard",
      icon: assets.home_icon,
      path: "/educator",
    },
    {
      name: "Add Course",
      icon: assets.add_icon,
      path: "/educator/add-course",
    },
    {
      name: "My Courses",
      icon: assets.my_course_icon,
      path: "/educator/my-courses",
    },
    {
      name: "Student Enrolled",
      icon: assets.person_tick_icon,
      path: "/educator/student-enrolled",
    },
  ];
  return (
    isEducator && (
      <div className='md:w-64 w-16 border-r min-h-screen text-base border-gray-500 py-2 flex flex-col'>
        {menuItems.map((item) => (
          <NavLink
            to={item.path}
            key={item.name}
            end={item.path === "/educator"}
            className={({ isActive }) => `
            flex items-center md:flex-row flex-col md:justify-start justify-center py-3.5 md:px-10
            gap-3 ${
              isActive
                ? "bg-indigo-50 border-r-[6px] border-indigo-500/90"
                : "hover:bg-gray-100/90 border-r-[6px] border-white hover:border-gray-100/90"
            }
          `}
          >
            <img src={item.icon} alt={item.name} className='w-6 h-6' />
            <p className='hidden md:block text-center'>{item.name}</p>
          </NavLink>
        ))}
      </div>
    )
  );
};

export default Sidebar;
