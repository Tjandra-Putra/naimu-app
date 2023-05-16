import "./ProgressBar.css";

const ProgressBar = ({ productReviews, color }) => {
  const ratingCounts = [0, 0, 0, 0, 0];

  // Calculate the count for each rating category
  productReviews.forEach((review) => {
    const rating = review.rating;
    ratingCounts[rating - 1]++;
  });

  return (
    <div className="progress-bar-wrapper">
      {[5, 4, 3, 2, 1].map((rating, index) => (
        <div className="row" key={index}>
          <div className="col-md-2">
            <div className="rating-index">{rating}</div>
          </div>
          <div className="col">
            <div
              className="progress"
              role="progressbar"
              aria-label="Basic example"
              aria-valuenow={ratingCounts[rating - 1]}
              aria-valuemin="0"
              aria-valuemax={productReviews.length}
            >
              <div
                className={("progress-bar", color)}
                style={{ width: (ratingCounts[rating - 1] / productReviews.length) * 100 + "%" }}
              ></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProgressBar;
