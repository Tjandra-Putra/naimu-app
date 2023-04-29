import { Link } from "react-router-dom";

import "./Cart.css";

const Cart = () => {
  return (
    <div className="cart-wrapper">
      <div className="container">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <Link to="/" class="breadcrumb-item">
              Home
            </Link>
            <li class="breadcrumb-item active" aria-current="page">
              Cart
            </li>
          </ol>
        </nav>

        <div className="row">
          <div className="col-md-8">
            <div className="card">
              <div className="title">Shopping Cart</div>

              <table class="table table-borderless">
                <thead>
                  <tr>
                    <th scope="col"></th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td className="product-action">
                      <div className="btn-delete">
                        <i class="fas fa-times fa-lg"></i>
                      </div>
                    </td>
                    <td className="product-img">
                      <img
                        src="https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/adbb5ce2ecf142d7adbaaf6a01412450_9366/adidas_Rekive_Woven_Track_Pants_Grey_IC6006_21_model.jpg"
                        alt=""
                        className="img-fluid"
                      />
                    </td>
                    <td className="product-description">
                      <div className="d-flex flex-column">
                        <div className="product-title">Adidas Rekive Woven Track Pants</div>
                        <div className="product-id">Product ID: 462178</div>
                        <div className="product-store">Adidas</div>
                        <div className="d-flex flex-row">
                          <div className="product-size">
                            <select class="size-select form-select" aria-label="Default select example">
                              <option disabled selected value="">
                                Size
                              </option>
                              <option value="0">XS</option>
                              <option value="1">S</option>
                              <option value="2">M</option>
                              <option value="3">XL</option>
                            </select>
                          </div>
                          <div className="product-quantity ms-3">
                            <select class="size-select form-select" aria-label="Default select example">
                              <option disabled selected value="">
                                Quantity
                              </option>
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                              <option value="5">5</option>
                              <option value="6">6</option>
                              <option value="7">7</option>
                              <option value="8">8</option>
                              <option value="9">9</option>
                              <option value="10">10</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>$139</td>
                  </tr>

                  <tr>
                    <td className="product-action">
                      <div className="btn-delete">
                        <i class="fas fa-times fa-lg"></i>
                      </div>
                    </td>
                    <td className="product-img">
                      <img
                        src="https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/adbb5ce2ecf142d7adbaaf6a01412450_9366/adidas_Rekive_Woven_Track_Pants_Grey_IC6006_21_model.jpg"
                        alt=""
                        className="img-fluid"
                      />
                    </td>
                    <td className="product-description">
                      <div className="d-flex flex-column">
                        <div className="product-title">Adidas Rekive Woven Track Pants</div>
                        <div className="product-id">Product ID: 462178</div>
                        <div className="product-store">Adidas</div>
                        <div className="d-flex flex-row">
                          <div className="product-size">
                            <select class="size-select form-select " aria-label="Default select example">
                              <option disabled selected value="">
                                Size
                              </option>
                              <option value="0">XS</option>
                              <option value="1">S</option>
                              <option value="2">M</option>
                              <option value="3">XL</option>
                            </select>
                          </div>
                          <div className="product-quantity ms-3">
                            <select class="size-select form-select " aria-label="Default select example">
                              <option disabled selected value="">
                                Quantity
                              </option>
                              <option value="1">1</option>
                              <option value="2">2</option>
                              <option value="3">3</option>
                              <option value="4">4</option>
                              <option value="5">5</option>
                              <option value="6">6</option>
                              <option value="7">7</option>
                              <option value="8">8</option>
                              <option value="9">9</option>
                              <option value="10">10</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td>$139</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="col-md-4">
            <div className="summary">
              <div className="card">
                <div className="title">Summary</div>

                <div className="summary-row d-flex flex-row justify-content-between">
                  <div>Items x2</div>
                  <div>$139</div>
                </div>

                <div className="summary-row d-flex flex-row justify-content-between">
                  <div>Delivery</div>
                  <div>FREE</div>
                </div>

                <div className="summary-total d-flex flex-row justify-content-between">
                  <div>Total</div>
                  <div>$139</div>
                </div>

                {/* <div class="input-promo form-floating my-3">
                  <input type="text" class="form-control" id="floatingInput" placeholder="name@example.com" />
                  <label for="floatingInput">Enter your promo code</label>
                </div> */}
                <div className="buttons my-3">
                  <div class="d-grid gap-2">
                    <Link to="/checkout" class="btn btn-dark btn-lg rounded-1">
                      Checkout
                    </Link>

                    <Link to="/products" class="btn btn-outline-dark btn-lg mt-1 rounded-1" type="button">
                      Continue Browsing
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
