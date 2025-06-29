import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";

import "./Navbar.css";
import Loader from "../Loader/Loader";
import { server, imagePath } from "../../../server";

const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.userReducer); // getting the user state from the Redux store
  const { cart } = useSelector((state) => state.cartReducer);
  const { favourites } = useSelector((state) => state.favouriteReducer);
  const location = useLocation();

  const [isLoading, setIsLoading] = useState(false); // [state, setState
  const [searchTerm, setSearchTerm] = React.useState("");
  const [searchResults, setSearchResults] = React.useState([]);
  const [productList, setProductList] = useState([]); // [state, setState]
  const [mobileSearch, setMobileSearch] = useState(false); // when clicked, show search bar on mobile

  useEffect(() => {
    const navbarCollapse = document.getElementById("navbarSupportedContent");
    navbarCollapse.classList.remove("show");
  }, [location]);

  // import product from backend
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      const { data } = await axios.get(`${server}/product/all-products`);
      setProductList(data.products);
      setIsLoading(false);
    };

    fetchProducts();
  }, []);

  const handleSearchChange = (e) => {
    let term = e.target.value;
    setSearchTerm(term);

    const filteredProducts = productList && productList.filter((product) => product.title.toLowerCase().includes(term.toLowerCase()));

    setSearchResults(filteredProducts);

    if (term === "") setSearchResults([]);
  };

  return (
    <div className="navbar-wrapper">
      {/* Visible on mobile only */}

      {mobileSearch && (
        <div className="mobile-search-navbar d-sm-none">
          <div className="input-group-wrapper">
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
            </div>
          </div>
          <i class="fa-solid fa-xmark close" onClick={() => setMobileSearch(!mobileSearch)}></i>

          {searchResults && searchResults.length > 0 ? (
            <div className="search-results">
              <div className="header">Products</div>
              {searchResults &&
                searchResults.map((result, index) => {
                  return (
                    <Link to={`/products/${result._id}`} key={index} className="text-decoration-none" onClick={() => setSearchResults([])}>
                      <div className="row py-2 result-container">
                        <div className="col-md-4 col-4">
                          <img src={result.imageUrl[0].url} alt={result.title} className="img-fluid search-result-img" />
                        </div>
                        <div className="col-md-8 col-8">
                          <div className="search-result-item-title">{result.title}</div>
                          <div className="search-result-item-category">{result.category}</div>
                          <div className="search-result-item-price">${result.price}</div>
                        </div>
                      </div>
                    </Link>
                  );
                })}
            </div>
          ) : null}
        </div>
      )}

      <nav className="navbar navbar-expand-lg">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Naimu.
          </Link>

          {/* Visible on mobile only */}
          <div className="mobile-navbar d-sm-none">
            <div className={mobileSearch ? "mobile-search showNavbar" : "mobile-search"} onClick={() => setMobileSearch(!mobileSearch)}>
              <i className="fas fa-search fa-lg search"></i>
            </div>

            <div className="mobile-avatar">
              {isAuthenticated && user ? (
                <Link className="nav-link" to="/profile">
                  <img src={user.user.avatar} alt={user.user.avatar} className="img-fluid profile-img" />
                </Link>
              ) : (
                <Link className="nav-link" to="/login">
                  <i className="fa-regular fa-user fa-lg pe-1 nav-link-icon"></i>
                </Link>
              )}
            </div>
            <div className="mobile-favourite">
              <Link className="nav-link position-relative" to="/favourite">
                <i className="fa-regular fa-heart fa-lg nav-link-icon"></i>

                <span className="position-absolute top-1 translate-middle badge rounded-pill favourite">
                  {isAuthenticated && favourites ? favourites?.favouriteItems?.length : 0}
                </span>
              </Link>
            </div>
            <div className="mobile-cart">
              <Link className="nav-link position-relative" to="/cart">
                <i className="fas fa-shopping-cart ps-0 nav-link-icon"></i>
                <span className="position-absolute top-1 translate-middle badge rounded-pill cart-quantity">{cart?.length}</span>
              </Link>
            </div>
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
          </div>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item dropdown px-2 categories-dropdown">
                <Link className="nav-link dropdown-toggle" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Categories
                </Link>
                <ul className="dropdown-menu">
                  {productList
                    ? [...new Set(productList.map((item) => item.category))].map((category, index) => (
                        <li key={index}>
                          <Link className="dropdown-item" to={`/products?category=${category.toLowerCase()}`}>
                            {category}
                          </Link>
                        </li>
                      ))
                    : null}
                </ul>
              </li>
              <li className="nav-item px-2">
                <Link className="nav-link" to="/products?sort=popularity">
                  Featured
                </Link>
              </li>
              <li className="nav-item px-2">
                <Link className="nav-link" to="/products">
                  Products
                </Link>
              </li>
            </ul>
            <ul className="navbar-nav ms-auto mobile-hidden">
              <li className="nav-item pe-4">
                <div className="input-group-wrapper">
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
                            return (
                              <Link to={`/products/${result._id}`} key={index} className="text-decoration-none" onClick={() => setSearchResults([])}>
                                <div className="row py-2 result-container">
                                  <div className="col-md-4">
                                    <img src={result.imageUrl[0].url} alt={result.title} className="img-fluid search-result-img" />
                                  </div>
                                  <div className="col-md-8">
                                    <div className="search-result-item-title">{result.title}</div>
                                    <div className="search-result-item-category">{result.category}</div>
                                    <div className="search-result-item-price">${result.price}</div>
                                  </div>
                                </div>
                              </Link>
                            );
                          })}
                      </div>
                    ) : null}
                  </div>
                </div>
              </li>

              {isAuthenticated && user ? (
                <li className="nav-item nav-link-size">
                  <Link className="nav-link" to="/profile">
                    {/* <img
                      src={`${imagePath}/${user.user.avatar}`}
                      alt={user.user.avatar}
                      className="img-fluid profile-img "
                    /> */}

                    <img src={user.user.avatar} alt={user.user.avatar} className="img-fluid profile-img " />
                  </Link>
                </li>
              ) : (
                <li className="nav-item nav-link-size">
                  <Link className="nav-link" to="/login">
                    <i className="fa-regular fa-user fa-lg pe-1 nav-link-icon"></i>
                  </Link>
                </li>
              )}
              <li className="nav-item nav-link-size">
                <Link className="nav-link position-relative" to="/favourite">
                  <i className="fa-regular fa-heart fa-lg nav-link-icon"></i>

                  <span className="position-absolute top-1 translate-middle badge rounded-pill favourite">
                    {isAuthenticated && favourites ? favourites?.favouriteItems?.length : 0}
                  </span>
                </Link>
              </li>
              <li className="nav-item nav-link-size">
                <Link className="nav-link position-relative" to="/cart">
                  <i className="fas fa-shopping-cart ps-0 nav-link-icon"></i>
                  <span className="position-absolute top-1 translate-middle badge rounded-pill cart-quantity">{cart?.length}</span>
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
