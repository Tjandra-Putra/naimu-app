import { Link } from "react-router-dom";

import "./Checkout.css";

const Checkout = () => {
  return (
    <div className="checkout-wrapper">
      <div className="container">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <Link to="/cart" class="breadcrumb-item text-dark fw-medium">
              Cart
            </Link>
            <Link to="/checkout" class="breadcrumb-item text-dark fw-medium">
              Checkout
            </Link>
            <Link to="/payment" class="breadcrumb-item text-muted">
              Payment
            </Link>
            <Link to="/order-complete" class="breadcrumb-item text-muted">
              Order Complete
            </Link>
          </ol>
        </nav>

        <div className="row">
          <div className="col-md-8">
            <div className="card">
              <div className="title">Billing Address</div>

              <div className="row">
                <div className="col">
                  <div class="form-floating my-3">
                    <input type="text" class="form-control" id="floatingInput" placeholder="John Doe" required />
                    <label for="floatingInput">Full name *</label>
                  </div>
                </div>
                <div className="col">
                  <div class="form-floating my-3">
                    <input
                      type="email"
                      class="form-control"
                      id="floatingInput"
                      placeholder="name@example.com"
                      required
                    />
                    <label for="floatingInput">Email address *</label>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <div class="form-floating my-3">
                    <input type="text" class="form-control" id="floatingInput" placeholder="John Doe" required />
                    <label for="floatingInput">Adress 1 *</label>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <div class="form-floating my-3">
                    <input type="text" class="form-control" id="floatingInput" placeholder="John Doe" required />
                    <label for="floatingInput">Postal code *</label>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <div class="form-floating my-3">
                    <input type="text" class="form-control" id="floatingInput" placeholder="John Doe" required />
                    <label for="floatingInput">Phone number *</label>
                  </div>
                </div>
                <div className="col">
                  <div class="form-floating my-3">
                    <input type="text" class="form-control" id="floatingInput" placeholder="John Doe" required />
                    <label for="floatingInput">Country *</label>
                  </div>
                </div>
              </div>
            </div>

            <div className="card mt-4">
              <div className="d-flex flex-row justify-content-between">
                <div className="title">Order Details</div>
                <div className="edit">
                  <Link to="/cart" className="text-decoration-none">
                    Edit
                  </Link>
                </div>
              </div>

              <table class="table table-borderless">
                <thead>
                  <tr>
                    <th scope="col"></th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
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
                            <select class="size-select form-select" aria-label="Default select example" disabled>
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
                            <select class="size-select form-select" aria-label="Default select example" disabled>
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
                            <select class="size-select form-select " aria-label="Default select example" disabled>
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
                            <select class="size-select form-select " aria-label="Default select example" disabled>
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
                  <div>1 item</div>
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

                <div class="input-promo form-floating my-3">
                  <input type="text" class="form-control" id="floatingInput" placeholder="name@example.com" />
                  <label for="floatingInput">Enter your promo code</label>
                </div>
                <div className="buttons">
                  <div class="d-grid gap-2">
                    <button class="btn btn-secondary btn-lg rounded-1" type="submit">
                      Apply code
                    </button>

                    <Link to="/payment" class="btn btn-dark btn-lg mt-1 rounded-1" type="button">
                      Review and Pay
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

export default Checkout;
