import { Link } from "react-router-dom";

import "./Login.css";

const Login = () => {
  return (
    <div className="login-wrapper">
      <div className="container">
        <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-4">
            <div className="login-form">
              <h2 className="title text-center">My Account</h2>

              <div className="policy">
                <p className="text-center">
                  By clicking on Sign in, you agree to our Terms of Use and our Privacy Policy
                </p>
              </div>

              <div className="form-wrapper mt-4">
                <input
                  type="email"
                  class="form-control login-input"
                  id="exampleFormControlInput1"
                  placeholder="Email address"
                />

                <input
                  type="password"
                  class="form-control login-input"
                  id="exampleFormControlInput1"
                  placeholder="Password"
                />

                <div className="remember-me d-flex flex-row justify-content-between form-check">
                  <div>
                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                    <label className="form-check-label" for="flexCheckDefault">
                      Remember me
                    </label>
                  </div>
                  <div>
                    <a href="#" className="text-decoration-none text-muted">
                      Forgot Password?
                    </a>
                  </div>
                </div>

                <div className="buttons">
                  <div class="d-grid gap-2">
                    <button class="btn btn-dark btn-lg rounded-1 login-button" type="button">
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
              </div>
            </div>
          </div>
          <div className="col-md-4"></div>
        </div>
      </div>
    </div>
  );
};

export default Login;