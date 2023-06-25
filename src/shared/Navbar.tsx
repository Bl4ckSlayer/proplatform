import React from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

type Props = {};

const Navbar = (props: Props) => {
  const { token, currentUser, setToken, setCurrentUser, setRole } =
    useAppContext();
  const navigate = useNavigate();
  const [cookies, setCookies, removeCookies] = useCookies(["token"]);
  const profileLink =
    (currentUser?.role === "student"
      ? "/student/dashboard/profile"
      : "/teacher/dashboard/profile") ||
    (currentUser.role === "admin" && "/admin/dashboard/profile");

  const dashboardLink =
    (currentUser?.role === "student"
      ? "/student/dashboard"
      : "/teacher/dashboard") ||
    (currentUser.role === "admin" && "/admin/dashboard");

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

  const Menus = (
    <>
      <li>
        <Link to={"/courses"} className="btn btn-ghost">
          Courses
        </Link>
      </li>
      <li>
        <Link to={"/course/player/hey-nach-nah"} className="btn btn-ghost">
          Player
        </Link>
      </li>
      <li tabIndex={0}>
        <a>Blogs</a>
      </li>
      <li tabIndex={0}>
        <Link to="/about">About</Link>
      </li>
      <li>
        <a>
          <span className="badge badge-primary">New</span>For Enterprise
        </a>
      </li>
    </>
  );
  return (
    <nav>
      <div className="container">
        <div className="navbar bg-base-100">
          <div className="navbar-start">
            <div className="dropdown">
              <label tabIndex={0} className="btn btn-ghost lg:hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h8m-8 6h16"
                  />
                </svg>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
              >
                {Menus}
              </ul>
            </div>
            <a className="btn btn-ghost normal-case text-xl">Coursera</a>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">{Menus}</ul>
          </div>
          {token && (
            <div className="navbar-end">
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
                  className="mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52"
                >
                  <li>
                    <Link to={profileLink} className="justify-between">
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link to={dashboardLink} className="justify-between">
                      Dashboard
                    </Link>
                  </li>
                  <li onClick={handleLogout} className="cursor-pointer">
                    <a href="#"> Logout</a>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
