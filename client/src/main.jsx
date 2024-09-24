import "bootstrap/dist/css/bootstrap.min.css";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import { BrowserRouter } from "react-router-dom";

import App from "./App.jsx";

// redux
import store from "./redux/store.js";
import { Provider } from "react-redux";


createRoot(document.getElementById("root")).render(
  // <StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
//   </StrictMode>
);
