import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { Country, State } from "country-state-city";

import "./Addresses.css";
import SideNavbar from "../../components/Layout/SideNavbar/SideNavbar";
import { updateAddress, deleteAddress } from "../../redux/actions/user";

const Addresses = () => {
  // toast component
  const notifySuccess = (message) => toast.success(message, { duration: 5000 });
  const notifyError = (message) => toast.error(message, { duration: 5000 });

  const dispatch = useDispatch();

  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [address1, setAddress1] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [addressType, setAddressType] = useState("");
  const { user, error, success } = useSelector((state) => state.userReducer);

  const addressTypes = [
    {
      name: "Default",
    },
    {
      name: "Home",
    },
    {
      name: "Work",
    },
  ];

  useEffect(() => {
    if (error) {
      notifyError(error);
      //   console.log(error);
      dispatch({ type: "ClearErrors" });
    }
    if (success) {
      notifySuccess(success);
      dispatch({ type: "ClearSuccess" });
    }
  }, [error, success]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(country, city, address1, postalCode, addressType);
    if (addressType === "" || country === "" || city === "") {
      notifyError("Please fill in all the required fields");
    } else {
      // dispatch update address
      dispatch(updateAddress({ country, city, address1, postalCode, addressType }));

      //clear states
      setCountry("");
      setCity("");
      setAddress1("");
      setPostalCode("");
      setAddressType("");
    }
  };

  const handleDelete = (addressId) => {
    dispatch(deleteAddress(addressId));
  };

  return (
    <div className="addresses-wrapper">
      <div className="container">
        {/* <nav aria-label="breadcrumb">
          <ol class="breadcrumb">
            <Link to="/" class="breadcrumb-item">
              Home
            </Link>
            <li class="breadcrumb-item active" aria-current="page">
              Orders
            </li>
          </ol>
        </nav> */}

        <div className="addresses">
          <div className="row">
            <div className="col-md-3">
              <SideNavbar activeLink="addresses" />
            </div>
            <div className="col-md-9">
              <div className="card">
                <div className="d-flex flex-row justify-content-between mb-4">
                  <div className="title">My Addresses</div>
                  <div className="btn-add btn btn-dark rounded-1" data-bs-toggle="modal" data-bs-target="#exampleModal">
                    <i class="fa-solid fa-plus"></i> Add New
                  </div>

                  <div
                    class="modal fade"
                    id="exampleModal"
                    tabindex="-1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                  >
                    <div class="modal-dialog modal-dialog-centered">
                      <div class="modal-content">
                        <form onSubmit={handleSubmit}>
                          <div class="modal-header">
                            <h1 class="modal-title fs-5" id="exampleModalLabel">
                              Add New Address
                            </h1>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                          </div>
                          <div class="modal-body">
                            <div className="mb-3">
                              <label for="country" class="form-label">
                                Country
                              </label>
                              <select
                                class="form-select"
                                id="country"
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                              >
                                <option>Select Country</option>
                                {Country &&
                                  Country.getAllCountries().map((item) => (
                                    <option key={item.isoCode} value={item.isoCode}>
                                      {item.name}
                                    </option>
                                  ))}
                              </select>
                            </div>

                            <div className="mb-3">
                              <label for="state" class="form-label">
                                City
                              </label>
                              <select
                                class="form-select"
                                id="city"
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                              >
                                <option>Select City</option>
                                {Country &&
                                  State.getStatesOfCountry(country).map((item) => (
                                    <option key={item.isoCode} value={item.isoCode}>
                                      {item.name}
                                    </option>
                                  ))}
                              </select>
                            </div>

                            <div class="mb-3">
                              <label for="address" class="form-label">
                                Address
                              </label>
                              <input
                                type="text"
                                class="form-control"
                                id="address"
                                value={address1}
                                onChange={(e) => setAddress1(e.target.value)}
                              />
                            </div>

                            <div class="mb-3">
                              <label for="address" class="form-label">
                                Postal Code
                              </label>
                              <input
                                type="text"
                                class="form-control"
                                id="address"
                                value={postalCode}
                                onChange={(e) => setPostalCode(e.target.value)}
                              />
                            </div>

                            <div className="mb-3">
                              <label for="state" class="form-label">
                                Address Type
                              </label>
                              <select
                                class="form-select"
                                id="city"
                                value={addressType}
                                onChange={(e) => setAddressType(e.target.value)}
                              >
                                <option>Select Address Type</option>

                                {addressTypes.map((item) => (
                                  <option key={item.name} value={item.name}>
                                    {item.name}
                                  </option>
                                ))}
                              </select>
                            </div>
                          </div>
                          <div class="modal-footer">
                            <button class="btn btn-dark rounded-1" type="submit">
                              Save Changes
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
                {user && user.user.addresses.length > 0 ? (
                  user.user.addresses.map((item, index) => (
                    <div className="address-box" key={index}>
                      <div className="address-type">{item.addressType}</div>
                      <div className="address">{item.address1}</div>
                      <div className="phone-number">{user.user.phoneNumber}</div>
                      <div className="action">
                        <i
                          class="fa-solid fa-trash-can text-danger bin-icon"
                          onClick={() => handleDelete(item._id)}
                        ></i>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="addresses-empty">
                    <div className="title">You have no addresses saved</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Addresses;
