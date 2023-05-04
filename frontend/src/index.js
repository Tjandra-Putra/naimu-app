import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import Store from "./redux/store";

import "./index.css";

const root = ReactDOM.createRoot(document.getElementById("root"));

// Log Redux state on change
// Store.subscribe(() => console.log(Store.getState()));

root.render(
  <Provider store={Store}>
    <App />
  </Provider>
);
