import Item from "../index";
import stats from "../../../config/stats";

export default class Weapon extends Item {
  constructor(props) {
    super(props);
    this.damage = stats.levelToWeaponDamage(this.level);
    this.details.push(`Damage ${this.damage}`);
  }
}
