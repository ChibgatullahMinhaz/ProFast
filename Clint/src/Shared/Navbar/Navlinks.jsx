// components/NavLinks.jsx
import { NavLink } from "react-router";

const links = [
  { name: "Services", path: "/services" },
  { name: "Coverage", path: "/coverage" },
  { name: "About Us", path: "/about" },
  { name: "Pricing", path: "/pricing" },
  { name: "Be a Rider", path: "/beRider" },
];

const NavLinks = ({ onClick }) => {
  return (
    <>
      {links.map((link) => (
        <li key={link.name}>
          <NavLink
            to={link.path}
            onClick={onClick}
            className={({ isActive }) =>
              isActive ? "text-primary font-semibold" : undefined
            }
          >
            {link.name}
          </NavLink>
        </li>
      ))}
    </>
  );
};

export default NavLinks;
