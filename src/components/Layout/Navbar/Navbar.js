import React from "react";
import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="navbar-wrapper">
      <nav className="navbar navbar-expand-lg">
        <div className="container">
          <a className="navbar-brand" href="#">
            NAIMU
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item dropdown px-2">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Categories
                </a>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="#">
                      Action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Another action
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      Something else here
                    </a>
                  </li>
                </ul>
              </li>
              <li className="nav-item px-2">
                <a className="nav-link" aria-current="page" href="#">
                  Best Selling
                </a>
              </li>
              <li className="nav-item px-2">
                <a className="nav-link" aria-current="page" href="#">
                  Products
                </a>
              </li>
              <li className="nav-item px-2">
                <a className="nav-link" aria-current="page" href="#">
                  Events
                </a>
              </li>
            </ul>
            <ul className="navbar-nav ms-auto">
              <li className="nav-item px-2">
                <a className="nav-link" aria-current="page" href="#">
                  <i class="fas fa-search fa-lg pe-2"></i> Search
                </a>
              </li>
              <li className="nav-item px-2">
                <a className="nav-link" aria-current="page" href="#">
                  <i class="fa-regular fa-heart fa-lg pe-2"></i> Favourite
                </a>
              </li>
              <li className="nav-item px-2">
                <a className="nav-link" aria-current="page" href="#">
                  <i class="fas fa-shopping-cart pe-2"></i> Cart
                </a>
              </li>
              <li className="nav-item ps-2">
                <a className="nav-link" aria-current="page" href="#">
                  <i class="fa-regular fa-user fa-lg pe-2"></i> Account
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
