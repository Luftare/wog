export default class Currency {
  constructor(amount) {
    this.amount = amount;
    this.name = `${this.amount} gold`;
    this.description = "Start of a fortune.";
    this.details = [];
    this.rarity = 0;
  }
}
