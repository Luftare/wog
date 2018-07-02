import NPC from "./index";

export default class Creep extends NPC {
  handleClick() {
    console.log("A creep got clicked!");
  }
}
