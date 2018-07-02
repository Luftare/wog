import { observable } from "mobx";

class PlayerStore {
  @observable level = 1;
}

export default new PlayerStore();
