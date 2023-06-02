import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import React from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

import "./AdminProducts.css";
import { server } from "../../../server";
import SideNavbar from "../../../components/Layout/SideNavbar/SideNavbar";
import Loader from "../../../components/Layout/Loader/Loader";

const AdminProducts = () => {
  // toast component
  const notifySuccess = (message) => toast.success(message, { duration: 5000 });
  const notifyError = (message) => toast.error(message, { duration: 5000 });

  // form state for create product
  // const { register, handleSubmit, reset } = useForm();
  const createProductForm = useForm();
  const editProductForm = useForm();

  // other states
  const [isLoading, setIsLoading] = useState(false);
  const [productsList, setProductsList] = useState([]);
  const [uniqueBrandData, setUniqueBrandData] = useState([]); // for datalist, includes brand.avatar.url and brand.name

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(4);

  // pagination filter logic
  const indexOfLastOrder = currentPage * productsPerPage;
  const indexOfFirstOrder = indexOfLastOrder - productsPerPage;
  const currentProducts = productsList.slice(indexOfFirstOrder, indexOfLastOrder);

  const publishProduct = async (productId) => {
    try {
      const { data: response } = await axios.put(
        `${server}/product/publish-product/${productId}`,
        {},
        { withCredentials: true }
      );

      // show updated add product in the state
      setProductsList((prevProducts) =>
        prevProducts.map((product) => {
          if (product._id === productId) {
            return response.product;
          } else {
            return product;
          }
        })
      );

      notifySuccess(response.message);
    } catch (error) {
      notifyError(error.response.data.message);
    }
  };

  const onCreateProduct = async (data) => {
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

      // show updated add product in the state
      setProductsList((prevProducts) => [...prevProducts, response.product]);

      notifySuccess(response.message);

      createProductForm.reset();
    } catch (error) {
      notifyError(error.response.data.message);
    }
  };

  // Edit Form Logic
  const onEditProduct = async (data, productId) => {
    const title = data[`title-${productId}`];
    const brand = data[`brand-${productId}`];
    const category = data[`category-${productId}`];
    const productImageUrl = data[`imageUrl-${productId}`];
    const price = parseFloat(data[`price-${productId}`]);
    const discountedPrice = parseFloat(data[`discountedPrice-${productId}`]);
    const brandImageUrl = data[`brandImageUrl-${productId}`];
    const quantityInStock = data[`quantityInStock-${productId}`];
    const description = data[`description-${productId}`];

    // api call edit product
    if (discountedPrice > price) {
      notifyError("Discounted price cannot be greater than price");
      return;
    }
    try {
      const { data: response } = await axios.put(
        `${server}/product/update-product/${productId}`,
        {
          title,
          brand,
          category,
          productImageUrl,
          price,
          discountedPrice: discountedPrice === 0 ? price : discountedPrice,
          brandImageUrl,
          quantityInStock,
          description,
        },
        { withCredentials: true }
      );
      // show updated add product in the state
      setProductsList((prevProducts) =>
        prevProducts.map((product) => {
          if (product._id === productId) {
            return response.product;
          } else {
            return product;
          }
        })
      );
      notifySuccess(response.message);
    } catch (error) {
      notifyError(error.response.data.message);
    }
  };

  const onDeleteProduct = async (productId) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d23457",
      cancelButtonColor: "#7a6b78",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        // api call delete product
        try {
          const { data: response } = await axios.delete(`${server}/product/delete-product/${productId}`, {
            withCredentials: true,
          });
          // Remove the deleted product from the productsList state
          setProductsList((prevProducts) => prevProducts.filter((product) => product._id !== productId));
          // notifySuccess(response.message);
          Swal.fire("Deleted", response.message, "success");
        } catch (error) {
          Swal.fire("Error", error.response.data.message, "error");
          // notifyError(error.response.data.message);
        }
      }
    });
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

        // get unique shop.avatar.url and shop.name and set state uniqueBrandData
        // const uniqueBrandData = data.products.reduce((acc, product) => {
        //   const existingIndex = acc.findIndex(
        //     (item) => item.avatarUrl === product.shop.avatar.url && item.name === product.shop.name
        //   );

        //   if (existingIndex === -1) {
        //     acc.push({
        //       avatarUrl: product.shop.avatar.url,
        //       name: product.shop.name,
        //     });
        //   }

        //   return acc;
        // }, []);

        // OR
        const uniqueBrandData = Array.from(
          new Set(
            data.products.map((product) =>
              JSON.stringify({
                avatarUrl: product.shop.avatar.url,
                name: product.shop.name,
              })
            )
          )
        ).map((item) => JSON.parse(item));

        setUniqueBrandData(uniqueBrandData);

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
            className="btn btn-primary create-product"
            type="button"
            data-bs-toggle="modal"
            data-bs-target="#createProductModal"
          >
            <i class="fa-solid fa-plus"></i> Add Product
          </button>

          <div
            class="modal fade"
            id="createProductModal"
            tabindex="-1"
            aria-labelledby="createProductModalLabel"
            aria-hidden="true"
          >
            <div class="modal-dialog modal-dialog-centered modal-lg">
              <div class="modal-content">
                <div class="modal-header">
                  <h1 class="modal-title fs-5" id="createProductModalLabel">
                    Add Product
                  </h1>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                  <form onSubmit={createProductForm.handleSubmit(onCreateProduct)}>
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
                            {...createProductForm.register("title")}
                          />
                        </div>
                        <div className="col">
                          <label for="brand" class="form-label">
                            Brand
                          </label>
                          {/* <input
                            type="text"
                            class="form-control"
                            id="brand"
                            placeholder="shop name"
                            required
                            {...createProductForm.register("brand")}
                          /> */}

                          <input
                            list="brandsCreate"
                            name="brandsCreate"
                            class="form-control"
                            id="brandsCreate"
                            placeholder="shop name"
                            required
                            {...createProductForm.register("brand")}
                          />
                          <datalist id="brandsCreate">
                            {uniqueBrandData.map((data) => (
                              // <option value={url} />
                              <option value={data.name}>{data.name}</option>
                            ))}
                          </datalist>
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
                            {...createProductForm.register("category")}
                          />
                        </div>
                      </div>
                    </div>

                    <div class="mb-3">
                      <div className="row">
                        <div className="col">
                          <label for="imageUrl" class="form-label">
                            Product Image Url (comma separated)
                          </label>
                          <textarea
                            class="form-control"
                            id="imageUrl"
                            rows="5"
                            placeholder="pants.png, shirt.png"
                            required
                            {...createProductForm.register("productImagesUrl")}
                          ></textarea>
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
                            {...createProductForm.register("price")}
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
                            required
                            {...createProductForm.register("discountedPrice")}
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
                            {...createProductForm.register("brandImageUrl")}
                          />
                          <datalist id="brands">
                            {uniqueBrandData.map((data) => (
                              // <option value={url} />
                              <option value={data.avatarUrl}>{data.name}</option>
                            ))}
                          </datalist>
                        </div>
                        <div className="col">
                          <label for="quantityInStock" class="form-label">
                            Quantity In Stock
                          </label>
                          <input
                            type="number"
                            class="form-control"
                            id="quantityInStock"
                            placeholder="0"
                            required
                            {...createProductForm.register("quantityInStock")}
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
                        rows="5"
                        placeholder="about"
                        required
                        {...createProductForm.register("description")}
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
                    <div className="table-responsive">
                      <table class="table">
                        <thead>
                          <tr>
                            <th scope="col">Product</th>
                            <th scope="col">Status</th>
                            <th scope="col">Title</th>
                            <th scope="col">Brand</th>
                            <th scope="col">Category</th>
                            {/* <th scope="col">Stock</th> */}
                            <th scope="col">Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {productsList
                            ? currentProducts.map((product, index) => {
                                return (
                                  <tr key={index}>
                                    <td>
                                      <img
                                        src={product.imageUrl[0].url}
                                        alt={product.title}
                                        className="product-image"
                                      />
                                    </td>
                                    <td>
                                      {product.published ? (
                                        <div className="product-status product-status-published">
                                          <div>
                                            <i
                                              class="fa-solid fa-circle me-2"
                                              style={{ fontSize: "7px", paddingBottom: "10px" }}
                                            ></i>
                                          </div>
                                          <div className="status">Published</div>
                                        </div>
                                      ) : (
                                        <div className="product-status product-status-draft">
                                          <div>
                                            <i
                                              class="fa-solid fa-circle me-2"
                                              style={{ fontSize: "7px", paddingBottom: "10px" }}
                                            ></i>
                                          </div>
                                          <div className="status">Draft</div>
                                        </div>
                                      )}
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
                                    {/* <td>
                                    <div className="product-stock">{product.quantityInStock}</div>
                                  </td> */}
                                    <td>
                                      <div className="action-buttons d-flex flex-row">
                                        <div className="pe-3">
                                          <i
                                            class="fa-regular fa-pen-to-square action-button text-primary"
                                            data-bs-toggle="modal"
                                            data-bs-target={`#editProductModal${product._id}`}
                                          ></i>

                                          <div
                                            class="modal fade text-start"
                                            id={`editProductModal${product._id}`}
                                            tabindex="-1"
                                            aria-labelledby={`editProductModalLabel${product._id}`}
                                            aria-hidden="true"
                                          >
                                            <div class="modal-dialog modal-dialog-centered modal-lg">
                                              <div class="modal-content">
                                                <div class="modal-header">
                                                  <h1
                                                    class="modal-title fs-5"
                                                    id={`editProductModalLabel${product._id}`}
                                                  >
                                                    Edit Product
                                                  </h1>
                                                  <button
                                                    type="button"
                                                    class="btn-close"
                                                    data-bs-dismiss="modal"
                                                    aria-label="Close"
                                                  ></button>
                                                </div>
                                                <div class="modal-body">
                                                  <form
                                                    key={product._id}
                                                    onSubmit={editProductForm.handleSubmit((data) =>
                                                      onEditProduct(data, product._id)
                                                    )}
                                                  >
                                                    <input
                                                      type="hidden"
                                                      {...editProductForm.register(`_id-${product._id}`)}
                                                    />

                                                    <div class="mb-3">
                                                      <div className="row">
                                                        <div className="col">
                                                          <label for="title" class="form-label">
                                                            Title
                                                          </label>
                                                          <input
                                                            type="text"
                                                            class="form-control"
                                                            {...editProductForm.register(`title-${product._id}`, {
                                                              value: product.title,
                                                            })}
                                                          />
                                                        </div>
                                                        <div className="col">
                                                          <label for="brand" class="form-label">
                                                            Brand
                                                          </label>
                                                          <input
                                                            type="text"
                                                            class="form-control"
                                                            {...editProductForm.register(`brand-${product._id}`, {
                                                              value: product.shop.name,
                                                            })}
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
                                                            {...editProductForm.register(`category-${product._id}`, {
                                                              value: product.category,
                                                            })}
                                                          />
                                                        </div>
                                                      </div>
                                                    </div>

                                                    <div class="mb-3">
                                                      <div className="row">
                                                        <div className="col">
                                                          <label for="imageUrl" class="form-label">
                                                            Product Image Url (comma separated)
                                                          </label>
                                                          <textarea
                                                            class="form-control"
                                                            id="imageUrl"
                                                            rows="5"
                                                            {...editProductForm.register(`imageUrl-${product._id}`, {
                                                              value: product.imageUrl
                                                                .map((image) => image.url)
                                                                .join(",\n"),
                                                            })}
                                                            style={{ whiteSpace: "pre-line" }}
                                                            name="imageUrl"
                                                          ></textarea>
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
                                                            {...editProductForm.register(`price-${product._id}`, {
                                                              value: product.price,
                                                            })}
                                                          />
                                                        </div>
                                                        <div className="col">
                                                          <label for="discountedPrice" class="form-label">
                                                            Discounted Price
                                                          </label>
                                                          <input
                                                            type="number"
                                                            class="form-control"
                                                            {...editProductForm.register(
                                                              `discountedPrice-${product._id}`,
                                                              {
                                                                value: product.discountPrice,
                                                              }
                                                            )}
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
                                                            class="form-control"
                                                            {...editProductForm.register(
                                                              `brandImageUrl-${product._id}`,
                                                              {
                                                                value: product.shop.avatar.url,
                                                              }
                                                            )}
                                                          />
                                                          <datalist id="brands">
                                                            {uniqueBrandData.map((data) => (
                                                              <option value={data.avatarUrl}>{data.name}</option>
                                                            ))}
                                                          </datalist>
                                                        </div>
                                                        <div className="col">
                                                          <label for="quantityInStock" class="form-label">
                                                            Quantity In Stock
                                                          </label>
                                                          <input
                                                            type="number"
                                                            class="form-control"
                                                            {...editProductForm.register(
                                                              `quantityInStock-${product._id}`,
                                                              {
                                                                value: product.quantityInStock,
                                                              }
                                                            )}
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
                                                        rows="5"
                                                        {...editProductForm.register(`description-${product._id}`, {
                                                          value: product.description,
                                                        })}
                                                      ></textarea>
                                                    </div>

                                                    <button type="submit" class="btn btn-primary float-end fw-semibold">
                                                      Save Changes
                                                    </button>
                                                  </form>
                                                </div>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="pe-3">
                                          <i
                                            class="fa-regular fa-trash-can action-button text-danger"
                                            onClick={() => onDeleteProduct(product._id)}
                                          ></i>
                                        </div>
                                        <div className="pe-3">
                                          {product.published ? (
                                            <i
                                              class="fa-regular fa-eye fa-lg action-button"
                                              onClick={() => publishProduct(product._id)}
                                            ></i>
                                          ) : (
                                            <i
                                              class="fa-regular fa-eye-slash action-button"
                                              onClick={() => publishProduct(product._id)}
                                            ></i>
                                          )}
                                        </div>
                                      </div>
                                    </td>
                                  </tr>
                                );
                              })
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
