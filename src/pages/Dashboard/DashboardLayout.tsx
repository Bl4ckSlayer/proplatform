import { BsGrid, BsThermometer } from "react-icons/bs";
import { Link, Outlet, useNavigate } from "react-router-dom";
import ComponentLoader from "../../components/ComponentLoader";
import DashboardMenus from "../../components/DashboardMenus";
import { useAppContext } from "../../context/AppContext";
import { useEffect } from "react";
import ScreenLoader from "../../components/ScreenLoader";
import { useCookies } from "react-cookie";
import { FaUserGraduate } from "react-icons/fa";
import { GiTeacher } from "react-icons/gi";
type Props = {};

const DashboardLayout = (props: Props) => {
  // from app context api
  const {
    role,
    isLoading,
    token,
    currentUser,
    setToken,
    setCurrentUser,
    setRole,
  } = useAppContext();
  const navigate = useNavigate();

  // to get cookie
  const [cookies, setCookies, removeCookies] = useCookies(["token"]);

  // for get dynamically profile link
  const profileLink =
    (currentUser?.role === "student"
      ? "/student/dashboard/profile"
      : "/teacher/dashboard/profile") ||
    (currentUser.role === "admin" && "/admin/dashboard/profile");

  if (isLoading) {
    return <ScreenLoader />;
  }

  /* handle logout */
  const handleLogout = () => {
    removeCookies("token", {
      path: "/",
    });
    setToken(null);
    setCurrentUser(null);
    setRole(null);
    navigate("/login");
  };

  // redirection
  // useEffect(() => {
  //   if (!token) {
  //     navigate("/login");
  //   } else if (role === "student") {
  //     navigate("/student/dashboard");
  //   } else if (role === "teacher") {
  //     navigate("/teacher/dashboard");
  //   }
  // }, [role]);

  return (
    <main>
      {/* dashboard menus */}
      <div className="drawer drawer-mobile">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content p-1 bg-slate-200">
          {/* page header */}
          <div className="flex flex-row items-center justify-between bg-[#7594fc] px-6 p-2 rounded sticky top-1 z-30 text-white">
            <div>
              <label
                htmlFor="my-drawer-2"
                className="btn btn-ghost drawer-button lg:hidden"
              >
                <BsGrid size={20} />
              </label>
              <span className="text-2xl">
                <Link to="/" className="flex items-center gap-2">
                  <span className="capitalize font-bold flex items-center gap-1 text-white ">
                    {role === "student" ? <FaUserGraduate /> : <GiTeacher />}
                    {role}
                  </span>{" "}
                  Dashboard
                </Link>
              </span>
            </div>

            <div className="">
              <div className="dropdown dropdown-end">
                <label
                  tabIndex={0}
                  className="btn btn-ghost btn-circle avatar bg-gray-300"
                >
                  <div
                    style={{ display: "grid" }}
                    className="w-10 h-10  place-items-center "
                    title={currentUser?.name}
                  >
                    {/* <img src="https://i.pravatar.cc/300" /> */}
                    <span className="text-2xl font-bold">
                      {currentUser?.name[0]}
                    </span>
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52 text-black"
                >
                  <li>
                    <Link to={profileLink} className="justify-between">
                      Profile
                    </Link>
                  </li>
                  <li onClick={handleLogout} className="cursor-pointer">
                    <a href="#"> Logout</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {/* Page content here  */}
          <div className="main-content p-4 bg-slate-200">
            <Outlet />
          </div>
        </div>
        <div className="drawer-side">
          <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
          <DashboardMenus />
        </div>
      </div>
    </main>
  );
};

export default DashboardLayout;
