import axios from "axios";
import { server } from "../../server";

// get orders
export const getOrders = () => async (dispatch) => {
  try {
    dispatch({ type: "GetOrdersRequest" });

    const { data } = await axios.get("/api/v1/orders/me");

    dispatch({ type: "GetOrdersSuccess", payload: data.orders });
  } catch (error) {
    dispatch({ type: "GetOrdersFail", payload: error.response.data.message });
  }
};
