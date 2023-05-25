import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import { server } from "../../server";
import axios from "axios";

import { removeFromCart, updateCart } from "../../redux/actions/cart";
import { addToFavourites } from "../../redux/actions/favourite";
import Loader from "../../components/Layout/Loader/Loader";
import shoppingCartImage from "../../assets/images/shopping-cart.png";
import "./Cart.css";

const Cart = () => {
  const dispatch = useDispatch();

  // toast component
  const notifySuccess = (message) => toast.success(message, { duration: 5000 });
  const notifyError = (message) => toast.error(message, { duration: 5000 });
  const { user } = useSelector((state) => state.userReducer) ?? {}; // Using optional chaining operator and providing a default value as an empty object
  const { errorFavourite, successFavourite } = useSelector((state) => state.favouriteReducer);

  const { cart } = useSelector((state) => state.cartReducer);
  const [productList, setProductList] = useState([]); // [state, setState]
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (errorFavourite) {
      notifyError(errorFavourite);
      dispatch({ type: "ClearErrors" });
    }
    if (successFavourite) {
      notifySuccess(successFavourite);
      dispatch({ type: "ClearSuccess" });
    }
  }, [errorFavourite, successFavourite, dispatch]);

  // import product from backend
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);

      const { data } = await axios.get(`${server}/product/all-products`);
      setProductList(data.products);

      setIsLoading(false);
    };

    fetchProducts();
  }, []);

  const sizeChangeHandler = (event, _id, size) => {
    const updatedProductSize = event.target.value;

    // notify cannot update size if size already exists in cart
    const itemExist = cart.find((i) => i._id === _id && i.size === updatedProductSize);
    if (itemExist) {
      notifyError("Cannot update size. Size already exists in cart.");

      event.target.value = size;

      return;
    }

    dispatch(
      updateCart({
        _id: _id,
        size: size,
        updatedProductSize: updatedProductSize,
      })
    );

    notifySuccess("Size updated.");
  };

  const quantityChangeHandler = (event, _id, size, quantity) => {
    const updatedProductQuantity = event.target.value;

    // check if exceeds stock
    const product = productList.find((i) => i._id === _id);
    if (updatedProductQuantity > product.quantityInStock) {
      notifyError("Cannot update quantity. Quantity exceeds stock.");

      event.target.value = quantity;

      return;
    }

    dispatch(
      updateCart({
        _id: _id,
        size: size,
        quantity: Number.parseInt(updatedProductQuantity),
      })
    );

    notifySuccess("Quantity updated.");
  };

  const addToFavouritesHandler = (item) => {
    dispatch(
      addToFavourites(
        item._id,
        item.shopName,
        item.price,
        item.discountPrice,
        item.title,
        item.imageUrl,
        item.unitSold,
        item.rating
      )
    );
  };

  // compute total price
  let totalPrice = 0;
  if (cart) {
    totalPrice = cart.reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 0);
  }

  return isLoading ? (
    <Loader />
  ) : (
    <div className="cart-wrapper">
      <div className="container">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <Link to="/products" class="breadcrumb-item">
              Browse Products
            </Link>
            <li class="breadcrumb-item active" aria-current="page">
              Cart
            </li>
          </ol>
        </nav>

        <div className="row">
          <div className="col-md-8">
            <div className="card">
              <div className="title">Shopping Cart</div>

              {cart ? (
                cart.map((item, index) => (
                  <table class="table table-borderless">
                    <thead>
                      <tr>
                        <th scope="col"></th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                        <th scope="col"></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr key={index}>
                        <td className="product-action">
                          <div
                            className="btn-delete"
                            onClick={() => dispatch(removeFromCart({ _id: item._id, size: item.size }))}
                          >
                            <i class="fas fa-times fa-lg"></i>
                          </div>
                        </td>
                        <td className="product-img">
                          <Link to={`/products/${item._id}`}>
                            <img src={item.imageUrl} alt="" className="img-fluid" />
                          </Link>
                        </td>
                        <td className="product-description">
                          <div className="d-flex flex-column">
                            <div className="product-title">{item.title}</div>
                            <div className="product-id">Product ID: {item._id}</div>
                            <div className="product-store">{item.shopName}</div>
                            <div className="d-flex flex-row">
                              <div className="product-size">
                                <select
                                  class="size-select form-select"
                                  aria-label="Default select example"
                                  onChange={(event) => sizeChangeHandler(event, item._id, item.size, item.quantity)}
                                >
                                  <option disabled>Size</option>
                                  {/* select size according to cart */}
                                  <option value="XS" selected={item.size === "XS"}>
                                    XS
                                  </option>
                                  <option value="S" selected={item.size === "S"}>
                                    S
                                  </option>
                                  <option value="M" selected={item.size === "M"}>
                                    M
                                  </option>
                                  <option value="L" selected={item.size === "L"}>
                                    L
                                  </option>
                                  <option value="XL" selected={item.size === "XL"}>
                                    XL
                                  </option>
                                </select>
                              </div>
                              <div className="product-quantity ms-3">
                                <select
                                  class="size-select form-select"
                                  aria-label="Default select example"
                                  onChange={(event) => quantityChangeHandler(event, item._id, item.size, item.quantity)}
                                >
                                  <option disabled>Quantity</option>
                                  <option value="1" selected={item.quantity.toString() === "1"}>
                                    1
                                  </option>
                                  <option value="2" selected={item.quantity.toString() === "2"}>
                                    2
                                  </option>
                                  <option value="3" selected={item.quantity.toString() === "3"}>
                                    3
                                  </option>
                                  <option value="4" selected={item.quantity.toString() === "4"}>
                                    4
                                  </option>
                                  <option value="5" selected={item.quantity.toString() === "5"}>
                                    5
                                  </option>
                                  <option value="6" selected={item.quantity.toString() === "6"}>
                                    6
                                  </option>
                                  <option value="7" selected={item.quantity.toString() === "7"}>
                                    7
                                  </option>
                                  <option value="8" selected={item.quantity.toString() === "8"}>
                                    8
                                  </option>
                                  <option value="9" selected={item.quantity.toString() === "9"}>
                                    9
                                  </option>
                                  <option value="10" selected={item.quantity.toString() === "10"}>
                                    10
                                  </option>
                                </select>
                              </div>
                            </div>
                            <div
                              className="favourite"
                              onClick={() => {
                                addToFavouritesHandler(item);
                                dispatch(removeFromCart({ _id: item._id, size: item.size }));
                              }}
                            >
                              Move to Favourites
                            </div>
                          </div>
                        </td>
                        <td>${item.price * item.quantity}</td>
                      </tr>
                    </tbody>
                  </table>
                ))
              ) : (
                <h2>Cart is empty.</h2>
              )}

              {cart.length === 0 ? (
                <div className="cart-empty">
                  <img src={shoppingCartImage} alt={shoppingCartImage} className="img-fluid cart-icon" />
                  <div className="text">Your cart is empty</div>
                  <div className="sub-text">Add something to make me happy :)</div>
                  <Link to="/products" className="btn btn-browse">
                    Continue shopping
                  </Link>
                </div>
              ) : null}
            </div>
          </div>
          <div className="col-md-4">
            <div className="summary">
              <div className="card">
                <div className="title">Summary</div>

                <div className="summary-row d-flex flex-row justify-content-between">
                  <div>Items x{cart && cart.length}</div>
                  <div>${totalPrice}</div>
                </div>

                <div className="summary-row d-flex flex-row justify-content-between">
                  <div>Delivery</div>
                  <div>FREE</div>
                </div>

                <div className="summary-total d-flex flex-row justify-content-between">
                  <div>Total</div>
                  <div>${totalPrice}</div>
                </div>

                <div className="buttons my-3">
                  {cart && cart.length > 0 && user ? (
                    <div className="d-grid gap-2">
                      <Link to="/checkout" class="btn btn-dark btn-checkout btn-lg rounded-1">
                        Checkout
                      </Link>
                    </div>
                  ) : (
                    <div className="d-grid gap-2">
                      <button class="btn btn-dark btn-lg rounded-1" disabled>
                        Checkout {user ? null : "(login required)"}
                      </button>
                    </div>
                  )}
                  <div class="d-grid gap-2 my-2">
                    <Link to="/products" class="btn btn-outline-dark btn-lg mt-1 rounded-1" type="button">
                      Continue Browsing
                    </Link>
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

export default Cart;
