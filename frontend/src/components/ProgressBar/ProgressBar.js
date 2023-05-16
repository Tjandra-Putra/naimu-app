import "./ProgressBar.css";

const ProgressBar = ({ ratingCount, ratingIndex, color }) => {
  return (
    <div className="progress-bar-wrapper">
      <div className="row">
        <div className="col-md-2">
          <div className="rating-index">{ratingIndex}</div>
        </div>
        <div className="col">
          <div
            className="progress"
            role="progressbar"
            aria-label="Basic example"
            aria-valuenow="0"
            aria-valuemin="0"
            aria-valuemax="100"
          >
            <div className={("progress-bar", color)} style={{ width: ratingCount + "%" }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
