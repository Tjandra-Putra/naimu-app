import axios from "axios";
import { server } from "../../server";

// Action uses Reducer to modify the State

export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: "LoadUserRequest" });

    const { data } = await axios.get(`${server}/user/load-user`, { withCredentials: true });

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

// Update user profile
export const updateProfile =
  ({ email, password, phoneNumber, fullName }) =>
  async (dispatch) => {
    try {
      dispatch({ type: "UpdateProfileRequest" });

      const { data } = await axios.put(
        `${server}/user/update-profile`,
        { email, password, phoneNumber, fullName },
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

// logout user
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
