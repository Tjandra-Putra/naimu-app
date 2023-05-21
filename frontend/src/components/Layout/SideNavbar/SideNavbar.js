import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import "./SideNavbar.css";
import { logout } from "../../../redux/actions/user";
import { useEffect } from "react";

const SideNavbar = ({ activeLink }) => {
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
      <ul class="list-group">
        <Link to="/profile" class={`list-group-item ${activeLink === "profile" ? "active" : ""}`}>
          <span>
            <i class="far fa-user-circle fa-lg me-3"></i>
          </span>
          Profile
        </Link>
        <Link to="/orders" class={`list-group-item ${activeLink === "orders" ? "active" : ""}`}>
          <span>
            <i class="fas fa-shopping-cart  me-3"></i>
          </span>
          Orders
        </Link>
        <Link to="/refunds" class={`list-group-item ${activeLink === "refunds" ? "active" : ""}`}>
          <span>
            <i class="fa fa-backspace me-3"></i>
          </span>
          Refunds
        </Link>
        <Link to="/inbox" class={`list-group-item ${activeLink === "inbox" ? "active" : ""}`}>
          <span>
            <i class="far fa-comment-dots me-3"></i>
          </span>
          Inbox
        </Link>
        <Link to="/track-order" class={`list-group-item ${activeLink === "track-order" ? "active" : ""}`}>
          <span>
            <i class="fas fa-location me-3"></i>
          </span>
          Track Order
        </Link>
        <Link to="/password-change" class={`list-group-item ${activeLink === "password-change" ? "active" : ""}`}>
          <span>
            <i class="fa-solid fa-lock me-3"></i>
          </span>
          Change Password
        </Link>
        <Link to="/addresses" class={`list-group-item ${activeLink === "addresses" ? "active" : ""}`}>
          <span>
            <i class="far fa-address-book me-3"></i>
          </span>
          Addresses
        </Link>
        <Link onClick={logoutHandler} class={`list-group-item ${activeLink === "logout" ? "active" : ""}`}>
          <span>
            <i class="fas fa-sign-out me-3"></i>
          </span>
          Logout
        </Link>
      </ul>
    </div>
  );
};

export default SideNavbar;
