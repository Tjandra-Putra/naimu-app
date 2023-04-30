import { React, useState } from "react";
import { Link } from "react-router-dom";

import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [visible, setVisible] = useState(false);

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

              <form className="form-wrapper mt-4">
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
                      value=""
                      name="remember-me"
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
                    <button class="btn btn-dark btn-lg rounded-1 login-button" type="submit">
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
