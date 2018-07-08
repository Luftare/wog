import Weapon from "./Weapon";
import { ITEM_SLOT_RIGHT_HAND } from "../../constants";

export default class SmallDagger extends Weapon {
  constructor(props) {
    super(props);
    this.name = "Small dagger";
    this.description = `A handy tool for letter opening.`;
    this.rarity = 1;
    this.slot = ITEM_SLOT_RIGHT_HAND;
  }
}
