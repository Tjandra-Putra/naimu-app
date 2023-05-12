import { Link } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";

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
        const { data } = await axios.get(`${server}/order/get-orders/${user.user._id}`);
        setOrdersList(data.orders);

        console.log("orders", data.orders);
        console.log("user", user.user._id);

        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
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
                      ? ordersList.map((order, index) => (
                          <tr key={index}>
                            <td>{order._id}</td>
                            <td>{order.createdAt}</td>
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
                  <ul class="pagination justify-content-center mt-3">
                    <li class="page-item disabled">
                      <a class="page-link text-dark">Previous</a>
                    </li>
                    <li class="page-item">
                      <a class="page-link text-dark" href="#">
                        1
                      </a>
                    </li>
                    <li class="page-item">
                      <a class="page-link text-dark" href="#">
                        2
                      </a>
                    </li>
                    <li class="page-item">
                      <a class="page-link text-dark" href="#">
                        3
                      </a>
                    </li>
                    <li class="page-item">
                      <a class="page-link text-dark" href="#">
                        Next
                      </a>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Orders;
