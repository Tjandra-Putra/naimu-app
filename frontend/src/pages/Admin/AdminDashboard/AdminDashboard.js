import "./AdminDashboard.css";
import SideNavbar from "../../../components/Layout/SideNavbar/SideNavbar";

const AdminDashboard = () => {
  return (
    <div className="admin-dashboard-wrapper">
      <div className="container">
        <div className="orders">
          <div className="row">
            <div className="col-md-3 sticky">
              <SideNavbar activeLink="admin-dashboard" />
            </div>
            <div className="col-md-9">
              <div className="card">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tenetur, blanditiis illum expedita rem omnis
                delectus, soluta culpa, voluptate molestiae iste porro harum ad. Mollitia, commodi nisi molestiae
                temporibus facilis itaque.
              </div>

              <div className="card my-4">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Tenetur, blanditiis illum expedita rem omnis
                delectus, soluta culpa, voluptate molestiae iste porro harum ad. Mollitia, commodi nisi molestiae
                temporibus facilis itaque.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
