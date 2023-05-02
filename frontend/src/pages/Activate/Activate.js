import { useParams } from "react-router-dom";
import "./Activate.css";
import { useEffect, useState } from "react";
import { server } from "../../server";
import axios from "axios";
import { Link } from "react-router-dom";

const Activate = () => {
  const { activation_token } = useParams();
  const [error, setError] = useState(false);

  useEffect(() => {
    const activationEmail = async () => {
      try {
        const res = await axios.post(`${server}/user/activate`, {
          activation_token,
        });

        console.log(res.data.message);
      } catch (err) {
        console.log(err.response.data.message);
        setError(true);
      }
    };

    activationEmail();
  }, []);
  return (
    <div className="activate-wrapper">
      <div className="container">
        <h1>Activate</h1>
        {error ? (
          <p>
            Your token is expired! Click <Link to="/login">here</Link> to return to login page.
          </p>
        ) : (
          <p>
            Your account has been created successfully! Click <Link to="/login">here</Link> to login
          </p>
        )}
      </div>
    </div>
  );
};

export default Activate;
