import "./Loader.css";
import BarLoader from "react-spinners/BarLoader";
import HashLoader from "react-spinners/HashLoader";
import PropagateLoader from "react-spinners/PropagateLoader";

const Loader = () => {
  return (
    <div className="loader-wrapper">
      {/* set duration to loader */}
      {/* barloader size is 150 */}
      <BarLoader
        loading={true}
        // size={30}
        aria-label="Loading Spinner"
        data-testid="loader"
        color="#ffffff"
        size={150}
      />
    </div>
  );
};

export default Loader;
