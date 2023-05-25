import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import React from "react";

import "./Orders.css";
import SideNavbar from "../../components/Layout/SideNavbar/SideNavbar";
import Loader from "../../components/Layout/Loader/Loader";
import { server } from "../../server";

const Orders = () => {
  const dispatch = useDispatch();
  const [ordersList, setOrdersList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { user, error, success } = useSelector((state) => state.userReducer);

  // toast component
  const notifySuccess = (message) => toast.success(message, { duration: 5000 });
  const notifyError = (message) => toast.error(message, { duration: 5000 });

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [orderPerPage] = useState(3);

  // pagination filter logic
  const indexOfLastOrder = currentPage * orderPerPage;
  const indexOfFirstOrder = indexOfLastOrder - orderPerPage;
  const currentOrder = ordersList.slice(indexOfFirstOrder, indexOfLastOrder);

  // pagination change page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  // Generate the page numbers based on the number of order and order per page:
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(ordersList.length / orderPerPage); i++) {
    pageNumbers.push(i);
  }

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
  }, [error, success]);

  useEffect(() => {
    const getOrders = async () => {
      setIsLoading(true);
      try {
        const { data } = await axios.get(`${server}/order/get-orders/${user.user._id}`, { withCredentials: true });

        setOrdersList(data.orders);

        console.log("orders", data.orders);
        console.log("user", user.user._id);

        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        notifyError(error.response.data.message);
        console.log(error);
      }
    };
    getOrders();
  }, [error, success]);

  return isLoading ? (
    <Loader />
  ) : (
    <div className="orders-wrapper">
      <div className="container">
        <div className="orders">
          <div className="row">
            <div className="col-md-3">
              <SideNavbar activeLink="orders" />
            </div>
            <div className="col-md-9">
              <div className="card">
                {ordersList.length > 0 ? (
                  <React.Fragment>
                    <table class="table">
                      <thead>
                        <tr>
                          <th scope="col">Order ID</th>
                          <th scope="col">Date</th>
                          <th scope="col">Status</th>
                          <th scope="col">Quantity</th>
                          <th scope="col">Total</th>
                          <th scope="col"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {ordersList
                          ? currentOrder.map((order, index) => (
                              <tr key={index}>
                                <td>{order._id}</td>
                                <td>
                                  {new Date(order.createdAt)
                                    .toLocaleString("en-US", {
                                      day: "numeric",
                                      month: "numeric",
                                      year: "numeric",
                                      hour: "numeric",
                                      minute: "numeric",
                                      hour12: true,
                                    })
                                    .replace(",", "")}
                                </td>
                                <td>{order.orderStatus}</td>
                                <td>{order.orderItems.length}</td>
                                <td>${order.totalPrice}</td>
                                <td>
                                  <Link to={`/orders/${order._id}`} className="text-decoration-none text-dark">
                                    <i class="fas fa-arrow-right fa-lg"></i>
                                  </Link>
                                </td>
                              </tr>
                            ))
                          : null}
                      </tbody>
                    </table>

                    <nav aria-label="Page navigation example">
                      <ul className="pagination justify-content-center mt-1">
                        <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                          <button className="page-link text-dark" onClick={() => handlePageChange(currentPage - 1)}>
                            Previous
                          </button>
                        </li>
                        {pageNumbers.map((number) => (
                          <li className={`page-item ${number === currentPage ? "active" : ""}`} key={number}>
                            <button className="page-link" onClick={() => handlePageChange(number)}>
                              {number}
                            </button>
                          </li>
                        ))}
                        <li className={`page-item ${currentPage === pageNumbers.length ? "disabled" : ""}`}>
                          <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>
                            Next
                          </button>
                        </li>
                      </ul>
                    </nav>
                  </React.Fragment>
                ) : (
                  <div className="orders-empty">
                    <div className="title">You have no orders</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
