import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaShoppingCart, FaUserAlt, FaMusic, FaSignOutAlt, FaClipboardList } from "react-icons/fa";
import { logout } from "../services/authService";

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const hideNavbarRoutes = ["/login", "/register"];

  const userToken = localStorage.getItem("token");

  if (hideNavbarRoutes.includes(location.pathname)) return null;

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="bg-gray-800 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold flex items-center">
          <FaMusic className="mr-2" />
          <span className="font-sans">SoundWave Shop</span>
        </Link>
        <div className="flex items-center gap-4">
          {userToken && (
            <>
              <Link
                to="/order-history"
                className={`flex items-center hover:text-gray-300 ${location.pathname === "/order-history" ? "text-blue-400" : ""
                  }`}
              >
                <FaClipboardList className="mr-1" />
                Orders
              </Link>
              <Link
                to="/order-history"
                className={`flex items-center hover:text-gray-300 ${location.pathname === "/cart" ? "text-blue-400" : ""
                  }`}
              >
                <FaShoppingCart className="mr-1" />
                Cart
              </Link>
            </>

          )}

          {!userToken ? (
            <>
              <Link
                to="/login"
                className={`flex items-center hover:text-gray-300 ${location.pathname === "/login" ? "text-blue-400" : ""
                  }`}
              >
                <FaUserAlt className="mr-1" />
                Login
              </Link>
              <Link
                to="/register"
                className={`flex items-center hover:text-gray-300 ${location.pathname === "/register" ? "text-blue-400" : ""
                  }`}
              >
                <FaUserAlt className="mr-1" />
                Register
              </Link>
            </>
          ) : (
            <button onClick={handleLogout} className="flex items-center hover:text-gray-300">
              <FaSignOutAlt className="mr-1" />
              Logout
            </button>
          )}

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
