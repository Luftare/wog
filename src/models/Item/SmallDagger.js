import Weapon from "./Weapon";

export default class SmallDagger extends Weapon {
  constructor(props) {
    super(props);
    this.name = "Small dagger";
    this.description = `A handy tool for letter opening.`;
    this.rarity = 1;
  }
}
