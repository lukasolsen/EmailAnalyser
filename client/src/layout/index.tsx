import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";

const Layout = () => {
  const pathname = useLocation().pathname;

  return (
    <>
      <div className="dark:bg-blue-dark-950 dark:text-white bg-slate-100 overscroll-auto h-full min-h-screen break-all">
        {!pathname.includes("/profile") && <Navbar />}
        <Outlet />
      </div>
    </>
  );
};

export default Layout;
