import { observable, action } from "mobx";
// import { emit, on } from "../utils/eventBus";
// import {  } from "../constants";

class MapStore {
  @observable isOpen = false;

  @action
  toggleMap = () => {
    this.isOpen = !this.isOpen;
  };
}

export default new MapStore();
