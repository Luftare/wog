import { observable, action, computed } from "mobx";
//import stats from "../config/stats";
// import Item from "../models/Item";
import { emit, on } from "../utils/eventBus";
import {
  EVENT_TICK,
  EVENT_ITEM_CLICK,
  EVENT_LOOT_ITEM,
  EVENT_SHOW_LOOT
} from "../constants";

class InventoryStore {
  @observable items = [];
  @observable isOpen = false;
  @observable inventorySize = 12;
  @observable loot = [];

  constructor() {
    on(EVENT_TICK, () => {});

    on(EVENT_ITEM_CLICK, item => {
      const itemInInventory = this.items.includes(item);
      if (itemInInventory) {
        //wear item
      } else if (!this.inventoryIsFull) {
        emit(EVENT_LOOT_ITEM, item);
      }
    });

    on(EVENT_LOOT_ITEM, item => {
      this.items = [...this.items, item];
      this.loot = this.loot.filter(i => i !== item);
    });

    on(EVENT_SHOW_LOOT, items => {
      this.loot = [...items];
    });
  }

  @computed
  get inventoryIsFull() {
    return this.items.length >= this.inventorySize;
  }

  @computed
  get slots() {
    return [...this.items, ...Array(this.inventorySize - this.items.length)];
  }

  @action
  toggleInventory = () => {
    this.isOpen = !this.isOpen;
  };

  @action
  closeLoot = () => {
    this.loot = [];
  };
}

export default new InventoryStore();
