import "./Loader.css";
import BarLoader from "react-spinners/BarLoader";

const Loader = () => {
  return (
    <div className="loader-wrapper">
      {/* set duration to loader */}

      <BarLoader loading={true} size={150} aria-label="Loading Spinner" data-testid="loader" color="#ffffff" />
    </div>
  );
};

export default Loader;
