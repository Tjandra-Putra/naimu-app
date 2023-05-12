import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Country, State } from "country-state-city";
import axios from "axios";

import "./Checkout.css";
import { server } from "../../server";

const Checkout = () => {
  const navigate = useNavigate();

  // toast component
  const notifySuccess = (message) => toast.success(message, { duration: 5000 });
  const notifyError = (message) => toast.error(message, { duration: 5000 });

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
  const [promoCode, setPromoCode] = useState(null);
  const [promoCodePercentage, setPromoCodePercentage] = useState(0); // e.g 10% off

  // sum of all product price
  const subTotalPrice = cart.reduce((acc, item) => {
    return acc + item.product_price * item.product_quantity;
  }, 0);

  const deliveryFee = subTotalPrice * 0.1;

  const totalPrice = promoCodePercentage
    ? ((subTotalPrice + deliveryFee) * ((100 - promoCodePercentage) / 100)).toFixed(2)
    : (subTotalPrice + deliveryFee).toFixed(2);

  const discountAmount = subTotalPrice - totalPrice;

  const handlePromoCode = async (e) => {
    e.preventDefault();

    if (!promoCode) return notifyError("Please enter your promo code");

    try {
      await axios.get(`${server}/promo-code/${promoCode}`).then((res) => {
        const promoPercentage = res.data.promoCode[0].discount;
        setPromoCodePercentage(promoPercentage);

        notifySuccess(`Promo code (${promoPercentage} % OFF) applied successfully!`);
      });
    } catch (error) {
      notifyError(error.response.data.message);
    }
  };

  const submitHandler = () => {
    // if fields empty
    if (!fullName || !email || !phoneNumber || !postalCode || !country || !city || !address1 || !address2) {
      return notifyError("Please fill in all fields");
    }

    // if cart empty
    if (cart.length === 0) {
      return notifyError("Your cart is empty");
    }

    // add to local storage
    const userInfo = {
      fullName,
      email,
      phoneNumber,
    };

    const billingInfo = {
      country,
      city,
      address1,
      address2,
      postalCode,
    };

    // latest order info - with updated user info based on the form
    const orderInfo = {
      userInfo, // based on the form data
      billingInfo,
      cartInfo: cart,
      amountInfo: {
        subTotalPrice,
        deliveryFee,
        totalPrice,
        discountAmount,
        promoCode,
        promoCodePercentage,
      },
    };

    localStorage.setItem("orderInfo", JSON.stringify(orderInfo));

    navigate("/payment");
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    // get order info from local storage
    try {
      const orderInfoFromLocalStorage = JSON.parse(localStorage.getItem("orderInfo"));

      if (orderInfoFromLocalStorage) {
        const { userInfo, billingInfo, amountInfo } = orderInfoFromLocalStorage;

        setCountry(billingInfo.country || "");
        setCity(billingInfo.city || "");
        setAddress1(billingInfo.address1 || "");
        setAddress2(billingInfo.address2 || "");
        setPostalCode(billingInfo.postalCode || "");
        setFullName(userInfo.fullName || "");
        setEmail(userInfo.email || "");
        setPhoneNumber(userInfo.phoneNumber || "");
        setPromoCode(amountInfo.promoCode || null);
        setPromoCodePercentage(amountInfo.promoCodePercentage || 0);
      }
    } catch (error) {
      console.log("Error retrieving order info from local storage:", error);
    }
  }, [country, city, fullName, email, address1, address2, postalCode, phoneNumber, promoCode]);

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
                        required
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
                        onChange={(e) => setEmail(e.target.value)}
                        required
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
                        required
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
                        required
                      />
                      <label htmlFor="floatingInput">Postal code *</label>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col">
                    <div className="form-floating my-3">
                      <select
                        className="form-select"
                        id="country"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                        required
                      >
                        <option>Select Country</option>
                        {Country &&
                          Country.getAllCountries().map((item) => (
                            <option key={item.isoCode} value={item.isoCode}>
                              {item.name}
                            </option>
                          ))}
                      </select>

                      <label htmlFor="country" className="form-label">
                        Country *
                      </label>
                    </div>
                  </div>
                  <div className="col">
                    <div className="form-floating my-3">
                      <select
                        className="form-select"
                        id="city"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        required
                      >
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
                        required
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
                        required
                        onChange={(e) => setAddress2(e.target.value)}
                      />
                      <label htmlFor="floatingInput">Adress 2 *</label>
                    </div>
                  </div>
                </div>

                <div className="saved-info">
                  <p className="saved-info-text" onClick={() => setUserInfo(!userInfo)}>
                    Choose from saved info
                  </p>
                  {userInfo && (
                    <div>
                      {user &&
                        user.user.addresses.map((item, index) => (
                          <span key={index}>
                            <div className="form-check form-check-inline">
                              <input
                                className="form-check-input d-inline"
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
                              <label className="form-check-label" htmlFor={item.addressType}>
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
                  <div>Items x{cart && cart.length}</div>
                  <div>${subTotalPrice}</div>
                </div>

                <div className="summary-row d-flex flex-row justify-content-between">
                  <div>Delivery</div>
                  <div>${deliveryFee}</div>
                </div>

                <div className="summary-row d-flex flex-row justify-content-between">
                  <div className={promoCodePercentage && "discount"}>
                    Discount {`(${promoCodePercentage.toString()}%)`}
                  </div>
                  <div className={promoCodePercentage && "discount"}>
                    -{promoCodePercentage ? ` $${discountAmount.toFixed(2)}` : null}
                  </div>
                </div>

                <div className="summary-total d-flex flex-row justify-content-between">
                  <div>Total</div>
                  <div>${totalPrice}</div>
                </div>

                <form onSubmit={handlePromoCode}>
                  <div className="input-promo form-floating my-3">
                    <input
                      type="text"
                      className="form-control"
                      id="promocode"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                    />
                    <label htmlFor="promocode">Enter your promo code</label>
                  </div>
                  <div className="buttons">
                    <div className="d-grid gap-2">
                      <button className="btn btn-secondary btn-lg rounded-1" type="submit">
                        Apply code
                      </button>

                      <button
                        onClick={() => submitHandler()}
                        className="btn btn-dark btn-lg mt-1 rounded-1"
                        type="button"
                      >
                        Review and Pay
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
