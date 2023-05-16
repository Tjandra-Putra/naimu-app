import "./Reviews.css";

import Rating from "../Rating/Rating";

const Reviews = (reviewsArray) => {
  return (
    <div className="reviews-wrapper">
      {reviewsArray.reviewsArray.map((review, index) => (
        <div className="box" key={index}>
          <div className="d-flex flex-row">
            <div className="reviewer-image me-4">
              <img src={`http://localhost:8000/${review.user.avatar}`} alt="" className="avatar" />
            </div>
            <div className="reviewer-info w-100">
              <div className="d-flex flex-row justify-content-between">
                <div className="reviewer-name">{review.user.fullName}</div>
                <div className="reviewer-rating">
                  <Rating showCount={false} userRating={review.rating} />
                </div>
              </div>
              <div className="reviewer-title mt-2">
                <div className="reviewer-comment mt-2">{review.title}</div>
              </div>
              <div className="reviewer-comment mt-2">{review.comment}</div>
              <div className="reviewer-date text-muted mt-2 text-start">
                {review
                  ? new Date(review.createdAt)
                      .toLocaleString("en-US", {
                        day: "numeric",
                        month: "numeric",
                        year: "numeric",
                        // hour: "numeric",
                        // minute: "numeric",
                        // hour12: true,
                      })
                      .replace(",", "")
                  : ""}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Reviews;
