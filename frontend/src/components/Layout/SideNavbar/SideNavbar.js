import "./SideNavbar.css";

const SideNavbar = () => {
  return (
    <div className="side-navbar-wrapper">
      <ul class="list-group">
        <li class="list-group-item">
          <span>
            <i class="far fa-user-circle fa-lg me-3"></i>
          </span>
          Profile
        </li>
        <li class="list-group-item active">
          <span>
            <i class="fas fa-shopping-cart  me-3"></i>
          </span>
          Orders
        </li>
        <li class="list-group-item">
          <span>
            <i class="fa fa-backspace me-3"></i>
          </span>
          Refunds
        </li>
        <li class="list-group-item">
          <span>
            <i class="far fa-comment-dots me-3"></i>
          </span>
          Inbox
        </li>
        <li class="list-group-item">
          <span>
            <i class="fas fa-location me-3"></i>
          </span>
          Track Order
        </li>
        <li class="list-group-item">
          <span>
            <i class="far fa-credit-card me-3"></i>
          </span>
          Payment Methods
        </li>
        <li class="list-group-item">
          <span>
            <i class="far fa-address-book me-3"></i>
          </span>
          Address
        </li>
        <li class="list-group-item">
          <span>
            <i class="fas fa-sign-out me-3"></i>
          </span>
          Logout
        </li>
      </ul>
    </div>
  );
};

export default SideNavbar;
