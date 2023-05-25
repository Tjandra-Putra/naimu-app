import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import "./Order.css";
import Loader from "../../components/Layout/Loader/Loader";
import { server } from "../../server";
import NotFound from "../NotFound/NotFound";

const Order = () => {
  const dispatch = useDispatch();
  const { error, success } = useSelector((state) => state.userReducer);

  const { id } = useParams();
  const { user } = useSelector((state) => state.userReducer);

  const [isLoading, setIsLoading] = useState(false);
  const [order, setOrder] = useState([]);
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState("");
  const [comment, setComment] = useState("");
  const [recommend, setRecommend] = useState(false);
  const [orderNotFound, setOrderNotFound] = useState(false);

  const notifySuccess = (message) => toast.success(message, { duration: 5000 });
  const notifyError = (message) => toast.error(message, { duration: 5000 });

  // init validation
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

  // get all order by id
  useEffect(() => {
    try {
      setIsLoading(true);
      const getOrders = axios
        .get(`${server}/order/get-order/${id}`)
        .then((res) => {
          setOrder(res.data.order);
        })
        .catch((err) => {
          notifyError("Order not found");
          setIsLoading(false);
          setOrderNotFound(true);
        });

      setIsLoading(false);

      return () => getOrders;
    } catch (error) {
      setIsLoading(false);
      setOrderNotFound(true);
    }

    // order has to be in the dependency array because we need to update the order when the user submit a review
  }, [id, order]);

  if (orderNotFound) {
    return <NotFound />;
  }

  const reviewHandler = async (productId, e) => {
    e.preventDefault();

    // validate empty fields
    if (!rating || !title || !comment || rating === 0) {
      return notifyError("Please fill in all fields");
    }

    await axios
      .put(
        `${server}/product/review-product`,
        {
          user,
          rating,
          title,
          comment,
          recommend,
          productId,
          orderId: id,
        },
        { withCredentials: true }
      )
      .then((res) => {
        notifySuccess(res.data.message);

        // update order without having to reload the page.
        const { data } = axios.get(`${server}/order/get-order/${id}`);
        setOrder(data.order);

        // reset state
        setRating(0);
        setTitle("");
        setComment("");
        setRecommend(false);
      })
      .catch((err) => {
        notifyError(err.response.data.message);
      });
  };

  return isLoading ? (
    <Loader />
  ) : (
    <div className="order-wrapper">
      <div className="container">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <Link to="/orders" className="breadcrumb-item text-dark text-muted">
              Orders
            </Link>
            <Link className="breadcrumb-item text-dark fw-medium">Your Order: {id}</Link>
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
                    <th scope="col"></th>
                  </tr>
                </thead>
                <tbody>
                  {order.orderItems &&
                    order.orderItems.map((item, index) => (
                      <tr key={index}>
                        <td className="product-img">
                          <Link to={`/products/${item._id}`}>
                            <img src={item.imageUrl} alt="" className="img-fluid rounded-2" />
                          </Link>
                        </td>
                        <td className="product-description">
                          <div className="d-flex flex-column">
                            <div className="product-title">{item.title}</div>
                            <div className="product-id">Product ID: {item._id}</div>
                            <div className="product-store">{item.shopName}</div>
                            <div className="d-flex flex-row">
                              <div className="product-size">
                                <input type="text" className="form-control size-select" value={item.size} disabled />
                              </div>
                              <div className="product-quantity ms-3">
                                <input
                                  type="text"
                                  className="form-control size-select"
                                  value={item.quantity}
                                  disabled
                                />
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>${item.price}</td>
                        <td>
                          {item.isReviewed && item.isReviewed === true ? null : (
                            <div className="btn-review-wrapper">
                              <div className="btn-review" data-bs-toggle="modal" data-bs-target={`#${item._id}`}>
                                Review
                              </div>
                            </div>
                          )}
                        </td>

                        {/* Review Modal */}
                        <div className="modal fade review-modal" id={item._id} tabindex="-1" aria-hidden="true">
                          <div className="modal-dialog">
                            <div className="modal-content p-3">
                              <div className="modal-header border-0">
                                <h1 className="modal-title fs-5 mx-auto">Write a Review</h1>
                              </div>
                              <div className="modal-body">
                                <form>
                                  <div className="row">
                                    <div className="col-md-3">
                                      <img src={item.imageUrl} alt="" className="img-fluid rounded-2" />
                                    </div>
                                    <div className="col-md-9">
                                      <div className="product-details">
                                        <div className="product-title">{item.title}</div>
                                        <div className="product-id">Product ID: {item._id}</div>
                                        <div className="product-store">{item.shopName}</div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="rating-box">
                                    <label className="text-center text-dark">Your overall rating</label>
                                    <div className="rating-input-wrapper">
                                      {[1, 2, 3, 4, 5].map((index) =>
                                        rating >= index ? (
                                          <i
                                            className="fa-solid fa-star rating-input"
                                            key={index}
                                            onClick={() => setRating(index)}
                                          ></i>
                                        ) : (
                                          <i
                                            className="fa-regular fa-star rating-input"
                                            key={index}
                                            onClick={() => setRating(index)}
                                          ></i>
                                        )
                                      )}
                                    </div>
                                  </div>

                                  <div className="mb-4">
                                    <label for="title" className="form-label">
                                      Set a title for your review
                                    </label>
                                    <input
                                      className="form-control"
                                      id="title"
                                      placeholder="Summarise review"
                                      value={title}
                                      onChange={(e) => setTitle(e.target.value)}
                                    ></input>
                                  </div>

                                  <div className="mb-3">
                                    <label for="comment" className="form-label">
                                      What did you like or dislike?
                                    </label>
                                    <textarea
                                      className="form-control"
                                      id="comment"
                                      rows="3"
                                      value={comment}
                                      onChange={(e) => setComment(e.target.value)}
                                    ></textarea>
                                  </div>

                                  <div className="row">
                                    <div className="col-md-8">
                                      <label htmlFor="recommend">Would you recommend the product?</label>
                                    </div>
                                    <div className="col-md-4">
                                      <div className="form-check form-switch float-md-end">
                                        <input
                                          className="form-check-input"
                                          type="checkbox"
                                          role="switch"
                                          id="recommend"
                                          value={recommend}
                                          onChange={(e) => setRecommend(e.target.value)}
                                        />
                                      </div>
                                    </div>

                                    <div className="d-grid mt-3">
                                      <button
                                        className="btn btn-dark btn-lg rounded-1"
                                        onClick={(e) => reviewHandler(item._id, e)}
                                      >
                                        Submit review
                                      </button>
                                    </div>
                                  </div>
                                </form>
                              </div>
                            </div>
                          </div>
                        </div>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            <div className="card mt-4">
              <div className="title">Billing Address</div>

              <div className="row">
                <div className="col">
                  <div className="form-floating my-3">
                    <input
                      type="text"
                      className="form-control"
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
                  <div className="form-floating my-3">
                    <input
                      type="email"
                      className="form-control"
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
                  <div className="form-floating my-3">
                    <input
                      type="text"
                      className="form-control"
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
                  <div className="form-floating my-3">
                    <input
                      type="text"
                      className="form-control"
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
                  <div className="form-floating my-3">
                    <input
                      type="text"
                      className="form-control"
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
                  <div className="form-floating my-3">
                    <input
                      type="text"
                      className="form-control"
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
                  <div className="form-floating my-3">
                    <input
                      type="text"
                      className="form-control"
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
                  <div className="form-floating my-3">
                    <input
                      type="text"
                      className="form-control"
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
                  <div className="form-floating my-3">
                    <input
                      type="text"
                      className="form-control"
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
                  <div className="form-floating my-3">
                    <input
                      type="text"
                      className="form-control"
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
                  <div className="form-floating my-3">
                    <input
                      type="text"
                      className={`form-control ${
                        order.paymentInfo && order.paymentInfo.status === "pending payment"
                          ? "text-danger"
                          : "text-success"
                      }`}
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
                    <span>
                      {order
                        ? new Date(order.createdAt)
                            .toLocaleString("en-US", {
                              day: "numeric",
                              month: "numeric",
                              year: "numeric",
                              hour: "numeric",
                              minute: "numeric",
                              hour12: true,
                            })
                            .replace(",", "")
                        : ""}
                    </span>
                  </div>
                </div>

                <div className="summary-row d-flex flex-row justify-content-between">
                  <div>Items x{order?.orderItems?.length}</div>
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

                {/* <div className="input-promo form-floating my-3">
                  <input type="text" className="form-control" id="floatingInput" disabled value="548dskfd" />
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
