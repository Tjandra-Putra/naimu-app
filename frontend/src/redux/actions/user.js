import axios from "axios";
import { server } from "../../server";

// Action uses Reducer to modify the State

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: "LoadUserRequest" });

    const { data } = await axios.get(`${server}/user/load-user`, { withCredentials: true });

    console.log(data, "data");

    dispatch({
      type: "LoadUserSuccess",
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: "LoadUserFail",
      payload: error.response.data.message,
    });
  }
};

// ============================= Update User Profile =============================
export const updateProfile =
  ({ email, password, phoneNumber, fullName, birthday }) =>
  async (dispatch) => {
    try {
      dispatch({ type: "UpdateProfileRequest" });

      const { data } = await axios.put(
        `${server}/user/update-profile`,
        { email, password, phoneNumber, fullName, birthday },
        {
          withCredentials: true,
          headers: {
            "Access-Control-Allow-Credentials": true,
          },
        }
      );

      dispatch({
        type: "UpdateProfileSuccess",
        payload: data,
        successMessage: "Profile updated successfully",
      });
    } catch (error) {
      dispatch({
        type: "UpdateProfileFail",
        payload: error.response.data.message,
      });
    }
  };

// ============================= Logout User =============================
export const logout = () => async (dispatch) => {
  try {
    dispatch({ type: "LogoutRequest" });

    // backend logout
    await axios.get(`${server}/user/logout`, { withCredentials: true });

    dispatch({
      type: "LogoutSuccess",
    });
  } catch (error) {
    dispatch({
      type: "LogoutFail",
      payload: error.response.data.message,
    });
  }
};

// ============================= Update User Address =============================
export const updateAddress =
  ({ country, city, address1, address2, postalCode, addressType }) =>
  async (dispatch) => {
    try {
      dispatch({ type: "UpdateAddressRequest" });

      const { data } = await axios.put(
        `${server}/user/update-addresses`,
        { country, city, address1, address2, postalCode, addressType },
        { withCredentials: true } // need withCredentials: true to send cookie to backend as it is authenticated
      );

      dispatch({
        type: "UpdateAddressSuccess",
        payload: data,
        successMessage: "Address updated successfully",
      });
    } catch (error) {
      dispatch({
        type: "UpdateAddressFail",
        payload: error.response.data.message,
      });
    }
  };

// ============================= Delete User Address =============================
export const deleteAddress = (addressId) => async (dispatch) => {
  try {
    dispatch({ type: "DeleteAddressRequest" });

    const { data } = await axios.delete(`${server}/user/delete-address/${addressId}`, { withCredentials: true });

    dispatch({
      type: "DeleteAddressSuccess",
      payload: data,
      successMessage: "Address deleted successfully",
    });
  } catch (error) {
    dispatch({
      type: "DeleteAddressFail",
      payload: error.response.data.message,
    });
  }
};
