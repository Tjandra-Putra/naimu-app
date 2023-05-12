import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import "./Order.css";
import Loader from "../../components/Layout/Loader/Loader";
import { server } from "../../server";

const Order = () => {
  const dispatch = useDispatch();
  const { error, success } = useSelector((state) => state.userReducer);

  const { id } = useParams();

  const [isLoading, setIsLoading] = useState(false);
  const [order, setOrder] = useState([]);

  const notifySuccess = (message) => toast.success(message, { duration: 5000 });
  const notifyError = (message) => toast.error(message, { duration: 5000 });

  useEffect(() => {
    window.scrollTo(0, 0);

    if (error) {
      notifyError(error);
      dispatch({ type: "ClearErrors" });
    }
    if (success) {
      notifySuccess(success);
      dispatch({ type: "ClearSuccess" });
    }
  }, [success, error]);

  useEffect(() => {
    try {
      setIsLoading(true);
      const getOrders = async () => {
        const { data } = await axios.get(`${server}/order/get-order/${id}`);
        setOrder(data.order);
      };

      getOrders();

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);

      notifyError("Failed to get orders");
    }
  }, [id]);

  return isLoading ? (
    <Loader />
  ) : (
    <div className="order-wrapper">
      <div className="container">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <Link to="/orders" class="breadcrumb-item text-dark text-muted">
              Orders
            </Link>
            <Link to="/checkout" class="breadcrumb-item text-dark fw-medium">
              Your Order: {id}
            </Link>
          </ol>
        </nav>

        <div className="message mb-2">Thank you for shopping at NAIMU</div>

        <div className="row mt-4">
          <div className="col-md-8">
            <div className="card">
              <div className="d-flex flex-row justify-content-between">
                <div className="title">Order Details</div>
                <div className="edit"></div>
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
                  {order.orderItems &&
                    order.orderItems.map((item, index) => (
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
                                  className="form-control size-select"
                                  value={item.product_size}
                                  disabled
                                />
                              </div>
                              <div className="product-quantity ms-3">
                                <input
                                  type="text"
                                  className="form-control size-select"
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
                      value={order.user ? order.user.fullName : "Loading..."}
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
                      value={order.user ? order.user.email : "Loading..."}
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
                      value={order.user ? order.user.phoneNumber : "Loading..."}
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
                      value={order.billingInfo ? order.billingInfo.postalCode : "Loading..."}
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
                      value={order.billingInfo ? order.billingInfo.country : "Loading..."}
                      disabled
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
                      placeholder="John Doe"
                      required
                      value={order.billingInfo ? order.billingInfo.city : "Loading..."}
                      disabled
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
                      placeholder="John Doe"
                      required
                      value={order.billingInfo ? order.billingInfo.address1 : "Loading..."}
                      disabled
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
                      placeholder="John Doe"
                      required
                      value={order.billingInfo ? order.billingInfo.address2 : "Loading..."}
                      disabled
                    />
                    <label for="floatingInput">Adress 2 *</label>
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
                      value={order.paymentInfo ? order.paymentInfo.paymentMethod : "Loading..."}
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
                      value={order.paymentInfo ? order.paymentInfo.id : "Loading..."}
                      disabled
                    />
                    <label for="floatingInput">Transaction ID</label>
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
                      value={order.paymentInfo ? order.paymentInfo.status : "Loading..."}
                      disabled
                    />
                    <label for="floatingInput">Status</label>
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
                    <span className="text-success">{order ? order.orderStatus : ""}</span>
                  </div>
                </div>

                <div className="summary-row d-flex flex-row justify-content-between">
                  <div>Order Date</div>
                  <div>
                    <span>{order ? order.createdAt : ""}</span>
                  </div>
                </div>

                <div className="summary-row d-flex flex-row justify-content-between">
                  <div>Items x2</div>
                  <div>${order ? order.totalPrice : ""}</div>
                </div>

                <div className="summary-row d-flex flex-row justify-content-between">
                  <div>Delivery</div>
                  <div>FREE</div>
                </div>

                <div className="summary-total d-flex flex-row justify-content-between">
                  <div>Total</div>
                  <div>${order ? order.totalPrice : ""}</div>
                </div>

                {/* <div class="input-promo form-floating my-3">
                  <input type="text" class="form-control" id="floatingInput" disabled value="548dskfd" />
                  <label for="floatingInput">Promocode</label>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Order;
