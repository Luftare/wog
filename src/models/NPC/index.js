import stats from "../../config/stats";

export default class NPC {
  constructor(level) {
    const hp = stats.levelToCreepHp(level);
    this.level = level;
    this.hp = hp;
    this.maxHp = hp;
    this.messages = [];
    this.messageFlushTimeoutId = null;
    this.items = [];
    this.image = "";
  }
}
