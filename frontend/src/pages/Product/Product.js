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
import ProgressBar from "../../components/ProgressBar/ProgressBar";

import { addToCart } from "../../redux/actions/cart";
import { server } from "../../server";
import { addToFavourites } from "../../redux/actions/favourite";

const Product = () => {
  // redux
  const dispatch = useDispatch();

  // redux state
  const { favourites, errorFavourite, successFavourite } = useSelector((state) => state.favouriteReducer);
  const { cart } = useSelector((state) => state.cartReducer);
  const { isAuthenticated } = useSelector((state) => state.userReducer);

  // toast component
  const notifySuccess = (message) => toast.success(message, { duration: 5000 });
  const notifyError = (message) => toast.error(message, { duration: 5000 });

  const [isLoading, setIsLoading] = useState(true);
  const [product, setProduct] = useState(null);

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

  const favouriteButtonElement = () => {
    // render buttob component based on existence of item in favourites
    const isFavouritedButton =
      favourites && isAuthenticated && favourites.favouriteItems.find((item) => item.productId === id);

    if (!isAuthenticated) {
      return (
        <button className="btn btn-outline-secondary btn-lg rounded-1 mt-1" disabled>
          Login to add to Wishlist
        </button>
      );
    }

    if (!isFavouritedButton) {
      return (
        <button className="btn btn-outline-dark btn-lg rounded-1 mt-1" onClick={() => addToFavouritesHandler(product)}>
          Add to Wishlist
        </button>
      );
    } else {
      return (
        <button className="btn btn-secondary btn-lg rounded-1 mt-1" disabled>
          Added to Wishlist <i class="fa-solid fa-check ms-1"></i>
        </button>
      );
    }
  };

  useEffect(() => {
    if (errorFavourite) {
      notifyError(errorFavourite);
      dispatch({ type: "ClearErrors" });
    }

    if (successFavourite) {
      notifySuccess(successFavourite);
      dispatch({ type: "ClearSuccess" });
    }
  }, [errorFavourite, successFavourite]);

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

    // it is important to put id in the dependency array because if not, the product will not be updated when the id changes
  }, [id]);

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
    // productId, shopName, price, discountPrice, title, imageUrl, unitSold, rating
    const newCart = {
      _id: product._id,
      title: product.title,
      imageUrl: product.imageUrl[0].url,
      price: product.price,
      size: availableSizes[selectedSize - 1].size,
      quantity: 1,
      shopName: product.shop.name,
      discountPrice: product.discountPrice,
      unitSold: product.unitSold,
      rating: product.rating,
    };

    const itemExist = cart && cart.find((item) => item._id === product._id && item.size === newCart.size);
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

  const addToFavouritesHandler = (item) => {
    console.log(item);
    dispatch(
      addToFavourites(
        item._id,
        item.shop.name,
        item.price,
        item.discountPrice,
        item.title,
        item.imageUrl[0].url,
        item.unitSold,
        item.rating
      )
    );
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
            <Link to={`/products?brand=${product.shop.name.toLowerCase()}`} className="breadcrumb-item text-muted">
              {product.shop.name}
            </Link>
            <Link to="/products" className="breadcrumb-item text-muted">
              Browse
            </Link>
            <li className="breadcrumb-item text-muted" aria-current="page">
              {product.category}
            </li>
            <li className="breadcrumb-item" aria-current="page">
              {product.title}
            </li>
          </ol>
        </nav>

        <main>
          <div className="row">
            <div className="left-wrapper col-md-8 order-2 order-md-1">
              <div className="img-gallery row">
                {/* product images */}
                {product
                  ? product.imageUrl.map((item, index) => (
                      <div className="col-md-6 col-6" key={index}>
                        <div className="product-img-container">
                          <img src={item.url} alt={item.url} className="img-fluid product-img" />
                        </div>
                      </div>
                    ))
                  : null}
              </div>

              <div className="product-info">
                <div className="action-button-show-mobile">
                  <div className="size-info">
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
                    {product.quantityInStock > 0 ? (
                      <button className="btn btn-dark btn-lg rounded-1" onClick={() => addToCartHandler()}>
                        Add to Cart
                      </button>
                    ) : null}

                    {/* if favourited, show added to wishlist */}
                    {favouriteButtonElement()}
                  </div>
                </div>

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
                      <div className="accordion-body">{product.description}</div>
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
                            <Rating
                              showCount={true}
                              userRating={product.rating}
                              totalRatings={product.reviews.length}
                            />
                          </div>
                        </div>
                      </button>
                    </h2>
                    <div
                      id="flush-collapseThree"
                      className="accordion-collapse collapse"
                      data-bs-parent="#accordionFlushExample"
                    >
                      <div className="accordion-body review-box-info">
                        <div className="row mb-4">
                          <div className="col-md-4 col-12 total-reviews-wrapper">
                            <div className="review-sub-title">Total Reviews</div>
                            <div className="review-title">{product.reviews.length}</div>
                          </div>
                          <div className="col-md-4 col-6">
                            <div className="review-sub-title">Average Rating</div>
                            <div className="review-title">{product.rating.toFixed(1)}</div>
                          </div>
                          <div className="col-md-4 col-6">
                            <ProgressBar productReviews={product.reviews} color="bg-primary" />
                          </div>
                        </div>
                        <Reviews reviewsArray={product.reviews} />
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
                            <img src={product.shop.avatar.url} alt="" className="store-img pe-2" />
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
            <div className="col-md-4 px-4 right-wrapper order-1 order-md-2">
              <div className="product-store-info">
                <div className="d-flex flex-row justify-content-between">
                  <div className="product-shop-name">{product.shop.name}</div>
                  <div className="rating">
                    <Rating showCount={true} userRating={product.rating} totalRatings={product.reviews.length} />
                  </div>
                </div>
              </div>

              <div className="product-title">{product.title}</div>

              <div className="product-price">
                <span className="discounted-price">SGD ${product.discountPrice}</span>
                <span className="original-price">SGD ${product.price}</span>
                <span className="discount-tag">
                  -{Math.round(((product.price - product.discountPrice) / product.price) * 100)}%
                </span>
                {product.quantityInStock < 10 && product.quantityInStock !== 0 ? (
                  <span className="stock-status-low">only {product.quantityInStock} left</span>
                ) : null}
                {product.quantityInStock === 0 ? <span className="stock-status-none">sold out</span> : null}
              </div>

              <div className="action-button-hidden-mobile">
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
                  {product.quantityInStock > 0 ? (
                    <button className="btn btn-dark btn-lg rounded-1" onClick={() => addToCartHandler()}>
                      Add to Cart
                    </button>
                  ) : null}

                  {/* if favourited, show added to wishlist */}
                  {favouriteButtonElement()}
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Product;
