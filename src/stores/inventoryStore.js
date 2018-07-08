import { observable, action, computed } from "mobx";
import Gold from "../models/Currency";
import stats from "../config/stats";
// import Item from "../models/Item";
import { emit, on } from "../utils/eventBus";
import rootStore from "./index";
import {
  EVENT_TICK,
  EVENT_ITEM_CLICK,
  EVENT_LOOT_ITEM,
  EVENT_SHOW_LOOT,
  ITEM_SLOT_RIGHT_HAND
} from "../constants";

class InventoryStore {
  @observable items = [];
  @observable isOpen = false;
  @observable inventorySize = 12;
  @observable loot = [];
  @observable gold = 0;
  @observable
  itemSlots = [
    {
      id: ITEM_SLOT_RIGHT_HAND,
      name: "Hand"
    }
  ];

  constructor() {
    on(EVENT_TICK, () => {});

    on(EVENT_ITEM_CLICK, item => {
      const itemInInventory = this.notEquippedItems.includes(item);
      const itemEquipped = this.equippedItems.includes(item);
      const itemInLoot = this.loot.includes(item);

      if (itemInInventory) {
        if (rootStore.town.marketOpen) {
          this.sellItem(item);
        } else if (item.slot) {
          this.equipItem(item);
        }
      }

      if (itemEquipped) {
        if (!this.inventoryIsFull) {
          item.equipped = false;
          this.items = [...this.items];
        }
      }

      if (itemInLoot) {
        if (!this.inventoryIsFull || item instanceof Gold) {
          emit(EVENT_LOOT_ITEM, item);
        }
      }
    });

    on(EVENT_LOOT_ITEM, item => {
      this.loot = this.loot.map(i => (i !== item ? i : null));
      if (item instanceof Gold) {
        this.gold += item.amount;
      } else {
        this.items = [...this.items, item];
      }
      if (this.allItemsLooted) this.closeLoot();
    });

    on(EVENT_SHOW_LOOT, items => {
      this.loot = [...items];
    });
  }

  @computed
  get notEquippedItems() {
    return this.items.filter(item => !item.equipped);
  }

  @computed
  get equippedItems() {
    return this.items.filter(item => item.equipped);
  }

  @computed
  get equippedItemSlots() {
    return this.itemSlots.map(slot =>
      this.equippedItems.find(item => item.slot === slot.id)
    );
  }

  @computed
  get inventoryIsFull() {
    return this.notEquippedItems.length >= this.inventorySize;
  }

  @computed
  get slots() {
    return [
      ...this.notEquippedItems,
      ...Array(this.inventorySize - this.notEquippedItems.length)
    ];
  }

  @computed
  get allItemsLooted() {
    return this.loot.length > 0 && !this.loot.find(item => !!item);
  }

  @computed
  get equippedItemsDamageModifier() {
    return this.equippedItems.reduce(
      (sum, item) => (item.damage ? item.damage : 0),
      0
    );
  }

  @action
  sellItem = item => {
    this.items = this.items.filter(itm => itm !== item);
    this.gold += stats.itemSellPrice(item.level, item.rarity);
  };

  @action
  equipItem = item => {
    const equippedItemAtSameSlot = this.equippedItems.find(
      eItem => eItem.slot === item.slot
    );
    if (equippedItemAtSameSlot) {
      equippedItemAtSameSlot.equipped = false;
    }
    item.equipped = true;
    this.items = [...this.items];
  };

  @action
  toggleInventory = () => {
    this.isOpen = !this.isOpen;
  };

  @action
  closeInventory = () => {
    this.isOpen = false;
  };

  @action
  closeLoot = () => {
    this.loot = [];
  };
}

export default new InventoryStore();
