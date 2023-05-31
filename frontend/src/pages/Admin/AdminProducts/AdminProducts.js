import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

import "./AdminProducts.css";
import { server } from "../../../server";
import SideNavbar from "../../../components/Layout/SideNavbar/SideNavbar";
import Loader from "../../../components/Layout/Loader/Loader";

const AdminProducts = () => {
  // toast component
  const notifySuccess = (message) => toast.success(message, { duration: 5000 });
  const notifyError = (message) => toast.error(message, { duration: 5000 });

  const { register, handleSubmit } = useForm();

  const [isLoading, setIsLoading] = useState(false);
  const [productsList, setProductsList] = useState([]);
  const [uniqueBrandImageUrl, setUniqueBrandImageUrl] = useState([]);

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(4);

  // pagination filter logic
  const indexOfLastOrder = currentPage * productsPerPage;
  const indexOfFirstOrder = indexOfLastOrder - productsPerPage;
  const currentProducts = productsList.slice(indexOfFirstOrder, indexOfLastOrder);

  const onCreateProduct = async (data) => {
    console.log(data);
    // api call create product
    if (data.discountedPrice > data.price) return notifyError("Discounted price cannot be greater than price");

    try {
      const { data: response } = await axios.post(
        `${server}/product/create-product`,
        {
          title: data.title,
          brand: data.brand,
          category: data.category,
          productImagesUrl: data.productImagesUrl,
          price: data.price,
          discountedPrice: data.discountedPrice === 0 ? data.price : data.discountedPrice,
          brandImageUrl: data.brandImageUrl,
          quantityInStock: data.quantityInStock,
          description: data.description,
        },
        { withCredentials: true }
      );

      notifySuccess("Product created successfully");
      console.log(response);

      // refresh page
      window.location.reload();
    } catch (error) {
      console.log(error.response.data.message);
    }
  };

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
        setIsLoading(true);

        const { data } = await axios.get(`${server}/product/all-products`, { withCredentials: true });
        setProductsList(data.products);

        // get unique shop.avatar.url and set state uniqueBrandImageUrl
        const uniqueBrandImageUrl = [...new Set(data.products.map((product) => product.shop.avatar.url))];
        setUniqueBrandImageUrl(uniqueBrandImageUrl);

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
        <div className="d-flex flex-row justify-content-between">
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

          <button
            className="btn btn-dark rounded-5 create-product"
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#exampleModal"
          >
            <i class="fa-solid fa-plus"></i> Add Product
          </button>

          <div
            class="modal fade"
            id="exampleModal"
            tabindex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog modal-dialog-centered  modal-lg">
              <div class="modal-content">
                <div class="modal-header">
                  <h1 class="modal-title fs-5" id="exampleModalLabel">
                    Add Product
                  </h1>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  <form onSubmit={handleSubmit(onCreateProduct)}>
                    <div class="mb-3">
                      <div className="row">
                        <div className="col">
                          <label for="title" class="form-label">
                            Title
                          </label>
                          <input
                            type="text"
                            class="form-control"
                            id="title"
                            placeholder="name"
                            required
                            {...register("title")}
                          />
                        </div>
                        <div className="col">
                          <label for="brand" class="form-label">
                            Brand
                          </label>
                          <input
                            type="text"
                            class="form-control"
                            id="brand"
                            placeholder="shop name"
                            required
                            {...register("brand")}
                          />
                        </div>
                      </div>
                    </div>

                    <div class="mb-3">
                      <div className="row">
                        <div className="col">
                          <label for="category" class="form-label">
                            Category
                          </label>
                          <input
                            type="text"
                            class="form-control"
                            id="category"
                            placeholder="type"
                            required
                            {...register("category")}
                          />
                        </div>
                        <div className="col">
                          <label for="imageUrl" class="form-label">
                            Product Image Url (comma separated)
                          </label>
                          <input
                            type="url"
                            class="form-control"
                            id="imageUrl"
                            placeholder="[pants.png, shirt.png]"
                            required
                            {...register("productImagesUrl")}
                          />
                        </div>
                      </div>
                    </div>

                    <div class="mb-3">
                      <div className="row">
                        <div className="col">
                          <label for="price" class="form-label">
                            Price
                          </label>
                          <input
                            type="number"
                            class="form-control"
                            id="price"
                            placeholder="$"
                            required
                            {...register("price")}
                          />
                        </div>
                        <div className="col">
                          <label for="discountedPrice" class="form-label">
                            Discounted Price
                          </label>
                          <input
                            type="number"
                            class="form-control"
                            id="discountedPrice"
                            placeholder="Same as price if no discount"
                            {...register("discountedPrice")}
                          />
                        </div>
                      </div>
                    </div>

                    <div class="mb-3">
                      <div className="row">
                        <div className="col">
                          <label for="brandImageUrl" class="form-label">
                            Brand Image Url
                          </label>

                          <input
                            list="brands"
                            name="brands"
                            class="form-control"
                            id="brandImageUrl"
                            placeholder="https://adidas.png"
                            required
                            {...register("brandImageUrl")}
                          />
                          <datalist id="brands">
                            {uniqueBrandImageUrl.map((url) => (
                              <option value={url} />
                            ))}
                          </datalist>
                          {/* 
                          <input
                            type="text"
                            class="form-control"
                            id="brandImageUrl"
                            placeholder="adidas.png"
                            required
                            {...register("brandImageUrl")}
                          /> */}
                        </div>
                        <div className="col">
                          <label for="quantityInStock" class="form-label">
                            Quantity In Stock
                          </label>
                          <input
                            type="text"
                            class="form-control"
                            id="quantityInStock"
                            placeholder="0"
                            required
                            {...register("quantityInStock")}
                          />
                        </div>
                      </div>
                    </div>

                    <div class="mb-3">
                      <label for="description" class="form-label">
                        Description
                      </label>
                      <textarea
                        class="form-control"
                        id="description"
                        rows="3"
                        placeholder="about"
                        required
                        {...register("description")}
                      ></textarea>
                    </div>

                    <button type="submit" class="btn btn-primary float-end fw-semibold">
                      Add Product
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
