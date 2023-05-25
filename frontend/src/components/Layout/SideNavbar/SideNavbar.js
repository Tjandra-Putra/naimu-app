import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import "./SideNavbar.css";
import { logout } from "../../../redux/actions/user";

const SideNavbar = ({ activeLink }) => {
  const { user } = useSelector((state) => state.userReducer); // getting the user state from the Redux store

  // toast component
  const notifySuccess = (message) => toast.success(message, { duration: 5000 });

  const dispatch = useDispatch();

  // logout user
  const logoutHandler = () => {
    notifySuccess("Logged out successfully");
    dispatch(logout());
  };

  return (
    <div className="side-navbar-wrapper">
      {/* Admin navbar */}

      {user?.user?.role === "admin" && (
        <ul className="list-group mb-3">
          <Link to="/admin/dashboard" className={`list-group-item ${activeLink === "admin-dashboard" ? "active" : ""}`}>
            <span className="icon-wrapper">
              <i className="fa-solid fa-user-shield me-3"></i>
            </span>
            Admin Dashboard
          </Link>
          <Link to="/admin/orders" className={`list-group-item ${activeLink === "admin-orders" ? "active" : ""}`}>
            <span className="icon-wrapper">
              <i className="fa-solid fa-bag-shopping me-3"></i>
            </span>
            Orders
          </Link>
          <Link to="/admin/products" className={`list-group-item ${activeLink === "admin-products" ? "active" : ""}`}>
            <span className="icon-wrapper">
              <i className="fa-solid fa-box-open me-3"></i>
            </span>
            Products
          </Link>
          <Link
            to="/admin/promocodes"
            className={`list-group-item ${activeLink === "admin-promocode" ? "active" : ""}`}
          >
            <span className="icon-wrapper">
              <i className="fa-solid fa-tags me-3"></i>
            </span>
            Promocodes
          </Link>
          <Link to="/admin/inboxes" className={`list-group-item ${activeLink === "admin-inbox" ? "active" : ""}`}>
            <span className="icon-wrapper">
              <i className="far fa-comment-dots me-3"></i>
            </span>
            Inboxes
          </Link>
        </ul>
      )}

      {/* Normal user navbar */}

      <ul className="list-group">
        <Link to="/profile" className={`list-group-item ${activeLink === "profile" ? "active" : ""}`}>
          <span className="icon-wrapper">
            <i className="far fa-user-circle fa-lg me-3"></i>
          </span>
          Profile
        </Link>
        <Link to="/orders" className={`list-group-item ${activeLink === "orders" ? "active" : ""}`}>
          <span className="icon-wrapper">
            <i className="fas fa-shopping-cart  me-3"></i>
          </span>
          My Orders
        </Link>
        {/* <Link to="/refunds" className={`list-group-item ${activeLink === "refunds" ? "active" : ""}`}>
          <span className="icon-wrapper">
            <i className="fa fa-backspace me-3"></i>
          </span>
          Refunds
        </Link> */}
        <Link to="/inbox" className={`list-group-item ${activeLink === "inbox" ? "active" : ""}`}>
          <span className="icon-wrapper">
            <i className="far fa-comment-dots me-3"></i>
          </span>
          Inbox
        </Link>
        {/* <Link to="/track-order" className={`list-group-item ${activeLink === "track-order" ? "active" : ""}`}>
          <span className="icon-wrapper">
            <i className="fas fa-location me-3"></i>
          </span>
          Track Order
        </Link> */}
        <Link to="/password-change" className={`list-group-item ${activeLink === "password-change" ? "active" : ""}`}>
          <span className="icon-wrapper">
            <i className="fa-solid fa-lock me-3"></i>
          </span>
          Change Password
        </Link>
        <Link to="/addresses" className={`list-group-item ${activeLink === "addresses" ? "active" : ""}`}>
          <span className="icon-wrapper">
            <i className="far fa-address-book me-3"></i>
          </span>
          Addresses
        </Link>

        <Link onClick={logoutHandler} className={`list-group-item ${activeLink === "logout" ? "active" : ""}`}>
          <span className="icon-wrapper">
            <i className="fas fa-sign-out me-3"></i>
          </span>
          Logout
        </Link>
      </ul>
    </div>
  );
};

export default SideNavbar;
