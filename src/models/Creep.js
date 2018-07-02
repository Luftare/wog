import NPC from "./NPC";

export default class Creep extends NPC {
  handleClick() {
    console.log("A creep got clicked!");
  }
}
