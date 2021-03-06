export default class Item {
  constructor(level) {
    this.name = "Item";
    this.description = `Items can do lots of interesting stuff.`;
    this.level = Math.floor(level + Math.random() * 3);
    this.details = [`Level ${this.level}`];
    this.rarity = 0;
    this.equipped = false;
    this.slot = null;
  }
}
