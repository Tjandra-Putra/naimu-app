import { useState } from "react";
import axios from "axios";
import { formatDistanceToNow } from "date-fns";

import "./AdminDashboard.css";
import SideNavbar from "../../../components/Layout/SideNavbar/SideNavbar";
import BarChart from "../../../components/Charts/BarChart/BarChart";
import LineChart from "../../../components/Charts/LineChart/LineChart";
import RadarChart from "../../../components/Charts/PolarChart/PolarChart";
import { server } from "../../../server";
import userImage from "../../../assets/images/user.png";

const AdminDashboard = () => {
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [pendingOrders, setPendingOrders] = useState(0);
  const [totalDelivered, setTotalDelivered] = useState(0); // total order delivered
  const [totalProducts, setTotalProducts] = useState(0);
  const [monthlySales, setMonthlySales] = useState(0);
  const [selectedYear, setSelectedYear] = useState(2023);
  const [totalUnitSoldByBrand, setTotalUnitSoldByBrand] = useState(0);
  const [allOrders, setAllOrders] = useState(0); // [{}
  const [usersByCountry, setUsersByCountry] = useState(0); // [{}

  // set year array memo
  const yearArr = [2020, 2021, 2022, 2023];

  const yearChangeHandler = (year) => {
    setSelectedYear(Number(year));
  };

  useState(() => {
    const fetchTotalRevenue = async () => {
      try {
        const { data } = await axios.get(`${server}/admin/dashboard/sales`, { withCredentials: true });
        setTotalRevenue(data.totalSales);
      } catch (error) {
        console.log(error.response.data.message);
      }
    };

    const fetchPendingOrders = async () => {
      try {
        const { data } = await axios.get(`${server}/admin/dashboard/pending-orders`, { withCredentials: true });
        setPendingOrders(data.pendingOrders);
      } catch (error) {
        console.log(error.response.data.message);
      }
    };

    const fetchTotalDelivered = async () => {
      try {
        const { data } = await axios.get(`${server}/admin/dashboard/customers`, { withCredentials: true });
        setTotalDelivered(data.customers);
      } catch (error) {
        console.log(error.response.data.message);
      }
    };

    const fetchTotalProducts = async () => {
      try {
        const { data } = await axios.get(`${server}/admin/dashboard/products`, { withCredentials: true });
        setTotalProducts(data.products);
      } catch (error) {
        console.log(error.response.data.message);
      }
    };

    const fetchMonthlySales = async () => {
      try {
        const { data } = await axios.get(`${server}/admin/dashboard/monthly-sales`, { withCredentials: true });
        setMonthlySales(data.monthlySales);
      } catch (error) {
        console.log(error.response.data.message);
      }
    };

    const fetchTotalUnitSoldByBrand = async () => {
      try {
        const { data } = await axios.get(`${server}/admin/dashboard/products-sold-by-brand`, { withCredentials: true });
        setTotalUnitSoldByBrand(data.productsSoldByBrand);
      } catch (error) {
        console.log(error.response.data.message);
      }
    };

    const fetchAllOrders = async () => {
      try {
        const { data } = await axios.get(`${server}/order/all-orders`, { withCredentials: true });
        console.log(data.orders);
        setAllOrders(data.orders);
      } catch (error) {
        console.log(error.response.data.message);
      }
    };

    const fetchUsesByCountry = async () => {
      try {
        const { data } = await axios.get(`${server}/admin/dashboard/users-by-country`, { withCredentials: true });
        console.log(data.usersByCountry);
        setUsersByCountry(data.usersByCountry);
      } catch (error) {
        console.log(error.response.data.message);
      }
    };

    fetchTotalRevenue();
    fetchPendingOrders();
    fetchTotalDelivered();
    fetchTotalProducts();
    fetchMonthlySales();
    fetchTotalUnitSoldByBrand();
    fetchAllOrders();
    fetchUsesByCountry();
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
                <div className="d-flex flex-row justify-content-between">
                  <div className="title">Dashboard</div>

                  <select
                    class="form-select mb-3"
                    aria-label="Default select example"
                    style={{ width: "10rem" }}
                    onChange={(e) => yearChangeHandler(e.target.value)}
                  >
                    <option>Filter by Year</option>

                    {yearArr.map((year, index) => {
                      return (
                        <option value={year} selected={year === selectedYear ? true : false} key={index}>
                          {year}
                        </option>
                      );
                    })}
                  </select>
                </div>

                {selectedYear !== 2023 && (
                  <div class="alert alert-success alert-dismissible fade show" role="alert">
                    <div className="filterd-by d-flex flex-row">
                      <i class="icon-tag fa-solid fa-filter fa-sm"></i>
                      <div className="mt-1 ms-2">Filtered by {selectedYear}</div>
                    </div>

                    <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                  </div>
                )}

                <div className="summary">
                  <div className="row">
                    <div className="col-md-3">
                      <div className="stats-box-main">
                        <div className="header">
                          <div className="heading">Total Revenues</div>
                          <i class="icon-tag fa-solid fa-dollar-sign"></i>
                        </div>

                        <div className="figure">{totalRevenue ? `$${totalRevenue}` : "Loading..."}</div>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="stats-box-main">
                        <div className="header">
                          <div className="heading">Pending Orders</div>
                          <i class="icon-tag fa-solid fa-cart-shopping"></i>
                        </div>

                        <div className="figure">{pendingOrders ? `${pendingOrders}` : "Loading..."}</div>
                      </div>
                    </div>

                    <div className="col-md-3">
                      <div className="stats-box-main">
                        <div className="header">
                          <div className="heading">Total Customers</div>
                          <i class="icon-tag fa-solid fa-users"></i>
                        </div>
                        <div className="figure">{totalDelivered ? `${totalDelivered}` : "Loading..."}</div>
                      </div>
                    </div>
                    <div className="col-md-3">
                      <div className="stats-box-main">
                        <div className="header">
                          <div className="heading">Total Products</div>
                          <i class="icon-tag fa-solid fa-box-open"></i>
                        </div>
                        <div className="figure">{totalProducts ? `${totalProducts}` : "Loading..."}</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="revenue">
                  <div className="row">
                    <div className="col-md-8">
                      <div className="stats-box revenue-box">
                        <div className="heading">Monthly Revenue</div>

                        <LineChart text="Monthly Revenue" dataApi={monthlySales} selectedYear={selectedYear} />
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
                        {allOrders &&
                          allOrders.map((order, index) => {
                            const timeAgo = formatDistanceToNow(new Date(order?.createdAt), { addSuffix: true });

                            return (
                              <div className="d-flex flex-row justify-content-between mt-3" key={index}>
                                <div className="avatar-info">
                                  <div className="sales-row">
                                    <img src={userImage} alt="avatar" className="img-fluid avatar" />
                                    <span className="user-info-wrapper ms-2">
                                      <div className="user-info">
                                        <div className="name">{order?.user?.fullName}</div>
                                        <div className="date">{timeAgo}</div>
                                      </div>
                                    </span>
                                  </div>
                                </div>
                                <div className="sales">+${order?.totalPrice.toFixed(2)}</div>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="top-products">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="stats-box brand-box">
                        <div className="heading ">Unit Sold by Brand</div>
                        <BarChart
                          text="Unit Sold By Brand"
                          selectedYear={selectedYear}
                          dataApi={totalUnitSoldByBrand}
                          display="unitSoldByBrand"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="top-products">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="stats-box brand-box">
                        <div className="heading ">Total Sales by Brand</div>
                        <BarChart
                          text="Total Sales By Brand"
                          selectedYear={selectedYear}
                          dataApi={totalUnitSoldByBrand}
                          display="totalSalesByBrand"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="top-products">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="stats-box country-box">
                        <div className="heading mb-3">Customer by Country</div>
                        <div className="chart-height d-flex justify-content-center">
                          <RadarChart dataApi={usersByCountry} text="Users by Country" />
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
