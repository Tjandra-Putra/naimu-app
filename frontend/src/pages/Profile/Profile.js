import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";

import "./Profile.css";
import SideNavbar from "../../components/Layout/SideNavbar/SideNavbar";
import { updateProfile } from "../../redux/actions/user";
import Loader from "../../components/Layout/Loader/Loader";
import { server } from "../../server";

const Profile = () => {
  // toast component
  const notifySuccess = (message) => toast.success(message, { duration: 5000 });
  const notifyError = (message) => toast.error(message, { duration: 5000 });

  const dispatch = useDispatch();

  const { user, error, success, loading } = useSelector((state) => state.userReducer); // getting the user state from the Redux store

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [password, setPassword] = useState("");
  const [birthday, setBirthday] = useState("");
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    if (error) {
      notifyError(error);
      dispatch({ type: "ClearErrors" });
    }
    if (success) {
      notifySuccess(success);

      setPassword("");
      dispatch({ type: "ClearSuccess" });
    }
  }, [success, error, dispatch]);

  useEffect(() => {
    if (user) {
      setFullName(user.user.fullName || "");
      setEmail(user.user.email || "");
      setPhoneNumber(user.user.phoneNumber || "");
      setBirthday(new Date(user.user.birthday).toISOString().substring(0, 10) || "");
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!password) {
      notifyError("Please enter password");
      return;
    }

    const data = {
      email,
      password,
      phoneNumber,
      fullName,
      birthday,
    };

    dispatch(updateProfile(data));
  };

  // update avatar
  const handleAvatarChange = async (e) => {
    const file = e.target.files[0];
    setAvatar(file);

    const formData = new FormData();
    formData.append("avatarFile", file);

    await axios
      .put(`${server}/user/update-avatar`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.success) {
          // wait for 2 seconds, notify then reload
          notifySuccess(res.data.message);

          setTimeout(() => {
            window.location.reload();
          }, 2000);
        }
      })
      .catch((err) => {
        notifyError(err.response.data.message);
      });
  };

  return loading ? (
    <Loader />
  ) : (
    <div className="profile-wrapper">
      <div className="container">
        <div className="orders">
          <div className="row">
            <div className="col-md-3">
              <SideNavbar activeLink="profile" />
            </div>
            <div className="col-md-9">
              <div className="card">
                <div className="title">Edit Profile</div>

                {/* <img src={`http://localhost:8000/${avatar}`} alt={avatar} className="img-fluid profile-img" /> */}

                <div className="profile-image-upload">
                  <input type="file" accept="image/*" id="profile-img-input" onChange={handleAvatarChange} hidden />
                  <label htmlFor="profile-img-input" className="profile-img-label">
                    <img
                      src={`http://localhost:8000/${user.user.avatar}`}
                      alt={user.user.avatar}
                      className="img-fluid profile-img"
                    />
                  </label>
                </div>

                <div className="card-body-custom">
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <div className="row">
                        <div className="col-md-6 mb-4">
                          <label htmlFor="name" className="form-label">
                            Full Name
                          </label>
                          <input
                            type="text"
                            name="name"
                            id="name"
                            className="form-control"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                          />
                        </div>
                        <div className="col-md-6 mb-4">
                          <label htmlFor="email" className="form-label">
                            Email
                          </label>
                          <input
                            type="text"
                            name="email"
                            id="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled
                          />
                        </div>
                        <div className="col-md-6 mb-4">
                          <label htmlFor="phone-number" className="form-label">
                            Phone Number
                          </label>
                          <input
                            type="text"
                            name="phone-number"
                            id="phone-number"
                            className="form-control"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                          />
                        </div>

                        {/* <div className="col-md-6 mb-4">
                      <label htmlFor="postal-code" className="form-label">
                        Postal Code
                      </label>
                      <input type="text" name="postal-code" id="postal-code" className="form-control" value={""} />
                    </div> */}

                        <div className="col-md-6 mb-4">
                          <label htmlFor="birthday" className="form-label">
                            Birthday
                          </label>
                          <input
                            type="date"
                            name="birthday"
                            id="birthday"
                            className="form-control"
                            value={birthday}
                            onChange={(e) => setBirthday(e.target.value)}
                          />
                        </div>
                        {/* 
                    <div className="col-md-6 mb-4">
                      <label htmlFor="address-one" className="form-label">
                        Address 1
                      </label>
                      <input type="text" name="address-one" id="address-one" className="form-control" value={""} />
                    </div>

                    <div className="col-md-6 mb-4">
                      <label htmlFor="country" className="form-label">
                        Country
                      </label>
                      <input type="text" name="country" id="country" className="form-control" value={""} />
                    </div> */}

                        <div className="col-md-6 mb-4">
                          <label htmlFor="password" className="form-label">
                            Enter Password to Confirm
                          </label>
                          <input
                            type="password"
                            name="password"
                            id="password"
                            className="form-control"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                          />
                        </div>

                        <div className="col-md-6 mb-4">
                          <label htmlFor="userId" className="form-label">
                            Unique Identification
                          </label>
                          <input type="text" className="form-control" value={user.user._id || ""} disabled />
                        </div>
                      </div>
                      <button className="btn btn-save btn-success" type="submit">
                        Save Changes
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
