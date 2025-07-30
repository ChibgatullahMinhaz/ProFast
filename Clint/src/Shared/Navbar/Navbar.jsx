import React, { useEffect, useRef, useState } from "react";
import { Menu, X } from "lucide-react";
import NavLinks from "./Navlinks";
import GoFastLogo from "../GoFastLogo/GoFastLogo";
import { Link, NavLink, useNavigate } from "react-router";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import { LogOut, LayoutDashboard } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout, userRole } = useAuth();

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();
  const navigate = useNavigate();

  // ✅ Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const goToDashboard = () => {
    console.log(userRole)
    if (!user || !userRole?.role) return;
    const role = userRole.role.toLowerCase();
    switch (role) {
      case "admin":
        navigate("/admin/dashboard");
        break;
      case "rider":
        navigate("/agent/dashboard");
        break;
      default:
        navigate("/user/dashboard");
    }
  };

  const handleLogout = () => {
    logout();
    // then show SweetAlert
    Swal.fire({
      title: "Logged out!",
      text: "You have been successfully logged out.",
      icon: "success",
      timer: 2000,
      showConfirmButton: false,
      timerProgressBar: true,
    });
  };

  return (
    <div className="navbar bg-white shadow-md px-4 relative flex items-center h-16 rounded-xl">
      <Link to={`/`} className="absolute left-4 flex items-end">
        <GoFastLogo />
      </Link>
      {/* Center: Nav Links */}
      <div className="mx-auto hidden md:flex">
        <ul className="menu menu-horizontal px-1 gap-4 text-base">
          <NavLinks />
        </ul>
      </div>

      {/* Right: Action Buttons & Hamburger */}
      <div className="absolute right-4 flex items-center gap-2">
        {/* Mobile menu button */}
        <button
          className="md:hidden btn-ghost btn-circle"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        {!user ? (
          <div className="hidden md:flex gap-2">
            <Link to={"/auth/login"}>
              <button className="btn bg-[#C4E275] rounded-lg border-none text">
                Login
              </button>
            </Link>
            <Link to={"/auth/register"}>
              <button className="btn bg-[#C4E275] rounded-lg border-none text">
                SignUp
                <svg class="icon" viewBox="0 0 24 24" fill="currentColor">
                  <path
                    fill-rule="evenodd"
                    d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zm4.28 10.28a.75.75 0 000-1.06l-3-3a.75.75 0 10-1.06 1.06l1.72 1.72H8.25a.75.75 0 000 1.5h5.69l-1.72 1.72a.75.75 0 101.06 1.06l3-3z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </button>
            </Link>
          </div>
        ) : (
          <div className="hidden md:block relative z-50" ref={dropdownRef}>
            <div
              className="btn btn-ghost btn-circle avatar"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            >
              <div className="w-10 rounded-full border-2 border-primary">
                <img src={user.photoURL} alt="profile" />
              </div>
            </div>
            {dropdownOpen && (
              <ul className="absolute right-0 mt-2 w-52 bg-base-100 rounded-md shadow-lg p-2 z-50">
                <li className="text-gray-800 font-semibold cursor-default">
                  {user.displayName}
                </li>
                <li>
                  <button
                    onClick={goToDashboard}
                    className="flex items-center gap-2 hover:bg-base-200"
                  >
                    <LayoutDashboard size={16} /> Dashboard
                  </button>
                </li>
                <li>
                  <button
                    onClick={handleLogout}
                    className="flex items-center text-red-600 hover:bg-base-200 gap-2"
                  >
                    <LogOut size={16} /> Logout
                  </button>
                </li>
              </ul>
            )}
          </div>
        )}
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full z-50 shadow-md md:hidden bg-orange-400">
          <ul className="menu menu-vertical p-4 gap-2 text-base">
            <NavLinks onClick={() => setIsOpen(false)} />

            {!user ? (
              <>
                <Link to={"/auth/login"}>
                  <button className="btn text w-full">Login</button>
                </Link>
                <Link to={"/auth/register"}>
                  <button className="btn text w-full">SignUp</button>
                </Link>
              </>
            ) : (
              <>
                <li className="text-white font-semibold">{user.displayName}</li>
                <li>
                  <button
                    onClick={() => {
                      goToDashboard();
                      setIsOpen(false);
                    }}
                    className="flex items-center gap-2 text-white"
                  >
                    <LayoutDashboard size={16} /> Dashboard
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsOpen(false);
                    }}
                    className="flex items-center gap-2 text-red-200"
                  >
                    <LogOut size={16} /> Logout
                  </button>
                </li>
              </>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
