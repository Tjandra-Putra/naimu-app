import { Link } from "react-router-dom";

import "./Refunds.css";
import SideNavbar from "../../components/Layout/SideNavbar/SideNavbar";

const Refunds = () => {
  const refundsList = [
    {
      _id: "a13b8cf8-e70a-11ed-a05b-0242ac120003",
      createdAt: "2021-09-12T14:48:00.000Z",
      orderItems: [
        {
          _id: "a11b8cf8-e70a-11ed-a05b-0242ac120003",
          product_title: "Adidas Rekive Woven Track Pants",
          product_quantity: 1,
          product_image_url:
            "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/adbb5ce2ecf142d7adbaaf6a01412450_9366/adidas_Rekive_Woven_Track_Pants_Grey_IC6006_21_model.jpg",
          product_price: 100,
        },
        {
          _id: "a11b8cf8-e70a-11ed-a05b-0242ac120003",
          product_title: "Adidas Rekive Woven Track Pants",
          product_quantity: 1,
          product_image_url:
            "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/adbb5ce2ecf142d7adbaaf6a01412450_9366/adidas_Rekive_Woven_Track_Pants_Grey_IC6006_21_model.jpg",
          product_price: 100,
        },
      ],
      orderStatus: "Refunded",
      orderTotal: 100,
    },
  ];

  return (
    <div className="refunds-wrapper">
      <div className="container">
        {/* <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <Link to="/" class="breadcrumb-item">
              Home
            </Link>
            <li class="breadcrumb-item active" aria-current="page">
              Orders
            </li>
          </ol>
        </nav> */}

        <div className="orders">
          <div className="row">
            <div className="col-md-3">
              <SideNavbar activeLink="refunds" />
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
                    {refundsList
                      ? refundsList.map((order, index) => (
                          <tr>
                            <td>{order._id}</td>
                            <td>{order.createdAt}</td>
                            <td>{order.orderStatus}</td>
                            <td>{order.orderItems.length}</td>
                            <td>${order.orderTotal}</td>
                            <td>
                              <Link to="/orders/123" className="text-decoration-none text-dark">
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

export default Refunds;
