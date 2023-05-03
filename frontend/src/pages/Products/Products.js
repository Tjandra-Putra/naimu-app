import { Link } from "react-router-dom";

import "./Products.css";
import ProductCard from "../../components/ProductCard/ProductCard";

const Products = () => {
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
                    <li className="list-group-item mb-2">
                      <input className="form-check-input me-1" type="checkbox" value="" id="firstCheckbox" />
                      <label className="form-check-label ms-2" for="firstCheckbox">
                        Men
                      </label>
                    </li>
                    <li className="list-group-item mb-2">
                      <input className="form-check-input me-1" type="checkbox" value="" id="firstCheckbox" />
                      <label className="form-check-label ms-2" for="firstCheckbox">
                        Women
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
                      <input className="form-check-input me-1" type="checkbox" value="" id="firstCheckbox" />
                      <label className="form-check-label ms-2" for="firstCheckbox">
                        Adidas
                      </label>
                    </li>
                    <li className="list-group-item mb-2">
                      <input className="form-check-input me-1" type="checkbox" value="" id="firstCheckbox" />
                      <label className="form-check-label ms-2" for="firstCheckbox">
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
                <div id="collapseThree" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                  <div className="accordion-body">
                    <li className="list-group-item mb-2">
                      <input className="form-check-input me-1" type="checkbox" value="" id="firstCheckbox" />
                      <label className="form-check-label ms-2" for="firstCheckbox">
                        $20 - $50
                      </label>
                    </li>
                    <li className="list-group-item mb-2">
                      <input className="form-check-input me-1" type="checkbox" value="" id="firstCheckbox" />
                      <label className="form-check-label ms-2" for="firstCheckbox">
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
                <div id="collapseFour" className="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                  <div className="accordion-body">
                    <li className="list-group-item mb-2">
                      <input className="form-check-input me-1" type="checkbox" value="" id="firstCheckbox" />
                      <label className="form-check-label ms-2" for="firstCheckbox">
                        Extra Small
                      </label>
                    </li>
                    <li className="list-group-item mb-2">
                      <input className="form-check-input me-1" type="checkbox" value="" id="firstCheckbox" />
                      <label className="form-check-label ms-2" for="firstCheckbox">
                        Small
                      </label>
                    </li>
                    <li className="list-group-item mb-2">
                      <input className="form-check-input me-1" type="checkbox" value="" id="firstCheckbox" />
                      <label className="form-check-label ms-2" for="firstCheckbox">
                        Medium
                      </label>
                    </li>
                    <li className="list-group-item mb-2">
                      <input className="form-check-input me-1" type="checkbox" value="" id="firstCheckbox" />
                      <label className="form-check-label ms-2" for="firstCheckbox">
                        Large
                      </label>
                    </li>
                    <li className="list-group-item mb-2">
                      <input className="form-check-input me-1" type="checkbox" value="" id="firstCheckbox" />
                      <label className="form-check-label ms-2" for="firstCheckbox">
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
                <div className="col-md-4">
                  <Link to="/products/abcd" className="text-decoration-none">
                    <ProductCard
                      productStore="Adidas"
                      productTitle="Adidas Rekive Woven Track Pants"
                      productPrice={139}
                      productSold={24}
                      productCategory="Pants"
                      productImageUrl="https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/adbb5ce2ecf142d7adbaaf6a01412450_9366/adidas_Rekive_Woven_Track_Pants_Grey_IC6006_21_model.jpg"
                    />
                  </Link>
                </div>
                <div className="col-md-4 d-flex">
                  <Link to="/products/abcd" className="text-decoration-none">
                    <ProductCard
                      productStore="Adidas"
                      productTitle="Adidas Rekive Woven Track Pants"
                      productPrice={139}
                      productSold={24}
                      productCategory="Pants"
                      productImageUrl="https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/adbb5ce2ecf142d7adbaaf6a01412450_9366/adidas_Rekive_Woven_Track_Pants_Grey_IC6006_21_model.jpg"
                    />
                  </Link>
                </div>
                <div className="col-md-4">
                  <Link to="/products/abcd" className="text-decoration-none">
                    <ProductCard
                      productStore="Adidas"
                      productTitle="Adidas Rekive Woven Track Pants"
                      productPrice={139}
                      productSold={24}
                      productCategory="Pants"
                      productImageUrl="https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/adbb5ce2ecf142d7adbaaf6a01412450_9366/adidas_Rekive_Woven_Track_Pants_Grey_IC6006_21_model.jpg"
                    />
                  </Link>
                </div>
                <div className="col-md-4">
                  <Link to="/products/abcd" className="text-decoration-none">
                    <ProductCard
                      productStore="Adidas"
                      productTitle="Adidas Rekive Woven Track Pants"
                      productPrice={139}
                      productSold={24}
                      productCategory="Pants"
                      productImageUrl="https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/adbb5ce2ecf142d7adbaaf6a01412450_9366/adidas_Rekive_Woven_Track_Pants_Grey_IC6006_21_model.jpg"
                    />
                  </Link>
                </div>
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
