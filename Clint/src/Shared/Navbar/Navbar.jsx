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
          <button className="btn btn-ghost btn-sm">SignUp</button>
          <button className="btn btn-primary btn-sm">Login</button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full z-50 shadow-md md:hidden bg-orange-400">
          <ul className="menu menu-vertical p-4 gap-2 text-base">
            <NavLinks onClick={() => setIsOpen(false)} />
            <li>
              <a>SignUp</a>
            </li>
            <li>
              <a>Login</a>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
