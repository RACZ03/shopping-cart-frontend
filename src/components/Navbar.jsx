import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaUserAlt, FaMusic, FaSignOutAlt, FaClipboardList, FaBars, FaTimes } from "react-icons/fa";
import { logout } from "../services/authService";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const hideNavbarRoutes = ["/login", "/register"];
  const userToken = localStorage.getItem("token");

  if (hideNavbarRoutes.includes(location.pathname)) return null;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-gray-900 text-white py-4 shadow-lg">
      <div className="container mx-auto flex justify-between items-center px-6">

        {/* Logo */}
        <Link to="/" className="text-2xl font-bold flex items-center gap-2 hover:text-blue-400 transition">
          <FaMusic className="text-blue-400" />
          <span className="font-sans">SoundWave Shop</span>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6">
          {userToken ? (
            <>
              <NavItem to="/order-history" icon={FaClipboardList} text="Orders" location={location} />
              <NavItem to="/cart" icon={FaShoppingCart} text="Cart" location={location} />
              <NavItem to="/profile" icon={FaUserAlt} text="Profile" location={location} />
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700 transition"
              >
                <FaSignOutAlt />
                Logout
              </button>
            </>
          ) : (
            <>
              <NavItem to="/login" icon={FaUserAlt} text="Login" location={location} />
              <NavItem to="/register" icon={FaUserAlt} text="Register" location={location} />
            </>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-2xl focus:outline-none" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-gray-800 py-4">
          <div className="flex flex-col items-center gap-4">
            {userToken ? (
              <>
                <NavItem to="/order-history" icon={FaClipboardList} text="Orders" location={location} />
                <NavItem to="/cart" icon={FaShoppingCart} text="Cart" location={location} />
                <NavItem to="/profile" icon={FaUserAlt} text="Profile" location={location} />
                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-4 py-2 bg-red-600 rounded-lg hover:bg-red-700 transition"
                >
                  <FaSignOutAlt />
                  Logout
                </button>
              </>
            ) : (
              <>
                <NavItem to="/login" icon={FaUserAlt} text="Login" location={location} />
                <NavItem to="/register" icon={FaUserAlt} text="Register" location={location} />
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

// Component to render navigation links dynamically
const NavItem = ({ to, icon: Icon, text, location }) => (
  <Link
    to={to}
    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${location.pathname === to ? "text-blue-400" : "hover:text-blue-400"
      }`}
  >
    <Icon />
    {text}
  </Link>
);

export default Navbar;
