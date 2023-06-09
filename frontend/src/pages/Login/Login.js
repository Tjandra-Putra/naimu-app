import { React, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./Login.css";
import axios from "axios";
import { server } from "../../server";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import Loader from "../../components/Layout/Loader/Loader";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isAuthenticated, user } = useSelector((state) => state.userReducer); // getting the user state from the Redux store
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (isAuthenticated) navigate("/");
  }, []);

  const [email, setEmail] = useState("user@example.com");
  const [password, setPassword] = useState("password");
  const [visible, setVisible] = useState(false);

  // toast component
  const notifySuccess = (message) => toast.success(message, { duration: 5000 });
  const notifyError = (message) => toast.error(message, { duration: 5000 });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setIsLoading(true);
      await axios.post(
        `${server}/user/login`,
        {
          email,
          password,
        },
        { withCredentials: true }
      );

      notifySuccess("Login successful");

      // redirect to home page after 2 seconds
      setTimeout(() => {
        if (user?.user?.role === "admin") navigate("/admin/dashboard");
        else navigate("/");

        window.location.reload();
      }, 2000);

      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      notifyError(error.response.data.message);
    }

    // await axios
    //   .post(
    //     `${server}/user/login`,
    //     {
    //       email,
    //       password,
    //     },
    //     { withCredentials: true }
    //   )
    //   .then((res) => {
    //     notifySuccess("Login successful");

    //     // redirect to home page after 2 seconds
    //     setTimeout(() => {
    //       if (user.user.role === "admin") navigate("/admin/dashboard");
    //       else navigate("/");

    //       window.location.reload();
    //     }, 2000);
    //   })
    //   .catch((err) => {
    //     notifyError(err.response.data.message);
    //   });
  };

  return isLoading ? (
    <Loader />
  ) : (
    <div className="login-wrapper">
      <div className="container">
        <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-4">
            <div className="login-form">
              <h2 className="title text-center">Sign In</h2>

              <div className="policy">
                <p className="text-center">
                  By clicking on Sign in, you agree to our Terms of Use and our Privacy Policy
                </p>
              </div>

              <form className="form-wrapper mt-4" onSubmit={handleSubmit}>
                <input
                  type="email"
                  name="email"
                  class="form-control login-input"
                  placeholder="Email address"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <div class="input-group mb-3">
                  <input
                    type={visible ? "text" : "password"}
                    name="password"
                    class="form-control login-input"
                    placeholder="Password"
                    autoComplete="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                  />
                  {visible ? (
                    <span class="input-group-text login-input" id="basic-addon1" onClick={() => setVisible(false)}>
                      <i class="far fa-eye fa-sm"></i>
                    </span>
                  ) : (
                    <span class="input-group-text login-input" id="basic-addon1" onClick={() => setVisible(true)}>
                      <i class="far fa-eye-slash fa-sm"></i>
                    </span>
                  )}
                </div>

                <div className="remember-me d-flex flex-row justify-content-between form-check">
                  <div>
                    <input
                      className="form-check-input acknowledgement-checkbox"
                      type="checkbox"
                      name="remember-me"
                      checked={true}
                    />
                    <label className="form-check-label" for="flexCheckDefault">
                      Remember me
                    </label>
                  </div>
                  <div>
                    <Link to="/password-reset" className="text-decoration-none text-muted">
                      Forgot Password?
                    </Link>
                  </div>
                </div>

                <div className="buttons">
                  <div class="d-grid gap-2">
                    <button class="btn btn-dark btn-lg login-button" type="submit">
                      Sign In
                    </button>
                  </div>
                </div>
                {/* not a member */}
                <div className="not-a-member">
                  <p className="text-center">
                    Not a member yet?{" "}
                    <Link className="text-decoration-none text-muted" to="/register">
                      Sign up
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
          <div className="col-md-4"></div>
        </div>
      </div>
    </div>
  );
};

export default Login;
