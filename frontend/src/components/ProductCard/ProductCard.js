import { Link } from "react-router-dom";

import "./ProductCard.css";
import Rating from "../Rating/Rating";
import ProductNotFound from "../../assets/images/product_not_found.jpeg";

const ProductCard = ({
  productImageUrl,
  productTitle,
  productPrice,
  productDiscountPrice,
  productCategory,
  productStore,
  productSold,
  productId,
  productRating,
}) => {
  return (
    <div className="productcard-wrapper">
      <Link to={`/products/${productId}`} className="text-decoration-none">
        <div className="card border-0" style={{ width: "18rem" }}>
          <div className="img-wrapper">
            <img
              src={productImageUrl}
              className="card-img-top"
              alt={productTitle}
              onError={(e) => {
                e.target.onerror = null; // prevent infinite loop if fallback also fails
                e.target.src = ProductNotFound;
              }}
            />

            {/* <div className="favourite">
              <div className="icon">
                <i className="fa-regular fa-heart fa-lg pe-2"></i>
              </div>
            </div> */}
          </div>
          <div className="card-body">
            <div className="d-flex flex-row justify-content-between">
              <div className="category">{productStore}</div>
              <div className="sold">{productSold} sold</div>
            </div>

            <div className="title">{productTitle}</div>

            {/* <Rating showCount={false} userRating={productRating} /> */}
            <div className="prices">
              <span className="discounted-price">{productPrice !== productDiscountPrice ? `$${productDiscountPrice}` : null}</span>
              <span className={productDiscountPrice !== productPrice ? "original-price discount" : "original-price"}>${productPrice}</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
