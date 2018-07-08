import Weapon from "../index";
import { ITEM_SLOT_RIGHT_HAND } from "../../../../constants";
import image from "./icon.png";

export default class SmallDagger extends Weapon {
  constructor(props) {
    super(props);
    this.name = "Small dagger";
    this.description = `A handy tool for letter opening.`;
    this.rarity = 0;
    this.slot = ITEM_SLOT_RIGHT_HAND;
    this.icon = image;
  }
}
