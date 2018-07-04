import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import RouterComponent from "./components/Router";
import registerServiceWorker from "./registerServiceWorker";
import routes from "./config/routes";
import Router from "./stores/Router";
import areaStore from "./stores/areaStore";
import playerStore from "./stores/playerStore";
import inventoryStore from "./stores/inventoryStore";
import { Provider } from "mobx-react";
import Ticker from "./utils/Ticker";
import { EVENT_TICK } from "./constants";

new Ticker({
  time: 500,
  eventName: EVENT_TICK
});

const Root = (
  <Provider
    router={new Router(routes)}
    playerStore={playerStore}
    inventoryStore={inventoryStore}
    areaStore={areaStore}
  >
    <RouterComponent />
  </Provider>
);

ReactDOM.render(Root, document.getElementById("root"));
registerServiceWorker();
