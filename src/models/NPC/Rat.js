import Creep from "./Creep";

export default class Rat extends Creep {
  constructor(props) {
    super(props);
    this.name = "Rat";
  }

  handleClick() {
    console.log("A Rat got clicked!");
  }
}
