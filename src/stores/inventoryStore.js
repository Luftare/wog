import { observable, action, computed } from "mobx";
import stats from "../config/stats";
import Item from "../models/Item";
import { emit, on } from "../utils/eventBus";
import { EVENT_TICK, EVENT_ITEM_CLICK } from "../constants";

class InventoryStore {
  @observable
  slots = [...Array(12)].map((slot, i) => (i < 4 ? new Item() : slot));
  @observable isOpen = true;

  constructor() {
    on(EVENT_TICK, () => {});

    on(EVENT_ITEM_CLICK, item => {
      console.log(item);
    });
  }

  @action
  toggleInventory = () => {
    this.isOpen = !this.isOpen;
  };
}

export default new InventoryStore();
