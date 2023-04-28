import "./Reviews.css";

import Rating from "../Rating/Rating";

const Reviews = () => {
  return (
    <div className="reviews-wrapper">
      <div className="box">
        <div className="d-flex flex-row">
          <div className="reviewer-image me-4">
            <i class="fas fa-user-circle fa-lg text-secondary"></i>
          </div>
          <div className="reviewer-info w-100">
            <div className="d-flex flex-row justify-content-between">
              <div className="reviewer-name">John Doe</div>
              <div className="reviewer-rating">
                <Rating showCount={false} />
              </div>
            </div>
            <div className="reviewer-comment mt-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis assumenda commodi harum, soluta ad sunt
              tenetur suscipit voluptates rerum deserunt repudiandae incidunt, dolor quisquam temporibus, dolore ipsam
              distinctio vel corrupti.
            </div>
            <div className="reviewer-date text-muted mt-2 text-start">April 22, 2023</div>
          </div>
        </div>
      </div>
      <div className="box">
        <div className="d-flex flex-row">
          <div className="reviewer-image me-4">
            <i class="fas fa-user-circle fa-lg text-secondary"></i>
          </div>
          <div className="reviewer-info w-100">
            <div className="d-flex flex-row justify-content-between">
              <div className="reviewer-name">John Doe</div>
              <div className="reviewer-rating">
                <Rating showCount={false} />
              </div>
            </div>
            <div className="reviewer-comment mt-2">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nobis assumenda commodi harum, soluta ad sunt
              tenetur suscipit voluptates rerum deserunt repudiandae incidunt, dolor quisquam temporibus, dolore ipsam
              distinctio vel corrupti.
            </div>
            <div className="reviewer-date text-muted mt-2 text-start">April 22, 2023</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reviews;
