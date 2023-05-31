import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

import "./AdminOrder.css";
import { server } from "../../../server";
import Loader from "../../../components/Layout/Loader/Loader";

const AdminOrder = () => {
  const [order, setOrder] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const { id } = useParams();

  // toast component
  const notifySuccess = (message) => toast.success(message, { duration: 5000 });
  const notifyError = (message) => toast.error(message, { duration: 5000 });

  // update order status from processing to shipped to delivered step by step
  const updateOrderStatus = async (status) => {
    try {
      setIsLoading(true);
      const { data } = await axios.put(`${server}/admin/orders/${id}`, { status }, { withCredentials: true });

      setOrder(data.order);

      setIsLoading(false);

      notifySuccess(data.message);
    } catch (error) {
      console.log(error.response.data.message);
      setIsLoading(false);
      notifyError(error.response.data.message);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);

    const getOrder = async () => {
      try {
        setIsLoading(true);
        const { data } = await axios.get(`${server}/admin/orders/${id}`, {
          withCredentials: true,
        });
        setOrder(data.order);
        setIsLoading(false);

        console.log(data.order);
      } catch (error) {
        console.log(error.response.data.message);
        setIsLoading(false);
      }
    };

    getOrder();
  }, [id]);

  return isLoading ? (
    <Loader />
  ) : (
    <div className="admin-order-wrapper">
      <div className="container">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <Link to="/admin/orders" className="breadcrumb-item text-dark text-muted">
              Orders
            </Link>
            <Link className="breadcrumb-item text-dark fw-medium"> {id}</Link>
          </ol>
        </nav>

        {/* <div className="message mb-2">Thank you for shopping at NAIMU</div> */}

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
                  {order?.orderItems &&
                    order?.orderItems.map((item, index) => (
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

                <div className="dropdown-center dropdown mt-3">
                  <button
                    className="btn btn-dark rounded-1 dropdown-toggle"
                    style={{ width: "100%" }}
                    type="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    disabled={order.orderStatus === "Delivered"}
                  >
                    Update Order Status
                  </button>

                  {/* only show next stage of order update status */}
                  <ul className="dropdown-menu text-center" style={{ width: "100%" }}>
                    {order.orderStatus === "Processing" && (
                      <>
                        <li>
                          <div className="dropdown-item status-dropdown" onClick={() => updateOrderStatus("Shipped")}>
                            Shipped
                          </div>
                        </li>
                        <li>
                          <div className="dropdown-item status-dropdown" onClick={() => updateOrderStatus("Delivered")}>
                            Delivered
                          </div>
                        </li>
                      </>
                    )}
                    {order.orderStatus === "Shipped" && (
                      <>
                        <li>
                          <div className="dropdown-item status-dropdown" onClick={() => updateOrderStatus("Delivered")}>
                            Delivered
                          </div>
                        </li>
                      </>
                    )}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOrder;
