import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";

import SideNavbar from "../../components/Layout/SideNavbar/SideNavbar";
import "./PasswordChange.css";
import { server } from "../../server";
import { logout } from "../../redux/actions/user";

const PasswordChange = () => {
  const dispatch = useDispatch();

  // toast component
  const notifySuccess = (message) => toast.success(message, { duration: 5000 });
  const notifyError = (message) => toast.error(message, { duration: 5000 });

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    await axios
      .put(
        `${server}/user/change-password`,
        { oldPassword, newPassword, confirmNewPassword },
        { withCredentials: true }
      )
      .then((res) => {
        if (res.data.success) {
          notifySuccess("Password changed successfully!");

          // redirect to login page
          dispatch(logout());
        }
      })
      .catch((err) => {
        notifyError(err.response.data.message);
      });
  };

  return (
    <div className="password-change-wrapper">
      <div className="container">
        <div className="password-change">
          <div className="row">
            <div className="col-md-3">
              <SideNavbar activeLink="password-change" />
            </div>
            <div className="col-md-9">
              <div className="card">
                <div className="title">Change Password</div>

                <div className="card-body-custom">
                  <form onSubmit={handleSubmit}>
                    <div className="col-md-6 mb-4">
                      <label htmlFor="old-password" className="form-label">
                        Old Password
                      </label>
                      <input
                        type="password"
                        name="old-password"
                        id="old-password"
                        className="form-control"
                        onChange={(e) => setOldPassword(e.target.value)}
                      />
                    </div>

                    <div className="col-md-6 mb-4">
                      <label htmlFor="new-password" className="form-label">
                        New Password
                      </label>
                      <input
                        type="password"
                        name="new-password"
                        id="new-password"
                        className="form-control"
                        onChange={(e) => setNewPassword(e.target.value)}
                      />
                    </div>

                    <div className="col-md-6 mb-4">
                      <label htmlFor="confirm-password" className="form-label">
                        Confirm Password
                      </label>
                      <input
                        type="password"
                        name="confirm-password"
                        id="confirm-password"
                        className="form-control"
                        onChange={(e) => setConfirmNewPassword(e.target.value)}
                      />
                    </div>

                    <button className="btn btn-save btn-success" type="submit">
                      Save Changes
                    </button>
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

export default PasswordChange;
