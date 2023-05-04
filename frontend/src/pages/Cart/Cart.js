import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { addToCart, removeFromCart, updateCart } from "../../redux/actions/cart";
import "./Cart.css";

const Cart = () => {
  const dispatch = useDispatch();

  const { cart } = useSelector((state) => state.cartReducer);
  const cartItems = cart;

  const sizeChangeHandler = (event, _id, product_size) => {
    const updatedProductSize = event.target.value;

    // notify cannot update size if size already exists in cart
    const itemExist = cartItems.find((i) => i._id === _id && i.product_size === updatedProductSize);
    if (itemExist) {
      alert("Cannot update size. Size already exists in cart.");

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
  };

  const quantityChangeHandler = (event, _id, product_size, product_quantity) => {
    const updatedProductQuantity = event.target.value;

    dispatch(
      updateCart({
        _id: _id,
        product_size: product_size,
        product_quantity: Number.parseInt(updatedProductQuantity),
      })
    );
  };

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
                  {cartItems ? (
                    cartItems.map((item, index) => (
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
                    ))
                  ) : (
                    <p>Cart is empty.</p>
                  )}
                </tbody>
              </table>
            </div>
          </div>
          <div className="col-md-4">
            <div className="summary">
              <div className="card">
                <div className="title">Summary</div>

                <div className="summary-row d-flex flex-row justify-content-between">
                  <div>Items x2</div>
                  <div>$139</div>
                </div>

                <div className="summary-row d-flex flex-row justify-content-between">
                  <div>Delivery</div>
                  <div>FREE</div>
                </div>

                <div className="summary-total d-flex flex-row justify-content-between">
                  <div>Total</div>
                  <div>$139</div>
                </div>

                {/* <div class="input-promo form-floating my-3">
                  <input type="text" class="form-control" id="floatingInput" placeholder="name@example.com" />
                  <label for="floatingInput">Enter your promo code</label>
                </div> */}
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
