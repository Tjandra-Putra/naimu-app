import { Link } from "react-router-dom";

import "./Register.css";

const Register = () => {
  return (
    <div className="register-wrapper">
      <div className="container">
        <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-4">
            <div className="register-form">
              <h2 className="title text-center">Become a member</h2>

              <div className="policy">
                <p className="text-center">
                  By clicking on Sign in, you agree to our Terms of Use and our Privacy Policy
                </p>
              </div>

              <div className="form-wrapper mt-4">
                <input type="email" class="form-control register-input" placeholder="Email address" />

                <input type="password" class="form-control register-input" placeholder="Password" />

                <input type="password" class="form-control register-input" placeholder="Confirm password" />

                <input type="date" class="form-control register-input" placeholder="Date of Birth (DD/MM/YYYY)" />

                <div className="remember-me d-flex flex-row justify-content-between form-check">
                  <div>
                    <input className="form-check-input" type="checkbox" value="" id="flexCheckDefault" />
                    <label className="form-check-label" for="flexCheckDefault">
                      Sign up for emails to get updates from NAIMU on products, offers and your Member benefits
                    </label>
                  </div>
                </div>

                <div className="buttons">
                  <div class="d-grid gap-2">
                    <button class="btn btn-dark btn-lg rounded-1 register-button" type="button">
                      Register
                    </button>
                  </div>
                </div>
                {/* not a member */}
                <div className="not-a-member">
                  <p className="text-center">
                    Already a member?{" "}
                    <Link to="/login" className="text-decoration-none text-muted">
                      Sign In
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

export default Register;
