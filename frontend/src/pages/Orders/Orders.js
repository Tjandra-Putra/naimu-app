import { Link } from "react-router-dom";

import "./Orders.css";
import SideNavbar from "../../components/Layout/SideNavbar/SideNavbar";

const Orders = () => {
  return (
    <div className="orders-wrapper">
      <div className="container">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <Link to="/" class="breadcrumb-item">
              Home
            </Link>
            <li class="breadcrumb-item active" aria-current="page">
              Orders
            </li>
          </ol>
        </nav>

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
                      <th scope="col">Items Qty</th>
                      <th scope="col">Total</th>
                      <th scope="col"></th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>#1324dsf</td>
                      <td>12/12/2021</td>
                      <td>Processing</td>
                      <td>2</td>
                      <td>$56</td>
                      <td>
                        <Link to="/orders/123" className="text-decoration-none text-dark">
                          <i class="fas fa-arrow-right fa-lg"></i>
                        </Link>
                      </td>
                    </tr>
                    <tr>
                      <td>#1324dsf</td>
                      <td>12/12/2021</td>
                      <td>Processing</td>
                      <td>2</td>
                      <td>$56</td>
                      <td>
                        <Link to="/orders/123" className="text-decoration-none text-dark">
                          <i class="fas fa-arrow-right fa-lg"></i>
                        </Link>{" "}
                      </td>
                    </tr>
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
