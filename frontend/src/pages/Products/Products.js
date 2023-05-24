import { Link, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import axios from "axios";

import "./Products.css";
import ProductCard from "../../components/ProductCard/ProductCard";
import Loader from "../../components/Layout/Loader/Loader";
import { server } from "../../server";

const Products = () => {
  const navigate = useNavigate();

  // other states
  const [productList, setProductList] = useState([]);
  const [filteredProductList, setFilteredProductList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [url, setUrl] = useState(new URL(window.location.href)); // set up URL state and onChange handler for checkboxes
  const [filterTag, setFilterTag] = useState([]); // badge component for applied filters
  const [sortOption, setSortOption] = useState("");

  //  availablePrices array is not expected to change during the component's lifecycle, we can memoize it using the useMemo hook instead of recreating it on each render
  const availablePrices = useMemo(
    () => [
      { id: 1, price: "20, 50" },
      { id: 2, price: "51, 100" },
    ],
    []
  );

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(6);

  // pagination filter logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProductList.slice(indexOfFirstProduct, indexOfLastProduct);

  // pagination change page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  // Generate the page numbers based on the number of products and products per page:
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(filteredProductList.length / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  // sort products by asc, desc and popularity
  const handleSortChange = (option) => {
    // update url params
    const searchParams = new URLSearchParams(url.search);
    searchParams.set("sort", option);

    const newUrl = new URL(url);
    newUrl.search = searchParams.toString();

    setUrl(newUrl);

    // update URL without reloading the page
    navigate(`/products${newUrl.search}`, { replace: true });
  };

  // delete from search params handler
  const handleDeleteFromSearchParams = (filterName) => {
    const searchParams = new URLSearchParams(url.search);

    if (filterName === "asc" || filterName === "desc" || filterName === "popularity") {
      searchParams.delete("sort");

      const newUrl = new URL(url);
      newUrl.search = searchParams.toString();

      setUrl(newUrl);

      // update URL without reloading the page
      navigate(`/products${newUrl.search}`, { replace: true });
    } else {
      // Create an array to store the new parameter entries
      const newParams = [];

      // Iterate over all entries in searchParams using the .entries() method
      for (const [key, value] of searchParams.entries()) {
        // Check if the key and value match the pair to be removed
        if (key === "category" && value === filterName) {
          continue; // Skip this key-value pair
        }

        if (key === "brand" && value === filterName) {
          continue; // Skip this key-value pair
        }

        if (key === "price" && value === filterName) {
          continue; // Skip this key-value pair
        }

        // Add the key-value pair to the newParams array
        newParams.push([key, value]);
      }

      const newUrl = new URL(url);

      // Set the new URL parameters using the newParams array
      newUrl.search = new URLSearchParams(newParams).toString();

      setUrl(newUrl);

      // Update URL without reloading the page
      navigate(`/products${newUrl.search}`, { replace: true });
    }
  };

  // filter product by category, price, brand (shop name)
  const handleCheckboxChange = (e) => {
    const { name, value } = e.target;

    const searchParams = new URLSearchParams(url.search);

    if (e.target.checked) {
      searchParams.append(name, value.toLowerCase());
    } else {
      // remove only the unchecked checkbox's value
      const values = searchParams.getAll(name);
      const newValues = values.filter((v) => v !== value.toLowerCase());
      searchParams.delete(name);
      newValues.forEach((v) => searchParams.append(name, v.toLowerCase()));
    }

    const newUrl = new URL(url);
    newUrl.search = searchParams.toString();

    setUrl(newUrl);

    // update URL without reloading the page
    navigate(`/products${newUrl.search}`, { replace: true });
  };

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

  // search product by category, price, brand (shop name)
  useEffect(() => {
    const searchParams = new URLSearchParams(url.search);

    const filteredProducts = productList
      ? productList.filter((product) => {
          const category = searchParams.getAll("category");
          const brand = searchParams.getAll("brand");
          const price = searchParams.getAll("price");

          // this is for the filter badge components display purposes
          let combinedFilters = [...category, ...brand, ...price];

          setFilterTag(combinedFilters);

          // main filter logic
          // explanation: if the category array is not empty and the product's category is not included in the category array, return false
          // why: if the category array is empty, it means that the user did not select any category, so we should not filter by category
          if (category.length && !category.includes(product.category.toLowerCase())) {
            return false;
          }

          if (brand.length && !brand.includes(product.shop.name.toLowerCase())) {
            return false;
          }

          if (price.length) {
            const productPrice = product.discountPrice;

            const [minPrice, maxPrice] = price[0].split(",");
            // explanation: if the product's price is not between the min and max price, return false
            if (productPrice < minPrice || productPrice > maxPrice) {
              return false;
            }
          }
          // explanation; if the product passes all the above conditions, return true
          return true;
        })
      : [];

    // check for sort parameter
    if (searchParams.get("sort")) {
      const sortOption = searchParams.get("sort");

      // apply sorting based on sort option
      if (sortOption === "popularity") {
        filteredProducts.sort((a, b) => b.unitSold - a.unitSold);
      }

      if (sortOption === "asc") {
        filteredProducts.sort((a, b) => a.discountPrice - b.discountPrice);
      }

      if (sortOption === "desc") {
        filteredProducts.sort((a, b) => b.discountPrice - a.discountPrice);
      }

      setFilterTag((prev) => [...prev, sortOption]);
    }

    // add the sort option to filterTag
    if (sortOption) {
      setFilterTag((prev) => [...prev, sortOption]);
    }

    setFilteredProductList(filteredProducts);
  }, [productList, url, sortOption]);

  return isLoading ? (
    <Loader />
  ) : (
    <div className="products-wrapper">
      <div className="container">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <Link to="/" className="breadcrumb-item">
              Home
            </Link>
            <li className="breadcrumb-item active" aria-current="page">
              Browse Products
            </li>
          </ol>
        </nav>

        <div className="row">
          <div className="col-md-3">
            <div className="accordion" id="accordionExample">
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseOne"
                    aria-expanded="true"
                    aria-controls="collapseOne"
                  >
                    Category
                  </button>
                </h2>
                <div id="collapseOne" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                  <div className="accordion-body">
                    {productList
                      ? [...new Set(productList.map((item) => item.category))].map((category, index) => (
                          <li className="list-group-item mb-2" key={index}>
                            <input
                              className="form-check-input me-1"
                              type="checkbox"
                              value={category}
                              name="category"
                              id={category}
                              onChange={handleCheckboxChange}
                              checked={url.searchParams.getAll("category").includes(category.toLowerCase())}
                            />
                            <label className="form-check-label ms-2" htmlFor={category}>
                              {category}
                            </label>
                          </li>
                        ))
                      : null}
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseTwo"
                    aria-expanded="false"
                    aria-controls="collapseTwo"
                  >
                    Brands
                  </button>
                </h2>
                <div id="collapseTwo" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                  <div className="accordion-body">
                    {productList
                      ? [...new Set(productList.map((item) => item.shop.name))].map((brand, index) => (
                          <li className="list-group-item mb-2" key={index}>
                            <input
                              className="form-check-input me-1"
                              type="checkbox"
                              id={brand}
                              name="brand"
                              value={brand}
                              onChange={handleCheckboxChange}
                              checked={url.searchParams.getAll("brand").includes(brand.toLowerCase())}
                            />
                            <label className="form-check-label ms-2" htmlFor={brand}>
                              {brand}
                            </label>
                          </li>
                        ))
                      : null}
                  </div>
                </div>
              </div>
              <div className="accordion-item">
                <h2 className="accordion-header">
                  <button
                    className="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseThree"
                    aria-expanded="false"
                    aria-controls="collapseThree"
                  >
                    Price
                  </button>
                </h2>
                <div id="collapseThree" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                  <div className="accordion-body">
                    {availablePrices.map((price, index) => (
                      <li className="list-group-item mb-2" key={index}>
                        <input
                          className="form-check-input me-1"
                          type="checkbox"
                          id={price.price}
                          name="price"
                          value={price.price}
                          onChange={handleCheckboxChange}
                          checked={url.searchParams.getAll("price").includes(price.price)}
                        />
                        <label className="form-check-label ms-2" htmlFor={price.price}>
                          ${price.price}
                        </label>
                      </li>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-9">
            <div className="result-flex d-flex flex-row justify-content-between">
              <div className="result-info">
                <span>
                  Showing {productList ? filteredProductList.length : null} results for "{filterTag.join(", ")}"
                </span>
                <span className="applied-filter mt-2">
                  Applied Filters:
                  {filterTag.map((tag, index) => (
                    <span className="filter-badge" key={index}>
                      <i
                        className="fa-solid fa-xmark me-1 text-danger"
                        style={{ cursor: "pointer" }}
                        onClick={() => handleDeleteFromSearchParams(tag)}
                      ></i>
                      {tag}
                    </span>
                  ))}
                </span>
              </div>

              <div className="filter-btn d-inline">
                {/* Sort by */}
                <div className="dropdown-center d-inline ms-2">
                  <button
                    className="btn btn-light btn-sort dropdown-toggle"
                    type="button"
                    id="dropdownSort"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Sort
                  </button>

                  <ul className="dropdown-menu" aria-labelledby="dropdownSort">
                    <li>
                      <button className="dropdown-item" onClick={() => handleSortChange("asc")}>
                        Price (Low to High)
                      </button>
                    </li>
                    <li>
                      <button className="dropdown-item" onClick={() => handleSortChange("desc")}>
                        Price (High to Low)
                      </button>
                    </li>
                    <li>
                      <button className="dropdown-item" onClick={() => handleSortChange("popularity")}>
                        Popularity
                      </button>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="product-listing mt-4">
              <div className="row">
                {productList && productList.length > 0
                  ? currentProducts.map((item, index) => (
                      <div className="col-md-4" key={index}>
                        <ProductCard
                          productId={item._id}
                          productStore={item.shop.name}
                          productTitle={item.title}
                          productPrice={item.price}
                          productDiscountPrice={item.discountPrice}
                          productSold={item.unitSold}
                          productCategory={item.category}
                          productImageUrl={item.imageUrl[0].url}
                          productRating={item.rating}
                        />
                      </div>
                    ))
                  : null}
              </div>
            </div>

            <nav aria-label="Page navigation example">
              <ul className="pagination justify-content-center mt-1">
                <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                  <button className="page-link text-dark" onClick={() => handlePageChange(currentPage - 1)}>
                    Previous
                  </button>
                </li>
                {pageNumbers.map((number) => (
                  <li className={`page-item ${number === currentPage ? "active" : ""}`} key={number}>
                    <button className="page-link" onClick={() => handlePageChange(number)}>
                      {number}
                    </button>
                  </li>
                ))}
                <li className={`page-item ${currentPage === pageNumbers.length ? "disabled" : ""}`}>
                  <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>
                    Next
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
