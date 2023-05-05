import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";

import { removeFromCart, updateCart } from "../../redux/actions/cart";
import { productList } from "../../data/data";
import shoppingCartImage from "../../assets/images/shopping-cart.png";
import "./Cart.css";

const Cart = () => {
  // toast component
  const notifySuccess = (message) => toast.success(message, { duration: 5000 });
  const notifyError = (message) => toast.error(message, { duration: 5000 });

  const dispatch = useDispatch();

  const { cart } = useSelector((state) => state.cartReducer);
  const cartItems = cart;

  const sizeChangeHandler = (event, _id, product_size) => {
    const updatedProductSize = event.target.value;

    // notify cannot update size if size already exists in cart
    const itemExist = cartItems.find((i) => i._id === _id && i.product_size === updatedProductSize);
    if (itemExist) {
      notifyError("Cannot update size. Size already exists in cart.");

      event.target.value = product_size;

      return;
    }

    dispatch(
      updateCart({
        _id: _id,
        product_size: product_size,
        updatedProductSize: updatedProductSize,
      })
    );

    notifySuccess("Size updated.");
  };

  const quantityChangeHandler = (event, _id, product_size, product_quantity) => {
    const updatedProductQuantity = event.target.value;

    // check if exceeds stock
    const product = productList.find((i) => i._id === _id);
    if (updatedProductQuantity > product.quantity_in_stock) {
      notifyError("Cannot update quantity. Quantity exceeds stock.");

      event.target.value = product_quantity;

      return;
    }

    dispatch(
      updateCart({
        _id: _id,
        product_size: product_size,
        product_quantity: Number.parseInt(updatedProductQuantity),
      })
    );

    notifySuccess("Quantity updated.");
  };

  // compute total price
  let totalPrice = 0;
  if (cartItems) {
    totalPrice = cart.reduce((acc, item) => {
      return acc + item.product_price * item.product_quantity;
    }, 0);
  }

  // const cartItems = [
  //   {
  //     product_id: "a11b8cf8-e70a-11ed-a05b-0242ac120003",
  //     product_title: "Adidas Rekive Woven Track Pants",
  //     product_image_url:
  //       "https://assets.adidas.com/images/h_840,f_auto,q_auto,fl_lossy,c_fill,g_auto/adbb5ce2ecf142d7adbaaf6a01412450_9366/adidas_Rekive_Woven_Track_Pants_Grey_IC6006_21_model.jpg",
  //     product_price: 139,
  //     product_shop_name: "Adidas",
  //     product_size: "M",
  //     product_quantity: 3,
  //   }
  // ];

  return (
    <div className="cart-wrapper">
      <div className="container">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <Link to="/" class="breadcrumb-item">
              Home
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

              {cartItems ? (
                cartItems.map((item, index) => (
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
                            onClick={() => dispatch(removeFromCart({ _id: item._id, product_size: item.product_size }))}
                          >
                            <i class="fas fa-times fa-lg"></i>
                          </div>
                        </td>
                        <td className="product-img">
                          <Link to={`/products/${item._id}`}>
                            <img src={item.product_image_url} alt="" className="img-fluid" />
                          </Link>
                        </td>
                        <td className="product-description">
                          <div className="d-flex flex-column">
                            <div className="product-title">{item.product_title}</div>
                            <div className="product-id">Product ID: {item._id}</div>
                            <div className="product-store">{item.product_shop_name}</div>
                            <div className="d-flex flex-row">
                              <div className="product-size">
                                <select
                                  class="size-select form-select"
                                  aria-label="Default select example"
                                  onChange={(event) =>
                                    sizeChangeHandler(event, item._id, item.product_size, item.product_quantity)
                                  }
                                >
                                  <option disabled>Size</option>
                                  {/* select size according to cartItems */}
                                  <option value="XS" selected={item.product_size === "XS"}>
                                    XS
                                  </option>
                                  <option value="S" selected={item.product_size === "S"}>
                                    S
                                  </option>
                                  <option value="M" selected={item.product_size === "M"}>
                                    M
                                  </option>
                                  <option value="L" selected={item.product_size === "L"}>
                                    L
                                  </option>
                                  <option value="XL" selected={item.product_size === "XL"}>
                                    XL
                                  </option>
                                </select>
                              </div>
                              <div className="product-quantity ms-3">
                                <select
                                  class="size-select form-select"
                                  aria-label="Default select example"
                                  onChange={(event) =>
                                    quantityChangeHandler(event, item._id, item.product_size, item.product_quantity)
                                  }
                                >
                                  <option disabled>Quantity</option>
                                  <option value="1" selected={item.product_quantity.toString() === "1"}>
                                    1
                                  </option>
                                  <option value="2" selected={item.product_quantity.toString() === "2"}>
                                    2
                                  </option>
                                  <option value="3" selected={item.product_quantity.toString() === "3"}>
                                    3
                                  </option>
                                  <option value="4" selected={item.product_quantity.toString() === "4"}>
                                    4
                                  </option>
                                  <option value="5" selected={item.product_quantity.toString() === "5"}>
                                    5
                                  </option>
                                  <option value="6" selected={item.product_quantity.toString() === "6"}>
                                    6
                                  </option>
                                  <option value="7" selected={item.product_quantity.toString() === "7"}>
                                    7
                                  </option>
                                  <option value="8" selected={item.product_quantity.toString() === "8"}>
                                    8
                                  </option>
                                  <option value="9" selected={item.product_quantity.toString() === "9"}>
                                    9
                                  </option>
                                  <option value="10" selected={item.product_quantity.toString() === "10"}>
                                    10
                                  </option>
                                </select>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td>${item.product_price * item.product_quantity}</td>
                      </tr>
                    </tbody>
                  </table>
                ))
              ) : (
                <h2>Cart is empty.</h2>
              )}

              {cartItems.length === 0 ? (
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
                  <div>Items x{cartItems && cartItems.length}</div>
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
                  <div class="d-grid gap-2">
                    <Link to="/checkout" class="btn btn-dark btn-lg rounded-1">
                      Checkout
                    </Link>

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
