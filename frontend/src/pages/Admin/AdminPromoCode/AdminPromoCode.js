import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

import "./AdminPromoCode.css";
import { server } from "../../../server";
import SideNavbar from "../../../components/Layout/SideNavbar/SideNavbar";
import Loader from "../../../components/Layout/Loader/Loader";

const AdminPromoCode = () => {
  // useForm
  const createPromoCodeForm = useForm();
  const editPromoCodeForm = useForm();

  // toast component
  const notifySuccess = (message) => toast.success(message, { duration: 5000 });
  const notifyError = (message) => toast.error(message, { duration: 5000 });

  // other states
  const [isLoading, setIsLoading] = useState(false);
  const [promoCodeList, setPromoCodeList] = useState([]);
  const [productsList, setProductsList] = useState([]);
  const [originalProductsList, setOriginalProductsList] = useState([]); // used for search products
  const [selectAllChecked, setSelectAllChecked] = useState(false); // select all checkbox
  const [selectedProductsCheckbox, setSelectedProductsCheckbox] = useState([]);

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(4);

  // pagination filter logic
  const indexOfLastOrder = currentPage * productsPerPage;
  const indexOfFirstOrder = indexOfLastOrder - productsPerPage;
  const currentPromoCodes = promoCodeList.slice(indexOfFirstOrder, indexOfLastOrder);

  // pagination change page
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0);
  };

  // Generate the page numbers based on the number of order and order per page:
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(promoCodeList.length / productsPerPage); i++) {
    pageNumbers.push(i);
  }

  // handle search products
  const handleSearchProducts = (e) => {
    const searchQuery = e.target.value.toLowerCase();

    if (searchQuery === "") {
      setProductsList(originalProductsList); // Set the products list back to the original list
    } else {
      const filteredProducts = productsList.filter((product) => product.title.toLowerCase().includes(searchQuery));
      setProductsList(filteredProducts);
    }
  };

  // Function to handle the "Select All" checkbox
  const handleSelectAll = (e) => {
    const checked = e.target.checked;
    setSelectAllChecked(checked);

    if (checked) {
      // Add all product IDs to the selectedProductsCheckbox array
      const allProductIds = productsList.map((product) => product._id);
      setSelectedProductsCheckbox(allProductIds);
    } else {
      // Clear the selectedProductsCheckbox array
      setSelectedProductsCheckbox([]);
    }
  };

  // Function to handle individual product checkboxes
  const handleSelectedProduct = (e) => {
    const productId = e.target.value;
    const checked = e.target.checked;

    if (checked) {
      // Add the product ID to the selectedProductsCheckbox array
      setSelectedProductsCheckbox([...selectedProductsCheckbox, productId]);
    } else {
      // Remove the product ID from the selectedProductsCheckbox array
      setSelectedProductsCheckbox(selectedProductsCheckbox.filter((id) => id !== productId));
    }
  };

  // delete promo code
  const onDeletePromoCode = async (id) => {
    try {
      setIsLoading(true);

      const { data } = await axios.delete(`${server}/promo-code/${id}`, { withCredentials: true });
      setPromoCodeList(promoCodeList.filter((promoCode) => promoCode._id !== id));

      notifySuccess(data.message);

      setIsLoading(false);
    } catch (error) {
      notifyError(error.response.data.message);
      setIsLoading(false);
    }
  };

  // create promo code
  const onCreatePromoCode = async (data) => {
    // minimum one product selected
    if (selectedProductsCheckbox.length === 0) {
      notifyError("Please select at least one product");
      return;
    }

    // no empty fields
    if (data.promoCode === "" || data.discount === "" || data.expiryDateTime === "") {
      notifyError("Please fill in all the fields");
      return;
    }

    // check discount cannot be negative, more than 100% or contain special characters
    if (data.discount < 0 || data.discount > 100 || !/^[0-9]+$/.test(data.discount)) {
      notifyError("Invalid discount");
      return;
    }

    // check expiry date cannot be in the past
    if (new Date(data.expiryDateTime) < new Date()) {
      notifyError("Invalid expiry date");
      return;
    }

    const code = data.promoCode;
    const discount = data.discount;
    const expiryDate = data.expiryDateTime;
    const selectedProduct = selectedProductsCheckbox;

    try {
      setIsLoading(true);

      console.log("selectedProduct", selectedProduct);

      const { data: response } = await axios.post(
        `${server}/promo-code/create`,
        { code, discount, expiryDate, selectedProduct },
        { withCredentials: true }
      );

      setPromoCodeList([...promoCodeList, response.promoCode]);

      // clear the form
      createPromoCodeForm.reset();

      // unchecked all checkboxes
      setSelectAllChecked(false);
      setSelectedProductsCheckbox([]);

      notifySuccess(response.message);

      setIsLoading(false);
    } catch (error) {
      notifyError(error.response.data.message);
      setIsLoading(false);
    }
  };

  const onEditPromoCode = async (data) => {
    // minimum one product selected
    if (selectedProductsCheckbox.length === 0) {
      notifyError("Please select at least one product");
      return;
    }

    // no empty fields
    if (data.promoCode === "" || data.discount === "" || data.expiryDateTime === "") {
      notifyError("Please fill in all the fields");
      return;
    }

    // check discount cannot be negative, more than 100% or contain special characters
    if (data.discount < 0 || data.discount > 100 || !/^[0-9]+$/.test(data.discount)) {
      notifyError("Invalid discount");
      return;
    }

    // check expiry date cannot be in the past
    if (new Date(data.expiryDateTime) < new Date()) {
      notifyError("Invalid expiry date");
      return;
    }

    const code = data.promoCode;
    const discount = data.discount;
    const expiryDate = data.expiryDateTime;
    const selectedProduct = selectedProductsCheckbox;

    try {
      setIsLoading(true);

      const { data: response } = await axios.put(
        `${server}/promo-code/${promoCodeList[0]._id}`,
        { code, discount, expiryDate, selectedProduct },
        { withCredentials: true }
      );

      // update the promo code list
      const updatedPromoCodeList = promoCodeList.map((promoCode) => {
        if (promoCode._id === response.promoCode._id) {
          return response.promoCode;
        }
        return promoCode;
      });

      setPromoCodeList(updatedPromoCodeList);

      // clear the form
      editPromoCodeForm.reset();

      // unchecked all checkboxes
      setSelectAllChecked(false);
      setSelectedProductsCheckbox([]);

      notifySuccess(response.message);

      setIsLoading(false);
    } catch (error) {
      notifyError(error.response.data.message);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchPromoCodes = async () => {
      try {
        setIsLoading(true);

        const { data } = await axios.get(`${server}/promo-code/all-promo-codes`, { withCredentials: true });
        setPromoCodeList(data.promoCodes);

        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    };

    const fetchProducts = async () => {
      try {
        setIsLoading(true);

        const { data } = await axios.get(`${server}/product/all-products`, { withCredentials: true });
        setProductsList(data.products);
        setOriginalProductsList(data.products);

        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
        console.log(error);
      }
    };

    fetchPromoCodes();
    fetchProducts();
  }, []);

  return isLoading ? (
    <Loader />
  ) : (
    <div className="admin-promo-code-wrapper">
      <div className="container">
        <div className="d-flex flex-row justify-content-between">
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <Link to="/admin/dashboard" className="breadcrumb-item">
                Dashboard
              </Link>
              <li className="breadcrumb-item active" aria-current="page">
                Promo Codes
              </li>
            </ol>
          </nav>

          <button
            className="btn btn-primary create-product"
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#createPromoCodeModal"
          >
            <i className="fa-solid fa-plus"></i> Add Promo Code
          </button>

          <div
            className="modal fade modal-lg"
            id={`createPromoCodeModal`}
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog modal-dialog-centered">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">
                    Add Promo Code
                  </h1>
                  <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>{" "}
                </div>
                <div className="modal-body">
                  <form onSubmit={createPromoCodeForm.handleSubmit(onCreatePromoCode)}>
                    <div className="mb-3">
                      <div className="row">
                        <div className="col">
                          <div className="d-flex flex-row justify-content-between">
                            <label htmlFor="promoCode" className="form-label">
                              Promo Code
                            </label>
                            <label htmlFor="">Random</label>
                          </div>
                          <input
                            type="text"
                            className="form-control"
                            id="promoCode"
                            placeholder="#NAIMU30"
                            {...createPromoCodeForm.register("promoCode")}
                          />
                        </div>
                        <div className="col">
                          <label htmlFor="discount" className="form-label text-muted">
                            Discount (%)
                          </label>
                          <input
                            type="number"
                            className="form-control"
                            id="promoCode"
                            placeholder="30"
                            {...createPromoCodeForm.register("discount")}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mb-3">
                      <div className="row">
                        <div className="col">
                          <div className="d-flex flex-row justify-content-between">
                            <label htmlFor="promoCode" className="form-label">
                              Set Expiry Date
                            </label>
                          </div>
                          <input
                            type="datetime-local"
                            className="form-control"
                            id="promoCode"
                            placeholder="#NAIMU30"
                            {...createPromoCodeForm.register("expiryDateTime")}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mb-3">
                      <div className="d-flex flex-row justify-content-between">
                        <label htmlFor="products" className="form-label">
                          Select Products
                        </label>

                        <div className="selected-products-count text-primary">
                          {selectedProductsCheckbox.length > 0 &&
                            `${selectedProductsCheckbox.length} product(s) selected`}
                        </div>
                      </div>

                      <div className="mb-3">
                        <input
                          type="text"
                          className="form-control"
                          id="products"
                          placeholder="Search products"
                          onChange={handleSearchProducts}
                        />
                      </div>

                      <div className="table-container">
                        <table className="table ">
                          <thead>
                            <tr>
                              <th scope="col">
                                <div className="d-flex flex-row align-items-center">
                                  {/* This checkbox checks all the products */}
                                  <input
                                    type="checkbox"
                                    name="cb-product-all"
                                    className="form-check-input"
                                    checked={selectAllChecked}
                                    onChange={handleSelectAll}
                                  />
                                </div>
                              </th>
                              <th scope="col">Product</th>
                              <th scope="col">Title</th>
                              <th scope="col">Category</th>
                              <th scope="col">Price</th>
                            </tr>
                          </thead>
                          selected products:
                          <tbody>
                            {productsList
                              ? productsList?.map((product) => (
                                  <tr key={product._id}>
                                    <th scope="row">
                                      <input
                                        type="checkbox"
                                        name="cb-product"
                                        className="product-select-cb form-check-input"
                                        checked={selectedProductsCheckbox.includes(product._id)}
                                        value={product._id}
                                        onChange={handleSelectedProduct}
                                      />
                                    </th>
                                    <td>
                                      <div className="product-image-wrapper">
                                        <img
                                          src={product.imageUrl[0].url}
                                          alt={product.imageUrl[0].url}
                                          className="product-image"
                                        />
                                      </div>
                                    </td>
                                    <td>
                                      <div className="product-title">{product.title}</div>
                                    </td>
                                    <td>
                                      <div className="product-category">{product.category}</div>
                                    </td>
                                    <td>
                                      <div className="product-price">${product.price}</div>
                                    </td>
                                  </tr>
                                ))
                              : []}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <button type="submit" className="btn btn-primary float-end">
                      Save changes
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="orders">
          <div className="row">
            <div className="col-md-3">
              <SideNavbar activeLink="admin-promo-codes" />
            </div>
            <div className="col-md-9">
              <div className="card">
                {promoCodeList.length > 0 ? (
                  <React.Fragment>
                    <div className="table-responsive">
                      <table className="table">
                        <thead>
                          <tr>
                            <th scope="col">Code</th>
                            <th scope="col">Publish</th>
                            <th scope="col">Expiry</th>
                            <th scope="col">Status</th>
                            <th scope="col">Discount</th>
                            <th scope="col">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentPromoCodes.map((promoCode) => (
                            <tr key={promoCode._id}>
                              <td>
                                <div className="fw-semibold">{promoCode.code}</div>
                              </td>
                              <td>{promoCode.published ? <p>On - going</p> : <p>Draft</p>}</td>
                              <td>
                                {promoCode
                                  ? new Date(promoCode.expiryDate)
                                      .toLocaleDateString("en-GB", {
                                        day: "2-digit",
                                        month: "2-digit",
                                        year: "2-digit",
                                        hour: "numeric",
                                        minute: "numeric",
                                        hour12: true,
                                      })
                                      .replace(/\//g, "/")
                                      .replace(",", "")
                                  : ""}
                              </td>
                              <td>
                                {/* check if promocode expired, if expired display expired, if not display on-going */}
                                {new Date(promoCode.expiryDate) < new Date() ? <p>Expired</p> : <p>On-going</p>}
                              </td>
                              <td>{promoCode.discount}%</td>
                              <td>
                                <div className="action-buttons d-flex flex-row">
                                  <div className="pe-3">
                                    <i
                                      className="fa-regular fa-pen-to-square action-button text-primary"
                                      data-bs-toggle="modal"
                                      data-bs-target={`#editPromoCodeModal${promoCode._id}`}
                                    ></i>

                                    <div
                                      className="modal fade modal-lg"
                                      id={`editPromoCodeModal${promoCode._id}`}
                                      tabindex="-1"
                                      aria-labelledby="exampleModalLabel"
                                      aria-hidden="true"
                                    >
                                      <div className="modal-dialog modal-dialog-centered">
                                        <div className="modal-content">
                                          <div className="modal-header">
                                            <h1 className="modal-title fs-5" id="exampleModalLabel">
                                              Edit Promo Code
                                            </h1>
                                          </div>
                                          <div className="modal-body">
                                            <form onSubmit={editPromoCodeForm.handleSubmit(onEditPromoCode)}>
                                              <input
                                                type="hidden"
                                                {...editPromoCodeForm.register(`_id-${promoCode._id}`)}
                                              />

                                              <div className="mb-3">
                                                <div className="row">
                                                  <div className="col">
                                                    <div className="d-flex flex-row justify-content-between">
                                                      <label htmlFor="promoCode" className="form-label">
                                                        Promo Code
                                                      </label>
                                                      <label htmlFor="">Random</label>
                                                    </div>
                                                    <input
                                                      type="text"
                                                      className="form-control"
                                                      id="promoCode"
                                                      placeholder="#NAIMU30"
                                                      {...editPromoCodeForm.register(`promoCode-${promoCode._id}`, {
                                                        value: promoCode.code,
                                                      })}
                                                    />
                                                  </div>
                                                  <div className="col">
                                                    <label htmlFor="discount" className="form-label text-muted">
                                                      Discount (%)
                                                    </label>
                                                    <input
                                                      type="number"
                                                      className="form-control"
                                                      id="promoCode"
                                                      placeholder="30"
                                                      {...editPromoCodeForm.register(`discount-${promoCode._id}`, {
                                                        value: promoCode.discount,
                                                      })}
                                                    />
                                                  </div>
                                                </div>
                                              </div>

                                              <div className="mb-3">
                                                <div className="row">
                                                  <div className="col">
                                                    <div className="d-flex flex-row justify-content-between">
                                                      <label htmlFor="promoCode" className="form-label">
                                                        Set Expiry Date
                                                      </label>
                                                    </div>
                                                    <input
                                                      type="datetime-local"
                                                      className="form-control"
                                                      id="promoCode"
                                                      placeholder="#NAIMU30"
                                                      {...editPromoCodeForm.register(
                                                        `expiryDateTime-${promoCode._id}`,
                                                        {
                                                          value: promoCode.expiryDate
                                                            ? new Date(promoCode.expiryDate).toISOString().slice(0, -8)
                                                            : undefined,
                                                        }
                                                      )}
                                                    />
                                                  </div>
                                                </div>
                                              </div>

                                              <div className="mb-3">
                                                <div className="d-flex flex-row justify-content-between">
                                                  <label htmlFor="products" className="form-label">
                                                    Select Products
                                                  </label>

                                                  <div className="selected-products-count text-primary">
                                                    {selectedProductsCheckbox.length > 0 &&
                                                      `${selectedProductsCheckbox.length} product(s) selected`}
                                                  </div>
                                                </div>

                                                <div className="mb-3">
                                                  <input
                                                    type="text"
                                                    className="form-control"
                                                    id="products"
                                                    placeholder="Search products"
                                                    onChange={handleSearchProducts}
                                                  />
                                                </div>

                                                <div className="table-container">
                                                  <ul>
                                                    {promoCode.selectedProduct.map((product) => (
                                                      <li>{product._id}</li>
                                                    ))}
                                                  </ul>

                                                  <table className="table ">
                                                    <thead>
                                                      <tr>
                                                        <th scope="col">
                                                          <div className="d-flex flex-row align-items-center">
                                                            {/* This checkbox checks all the products */}
                                                            <input
                                                              type="checkbox"
                                                              name={`cb-product-all-${promoCode._id}`}
                                                              className="form-check-input"
                                                              checked={selectAllChecked}
                                                              onChange={handleSelectAll}
                                                            />
                                                          </div>
                                                        </th>
                                                        <th scope="col">Product</th>
                                                        <th scope="col">Title</th>
                                                        <th scope="col">Category</th>
                                                        <th scope="col">Price</th>
                                                      </tr>
                                                    </thead>
                                                    <tbody>
                                                      {productsList
                                                        ? productsList?.map((product) => (
                                                            <tr key={product._id}>
                                                              <th scope="row">
                                                                <input
                                                                  type="checkbox"
                                                                  name={`cb-product-${promoCode._id}`}
                                                                  className="product-select-cb form-check-input"
                                                                  checked={selectedProductsCheckbox.includes(
                                                                    product._id
                                                                  )}
                                                                  value={product._id}
                                                                  onChange={handleSelectedProduct}
                                                                />
                                                              </th>
                                                              <td>
                                                                <div className="product-image-wrapper">
                                                                  <img
                                                                    src={product.imageUrl[0].url}
                                                                    alt={product.imageUrl[0].url}
                                                                    className="product-image"
                                                                  />
                                                                </div>
                                                              </td>
                                                              <td>
                                                                <div className="product-title">{product.title}</div>
                                                              </td>
                                                              <td>
                                                                <div className="product-category">
                                                                  {product.category}
                                                                </div>
                                                              </td>
                                                              <td>
                                                                <div className="product-price">${product.price}</div>
                                                              </td>
                                                            </tr>
                                                          ))
                                                        : []}
                                                    </tbody>
                                                  </table>
                                                </div>
                                              </div>
                                              <button type="submit" className="btn btn-primary float-end">
                                                Save changes
                                              </button>
                                            </form>
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="pe-3">
                                    <i
                                      className="fa-regular fa-trash-can action-button text-danger"
                                      onClick={() => onDeletePromoCode(promoCode._id)}
                                    ></i>
                                  </div>
                                  <div className="pe-3">
                                    <i className="fa-regular fa-eye fa-lg action-button"></i>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          ))}
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
                    <div className="title">You have no promo codes</div>
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

export default AdminPromoCode;
