import "./SideNavbar.css";
import { Link } from "react-router-dom";

const SideNavbar = ({ activeLink }) => {
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
        <Link to="/payment-methods" class={`list-group-item ${activeLink === "payment-methods" ? "active" : ""}`}>
          <span>
            <i class="far fa-credit-card me-3"></i>
          </span>
          Payment Methods
        </Link>
        <Link to="/address" class={`list-group-item ${activeLink === "address" ? "active" : ""}`}>
          <span>
            <i class="far fa-address-book me-3"></i>
          </span>
          Address
        </Link>
        <Link to="/logout" class={`list-group-item ${activeLink === "logout" ? "active" : ""}`}>
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
