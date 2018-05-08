import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import configureStore from "./store/configure.store";
import registerServiceWorker from "./registerServiceWorker";
import HouseColumn from "./container/house.column";

const store = configureStore();

render(
  <Provider store={store}>
    <HouseColumn />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
