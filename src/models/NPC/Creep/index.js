import NPC from "../index";

export default class Creep extends NPC {
  constructor(props) {
    super(props);
    this.aggro = false;
    this.hitIntervalTime = 2000;
    this.hitIntervalId = null;
  }

  stop() {
    clearInterval(this.hitIntervalId);
  }
}
