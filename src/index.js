import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import RouterComponent from "./components/Router";
import registerServiceWorker from "./registerServiceWorker";
import { Provider } from "mobx-react";
import Ticker from "./utils/Ticker";
import { EVENT_TICK } from "./constants";
import stores from "./stores";

new Ticker({
  time: 500,
  eventName: EVENT_TICK
});

document.addEventListener("contextmenu", e => e.preventDefault());

const Root = (
  <Provider
    router={stores.router}
    playerStore={stores.player}
    inventoryStore={stores.inventory}
    areaStore={stores.area}
    mapStore={stores.map}
    rootStore={stores}
  >
    <RouterComponent />
  </Provider>
);

ReactDOM.render(Root, document.getElementById("root"));
registerServiceWorker();
