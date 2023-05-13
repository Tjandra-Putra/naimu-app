import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { CardNumberElement, CardCvcElement, CardExpiryElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useDispatch } from "react-redux";
import axios from "axios";
import { FaInfoCircle } from "react-icons/fa";
import { PaypalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";

import "./Payment.css";
import Loader from "../../components/Layout/Loader/Loader";
import { server } from "../../server";
import { emptyCart } from "../../redux/actions/cart";

const Payment = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [orderInfo, setOrderInfo] = useState({}); // for displaying order info
  const [orderInfoFormatted, setOrderInfoFormatted] = useState({}); // for creating order
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [acknowledgement, setAcknowledgement] = useState(false); // for acknowledgement checkbox

  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // toast component
  const notifyInfo = (message) =>
    toast(message, {
      duration: 5000,
      icon: <FaInfoCircle size={25} color="grey" />,
    });
  const notifySuccess = (message) => toast.success(message, { duration: 5000 });
  const notifyError = (message) => toast.error(message, { duration: 5000 });

  // This will set the paymentInfo.amount to 0 if totalPrice or amountInfo does not exist in the orderInfo object.
  const paymentInfo = {
    amount: orderInfo?.amountInfo?.totalPrice ? Math.round(orderInfo.amountInfo.totalPrice * 100) : 0, // stripe requires amount in cents hence * 100
  };

  const createOrder = async (order, config) => {
    await axios.post(`${server}/order/create-order`, order, config).then((res) => {
      if (res.data.success) {
        notifySuccess("Order created successfully");

        // get newly created order _id
        const orderId = res.data.order._id;

        navigate(`/orders/${orderId}`);

        // remove cookies
        localStorage.removeItem("orderInfo"); // remove from local storage
        dispatch(emptyCart()); // remove from redux store persist state

        // additional feature: send email to user about order confirmation
      }
    });
  };

  // on change handler for selected payment method
  const paymentMethodChangeHandler = (e) => {
    setSelectedPaymentMethod(e.target.value);

    if (e.target.value === "paypal") {
      notifyError("Paypal payment is not available at the moment");
      return;
    }

    notifyInfo(`Payment method changed to ${e.target.value}`);
  };

  // for stripe credit/debit card payment
  const paymentHandler = async (e) => {
    e.preventDefault();

    if (!acknowledgement) {
      notifyError("Please acknowledge the terms and conditions");
      return;
    }

    try {
      if (!stripe || !elements) {
        notifyError("Stripe is not available at the moment");
        return;
      }

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(`${server}/payment/create-payment-intent`, paymentInfo, config, {
        withCredentials: true,
      });

      const clientSecret = data.clientSecret;

      const result = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardNumberElement),
        },
      });

      if (result.error) {
        notifyError(result.error.message);
      } else {
        if (result.paymentIntent.status === "succeeded") {
          orderInfoFormatted.paymentInfo = {
            id: result.paymentIntent.id,
            status: result.paymentIntent.status,
            paymentMethod: "Credit/Debit Card",
          };
        }

        createOrder(orderInfoFormatted, config);

        // await axios.post(`${server}/order/create-order`, orderInfoFormatted, config).then((res) => {
        //   if (res.data.success) {
        //     notifySuccess("Order created successfully");

        //     // get newly created order _id
        //     const orderId = res.data.order._id;

        //     navigate(`/orders/${orderId}`);

        //     // remove cookies
        //     localStorage.removeItem("orderInfo"); // remove from local storage
        //     dispatch(emptyCart()); // remove from redux store persist state

        //     // additional feature: send email to user about order confirmation
        //   }
        // });
      }
    } catch (error) {
      notifyError(error.response.data.message);
    }
  };

  // for paypal payment
  const paypalPaymentHandler = async (paypalInfo) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      orderInfoFormatted.paymentInfo = {
        id: paypalInfo.payer_id,
        status: "succeeded",
        paymentMethod: "Paypal",
      };

      await axios.post(`${server}/order/create-order`, orderInfoFormatted, config).then((res) => {
        if (res.data.success) {
          notifySuccess("Order created successfully");

          // get newly created order _id
          const orderId = res.data.order._id;

          navigate(`/orders/${orderId}`);

          // remove cookies
          localStorage.removeItem("orderInfo"); // remove from local storage
          dispatch(emptyCart()); // remove from redux store persist state

          // additional feature: send email to user about order confirmation
        }
      });
    } catch (error) {
      notifyError(error.response.data.message);
    }
  };

  // for paypal payment
  const onAprove = (data, actions) => {
    return actions.order.capture().then((details) => {
      const { payer } = details;

      let paypalInfo = payer;

      if (paypalInfo !== undefined) {
        paypalPaymentHandler(paypalInfo);
      }
    });
  };

  // for cash on delivery payment
  const cashOnDeliveryPaymentHandler = async (e) => {
    e.preventDefault();

    if (!acknowledgement) {
      notifyError("Please acknowledge the terms and conditions");
      return;
    }

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    orderInfoFormatted.paymentInfo = {
      // generate random id for cash on delivery payment
      id: Math.floor(Math.random() * 1000000000000000000).toString(),
      status: "pending payment",
      paymentMethod: "Cash on Delivery",
    };

    createOrder(orderInfoFormatted, config);
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    // check if orderInfo exists in local storage if not redirect to checkout page
    if (!localStorage.getItem("orderInfo")) {
      notifyError("Please complete checkout first");
      navigate("/checkout");
      return;
    }

    // get from local storage
    const orderInfoFromLocalStorage = JSON.parse(localStorage.getItem("orderInfo")) || {};
    setOrderInfo(orderInfoFromLocalStorage);

    // { user, orderItems, billingInfo, paymentInfo, totalPrice } need this to create order in the backend
    const orderInfoFormatted = {
      user: orderInfoFromLocalStorage.userInfo,
      orderItems: orderInfoFromLocalStorage.cartInfo,
      billingInfo: orderInfoFromLocalStorage.billingInfo,
      paymentInfo: { id: "", status: "", paymentMethod: "" },
      totalPrice: orderInfoFromLocalStorage.amountInfo.totalPrice,
    };

    setOrderInfoFormatted(orderInfoFormatted);

    setIsLoading(false);
  }, []);

  return isLoading ? (
    <Loader />
  ) : (
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
                          value="credit-debit-card"
                          onChange={paymentMethodChangeHandler}
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
                      <form onSubmit={paymentHandler}>
                        <div class="mb-3">
                          <label for="name" class="form-label">
                            Name on card
                          </label>
                          <input
                            type="text"
                            class="form-control form-control-lg rounded-1 border-dark"
                            id="name"
                            placeholder={orderInfo.userInfo.fullName}
                          />
                        </div>
                        <div class="mb-3">
                          <label for="number" class="form-label">
                            Card number
                          </label>
                          <CardNumberElement
                            className="form-control form-control-lg rounded-1 border-dark"
                            options={{
                              style: {
                                base: { fontSize: "19px", lineHeight: 1.7 },
                                empty: { color: "#444" },
                              },
                            }}
                          />
                        </div>
                        <div className="row">
                          <div className="col">
                            <div className="mb-3">
                              <label for="expiry" class="form-label">
                                Expiry date
                              </label>
                              <CardExpiryElement
                                className="form-control form-control-lg rounded-1 border-dark"
                                options={{
                                  style: {
                                    base: { fontSize: "19px", lineHeight: 1.7 },
                                    empty: { color: "#444" },
                                  },
                                }}
                              />
                            </div>
                          </div>
                          <div className="col">
                            <div class="mb-3">
                              <label for="CVC/CVV" class="form-label">
                                CVC/CVV
                              </label>
                              <CardCvcElement
                                className="form-control form-control-lg rounded-1 border-dark"
                                options={{
                                  style: {
                                    base: { fontSize: "19px", lineHeight: 1.7 },
                                    empty: { color: "#444" },
                                  },
                                }}
                              />
                            </div>
                          </div>
                        </div>
                        <div className="buttons">
                          <div class="d-grid gap-2">
                            <button class="btn btn-dark btn-lg mt-1 rounded-1" type="submit">
                              Place Order
                            </button>
                          </div>
                        </div>
                      </form>
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
                          value="paypal"
                          onChange={paymentMethodChangeHandler}
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
                      <div class="d-grid gap-2">
                        <button class="btn btn-primary btn-lg mb-4 rounded-1" type="submit" disabled>
                          Pay Now
                        </button>
                        {/* <PaypalScriptProvider options={{ "client-id": "xxx" }}>
                          <PayPalButtons
                            style={{ layout: "horizontal" }}
                            createOrder={(data, actions) => createOrder(data, actions)}
                            onApprove={(data, actions) => onAprove(data, actions)}
                          />
                        </PaypalScriptProvider> */}
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
                          value="cash-on-delivery"
                          onChange={paymentMethodChangeHandler}
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
                      <form onSubmit={cashOnDeliveryPaymentHandler}>
                        <div class="d-grid gap-2">
                          <button class="btn btn-primary btn-lg mb-4 rounded-1" type="submit">
                            Place Order
                          </button>
                        </div>
                      </form>
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
                    value={acknowledgement}
                    onClick={() => setAcknowledgement(!acknowledgement)}
                  />
                  <label class="form-check-label">
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
                      value={orderInfo.userInfo.fullName}
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
                      required
                      disabled
                      value={orderInfo.userInfo.email}
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
                      required
                      disabled
                      value={orderInfo.userInfo.phoneNumber}
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
                      required
                      disabled
                      value={orderInfo.billingInfo.postalCode}
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
                      required
                      disabled
                      value={orderInfo.billingInfo.country}
                    />
                    <label for="floatingInput">Country *</label>
                  </div>
                </div>
                <div className="col">
                  <div class="form-floating my-3">
                    <input
                      type="text"
                      class="form-control"
                      id="floatingInput"
                      required
                      disabled
                      value={orderInfo.billingInfo.city}
                    />
                    <label for="floatingInput">City *</label>
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
                      required
                      disabled
                      value={orderInfo.billingInfo.address1}
                    />
                    <label for="floatingInput">Adress 1 *</label>
                  </div>
                </div>
                <div className="col">
                  <div class="form-floating my-3">
                    <input
                      type="text"
                      class="form-control"
                      id="floatingInput"
                      required
                      disabled
                      value={orderInfo.billingInfo.address2}
                    />
                    <label for="floatingInput">Adress 2 *</label>
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
                  {orderInfo.cartInfo.map((item, index) => (
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
                              <input
                                type="text"
                                className="form-control size-select border-0"
                                value={item.product_size}
                                disabled
                              />
                            </div>
                            <div className="product-quantity ms-3">
                              <input
                                type="text"
                                className="form-control size-select border-0"
                                value={item.product_quantity}
                                disabled
                              />
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
                  <div>Items x{orderInfo.cartInfo.length}</div>
                  <div>${orderInfo.amountInfo.subTotalPrice}</div>
                </div>

                <div className="summary-row d-flex flex-row justify-content-between">
                  <div>Delivery</div>
                  <div>${orderInfo.amountInfo.deliveryFee}</div>
                </div>

                <div className="summary-row d-flex flex-row justify-content-between">
                  <div className={orderInfo.amountInfo.promoCodePercentage && "discount"}>
                    Discount {`(${orderInfo.amountInfo.promoCodePercentage.toString()}%)`}
                  </div>
                  <div className={orderInfo.amountInfo.promoCodePercentage && "discount"}>
                    -
                    {orderInfo.amountInfo.promoCodePercentage
                      ? ` $${orderInfo.amountInfo.promoCodePercentage.toFixed(2)}`
                      : null}
                  </div>
                </div>

                <div className="summary-total d-flex flex-row justify-content-between">
                  <div>Total</div>
                  <div>${orderInfo.amountInfo.totalPrice}</div>
                </div>

                <div class="input-promo form-floating my-3">
                  <input
                    type="text"
                    class="form-control"
                    id="floatingInput"
                    disabled
                    value={orderInfo.amountInfo.promoCode}
                  />
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

export default Payment;
