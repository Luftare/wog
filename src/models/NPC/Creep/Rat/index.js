import Creep from "../index";
import alive from "./rat.svg";
import dead from "./rat-dead.svg";

export default class Rat extends Creep {
  constructor(props) {
    super(props);
    this.name = "Rat";
    this.image = alive;
    this.imageDead = dead;
  }
}
