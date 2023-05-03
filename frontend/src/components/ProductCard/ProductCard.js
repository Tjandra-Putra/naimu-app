import { Link } from "react-router-dom";

import "./ProductCard.css";
import Review from "../Rating/Rating";

const ProductCard = ({
  productImageUrl,
  productTitle,
  productPrice,
  productCategory,
  productStore,
  productSold,
  productId,
}) => {
  return (
    <div className="productcard-wrapper">
      <Link to={`/products/${productId}`} className="text-decoration-none">
        <div className="card border-0" style={{ width: "18rem" }}>
          <div className="img-wrapper">
            <img src={productImageUrl} className="card-img-top" alt="..." />
            <div className="favourite">
              <div className="icon">
                <i className="fa-regular fa-heart fa-lg pe-2"></i>
              </div>
            </div>
          </div>
          <div className="card-body">
            <div className="d-flex flex-row justify-content-between">
              <div className="category">{productStore}</div>
              <div className="sold">{productSold} sold</div>
            </div>

            <div className="title">{productTitle}</div>

            <Review />

            <div className="price">${productPrice}</div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
