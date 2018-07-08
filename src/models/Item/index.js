//import stats from "../../config/stats";

export default class Item {
  constructor(level) {
    this.name = "Item";
    this.description = `Items can do lots of interesting stuff. They increase player's power and may look cool.`;
    this.level = Math.floor(level + Math.random() * 3);
    this.details = [`Level ${this.level}`];
    this.rarity = 0;
  }
}
