import "./Rating.css";

const Review = ({ showCount, rating }) => {
  return rating > 0 ? (
    // has rating
    <div className="rating-wrapper">
      <i className="fa-solid fa-star"></i>
      <i className="fa-solid fa-star"></i>
      <i className="fa-solid fa-star"></i>
      <i className="fa-solid fa-star"></i>
      <i className="fa-regular fa-star"></i>
      {showCount && <span className="rating-count">(89)</span>}
    </div>
  ) : (
    // empty rating
    <div className="rating-wrapper">
      <i className="fa-regular fa-star"></i>
      <i className="fa-regular fa-star"></i>
      <i className="fa-regular fa-star"></i>
      <i className="fa-regular fa-star"></i>
      <i className="fa-regular fa-star"></i>
      {showCount && <span className="rating-count">(89)</span>}
    </div>
  );
};

export default Review;
