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
      icon: "fa-solid fa-user-shield icon-size",
      activeLink: "admin-dashboard",
    },
    {
      name: "Orders",
      link: "/admin/orders",
      icon: "fa-solid fa-bag-shopping icon-size",
      activeLink: "admin-orders",
    },
    {
      name: "Products",
      link: "/admin/products",
      icon: "fa-solid fa-box-open icon-size",
      activeLink: "admin-products",
    },
    {
      name: "Promocodes",
      link: "/admin/promocodes",
      icon: "fa-solid fa-tags icon-size",
      activeLink: "admin-promocode",
    },
    {
      name: "Inboxes",
      link: "/admin/inboxes",
      icon: "far fa-comment-dots icon-size",
      activeLink: "admin-inbox",
    },
    {
      name: "Users",
      link: "/admin/users",
      icon: "far fa-user-circle icon-size",
      activeLink: "admin-inbox",
    },
  ];

  // userNavItems
  const userNavItems = [
    {
      name: "Profile",
      link: "/profile",
      icon: "far fa-user-circle icon-size",
      activeLink: "profile",
    },
    {
      name: "My Orders",
      link: "/orders",
      icon: "fas fa-shopping-cart icon-size",
      activeLink: "orders",
    },
    // {
    //   name: "Refunds",
    //   link: "/refunds",
    //   icon: "fa fa-backspace icon-size",
    //   activeLink: "refunds",
    // },

    {
      name: "Inbox",
      link: "/inbox",
      icon: "far fa-comment-dots icon-size",
      activeLink: "inbox",
    },
    {
      name: "Change Password",
      link: "/password-change",
      icon: "fas fa-key icon-size",
      activeLink: "password-change",
    },
    {
      name: "Addresses",
      link: "/addresses",
      icon: "fas fa-map-marker-alt icon-size",
      activeLink: "addresses",
    },
    // {
    //   name: "Track Order",
    //   link: "/track-order",
    //   icon: "fa fa-truck",
    //   activeLink: "track-order icon-size",
    // },
    {
      name: "Logout",
      link: null,
      icon: "fas fa-sign-out-alt icon-size",
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
        onClick={item.name === "Logout" ? logoutHandler : undefined}
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
