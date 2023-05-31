import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";

import "./AdminProducts.css";
import { server } from "../../../server";
import SideNavbar from "../../../components/Layout/SideNavbar/SideNavbar";
import Loader from "../../../components/Layout/Loader/Loader";

const AdminProducts = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [productsList, setProductsList] = useState([]);

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(4);

  // pagination filter logic
  const indexOfLastOrder = currentPage * productsPerPage;
  const indexOfFirstOrder = indexOfLastOrder - productsPerPage;
  const currentProducts = productsList.slice(indexOfFirstOrder, indexOfLastOrder);

  // pagination change page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  // Generate the page numbers based on the number of order and order per page:
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(productsList.length / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // setIsLoading(true);

        const { data } = await axios.get(`${server}/product/all-products`, { withCredentials: true });
        setProductsList(data.products);

        console.log(data.products);

        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    };

    fetchProducts();
  }, []);

  return isLoading ? (
    <Loader />
  ) : (
    <div className="admin-products-wrapper">
      <div className="container">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <Link to="/admin/dashboard" class="breadcrumb-item">
              Dashboard
            </Link>
            <li class="breadcrumb-item active" aria-current="page">
              Products
            </li>
          </ol>
        </nav>

        <div className="orders">
          <div className="row">
            <div className="col-md-3">
              <SideNavbar activeLink="admin-products" />
            </div>
            <div className="col-md-9">
              <div className="card">
                {productsList.length > 0 ? (
                  <React.Fragment>
                    <table class="table">
                      <thead>
                        <tr>
                          <th scope="col">Thumbnail</th>
                          <th scope="col">Title</th>
                          <th scope="col">Brand</th>
                          <th scope="col">Category</th>
                          <th scope="col">Stock</th>
                          <th scope="col">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {productsList
                          ? currentProducts.map((product, index) => (
                              <tr key={index}>
                                <td>
                                  <img src={product.imageUrl[0].url} alt={product.title} className="product-image" />
                                </td>
                                <td>
                                  <div className="product-title">{product.title}</div>
                                </td>
                                <td>
                                  <div className="product-brand">{product.shop.name}</div>
                                </td>
                                <td>
                                  <div className="product-category">{product.category}</div>
                                </td>
                                <td>
                                  <div className="product-stock">{product.quantityInStock}</div>
                                </td>
                                <td>
                                  <Link
                                    to={`/admin/products/${product._id}`}
                                    className="text-decoration-none text-dark"
                                  >
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
                    <div className="title">You have no products</div>
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

export default AdminProducts;
