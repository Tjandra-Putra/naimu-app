import "./Rating.css";

const Review = ({ showCount, userRating, totalRatings }) => {
  const filledStars = userRating ? Math.floor(userRating) : 0; // Number of filled stars
  const emptyStars = 5 - filledStars; // Number of empty stars

  //  first argument of Array.from() is an object with a length property set to filledStars, indicating the desired length of the array.
  // second argument is a mapping function that takes two parameters: _ and index. The _ parameter is a placeholder for the current element being mapped (which is not used in this case), and index represents the index of the current element being generated.
  const filledStarIcons = Array.from({ length: filledStars }, (_, index) => (
    <i className="fa-solid fa-star" key={index}></i>
  ));

  const emptyStarIcons = Array.from({ length: emptyStars }, (_, index) => (
    <i className="fa-regular fa-star" key={index + filledStars}></i>
  ));

  const ratingStars = [...filledStarIcons, ...emptyStarIcons];

  return (
    <div className="rating-wrapper">
      {ratingStars.length > 0 ? ratingStars : "No rating"}
      {showCount && <span className="rating-count">({totalRatings})</span>}
    </div>
  );
};

export default Review;
