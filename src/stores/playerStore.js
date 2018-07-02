import { action, observable, computed, autorun } from "mobx";

class PlayerStore {
  @observable level = 1;
}

export default new PlayerStore();
