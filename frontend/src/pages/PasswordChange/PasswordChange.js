import SideNavbar from "../../components/Layout/SideNavbar/SideNavbar";
import "./PasswordChange.css";

const PasswordChange = () => {
  return (
    <div className="password-change-wrapper">
      <div className="container">
        <div className="password-change">
          <div className="row">
            <div className="col-md-3">
              <SideNavbar activeLink="password-change" />
            </div>
            <div className="col-md-9"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordChange;
