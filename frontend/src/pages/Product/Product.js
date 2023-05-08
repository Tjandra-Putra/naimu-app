import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import axios from "axios";

import "./Product.css";
import Rating from "../../components/Rating/Rating";
import Reviews from "../../components/Reviews/Reviews";
import Loader from "../../components/Layout/Loader/Loader";

import { addToCart } from "../../redux/actions/cart";
import { server } from "../../server";

const Product = () => {
  // toast component
  const notifySuccess = (message) => toast.success(message, { duration: 5000 });
  const notifyError = (message) => toast.error(message, { duration: 5000 });

  const [productList, setProductList] = useState([]); // [state, setState]
  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState(null);

  // redux state
  const { cart } = useSelector((state) => state.cartReducer);
  const dispatch = useDispatch();

  // get product id from route parameter
  const { id } = useParams();
  const [selectedSize, setSelectedSize] = useState(null);
  const [availableSizes] = useState([
    { id: 1, size: "XS" },
    { id: 2, size: "S" },
    { id: 3, size: "M" },
    { id: 4, size: "L" },
    { id: 5, size: "XL" },
  ]);

  // import product from backend
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);

      const { data } = await axios.get(`${server}/product/all-products`);
      // setProductList(data.products);
      setProduct(data.products.find((item) => item._id === id));

      setIsLoading(false);
    };

    fetchProducts();
  }, []);

  // get specific product from productList
  // const product = productList.find((item) => item._id === id);

  const setSizeHandler = (size) => {
    setSelectedSize(size);
  };

  const addToCartHandler = () => {
    // if size is not selected, alert user
    if (!selectedSize) {
      notifyError("Please select a size");
      return;
    }

    // if size is selected, add to cart
    const newCart = {
      _id: product._id,
      product_title: product.product_title,
      product_image_url: product.product_image_url[0].url,
      product_price: product.product_discount_price,
      product_size: availableSizes[selectedSize - 1].size,
      product_quantity: 1,
      product_shop_name: product.shop.name,
    };

    const itemExist =
      cart && cart.find((item) => item._id === product._id && item.product_size === newCart.product_size);
    if (itemExist) {
      // if item in cart, update qty only
      dispatch(addToCart(newCart));
      notifySuccess("Item quantity updated in cart");
      return;
    } else {
      dispatch(addToCart(newCart));
      notifySuccess("Item added to cart");
    }
  };

  return isLoading ? (
    <Loader />
  ) : (
    <div className="product-wrapper">
      <div className="container">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <Link to="/" className="breadcrumb-item text-muted">
              Home
            </Link>
            <Link to="/" className="breadcrumb-item text-muted">
              Adidas
            </Link>
            <Link to="/products" className="breadcrumb-item text-muted">
              Browse
            </Link>
            <li className="breadcrumb-item text-muted" aria-current="page">
              {product.product_category}
            </li>
            <li className="breadcrumb-item" aria-current="page">
              {product.product_title}
            </li>
          </ol>
        </nav>

        <main>
          <div className="row">
            <div className="left-wrapper col-md-8">
              <div className="img-gallery row">
                {/* product images */}
                {product
                  ? product.product_image_url.map((item, index) => (
                      <div className="col-md-6" key={index}>
                        <div className="product-img-container">
                          <img src={item.url} alt={item.url} className="img-fluid product-img" />
                        </div>
                      </div>
                    ))
                  : null}
              </div>

              <div className="product-info">
                <div className="accordion accordion-flush" id="accordionFlushExample">
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#flush-collapseOne"
                        aria-expanded="false"
                        aria-controls="flush-collapseOne"
                      >
                        Description
                      </button>
                    </h2>
                    <div
                      id="flush-collapseOne"
                      className="accordion-collapse collapse show"
                      data-bs-parent="#accordionFlushExample"
                    >
                      <div className="accordion-body">{product.product_description}</div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#flush-collapseTwo"
                        aria-expanded="false"
                        aria-controls="flush-collapseTwo"
                        data-bs-focus="false"
                      >
                        Free Delivery and Returns
                      </button>
                    </h2>
                    <div
                      id="flush-collapseTwo"
                      className="accordion-collapse collapse"
                      data-bs-parent="#accordionFlushExample"
                    >
                      <div className="accordion-body">
                        <p>Your order of S$75 or more gets free standard delivery.</p>
                        <ul>
                          <li>Standard delivered 1-3 Business Days</li>
                          <li>Express delivered 0-2 Business Days</li>
                        </ul>

                        <p>Orders are processed and delivered Monday-Friday (excluding public holidays).</p>
                        <p>NAIMU Members enjoy free returns. Exclusions apply.</p>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#flush-collapseThree"
                        aria-expanded="false"
                        aria-controls="flush-collapseThree"
                      >
                        <div className="d-flex flex-row justify-content-between">
                          <span className="me-2">Reviews</span>
                          <div className="accordion-item-review">
                            <Rating showCount={true} />
                          </div>
                        </div>
                      </button>
                    </h2>
                    <div
                      id="flush-collapseThree"
                      className="accordion-collapse collapse"
                      data-bs-parent="#accordionFlushExample"
                    >
                      <div className="accordion-body">
                        <Reviews />
                      </div>
                    </div>
                  </div>

                  <div className="accordion-item">
                    <h2 className="accordion-header">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#flush-collapseFour"
                        aria-expanded="false"
                        aria-controls="flush-collapseFour"
                      >
                        <div className="d-flex flex-row justify-content-between">
                          <span className="me-2">Store Info</span>
                          <div className="accordion-item-review">
                            <img src={product.shop.shop_avatar.url} alt="" className="store-img pe-2" />
                            <span>
                              {product.shop.name} ({product.shop.ratings})
                            </span>
                          </div>
                        </div>
                      </button>
                    </h2>
                    <div
                      id="flush-collapseFour"
                      className="accordion-collapse collapse"
                      data-bs-parent="#accordionFlushExample"
                    >
                      <div className="accordion-body">
                        <button className="btn btn-outline-dark">Send a message</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* ====== Right Side ====== */}
            <div className="col-md-4 px-4 right-wrapper">
              <div className="product-store-info">
                <div className="d-flex flex-row justify-content-between">
                  <div className="product-shop-name">{product.shop.name}</div>
                  <div className="rating">
                    <Rating showCount={true} />
                  </div>
                </div>
              </div>

              <div className="product-title">{product.product_title}</div>

              <div className="product-price">
                <span className="discounted-price">SGD ${product.product_discount_price}</span>
                <span className="original-price">SGD ${product.product_price}</span>
                <span className="discount-tag">
                  -
                  {Math.round(((product.product_price - product.product_discount_price) / product.product_price) * 100)}
                  %
                </span>
                {product.quantity_in_stock < 10 && product.quantity_in_stock !== 0 ? (
                  <span className="stock-status-low">only {product.quantity_in_stock} left</span>
                ) : null}
                {product.quantity_in_stock === 0 ? <span className="stock-status-none">sold out</span> : null}
              </div>

              <div className="size-info d-flex flex-row justify-content-between">
                <div className="select-size-label">Select Size:</div>
                <div className="size-chart">Size Chart</div>
              </div>
              <div className="select-size-container">
                <div className="select-size-options">
                  {availableSizes.map(({ id, size }) => (
                    <span>
                      <input
                        type="radio"
                        id={id}
                        name="size"
                        value={size}
                        checked={id === selectedSize}
                        onChange={() => setSizeHandler(id)}
                      />
                      <label htmlFor={id}>{size}</label>
                    </span>
                  ))}
                </div>
              </div>

              <div className="d-grid gap-2 mt-3">
                {product.quantity_in_stock > 0 ? (
                  <button className="btn btn-dark btn-lg rounded-1" onClick={() => addToCartHandler()}>
                    Add to Cart
                  </button>
                ) : null}

                <button className="btn btn-outline-dark btn-lg rounded-1 mt-1" type="button">
                  Add to Wishlist
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Product;
