import Router from "./Router";
import areaStore from "./areaStore";
import playerStore from "./playerStore";
import inventoryStore from "./inventoryStore";
import mapStore from "./mapStore";
import routes from "../config/routes";

const closeAllModals = () => {
  inventoryStore.closeLoot();
  inventoryStore.closeInventory();
  if (mapStore.isOpen) mapStore.toggleMap();
  if(playerStore.profileIsOpen) playerStore.toggleProfile();
};

const stores = {
  router: new Router(routes),
  player: playerStore,
  inventory: inventoryStore,
  area: areaStore,
  map: mapStore,
  closeAllModals
};

export default stores;
