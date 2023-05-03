import "./Rating.css";

const Review = ({ showCount }) => {
  return (
    <div className="rating-wrapper">
      <i className="fa-solid fa-star"></i>
      <i className="fa-solid fa-star"></i>
      <i className="fa-solid fa-star"></i>
      <i className="fa-solid fa-star"></i>
      <i className="fa-regular fa-star"></i>
      {showCount && <span className="rating-count">(89)</span>}
    </div>
  );
};

export default Review;
