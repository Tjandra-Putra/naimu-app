import { Link } from "react-router-dom";

import "./Profile.css";
import SideNavbar from "../../components/Layout/SideNavbar/SideNavbar";
import { useSelector } from "react-redux";
import { useState } from "react";

const Profile = () => {
  const { user } = useSelector((state) => state.userReducer); // getting the user state from the Redux store
  const [fullName, setFullName] = useState(user && user.user.fullName);
  const [email, setEmail] = useState(user && user.user.email);
  const [birthday, setBirthday] = useState(user && new Date(user.user.birthday).toISOString().substring(0, 10));
  const [avatar, setAvatar] = useState(user && user.user.avatar);
  const [userId, setUserId] = useState(user && user.user._id);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("submit");
  };

  return (
    <div className="profile-wrapper">
      <div className="container">
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <Link to="/" className="breadcrumb-item">
              Home
            </Link>
            <li className="breadcrumb-item active" aria-current="page">
              Orders
            </li>
          </ol>
        </nav>

        <div className="orders">
          <div className="row">
            <div className="col-md-3">
              <SideNavbar activeLink="profile" />
            </div>
            <div className="col-md-9">
              <div className="card">
                <div className="title">Edit Profile</div>

                <img src={`http://localhost:8000/${avatar}`} alt={avatar} className="img-fluid profile-img" />

                <div className="card-body">
                  <form onSubmit={handleSubmit}>
                    <div className="form-group">
                      <div className="row">
                        <div className="col-md-6 mb-4">
                          <label htmlFor="name" className="form-label">
                            Full Name
                          </label>
                          <input type="text" name="name" id="name" className="form-control" value={fullName} />
                        </div>
                        <div className="col-md-6 mb-4">
                          <label htmlFor="email" className="form-label">
                            Email
                          </label>
                          <input type="text" name="email" id="email" className="form-control" value={email} />
                        </div>

                        <div className="col-md-6 mb-4">
                          <label htmlFor="email" className="form-label">
                            Birthday
                          </label>
                          <input type="date" name="email" id="email" className="form-control" value={birthday} />
                        </div>

                        <div className="col-md-6 mb-4">
                          <label htmlFor="email" className="form-label">
                            Customer ID
                          </label>
                          <input type="text" name="email" id="email" className="form-control" value={userId} disabled />
                        </div>
                      </div>
                      <button className="btn btn-dark btn-success" type="submit">
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
