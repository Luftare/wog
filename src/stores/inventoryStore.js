import { observable, action, computed } from "mobx";
import stats from "../config/stats";
import Item from "../models/Item";
import { emit, on } from "../utils/eventBus";
import { EVENT_TICK } from "../constants";

class InventoryStore {
  @observable
  items = [...Array(12)].map((slot, i) => (i < 4 ? new Item() : slot));
  @observable isOpen = false;

  constructor() {
    on(EVENT_TICK, () => {});
  }

  @action
  toggleInventory = () => {
    this.isOpen = !this.isOpen;
  };
}

export default new InventoryStore();
