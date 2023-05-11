import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Country, State } from "country-state-city";

import "./Checkout.css";

const Checkout = () => {
  const { user } = useSelector((state) => state.userReducer) ?? {}; // Using optional chaining operator and providing a default value as an empty object
  const { cart } = useSelector((state) => state.cartReducer) ?? [];

  const [userInfo, setUserInfo] = useState(false); // for saved info display hidden and show

  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [fullName, setFullName] = useState(user && user.user.fullName);
  const [email, setEmail] = useState(user && user.user.email);
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(user && user.user.phoneNumber);
  const [promoCode, setPromoCode] = useState("");
  const [promoCodeApplied, setPromoCodeApplied] = useState(false);

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
              <div className="billing-address">
                <div className="title">Billing Address</div>
                <div className="row">
                  <div className="col">
                    <div className="form-floating my-3">
                      <input
                        type="text"
                        className="form-control"
                        id="floatingInput"
                        placeholder="John Doe"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                      />
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
                        value={email}
                      />
                      <label htmlFor="floatingInput">Email address *</label>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <div className="form-floating my-3">
                      <input
                        type="number"
                        className="form-control"
                        id="floatingInput"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                      />
                      <label htmlFor="floatingInput">Phone number *</label>
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-floating my-3">
                      <input
                        type="text"
                        className="form-control"
                        id="floatingInput"
                        placeholder="John Doe"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                      />
                      <label htmlFor="floatingInput">Postal code *</label>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <div className="form-floating my-3">
                      <select
                        class="form-select"
                        id="country"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                      >
                        <option>Select Country</option>
                        {Country &&
                          Country.getAllCountries().map((item) => (
                            <option key={item.isoCode} value={item.isoCode}>
                              {item.name}
                            </option>
                          ))}
                      </select>

                      <label for="country" class="form-label">
                        Country *
                      </label>
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-floating my-3">
                      <select class="form-select" id="city" value={city} onChange={(e) => setCity(e.target.value)}>
                        <option>Select City</option>
                        {Country &&
                          State.getStatesOfCountry(country).map((item) => (
                            <option key={item.isoCode} value={item.isoCode}>
                              {item.name}
                            </option>
                          ))}
                      </select>

                      <label htmlFor="floatingInput">City *</label>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <div className="form-floating my-3">
                      <input
                        type="text"
                        className="form-control"
                        id="floatingInput"
                        placeholder="John Doe"
                        value={address1}
                        onChange={(e) => setAddress1(e.target.value)}
                      />
                      <label htmlFor="floatingInput">Adress 1 *</label>
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-floating my-3">
                      <input
                        type="text"
                        className="form-control"
                        id="floatingInput"
                        placeholder="John Doe"
                        value={address2}
                        onChange={(e) => setAddress2(e.target.value)}
                      />
                      <label htmlFor="floatingInput">Adress 2 *</label>
                    </div>
                  </div>
                </div>

                <div className="saved-info">
                  <p class="saved-info-text" onClick={() => setUserInfo(!userInfo)}>
                    Choose from saved info
                  </p>
                  {userInfo && (
                    <div>
                      {user &&
                        user.user.addresses.map((item, index) => (
                          <span key={index}>
                            <div class="form-check form-check-inline">
                              <input
                                class="form-check-input d-inline"
                                type="radio"
                                name="addressType"
                                id={item.addressType}
                                value={item.addressType}
                                onClick={() => {
                                  setAddress1(item.address1) ||
                                    setAddress2(item.address2) ||
                                    setCity(item.city) ||
                                    setCountry(item.country) ||
                                    setPostalCode(item.postalCode);
                                }}
                              />
                              <label class="form-check-label" for={item.addressType}>
                                {item.addressType}
                              </label>
                            </div>
                          </span>
                        ))}
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="card mt-4 order-details">
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
