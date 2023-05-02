import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

import "./Register.css";
import profileImage from "../../assets/images/user.png";
import { server } from "../../server";

const Register = () => {
  const [fullName, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [visible, setVisible] = useState(false);
  const [birthday, setBirthday] = useState("");
  const [avatar, setAvatar] = useState("");

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
  };

  // submit form handler
  const handleSubmit = (e) => {
    e.preventDefault();

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    const newForm = new FormData();

    newForm.append("avatarFile", avatar);
    newForm.append("fullName", fullName);
    newForm.append("email", email);
    newForm.append("password", password);
    newForm.append("birthday", birthday);

    axios
      .post(`${server}/user/create-user`, newForm, config)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="register-wrapper">
      <div className="container">
        <div className="row">
          <div className="col-md-4"></div>
          <div className="col-md-4">
            <div className="register-form">
              <h2 className="title text-center">Become a member</h2>

              {/* <div className="policy">
                <p className="text-center">
                  By clicking on Sign in, you agree to our Terms of Use and our Privacy Policy
                </p>
              </div> */}

              <form className="form-wrapper mt-3" onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="fullname"
                  class="form-control register-input"
                  placeholder="Full name"
                  autoComplete="fullname"
                  required
                  value={fullName}
                  onChange={(e) => setFullname(e.target.value)}
                />

                <input
                  type="email"
                  name="email"
                  class="form-control register-input"
                  placeholder="Email address"
                  autoComplete="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <div class="input-group">
                  <input
                    type={visible ? "text" : "password"}
                    name="password"
                    class="form-control register-input"
                    placeholder="Password"
                    autoComplete="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                  />
                  {visible ? (
                    <span class="input-group-text register-input" id="basic-addon1" onClick={() => setVisible(false)}>
                      <i class="far fa-eye fa-sm"></i>
                    </span>
                  ) : (
                    <span class="input-group-text register-input" id="basic-addon1" onClick={() => setVisible(true)}>
                      <i class="far fa-eye-slash fa-sm"></i>
                    </span>
                  )}
                </div>

                <input
                  type="password"
                  name="password-confirm"
                  class="form-control register-input"
                  placeholder="Confirm password"
                  autoComplete="password-confirm"
                  required
                  value={passwordConfirm}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                />

                <input
                  type="date"
                  name="birthday"
                  class="form-control register-input"
                  placeholder="Date of Birth (DD/MM/YYYY)"
                  autoComplete="birthday"
                  required
                  value={birthday}
                  onChange={(e) => setBirthday(e.target.value)}
                />

                <div className="d-flex flex-row mb-2">
                  <div className="avatar-preview">
                    {avatar ? (
                      <img src={URL.createObjectURL(avatar)} class="profile-image img-thumbnail rounded" alt="avatar" />
                    ) : (
                      <img src={profileImage} alt="" className="profile-image img-thumbnail rounded" />
                    )}
                  </div>
                  <label class="avatar-file-upload mb-3">
                    <input
                      type="file"
                      id="file-input"
                      name="avatar"
                      className="ms-3 avatar-input"
                      autoComplete="avatar"
                      required
                      accept=".jpg,.jpeg,.png"
                      onChange={handleFileInputChange}
                    />
                    Upload your profile image
                  </label>
                </div>

                <div className="remember-me d-flex flex-row justify-content-between form-check">
                  <div>
                    <input className="form-check-input acknowledgement-checkbox" type="checkbox" value="" />
                    <label className="form-check-label" for="flexCheckDefault">
                      Sign up for emails to get updates from NAIMU on products, offers and your Member benefits
                    </label>
                  </div>
                </div>

                <div className="buttons">
                  <div class="d-grid gap-2">
                    <button class="btn btn-dark btn-lg rounded-1 register-button" type="submit">
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
              </form>
            </div>
          </div>
          <div className="col-md-4"></div>
        </div>
      </div>
    </div>
  );
};

export default Register;
