import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

import "./Products.css";
import ProductCard from "../../components/ProductCard/ProductCard";
import Loader from "../../components/Layout/Loader/Loader";
import { server } from "../../server";

const Products = () => {
  const [productList, setProductList] = useState([]); // [state, setState]
  const [isLoading, setIsLoading] = useState(true);

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

  return (
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

        {isLoading ? (
          <Loader />
        ) : (
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
                      {productList && productList.length > 0
                        ? productList.map((item, index) => (
                            <li className="list-group-item mb-2" key={index}>
                              <input
                                className="form-check-input me-1"
                                type="checkbox"
                                value={item.product_category}
                                name="category"
                                id={item.product_category}
                              />
                              <label className="form-check-label ms-2" for={item.product_category}>
                                {item.product_category}
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
                      <li className="list-group-item mb-2">
                        <input className="form-check-input me-1" type="checkbox" value="" id="adidas" />
                        <label className="form-check-label ms-2" for="adidas">
                          Adidas
                        </label>
                      </li>
                      <li className="list-group-item mb-2">
                        <input className="form-check-input me-1" type="checkbox" value="" id="nike" />
                        <label className="form-check-label ms-2" for="nike">
                          Nike
                        </label>
                      </li>
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
                  <div
                    id="collapseThree"
                    className="accordion-collapse collapse show"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      <li className="list-group-item mb-2">
                        <input className="form-check-input me-1" type="checkbox" value="" id="$20 - $50" />
                        <label className="form-check-label ms-2" for="$20 - $50">
                          $20 - $50
                        </label>
                      </li>
                      <li className="list-group-item mb-2">
                        <input className="form-check-input me-1" type="checkbox" value="$20 - $50" />
                        <label className="form-check-label ms-2" for="$51 - $100">
                          $51 - $100
                        </label>
                      </li>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseFour"
                      aria-expanded="false"
                      aria-controls="collapseFour"
                    >
                      Size
                    </button>
                  </h2>
                  <div
                    id="collapseFour"
                    className="accordion-collapse collapse show"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      <li className="list-group-item mb-2">
                        <input className="form-check-input me-1" type="checkbox" value="" id="xs" />
                        <label className="form-check-label ms-2" for="xs">
                          Extra Small
                        </label>
                      </li>
                      <li className="list-group-item mb-2">
                        <input className="form-check-input me-1" type="checkbox" value="" id="s" />
                        <label className="form-check-label ms-2" for="s">
                          Small
                        </label>
                      </li>
                      <li className="list-group-item mb-2">
                        <input className="form-check-input me-1" type="checkbox" value="" id="m" />
                        <label className="form-check-label ms-2" for="m">
                          Medium
                        </label>
                      </li>
                      <li className="list-group-item mb-2">
                        <input className="form-check-input me-1" type="checkbox" value="" id="l" />
                        <label className="form-check-label ms-2" for="l">
                          Large
                        </label>
                      </li>
                      <li className="list-group-item mb-2">
                        <input className="form-check-input me-1" type="checkbox" value="xl" />
                        <label className="form-check-label ms-2" for="xl">
                          Extra Large
                        </label>
                      </li>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-9">
              <div className="result-flex d-flex flex-row justify-content-between">
                <div className="result-info">Showing 9 results for "tops"</div>
                <div className="filter-btn d-inline">
                  Sort by
                  <div className="dropdown-center d-inline ms-2">
                    <a
                      className="btn btn-light btn-sort dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Popularity
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
                  </div>
                </div>
              </div>

              <div className="applied-filter d-flex flex-row">
                Applied Filters:
                <span className="filter-badge">
                  Pants <i className="fa-solid fa-xmark"></i>
                </span>
                <span className="filter-badge">
                  $20 - $50 <i className="fa-solid fa-xmark"></i>
                </span>
                <span className="filter-badge">
                  Medium <i className="fa-solid fa-xmark"></i>
                </span>
              </div>

              <div className="product-listing mt-4">
                <div className="row">
                  {productList && productList.length > 0
                    ? productList.map((item, index) => (
                        <div className="col-md-4" key={index}>
                          <ProductCard
                            productId={item._id}
                            productStore={item.shop.name}
                            productTitle={item.product_title}
                            productPrice={item.product_price}
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
        )}
      </div>
    </div>
  );
};

export default Products;
