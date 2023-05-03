import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

import "./Register.css";
import profileImage from "../../assets/images/user.png";
import { server } from "../../server";
import { useSelector } from "react-redux";

const Register = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useSelector((state) => state.userReducer); // getting the user state from the Redux store

  useEffect(() => {
    if (isAuthenticated) navigate("/");
  }, []);

  const [fullName, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [visible, setVisible] = useState(false);
  const [birthday, setBirthday] = useState("");
  const [avatar, setAvatar] = useState("");

  // toast component
  const notifySuccess = (message) => toast.success(message, { duration: 5000 });
  const notifyError = (message) => toast.error(message, { duration: 5000 });

  const requiredFields = {
    fullName: "Please enter your full name",
    email: "Please enter your email",
    password: "Please enter your password",
    passwordConfirm: "Please confirm your password",
    birthday: "Please enter your birthday",
    avatar: "Please upload your profile image",
  };

  const handleFileInputChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
  };

  // submit form handler
  const handleSubmit = (e) => {
    e.preventDefault();

    // validation
    if (password !== passwordConfirm) {
      notifyError("Password and confirm password do not match");
      return;
    }
    // fields must not be empty
    for (const field in requiredFields) {
      if (!eval(field)) {
        notifyError(requiredFields[field]);
        return;
      }
    }

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
        notifySuccess(res.data.message);

        // set form fields to empty
        setFullname("");
        setEmail("");
        setPassword("");
        setPasswordConfirm("");
        setBirthday("");
        setAvatar("");
      })
      .catch((err) => {
        console.log(err);
        notifyError(err.response.data.message);
        console.log(err.response.data.message);
      });
  };

  return (
    <div className="register-wrapper">
      <Toaster />

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
                  className="form-control register-input"
                  placeholder="Full name"
                  autoComplete="fullname"
                  value={fullName}
                  onChange={(e) => setFullname(e.target.value)}
                />

                <input
                  type="email"
                  name="email"
                  className="form-control register-input"
                  placeholder="Email address"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <div className="input-group">
                  <input
                    type={visible ? "text" : "password"}
                    name="password"
                    className="form-control register-input"
                    placeholder="Password"
                    autoComplete="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    aria-label="Username"
                    aria-describedby="basic-addon1"
                  />
                  {visible ? (
                    <span
                      className="input-group-text register-input"
                      id="basic-addon1"
                      onClick={() => setVisible(false)}
                    >
                      <i className="far fa-eye fa-sm"></i>
                    </span>
                  ) : (
                    <span
                      className="input-group-text register-input"
                      id="basic-addon1"
                      onClick={() => setVisible(true)}
                    >
                      <i className="far fa-eye-slash fa-sm"></i>
                    </span>
                  )}
                </div>

                <input
                  type="password"
                  name="password-confirm"
                  className="form-control register-input"
                  placeholder="Confirm password"
                  autoComplete="password-confirm"
                  value={passwordConfirm}
                  onChange={(e) => setPasswordConfirm(e.target.value)}
                />

                <input
                  type="date"
                  name="birthday"
                  className="form-control register-input"
                  placeholder="Date of Birth (DD/MM/YYYY)"
                  autoComplete="birthday"
                  value={birthday}
                  onChange={(e) => setBirthday(e.target.value)}
                />

                <div className="d-flex flex-row mb-2">
                  <div className="avatar-preview">
                    {avatar ? (
                      <img
                        src={URL.createObjectURL(avatar)}
                        className="profile-image img-thumbnail rounded"
                        alt="avatar"
                      />
                    ) : (
                      <img src={profileImage} alt="" className="profile-image img-thumbnail rounded" />
                    )}
                  </div>
                  <label className="avatar-file-upload mb-3">
                    <input
                      type="file"
                      id="file-input"
                      name="avatar"
                      className="ms-3 avatar-input"
                      autoComplete="avatar"
                      accept=".jpg,.jpeg,.png"
                      onChange={handleFileInputChange}
                    />
                    Upload your profile image
                  </label>
                </div>

                <div className="remember-me d-flex flex-row justify-content-between form-check">
                  <div>
                    <input className="form-check-input acknowledgement-checkbox" type="checkbox" value="" />
                    <label className="form-check-label" htmlFor="flexCheckDefault">
                      Sign up for emails to get updates from NAIMU on products, offers and your Member benefits
                    </label>
                  </div>
                </div>

                <div className="buttons">
                  <div className="d-grid gap-2">
                    <button className="btn btn-dark btn-lg rounded-1 register-button" type="submit">
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
