import { useState } from "react";
import { NavLink } from "react-router-dom";
import{Link} from 'react-router-dom'

function Nav() {
  const [open, setOpen] = useState(false);

  const linkClass = ({ isActive }) =>
    `block px-4 py-2 rounded transition-all duration-300
     ${isActive ? "bg-blue-600 text-white" : "text-gray-300 hover:bg-gray-700 hover:text-white"}`;

  return (
    <nav className="bg-gray-900 shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">

          {/* LOGO */}
          <Link to='/'><div className="text-white font-bold text-xl tracking-wide">
            🏠 HouseML
          </div></Link>

          {/* DESKTOP MENU */}
          <div className="hidden md:flex space-x-4">
            <NavLink to="/" className={linkClass}>
              Home
            </NavLink>
            <NavLink to="/predict" className={linkClass}>
              Predict
            </NavLink>
            <NavLink to="/recents" className={linkClass}>
              History
            </NavLink>
            
          </div>

          {/* MOBILE BUTTON */}
          <div className="md:hidden">
            <button
              onClick={() => setOpen(!open)}
              className="text-gray-300 hover:text-white focus:outline-none"
            >
              ☰
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      {open && (
        <div className="md:hidden bg-gray-800 px-2 pb-3 space-y-1">
          <NavLink onClick={() => setOpen(false)} to="/" className={linkClass}>
            Home
          </NavLink>
          <NavLink onClick={() => setOpen(false)} to="/predict" className={linkClass}>
            Predict
          </NavLink>
          <NavLink onClick={() => setOpen(false)} to="/recents" className={linkClass}>
            History
          </NavLink>
          
        </div>
      )}
    </nav>
  );
}

export default Nav;
