import { observable, action } from "mobx";
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
  if (playerStore.profileIsOpen) playerStore.toggleProfile();
};

class RootStore {
  @observable router = new Router(routes);
  @observable player = playerStore;
  @observable inventory = inventoryStore;
  @observable area = areaStore;
  @observable map = mapStore;

  @action
  closeAllModals = () => {
    this.invantory.closeLoot();
    this.inventory.closeInventory();
    if (this.map.isOpen) mapStore.toggleMap();
    if (this.playr.profileIsOpen) this.player.toggleProfile();
  };
}

export default new RootStore();
