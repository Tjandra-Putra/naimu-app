import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import axios from "axios";
import React from "react";

import "./AdminOrders.css";
import { server } from "../../../server";
import SideNavbar from "../../../components/Layout/SideNavbar/SideNavbar";
import Loader from "../../../components/Layout/Loader/Loader";

const Orders = () => {
  const [ordersList, setOrdersList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const getStatusColor = (status) => {
    switch (status) {
      case "Processing":
        return "status-processing"; // CSS class for Processing status
      case "Shipped":
        return "status-shipped"; // CSS class for Shipped status
      case "Delivered":
        return "status-delivered"; // CSS class for Delivered status
      default:
        return ""; // Default class (no specific color)
    }
  };

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [orderPerPage] = useState(4);

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

    const fetchOrders = async () => {
      try {
        setIsLoading(true);

        const { data } = await axios.get(`${server}/admin/orders/`, { withCredentials: true });
        setOrdersList(data.orders);

        setIsLoading(false);
      } catch (error) {
        console.log(error.response.data.message);
        setIsLoading(false);
      }
    };
    fetchOrders();
  }, []);

  return isLoading ? (
    <Loader />
  ) : (
    <div className="admin-orders-wrapper">
      <div className="container">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <Link to="/admin/dashboard" class="breadcrumb-item">
              Dashboard
            </Link>
            <li class="breadcrumb-item active" aria-current="page">
              Orders
            </li>
          </ol>
        </nav>

        <div className="orders">
          <div className="row">
            <div className="col-md-3 col-2">
              <SideNavbar activeLink="admin-orders" />
            </div>
            <div className="col-md-9 col-10">
              <div className="card">
                {ordersList.length > 0 ? (
                  <React.Fragment>
                    <div className="table-responsive">
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
                                  <td className="order-id">{order._id}</td>
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
                                  <td>
                                    <div className={`status-badge ${getStatusColor(order.orderStatus)}`}>
                                      <div>
                                        <i
                                          class="fa-solid fa-circle me-2"
                                          style={{ fontSize: "7px", paddingBottom: "10px" }}
                                        ></i>
                                      </div>
                                      <div>{order.orderStatus}</div>
                                    </div>
                                  </td>
                                  <td>{order.orderItems.length}</td>
                                  <td>${order.totalPrice}</td>
                                  <td>
                                    <Link to={`/admin/orders/${order._id}`} className="text-decoration-none text-dark">
                                      <i class="fas fa-arrow-right fa-lg"></i>
                                    </Link>
                                  </td>
                                </tr>
                              ))
                            : null}
                        </tbody>
                      </table>
                    </div>

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
