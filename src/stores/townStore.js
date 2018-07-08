import { observable, action } from "mobx";
// import { emit, on } from "../utils/eventBus";
// import {  } from "../constants";

class TownStore {
  @observable marketOpen = false;

  @action
  toggleMarket = () => {
    this.marketOpen = !this.marketOpen;
  };
}

export default new TownStore();
