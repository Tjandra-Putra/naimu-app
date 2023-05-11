import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect } from "react";

import "./Checkout.css";

const Checkout = () => {
  const { user } = useSelector((state) => state.userReducer) ?? {}; // Using optional chaining operator and providing a default value as an empty object
  const { cart } = useSelector((state) => state.cartReducer) ?? [];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="checkout-wrapper">
      <div className="container">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <Link to="/cart" className="breadcrumb-item text-dark fw-medium">
              Cart
            </Link>
            <Link to="/checkout" className="breadcrumb-item text-dark fw-medium">
              Checkout
            </Link>
            <Link to="/payment" className="breadcrumb-item text-muted">
              Payment
            </Link>
            <Link to="/order-complete" className="breadcrumb-item text-muted">
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
                  <div className="form-floating my-3">
                    <input type="text" className="form-control" id="floatingInput" placeholder="John Doe" required />
                    <label htmlFor="floatingInput">Full name *</label>
                  </div>
                </div>
                <div className="col">
                  <div className="form-floating my-3">
                    <input
                      type="email"
                      className="form-control"
                      id="floatingInput"
                      placeholder="name@example.com"
                      required
                    />
                    <label htmlFor="floatingInput">Email address *</label>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <div className="form-floating my-3">
                    <input type="text" className="form-control" id="floatingInput" placeholder="John Doe" required />
                    <label htmlFor="floatingInput">Phone number *</label>
                  </div>
                </div>
                <div className="col">
                  <div className="form-floating my-3">
                    <input type="text" className="form-control" id="floatingInput" placeholder="John Doe" required />
                    <label htmlFor="floatingInput">Postal code *</label>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <div className="form-floating my-3">
                    <input type="text" className="form-control" id="floatingInput" placeholder="John Doe" required />
                    <label htmlFor="floatingInput">Country *</label>
                  </div>
                </div>
                <div className="col">
                  <div className="form-floating my-3">
                    <input type="text" className="form-control" id="floatingInput" placeholder="John Doe" required />
                    <label htmlFor="floatingInput">City *</label>
                  </div>
                </div>
              </div>
              <div className="row">
                <div className="col">
                  <div className="form-floating my-3">
                    <input type="text" className="form-control" id="floatingInput" placeholder="John Doe" required />
                    <label htmlFor="floatingInput">Adress 1 *</label>
                  </div>
                </div>
                <div className="col">
                  <div className="form-floating my-3">
                    <input type="text" className="form-control" id="floatingInput" placeholder="John Doe" required />
                    <label htmlFor="floatingInput">Adress 2 *</label>
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

              <table className="table table-borderless">
                <thead>
                  <tr>
                    <th scope="col"></th>
                    <th scope="col"></th>
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item, index) => (
                    <tr key={index}>
                      <td className="product-img">
                        <img src={item.product_image_url} alt="" className="img-fluid" />
                      </td>
                      <td className="product-description">
                        <div className="d-flex flex-column">
                          <div className="product-title">{item.product_title}</div>
                          <div className="product-id">Product ID: {item._id}</div>
                          <div className="product-store">{item.product_shop_name}</div>
                          <div className="d-flex flex-row">
                            <div className="product-size">
                              <select className="size-select form-select" aria-label="Default select example" disabled>
                                <option selected value={item.product_size}>
                                  {item.product_size}
                                </option>
                              </select>
                            </div>
                            <div className="product-quantity ms-3">
                              <select className="size-select form-select" aria-label="Default select example" disabled>
                                <option disabled selected value="">
                                  Quantity
                                </option>

                                <option selected value={item.product_quantity}>
                                  {item.product_quantity}
                                </option>
                              </select>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td>${item.product_price}</td>
                    </tr>
                  ))}
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

                <div className="input-promo form-floating my-3">
                  <input type="text" className="form-control" id="floatingInput" placeholder="name@example.com" />
                  <label htmlFor="floatingInput">Enter your promo code</label>
                </div>
                <div className="buttons">
                  <div className="d-grid gap-2">
                    <button className="btn btn-secondary btn-lg rounded-1" type="submit">
                      Apply code
                    </button>

                    <Link to="/payment" className="btn btn-dark btn-lg mt-1 rounded-1" type="button">
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
