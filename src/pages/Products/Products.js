import { Link } from "react-router-dom";

import "./Products.css";
import ProductCard from "../../components/ProductCard/ProductCard";

const Products = () => {
  return (
    <div className="products-wrapper">
      <div className="container">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <Link to="/" class="breadcrumb-item">
              Home
            </Link>
            <li class="breadcrumb-item active" aria-current="page">
              Browse Products
            </li>
          </ol>
        </nav>

        <div className="row">
          <div className="col-md-3">
            <div class="accordion" id="accordionExample">
              <div class="accordion-item">
                <h2 class="accordion-header">
                  <button
                    class="accordion-button"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseOne"
                    aria-expanded="true"
                    aria-controls="collapseOne"
                  >
                    Category
                  </button>
                </h2>
                <div id="collapseOne" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                  <div class="accordion-body">
                    <li class="list-group-item mb-2">
                      <input class="form-check-input me-1" type="checkbox" value="" id="firstCheckbox" />
                      <label class="form-check-label ms-2" for="firstCheckbox">
                        Men
                      </label>
                    </li>
                    <li class="list-group-item mb-2">
                      <input class="form-check-input me-1" type="checkbox" value="" id="firstCheckbox" />
                      <label class="form-check-label ms-2" for="firstCheckbox">
                        Women
                      </label>
                    </li>
                  </div>
                </div>
              </div>
              <div class="accordion-item">
                <h2 class="accordion-header">
                  <button
                    class="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseTwo"
                    aria-expanded="false"
                    aria-controls="collapseTwo"
                  >
                    Brands
                  </button>
                </h2>
                <div id="collapseTwo" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                  <div class="accordion-body">
                    <li class="list-group-item mb-2">
                      <input class="form-check-input me-1" type="checkbox" value="" id="firstCheckbox" />
                      <label class="form-check-label ms-2" for="firstCheckbox">
                        Adidas
                      </label>
                    </li>
                    <li class="list-group-item mb-2">
                      <input class="form-check-input me-1" type="checkbox" value="" id="firstCheckbox" />
                      <label class="form-check-label ms-2" for="firstCheckbox">
                        Nike
                      </label>
                    </li>
                  </div>
                </div>
              </div>
              <div class="accordion-item">
                <h2 class="accordion-header">
                  <button
                    class="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseThree"
                    aria-expanded="false"
                    aria-controls="collapseThree"
                  >
                    Price
                  </button>
                </h2>
                <div id="collapseThree" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                  <div class="accordion-body">
                    <li class="list-group-item mb-2">
                      <input class="form-check-input me-1" type="checkbox" value="" id="firstCheckbox" />
                      <label class="form-check-label ms-2" for="firstCheckbox">
                        $20 - $50
                      </label>
                    </li>
                    <li class="list-group-item mb-2">
                      <input class="form-check-input me-1" type="checkbox" value="" id="firstCheckbox" />
                      <label class="form-check-label ms-2" for="firstCheckbox">
                        $51 - $100
                      </label>
                    </li>
                  </div>
                </div>
              </div>
              <div class="accordion-item">
                <h2 class="accordion-header">
                  <button
                    class="accordion-button collapsed"
                    type="button"
                    data-bs-toggle="collapse"
                    data-bs-target="#collapseFour"
                    aria-expanded="false"
                    aria-controls="collapseFour"
                  >
                    Size
                  </button>
                </h2>
                <div id="collapseFour" class="accordion-collapse collapse show" data-bs-parent="#accordionExample">
                  <div class="accordion-body">
                    <li class="list-group-item mb-2">
                      <input class="form-check-input me-1" type="checkbox" value="" id="firstCheckbox" />
                      <label class="form-check-label ms-2" for="firstCheckbox">
                        Extra Small
                      </label>
                    </li>
                    <li class="list-group-item mb-2">
                      <input class="form-check-input me-1" type="checkbox" value="" id="firstCheckbox" />
                      <label class="form-check-label ms-2" for="firstCheckbox">
                        Small
                      </label>
                    </li>
                    <li class="list-group-item mb-2">
                      <input class="form-check-input me-1" type="checkbox" value="" id="firstCheckbox" />
                      <label class="form-check-label ms-2" for="firstCheckbox">
                        Medium
                      </label>
                    </li>
                    <li class="list-group-item mb-2">
                      <input class="form-check-input me-1" type="checkbox" value="" id="firstCheckbox" />
                      <label class="form-check-label ms-2" for="firstCheckbox">
                        Large
                      </label>
                    </li>
                    <li class="list-group-item mb-2">
                      <input class="form-check-input me-1" type="checkbox" value="" id="firstCheckbox" />
                      <label class="form-check-label ms-2" for="firstCheckbox">
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
                <div class="dropdown-center d-inline ms-2">
                  <a
                    class="btn btn-light btn-sort dropdown-toggle "
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Popularity
                  </a>

                  <ul class="dropdown-menu">
                    <li>
                      <a class="dropdown-item" href="#">
                        Action
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="#">
                        Another action
                      </a>
                    </li>
                    <li>
                      <a class="dropdown-item" href="#">
                        Something else here
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="applied-filter d-flex flex-row">
              Applied Filters:
              <span class="filter-badge">
                Pants <i class="fa-solid fa-xmark"></i>
              </span>
              <span class="filter-badge">
                $20 - $50 <i class="fa-solid fa-xmark"></i>
              </span>
              <span class="filter-badge">
                Medium <i class="fa-solid fa-xmark"></i>
              </span>
            </div>

            <div className="product-listing mt-4">
              <div className="row">
                <div className="col-md-4">
                  <ProductCard
                    productStore="Adidas"
                    productTitle="Adidas Rekive Woven Track Pants"
                    productPrice={139}
                    productSold={24}
                    productCategory="Pants"
                    productImageUrl="https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/adbb5ce2ecf142d7adbaaf6a01412450_9366/adidas_Rekive_Woven_Track_Pants_Grey_IC6006_21_model.jpg"
                  />
                </div>
                <div className="col-md-4">
                  <ProductCard
                    productStore="Adidas"
                    productTitle="Adidas Rekive Woven Track Pants"
                    productPrice={139}
                    productSold={24}
                    productCategory="Pants"
                    productImageUrl="https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/adbb5ce2ecf142d7adbaaf6a01412450_9366/adidas_Rekive_Woven_Track_Pants_Grey_IC6006_21_model.jpg"
                  />
                </div>
                <div className="col-md-4">
                  <ProductCard
                    productStore="Adidas"
                    productTitle="Adidas Rekive Woven Track Pants"
                    productPrice={139}
                    productSold={24}
                    productCategory="Pants"
                    productImageUrl="https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/adbb5ce2ecf142d7adbaaf6a01412450_9366/adidas_Rekive_Woven_Track_Pants_Grey_IC6006_21_model.jpg"
                  />
                </div>

                <div className="col-md-4">
                  <ProductCard
                    productStore="Adidas"
                    productTitle="Adidas Rekive Woven Track Pants"
                    productPrice={139}
                    productSold={24}
                    productCategory="Pants"
                    productImageUrl="https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/adbb5ce2ecf142d7adbaaf6a01412450_9366/adidas_Rekive_Woven_Track_Pants_Grey_IC6006_21_model.jpg"
                  />
                </div>

                <div className="col-md-4">
                  <ProductCard
                    productStore="Adidas"
                    productTitle="Adidas Rekive Woven Track Pants"
                    productPrice={139}
                    productSold={24}
                    productCategory="Pants"
                    productImageUrl="https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/adbb5ce2ecf142d7adbaaf6a01412450_9366/adidas_Rekive_Woven_Track_Pants_Grey_IC6006_21_model.jpg"
                  />
                </div>

                <div className="col-md-4">
                  <ProductCard
                    productStore="Adidas"
                    productTitle="Adidas Rekive Woven Track Pants"
                    productPrice={139}
                    productSold={24}
                    productCategory="Pants"
                    productImageUrl="https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/adbb5ce2ecf142d7adbaaf6a01412450_9366/adidas_Rekive_Woven_Track_Pants_Grey_IC6006_21_model.jpg"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
