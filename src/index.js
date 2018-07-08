import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import RouterComponent from "./components/Router";
import registerServiceWorker from "./registerServiceWorker";
import { Provider } from "mobx-react";
import Ticker from "./utils/Ticker";
import { EVENT_TICK } from "./constants";
import rootStore from "./stores";

new Ticker({
  time: 500,
  eventName: EVENT_TICK
});

document.addEventListener("contextmenu", e => e.preventDefault());

const Root = (
  <Provider
    router={rootStore.router}
    playerStore={rootStore.player}
    inventoryStore={rootStore.inventory}
    areaStore={rootStore.area}
    mapStore={rootStore.map}
    rootStore={rootStore}
  >
    <RouterComponent />
  </Provider>
);

ReactDOM.render(Root, document.getElementById("root"));
registerServiceWorker();
