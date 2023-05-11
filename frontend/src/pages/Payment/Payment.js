import { Link } from "react-router-dom";
import { useEffect } from "react";

import "./Payment.css";

const Payment = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="payment-wrapper">
      <div className="container">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <Link to="/cart" class="breadcrumb-item text-dark fw-medium">
              Cart
            </Link>
            <Link to="/checkout" class="breadcrumb-item text-dark fw-medium">
              Checkout
            </Link>
            <Link to="/payment" class="breadcrumb-item fw-medium">
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
              <div className="title">Payment Method</div>
              <div class="accordion mt-3" id="accordionFlushExample">
                <div class="accordion-item">
                  <h2 class="accordion-header">
                    <button class="accordion-button collapsed" type="button">
                      <div class="form-check mt-3">
                        <input
                          class="form-check-input"
                          type="radio"
                          name="paymentRadio"
                          data-bs-toggle="collapse"
                          data-bs-target="#flush-collapseOne"
                          aria-controls="flush-collapseOne"
                          required
                        />
                        <h5 class="form-check-label text-uppercase ms-2" for="paymentRadio">
                          Credit/Debit Card
                        </h5>
                      </div>
                    </button>
                  </h2>
                  <div
                    id="flush-collapseOne"
                    class="accordion-collapse collapse"
                    data-bs-parent="#accordionFlushExample"
                  >
                    <div class="accordion-body">
                      <div class="mb-3">
                        <label for="name" class="form-label">
                          Name on card
                        </label>
                        <input
                          type="text"
                          class="form-control form-control-lg rounded-1 border-dark"
                          id="name"
                          placeholder="J. Smith"
                        />
                      </div>
                      <div class="mb-3">
                        <label for="number" class="form-label">
                          Card number
                        </label>
                        <input
                          type="text"
                          class="form-control form-control-lg rounded-1 border-dark"
                          id="number"
                          placeholder="1234 5678 9012 3456"
                        />
                      </div>
                      <div className="row">
                        <div className="col">
                          <div class="mb-3">
                            <label for="expiry" class="form-label">
                              Expiry date
                            </label>
                            <input
                              type="text"
                              class="form-control form-control-lg rounded-1 border-dark"
                              id="expiry"
                              placeholder="MM/YY"
                            />
                          </div>
                        </div>
                        <div className="col">
                          <div class="mb-3">
                            <label for="CVC/CVV" class="form-label">
                              CVC/CVV
                            </label>
                            <input
                              type="text"
                              class="form-control form-control-lg rounded-1 border-dark"
                              id="CVC/CVV"
                              placeholder="3 digits"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="accordion-item">
                  <h2 class="accordion-header">
                    <button class="accordion-button collapsed" type="button">
                      <div class="form-check mt-3">
                        <input
                          class="form-check-input"
                          type="radio"
                          name="paymentRadio"
                          data-bs-toggle="collapse"
                          data-bs-target="#flush-collapseTwo"
                          aria-controls="flush-collapseTwo"
                          required
                        />
                        <h5 class="form-check-label text-uppercase ms-2" for="paymentRadio">
                          Paypal
                        </h5>
                      </div>
                    </button>
                  </h2>
                  <div
                    id="flush-collapseTwo"
                    class="accordion-collapse collapse"
                    data-bs-parent="#accordionFlushExample"
                  >
                    <div class="accordion-body">
                      <div class="mb-3">
                        <label for="email" class="form-label">
                          Email address
                        </label>
                        <input
                          type="email"
                          class="form-control form-control-lg rounded-1 border-dark"
                          id="email"
                          placeholder="J. Smith"
                        />
                      </div>
                      <p>
                        <strong>Notice:</strong> You will be redirected to PayPal, where you can pay and complete your
                        order.
                      </p>
                    </div>
                  </div>
                </div>
                <div class="accordion-item">
                  <h2 class="accordion-header">
                    <button class="accordion-button collapsed" type="button">
                      <div class="form-check mt-3">
                        <input
                          class="form-check-input"
                          type="radio"
                          name="paymentRadio"
                          data-bs-toggle="collapse"
                          data-bs-target="#flush-collapseThree"
                          aria-controls="flush-collapseThree"
                          required
                        />
                        <h5 class="form-check-label text-uppercase ms-2" for="paymentRadio">
                          Cash on Delivery
                        </h5>
                      </div>
                    </button>
                  </h2>
                  <div
                    id="flush-collapseThree"
                    class="accordion-collapse collapse"
                    data-bs-parent="#accordionFlushExample"
                  >
                    <div class="accordion-body">
                      {/* reminder to pay with cash on delivery */}
                      <p>
                        <strong>Reminder:</strong> Please pay with cash on delivery.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Acknowledgement checkbox */}
              <div className="acknowledgement mt-3">
                <div class="form-check">
                  <input
                    class="form-check-input acknowledgement-checkbox"
                    type="checkbox"
                    value=""
                    id="flexCheckDefault"
                  />
                  <label class="form-check-label" for="flexCheckDefault">
                    I acknowledge that I have read and understood the Website Terms and Conditions, Delivery Policy and
                    NAIMU Privacy Policy (as may be updated from time to time), and hereby agree to be bound by such
                    terms.
                  </label>
                </div>
              </div>
            </div>

            <div className="card mt-4">
              <div className="d-flex flex-row justify-content-between">
                <div className="title">Billing Address</div>
                <div className="edit">
                  <Link to="/checkout" className="text-decoration-none">
                    Edit
                  </Link>
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
                      disabled
                      value="Tjandra Putra"
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
                      disabled
                      value="Tjandra@gmail.com"
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
                      disabled
                      value="Novena"
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
                      disabled
                      value="322189"
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
                      disabled
                      value="12345678"
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
                      disabled
                      value="Indonesia"
                    />
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
                              <option disabled value="XS">
                                Size
                              </option>
                              <option value="0" selected>
                                XS
                              </option>
                              <option value="1">S</option>
                              <option value="2">M</option>
                              <option value="3">XL</option>
                            </select>
                          </div>
                          <div className="product-quantity ms-3">
                            <select class="size-select form-select" aria-label="Default select example" disabled>
                              <option disabled value="">
                                Quantity
                              </option>
                              <option value="1" selected>
                                1
                              </option>
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
                              <option disabled value="">
                                Size
                              </option>
                              <option value="0" selected>
                                XS
                              </option>
                              <option value="1">S</option>
                              <option value="2">M</option>
                              <option value="3">XL</option>
                            </select>
                          </div>
                          <div className="product-quantity ms-3">
                            <select class="size-select form-select " aria-label="Default select example" disabled>
                              <option disabled value="">
                                Quantity
                              </option>
                              <option value="1" selected>
                                1
                              </option>
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

                <div class="input-promo form-floating my-3">
                  <input
                    type="text"
                    class="form-control"
                    id="floatingInput"
                    placeholder="name@example.com"
                    disabled
                    value="#5478fh324"
                  />
                  <label for="floatingInput">Promocode</label>
                </div>
                <div className="buttons">
                  <div class="d-grid gap-2">
                    <Link to="/orders/123" class="btn btn-dark btn-lg mt-1 rounded-1" type="button">
                      Place Order
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

export default Payment;
