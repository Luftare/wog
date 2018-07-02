import stats from "../../config/stats";

export default class NPC {
  constructor(level) {
    const hp = stats.levelToCreepHp(level);
    this.level = level;
    this.hp = hp;
    this.maxHp = hp;
    this.id = Math.floor(Math.random() * 10000);
  }
}
