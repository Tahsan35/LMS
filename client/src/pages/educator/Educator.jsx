import { Outlet } from "react-router-dom";

const Educator = () => {
  return (
    <div>
      <h1>eduator page</h1>
      {/* <div>{<Outlet />}</div> */}
      <Outlet /> {/* ✅ This is necessary for nested routes to work */}
    </div>
  );
};

export default Educator;
