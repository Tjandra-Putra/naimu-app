import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useState, useMemo } from "react";

import "./SideNavbar.css";
import { logout } from "../../../redux/actions/user";

const SideNavbar = ({ activeLink }) => {
  const { user } = useSelector((state) => state.userReducer); // getting the user state from the Redux store
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);

  // toast component
  const notifySuccess = (message) => toast.success(message, { duration: 5000 });

  // logout user
  const logoutHandler = () => {
    notifySuccess("Logged out successfully");
    dispatch(logout());
  };

  const adminNavItems = [
    {
      name: "Admin Dashboard",
      link: "/admin/dashboard",
      icon: "fa-solid fa-user-shield",
      activeLink: "admin-dashboard",
    },
    {
      name: "Orders",
      link: "/admin/orders",
      icon: "fa-solid fa-bag-shopping",
      activeLink: "admin-orders",
    },
    {
      name: "Products",
      link: "/admin/products",
      icon: "fa-solid fa-box-open",
      activeLink: "admin-products",
    },
    {
      name: "Promocodes",
      link: "/admin/promocodes",
      icon: "fa-solid fa-tags",
      activeLink: "admin-promocode",
    },
    {
      name: "Inboxes",
      link: "/admin/inboxes",
      icon: "far fa-comment-dots",
      activeLink: "admin-inbox",
    },
  ];

  // userNavItems
  const userNavItems = [
    {
      name: "Profile",
      link: "/profile",
      icon: "far fa-user-circle fa-lg",
      activeLink: "profile",
    },
    {
      name: "My Orders",
      link: "/orders",
      icon: "fas fa-shopping-cart",
      activeLink: "orders",
    },
    // {
    //   name: "Refunds",
    //   link: "/refunds",
    //   icon: "fa fa-backspace",
    //   activeLink: "refunds",
    // },

    {
      name: "Inbox",
      link: "/inbox",
      icon: "far fa-comment-dots",
      activeLink: "inbox",
    },
    {
      name: "Change Password",
      link: "/password-change",
      icon: "fas fa-key",
      activeLink: "password-change",
    },
    {
      name: "Addresses",
      link: "/addresses",
      icon: "fas fa-map-marker-alt",
      activeLink: "addresses",
    },
    // {
    //   name: "Track Order",
    //   link: "/track-order",
    //   icon: "fa fa-truck",
    //   activeLink: "track-order",
    // },
    {
      name: "Logout",
      link: null,
      icon: "fas fa-sign-out-alt",
      activeLink: "logout",
    },
  ];

  // useMemo adminNavItems
  const adminNavItemsMemo = useMemo(() => {
    const firstItem = adminNavItems[0];
    const remainingItems = adminNavItems.slice(1); // removes the first item from the array

    return (
      <>
        <Link
          to={firstItem.link}
          className={`list-group-item ${activeLink === firstItem.activeLink ? "active" : ""}`}
          onClick={() => {
            if (firstItem.activeLink === "admin-dashboard") {
              setShow(!show); // Show the rest of the adminNavItems
            }
          }}
        >
          <div className="d-flex flex-row justify-content-between">
            <div>
              <span className="icon-wrapper">
                <i className={`${firstItem.icon} me-3`}></i>
              </span>
              <span>{firstItem.name}</span>
            </div>
            <div>
              {show ? <i className="fas fa-chevron-up ms-2"></i> : <i className="fas fa-chevron-down ms-2"></i>}
            </div>
          </div>
          {/* {firstItem.name} {!show && <i className="fas fa-chevron-down ms-2"></i>} */}
        </Link>
        {show &&
          remainingItems.map((item, index) => (
            <Link
              to={item.link}
              className={`list-group-item ${activeLink === item.activeLink ? "active" : ""}`}
              key={index}
              style={{ transition: "max-height 0.3s ease-in-out", maxHeight: "100px", overflow: "hidden" }}
            >
              <span className="icon-wrapper">
                <i className={`${item.icon} me-3`}></i>
              </span>
              {item.name}
            </Link>
          ))}
      </>
    );
  }, [activeLink, show]);

  // useMemo userNavItems
  const userNavItemsMemo = useMemo(() => {
    return userNavItems.map((item, index) => (
      <Link
        to={item.link}
        className={`list-group-item ${activeLink === item.activeLink ? "active" : ""}`}
        key={index}
        onClick={item.name === "logout" ? logoutHandler : undefined}
      >
        <span className="icon-wrapper">
          <i className={`${item.icon} me-3`}></i>
        </span>
        {item.name}
      </Link>
    ));
  }, [activeLink]);

  return (
    <div className="side-navbar-wrapper">
      {/* Admin navbar */}
      {user?.user?.role === "admin" && <ul className="list-group mb-3">{adminNavItemsMemo}</ul>}

      {/* Normal user navbar */}
      <ul className="list-group">{userNavItemsMemo}</ul>
    </div>
  );
};

export default SideNavbar;
