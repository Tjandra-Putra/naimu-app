import "./Rating.css";

const Review = ({ showCount, userRating, totalRatings }) => {
  const filledStars = userRating ? Math.floor(userRating) : 0; // Number of filled stars
  const emptyStars = 5 - filledStars; // Number of empty stars

  const filledStarIcons = Array.from({ length: filledStars }, (_, index) => (
    <i className="fa-solid fa-star" key={index}></i>
  ));

  const emptyStarIcons = Array.from({ length: emptyStars }, (_, index) => (
    <i className="fa-regular fa-star" key={index}></i>
  ));

  return (
    <div className="rating-wrapper">
      {filledStarIcons}
      {emptyStarIcons}
      {showCount && <span className="rating-count">({totalRatings})</span>}
    </div>
  );
};

export default Review;
