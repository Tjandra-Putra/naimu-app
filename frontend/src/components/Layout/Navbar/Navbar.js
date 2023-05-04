import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import "./Navbar.css";
import { productList } from "../../../data/data";

const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.userReducer); // getting the user state from the Redux store
  const { cart } = useSelector((state) => state.cartReducer);

  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchResults, setSearchResults] = React.useState([]);

  const handleSearchChange = (e) => {
    let term = e.target.value;
    setSearchTerm(term);

    const filteredProducts =
      productList &&
      productList.filter((product) => product.product_title.toLowerCase().includes(searchTerm.toLowerCase()));

    setSearchResults(filteredProducts);

    if (term === "") setSearchResults([]);
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
                <Link
                  className="nav-link dropdown-toggle"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Categories
                </Link>
                <ul className="dropdown-menu">
                  {productList && productList.length > 0
                    ? productList.map((item, index) => (
                        <li key={index}>
                          <Link
                            className="dropdown-item"
                            to={`/products?category=${item.product_category.toLowerCase()}`}
                          >
                            {item.product_category}
                          </Link>
                        </li>
                      ))
                    : null}
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
                  <span className="input-group-text search-icon border-0" id="basic-addon1">
                    <i className="fas fa-search fa-lg"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control search-input shadow-none"
                    placeholder="Search"
                    value={searchTerm}
                    onChange={handleSearchChange}
                  />

                  {searchResults && searchResults.length > 0 ? (
                    <div className="search-results">
                      <div className="header">Products</div>
                      {searchResults &&
                        searchResults.map((result, index) => {
                          const productTitle = result.product_title.replace(/\s+/g, "-");
                          return (
                            <Link
                              to={`/products/${result._id}`}
                              key={index}
                              className="text-decoration-none"
                              onClick={() => setSearchResults([])}
                            >
                              <div className="row py-2">
                                <div className="col-md-4">
                                  <img
                                    src={result.product_image_url[0].url}
                                    alt={result.product_title}
                                    className="img-fluid search-result-img"
                                  />
                                </div>
                                <div className="col-md-8">
                                  <div className="search-result-item-title">{result.product_title}</div>
                                  <div className="search-result-item-category">{result.product_category}</div>
                                  <div className="search-result-item-price">${result.product_price}</div>
                                </div>
                              </div>
                            </Link>
                          );
                        })}
                    </div>
                  ) : null}
                </div>
              </li>

              {isAuthenticated && user.user.avatar ? (
                <li className="nav-item nav-link-size">
                  <Link className="nav-link" to="/orders">
                    <img
                      src={`http://localhost:8000/${user.user.avatar}`}
                      alt={user.user.avatar}
                      className="img-fluid profile-img"
                    />
                  </Link>
                </li>
              ) : (
                <li>
                  <Link className="nav-link" to="/login">
                    <i className="fa-regular fa-user fa-lg pe-1"></i>
                  </Link>
                </li>
              )}
              <li className="nav-item nav-link-size">
                <Link className="nav-link" to="/favourite">
                  <i className="fa-regular fa-heart fa-lg ps-1"></i>
                </Link>
              </li>
              <li className="nav-item nav-link-size">
                <Link className="nav-link position-relative" to="/cart">
                  <i className="fas fa-shopping-cart ps-0"></i>
                  <span className="position-absolute top-1 translate-middle badge rounded-pill cart-quantity">
                    {cart.length}
                  </span>
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
