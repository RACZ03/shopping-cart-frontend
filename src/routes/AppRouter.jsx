import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "../pages/Home";
import Cart from "../pages/Cart";
import OrderHistory from "../pages/OrderHistory";
import Profile from "../pages/Profile";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Navbar from "../components/Navbar";
import PrivateRoute from "./PrivateRoute";

const AppRouter = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Private routes (authentication required) */}
        <Route element={<PrivateRoute />}>
          <Route path="/cart" element={<Cart />} />
          <Route path="/order-history" element={<OrderHistory />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
