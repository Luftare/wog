import { action, observable, computed, autorun } from "mobx";

class AreaStore {
  @observable npcs = [];
}

export default new AreaStore();
