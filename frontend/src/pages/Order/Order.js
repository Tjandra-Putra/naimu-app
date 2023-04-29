import { Link } from "react-router-dom";

import "./Order.css";

const Order = () => {
  return (
    <div className="order-wrapper">
      <div className="container">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <Link to="/orders" class="breadcrumb-item text-dark text-muted">
              Orders
            </Link>
            <Link to="/checkout" class="breadcrumb-item text-dark fw-medium">
              Your Order: #123
            </Link>
          </ol>
        </nav>

        <div className="message mb-2">Thank you for shopping at NAIMU</div>

        <div className="row mt-4">
          <div className="col-md-8">
            <div className="card">
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

            <div className="card mt-4">
              <div className="title">Billing Address</div>

              <div className="row">
                <div className="col">
                  <div class="form-floating my-3">
                    <input
                      type="text"
                      class="form-control"
                      id="floatingInput"
                      placeholder="John Doe"
                      required
                      value="Tjandra"
                      disabled
                    />
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
                      value="tjandra@gmail.com"
                      disabled
                    />
                    <label for="floatingInput">Email address *</label>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <div class="form-floating my-3">
                    <input
                      type="text"
                      class="form-control"
                      id="floatingInput"
                      placeholder="John Doe"
                      required
                      value="Novena"
                      disabled
                    />
                    <label for="floatingInput">Adress 1 *</label>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <div class="form-floating my-3">
                    <input
                      type="text"
                      class="form-control"
                      id="floatingInput"
                      placeholder="John Doe"
                      required
                      value="123563"
                      disabled
                    />
                    <label for="floatingInput">Postal code *</label>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <div class="form-floating my-3">
                    <input
                      type="text"
                      class="form-control"
                      id="floatingInput"
                      placeholder="John Doe"
                      required
                      value="1234 5678"
                      disabled
                    />
                    <label for="floatingInput">Phone number *</label>
                  </div>
                </div>
                <div className="col">
                  <div class="form-floating my-3">
                    <input
                      type="text"
                      class="form-control"
                      id="floatingInput"
                      placeholder="John Doe"
                      required
                      value="Indonesia"
                      disabled
                    />
                    <label for="floatingInput">Country *</label>
                  </div>
                </div>
              </div>
            </div>

            <div className="card mt-4">
              <div className="title">Payment Method</div>

              <div className="row">
                <div className="col">
                  <div class="form-floating my-3">
                    <input
                      type="text"
                      class="form-control"
                      id="floatingInput"
                      placeholder="John Doe"
                      required
                      value="visa"
                      disabled
                    />
                    <label for="floatingInput">Method</label>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <div class="form-floating my-3">
                    <input
                      type="text"
                      class="form-control"
                      id="floatingInput"
                      placeholder="XXXX-XXXX-XXXX-2198"
                      required
                      value="XXXX-XXXX-XXXX-2198"
                      disabled
                    />
                    <label for="floatingInput">Card number *</label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="summary">
              <div className="card">
                <div className="title">Summary</div>

                <div className="summary-row d-flex flex-row justify-content-between">
                  <div>Order Status</div>
                  <div>
                    <span className="text-success">Delivered</span>
                  </div>
                </div>

                <div className="summary-row d-flex flex-row justify-content-between">
                  <div>Order Date</div>
                  <div>
                    <span>12 Feb 2021</span>
                  </div>
                </div>

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

                <div class="input-promo form-floating my-3">
                  <input type="text" class="form-control" id="floatingInput" disabled value="548dskfd" />
                  <label for="floatingInput">Promocode</label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
