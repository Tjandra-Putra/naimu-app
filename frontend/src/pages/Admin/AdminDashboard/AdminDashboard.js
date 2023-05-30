import { useState } from "react";
import axios from "axios";

import "./AdminDashboard.css";
import SideNavbar from "../../../components/Layout/SideNavbar/SideNavbar";
import BarChart from "../../../components/Charts/BarChart/BarChart";
import LineChart from "../../../components/Charts/LineChart/LineChart";
import { server } from "../../../server";

const AdminDashboard = () => {
  const [totalRevenue, setTotalRevenue] = useState(0);

  useState(() => {
    const fetchTotalRevenue = async () => {
      try {
        const { data } = await axios.get(`${server}/admin/dashboard/sales`, { withCredentials: true });
        setTotalRevenue(data.totalSales);
      } catch (error) {
        console.log(error.response.data.message);
      }
    };

    fetchTotalRevenue();
  }, []);

  return (
    <div className="admin-dashboard-wrapper">
      <div className="container">
        <div className="orders">
          <div className="row">
            <div className="col-md-3 sticky">
              <SideNavbar activeLink="admin-dashboard" />
            </div>
            <div className="col-md-9">
              <div className="card">
                <div className="title">Dashboard</div>
                <div className="summary">
                  <div className="row">
                    <div className="col-md-3">
                      <div className="stats-box-main">
                        <div className="header">
                          <div className="heading">Total Revenues</div>
                          <i class="icon-tag fa-solid fa-dollar-sign"></i>
                        </div>

                        <div className="figure">${totalRevenue}</div>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="stats-box-main">
                        <div className="header">
                          <div className="heading">Pending Orders</div>
                          <i class="icon-tag fa-solid fa-cart-shopping"></i>
                        </div>

                        <div className="figure">10</div>
                      </div>
                    </div>

                    <div className="col-md-3">
                      <div className="stats-box-main">
                        <div className="header">
                          <div className="heading">Total Customers</div>
                          <i class="icon-tag fa-solid fa-users"></i>
                        </div>
                        <div className="figure">5</div>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="stats-box-main">
                        <div className="header">
                          <div className="heading">Total Products</div>
                          <i class="icon-tag fa-solid fa-box-open"></i>
                        </div>
                        <div className="figure">203</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="revenue">
                  <div className="row">
                    <div className="col-md-8">
                      <div className="stats-box revenue-box">
                        <div className="heading">Monthly Revenue</div>

                        <LineChart text="Monthly Revenue" />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="stats-box revenue-box">
                        <div className="d-flex flex-row justify-content-between">
                          <div className="heading">Recent Sales</div>
                          <small className="view text-muted">
                            View All <i class="fa-solid fa-chevron-right"></i>
                          </small>
                        </div>
                        <div className="d-flex flex-row justify-content-between mt-3">
                          <div className="avatar-info">
                            <div className="sales-row">
                              <img
                                src="https://images.pexels.com/photos/2599510/pexels-photo-2599510.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                                alt="avatar"
                                className="img-fluid avatar"
                              />
                              <span className="user-info-wrapper ms-2">
                                <div className="user-info">
                                  <div className="name">David</div>
                                  <div className="date">5 minutes ago</div>
                                </div>
                              </span>
                            </div>
                          </div>
                          <div className="sales">+$89</div>
                        </div>

                        <div className="d-flex flex-row justify-content-between mt-3">
                          <div className="avatar-info">
                            <div className="sales-row">
                              <img
                                src="https://images.pexels.com/photos/2599510/pexels-photo-2599510.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                                alt="avatar"
                                className="img-fluid avatar"
                              />
                              <span className="user-info-wrapper ms-2">
                                <div className="user-info">
                                  <div className="name">David</div>
                                  <div className="date">5 minutes ago</div>
                                </div>
                              </span>
                            </div>
                          </div>
                          <div className="sales">+$89</div>
                        </div>

                        <div className="d-flex flex-row justify-content-between mt-3">
                          <div className="avatar-info">
                            <div className="sales-row">
                              <img
                                src="https://images.pexels.com/photos/2599510/pexels-photo-2599510.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                                alt="avatar"
                                className="img-fluid avatar"
                              />
                              <span className="user-info-wrapper ms-2">
                                <div className="user-info">
                                  <div className="name">David</div>
                                  <div className="date">5 minutes ago</div>
                                </div>
                              </span>
                            </div>
                          </div>
                          <div className="sales">+$89</div>
                        </div>

                        <div className="d-flex flex-row justify-content-between mt-3">
                          <div className="avatar-info">
                            <div className="sales-row">
                              <img
                                src="https://images.pexels.com/photos/2599510/pexels-photo-2599510.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                                alt="avatar"
                                className="img-fluid avatar"
                              />
                              <span className="user-info-wrapper ms-2">
                                <div className="user-info">
                                  <div className="name">David</div>
                                  <div className="date">5 minutes ago</div>
                                </div>
                              </span>
                            </div>
                          </div>
                          <div className="sales">+$89</div>
                        </div>

                        <div className="d-flex flex-row justify-content-between mt-3">
                          <div className="avatar-info">
                            <div className="sales-row">
                              <img
                                src="https://images.pexels.com/photos/2599510/pexels-photo-2599510.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                                alt="avatar"
                                className="img-fluid avatar"
                              />
                              <span className="user-info-wrapper ms-2">
                                <div className="user-info">
                                  <div className="name">David</div>
                                  <div className="date">5 minutes ago</div>
                                </div>
                              </span>
                            </div>
                          </div>
                          <div className="sales">+$89</div>
                        </div>

                        <div className="d-flex flex-row justify-content-between mt-3">
                          <div className="avatar-info">
                            <div className="sales-row">
                              <img
                                src="https://images.pexels.com/photos/2599510/pexels-photo-2599510.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                                alt="avatar"
                                className="img-fluid avatar"
                              />
                              <span className="user-info-wrapper ms-2">
                                <div className="user-info">
                                  <div className="name">David</div>
                                  <div className="date">5 minutes ago</div>
                                </div>
                              </span>
                            </div>
                          </div>
                          <div className="sales">+$89</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="top-products">
                  <div className="row">
                    <div className="col-md-8">
                      <div className="stats-box brand-box">
                        <div className="heading ">Unit Sold by Brand</div>
                        <BarChart text="Unit Sold" />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="stats-box country-box">
                        <div className="heading ">Unit Sold Table</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="top-products">
                  <div className="row">
                    <div className="col-md-8">
                      <div className="stats-box brand-box">
                        <div className="heading ">Total Sales by Brand</div>
                        <BarChart text="Unit Sold" />
                      </div>
                    </div>
                    <div className="col-md-4">
                      <div className="stats-box country-box">
                        <div className="heading ">Brand Sales Table</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="top-products">
                  <div className="row">
                    <div className="col-md-8">
                      <div className="stats-box country-box">
                        <div className="heading mb-3">Customer by Country</div>
                        <div className="chart-height d-flex justify-content-center" style={{ height: "20rem" }}>
                          {/* <Radar data={dataCountry} /> */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
