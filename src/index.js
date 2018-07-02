import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import RouterComponent from "./components/Router";
import registerServiceWorker from "./registerServiceWorker";
import routes from "./config/routes";
import Router from "./stores/Router";
import areaStore from "./stores/areaStore";
import playerStore from "./stores/playerStore";
import { Provider } from "mobx-react";
import Ticker from "./utils/Ticker";

new Ticker({
  time: 1000,
  eventName: "tick",
  payload: { frequency: 1000 }
});

const Root = (
  <Provider
    router={new Router(routes)}
    playerStore={playerStore}
    areaStore={areaStore}
  >
    <RouterComponent />
  </Provider>
);

ReactDOM.render(Root, document.getElementById("root"));
registerServiceWorker();
