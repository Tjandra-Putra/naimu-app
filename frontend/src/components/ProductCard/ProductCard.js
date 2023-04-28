import "./ProductCard.css";
import Review from "../Rating/Rating";

const ProductCard = ({ productImageUrl, productTitle, productPrice, productCategory, productStore, productSold }) => {
  return (
    <div className="productcard-wrapper">
      <div className="card border-0" style={{ width: "18rem" }}>
        <div className="img-wrapper">
          <img src={productImageUrl} className="card-img-top" alt="..." />
          <div className="favourite">
            <div className="icon">
              <i class="fa-regular fa-heart fa-lg pe-2"></i>
            </div>
          </div>
        </div>
        <div className="card-body">
          <div className="d-flex flex-row justify-content-between">
            <div className="category">{productStore}</div>
            <div className="sold">24 sold</div>
          </div>

          <div className="title">{productTitle}</div>

          <Review />

          <div className="price">${productPrice}</div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
