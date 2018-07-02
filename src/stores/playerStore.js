import { observable, computed } from "mobx";
import stats from "../config/stats";

class PlayerStore {
  @observable level = 1;

  @computed
  get meleeDamage() {
    return stats.levelToPlayerBaseDamage(this.level);
  }
}

export default new PlayerStore();
