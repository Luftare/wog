import { observable, action } from "mobx";
import Router from "./Router";
import areaStore from "./areaStore";
import playerStore from "./playerStore";
import inventoryStore from "./inventoryStore";
import mapStore from "./mapStore";
import townStore from "./townStore";
import routes from "../config/routes";

class RootStore {
  @observable router = new Router(routes);
  @observable player = playerStore;
  @observable inventory = inventoryStore;
  @observable area = areaStore;
  @observable map = mapStore;
  @observable town = townStore;

  @action
  closeAllModals = () => {
    this.inventory.closeLoot();
    this.inventory.closeInventory();
    if (this.map.isOpen) mapStore.toggleMap();
    if (this.player.profileIsOpen) this.player.toggleProfile();
    if (this.town.marketOpen) this.town.toggleMarket();
  };
}

export default new RootStore();
