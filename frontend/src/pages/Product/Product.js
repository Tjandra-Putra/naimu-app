import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useState } from "react";

import "./Product.css";
import Rating from "../../components/Rating/Rating";
import Reviews from "../../components/Reviews/Reviews";
import { productList } from "../../data/data";

const Product = () => {
  // get product id from route parameter
  const { id } = useParams();
  const [selectedSize, setSelectedSize] = useState(null);
  const availableSizes = [
    { id: 1, size: "XS" },
    { id: 2, size: "S" },
    { id: 3, size: "M" },
    { id: 4, size: "L" },
    { id: 5, size: "XL" },
  ];

  // get specific product from productList
  const product = productList.find((item) => item.product_id === id);

  const setSizeHandler = (size) => {
    setSelectedSize(size);
  };

  return (
    <div className="product-wrapper">
      <div className="container">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <Link to="/" class="breadcrumb-item">
              Home
            </Link>
            <Link to="/" class="breadcrumb-item">
              Adidas
            </Link>
            <Link to="/products" class="breadcrumb-item">
              Browse
            </Link>
            <li class="breadcrumb-item active" aria-current="page">
              {product.product_title}
            </li>
          </ol>
        </nav>

        <main>
          <div className="row">
            <div className="left-wrapper col-md-8">
              <div className="img-gallery row">
                {/* product images */}
                {product && productList.length > 0
                  ? product.product_image_url.map((item, index) => (
                      <div className="col-md-6">
                        <img src={item.url} alt={item.url} className="img-fluid" />
                      </div>
                    ))
                  : null}
              </div>

              <div className="product-info">
                <div class="accordion accordion-flush" id="accordionFlushExample">
                  <div class="accordion-item">
                    <h2 class="accordion-header">
                      <button
                        class="accordion-button collapsed"
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
                      class="accordion-collapse collapse"
                      data-bs-parent="#accordionFlushExample"
                    >
                      <div class="accordion-body">{product.product_description}</div>
                    </div>
                  </div>
                  <div class="accordion-item">
                    <h2 class="accordion-header">
                      <button
                        class="accordion-button collapsed"
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
                      class="accordion-collapse collapse"
                      data-bs-parent="#accordionFlushExample"
                    >
                      <div class="accordion-body">
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
                  <div class="accordion-item">
                    <h2 class="accordion-header">
                      <button
                        class="accordion-button collapsed"
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
                      class="accordion-collapse collapse show"
                      data-bs-parent="#accordionFlushExample"
                    >
                      <div class="accordion-body">
                        <Reviews />
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
                  <div className="product-store-name"> {product.shop.name}</div>
                  <div className="rating">
                    <Rating showCount={true} />
                  </div>
                </div>
              </div>
              <div className="product-title">{product.product_title}</div>

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

              <div class="d-grid gap-2 mt-3">
                <button class="btn btn-dark btn-lg rounded-1" type="button">
                  Add to Cart
                </button>

                <button class="btn btn-outline-dark btn-lg rounded-1 mt-1" type="button">
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
