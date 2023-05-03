import React from "react";
import { Link } from "react-router-dom";

import "./Navbar.css";
import { productList } from "../../../data/data";

const Navbar = () => {
  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchProduct, setSearchProduct] = React.useState(null);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);

    const filteredProducts =
      productList &&
      productList.filter((product) => product.product_title.toLowerCase().includes(searchTerm.toLowerCase()));

    console.log(filteredProducts);

    setSearchProduct(filteredProducts);
  };

  return (
    <div className="navbar-wrapper">
      <nav className="navbar navbar-expand-lg">
        <div className="container">
          <Link className="navbar-brand" to="/">
            NAIMU.
          </Link>

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
                <Link className="nav-link" to="/products">
                  Best Selling
                </Link>
              </li>
              <li className="nav-item px-2">
                <Link className="nav-link" to="/products">
                  Products
                </Link>
              </li>
              <li className="nav-item px-2">
                <Link className="nav-link" to="/products">
                  Events
                </Link>
              </li>
            </ul>
            <ul className="navbar-nav ms-auto">
              <li className="nav-item pe-4">
                <div className="input-group search-group">
                  <span className="input-group-text search-input border-0" id="basic-addon1">
                    <i className="fas fa-search fa-lg"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control search-input border-0 shadow-none"
                    placeholder="Search"
                    value={searchProduct}
                    onChange={handleSearchChange}
                  />
                </div>
              </li>
              <li className="nav-item ps-2">
                <Link className="nav-link" to="/login">
                  <i className="fa-regular fa-user fa-lg pe-1"></i>
                </Link>
              </li>
              <li className="nav-item px-2">
                <Link className="nav-link" to="/cart">
                  <i className="fa-regular fa-heart fa-lg ps-1"></i>
                </Link>
              </li>
              <li className="nav-item px-2">
                <Link className="nav-link" to="/cart">
                  <i className="fas fa-shopping-cart ps-0"></i>
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
