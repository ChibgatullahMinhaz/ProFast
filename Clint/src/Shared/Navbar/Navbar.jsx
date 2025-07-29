import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import NavLinks from "./Navlinks";
import GoFastLogo from "../GoFastLogo/GoFastLogo";
import { Link, NavLink } from "react-router";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

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
          className="md:hidden btn btn-ghost btn-circle"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>

        {/* Auth Buttons for md+ */}
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
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full z-50 shadow-md md:hidden bg-orange-400">
          <ul className="menu menu-vertical p-4 gap-2 text-base">
            <NavLinks onClick={() => setIsOpen(false)} />
            <Link to={"/auth/login"}>
              <button className="btn text">Login</button>
            </Link>
            <Link to={"/auth/register"}>
              <button className="btn text">SignUp</button>
            </Link>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
