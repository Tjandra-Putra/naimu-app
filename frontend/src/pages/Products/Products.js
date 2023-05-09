import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import "./Products.css";
import ProductCard from "../../components/ProductCard/ProductCard";
import Loader from "../../components/Layout/Loader/Loader";
import { server } from "../../server";

const Products = () => {
  const navigate = useNavigate();

  const [productList, setProductList] = useState([]);
  const [filteredProductList, setFilteredProductList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [url, setUrl] = useState(new URL(window.location.href)); // set up URL state and onChange handler for checkboxes
  const [filterTag, setFilterTag] = useState([]); // badge component for applied filters

  const [availablePrices] = useState([
    { id: 1, price: "20, 50" },
    { id: 2, price: "51, 100" },
  ]);

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

    console.log("new url", newUrl.search);

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

    const filteredProducts = productList.filter((product) => {
      const category = searchParams.getAll("category");
      const brand = searchParams.getAll("brand");
      const price = searchParams.getAll("price");

      const combinedFilters = [...category, ...brand, ...price];
      setFilterTag(combinedFilters);

      if (category.length && !category.includes(product.product_category.toLowerCase())) {
        return false;
      }

      if (brand.length && !brand.includes(product.shop.name.toLowerCase())) {
        return false;
      }

      if (price.length) {
        const productPrice = product.product_discount_price;

        const [minPrice, maxPrice] = price[0].split(",");
        if (productPrice < minPrice || productPrice > maxPrice) {
          return false;
        }
      }

      return true;
    });

    setFilteredProductList(filteredProducts);
  }, [productList, url]);

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
                      ? [...new Set(productList.map((item) => item.product_category))].map((category, index) => (
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
                <span>Showing {productList ? filteredProductList.length : null} results for "tops"</span>
                <span className="applied-filter mt-2">
                  Applied Filters:
                  {filterTag.map((tag, index) => (
                    <span className="filter-badge" key={index}>
                      {tag}
                      {/* <i className="fa-solid fa-xmark"></i> */}
                    </span>
                  ))}
                </span>
              </div>

              <div className="filter-btn d-inline">
                {/* Sort by */}
                <div className="dropdown-center d-inline ms-2">
                  <Link
                    className="btn btn-light btn-sort dropdown-toggle"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Sort
                  </Link>

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
                </div>
              </div>
            </div>

            <div className="product-listing mt-4">
              <div className="row">
                {productList && productList.length > 0
                  ? filteredProductList.map((item, index) => (
                      <div className="col-md-4" key={index}>
                        <ProductCard
                          productId={item._id}
                          productStore={item.shop.name}
                          productTitle={item.product_title}
                          productPrice={item.product_price}
                          productDiscountPrice={item.product_discount_price}
                          productSold={item.product_unit_sold}
                          productCategory={item.product_category}
                          productImageUrl={item.product_image_url[0].url}
                        />
                      </div>
                    ))
                  : null}
              </div>
            </div>

            <nav aria-label="Page navigation example">
              <ul className="pagination justify-content-center mt-3">
                <li className="page-item disabled">
                  <a className="page-link text-dark">Previous</a>
                </li>
                <li className="page-item">
                  <a className="page-link text-dark" href="#">
                    1
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link text-dark" href="#">
                    2
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link text-dark" href="#">
                    3
                  </a>
                </li>
                <li className="page-item">
                  <a className="page-link text-dark" href="#">
                    Next
                  </a>
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
