import { action, observable } from "mobx";
import areas from "../config/areas";

class AreaStore {
  @observable npcs = [];
  @observable name = "";
  @observable area = areas[0];

  @action
  initArea = areaIndex => {
    this.area = areas[areaIndex];
    this.createNPCs();
  };

  @action
  createNPCs = () => {
    this.npcs = [...Array(this.area.npcCount)].map(() => {
      const npcConstructorIndex = Math.floor(
        Math.random() * this.area.npcs.length
      );
      const npcConstructor = this.area.npcs[npcConstructorIndex];
      const level = this.area.level + Math.floor(Math.random() * 2);
      return new npcConstructor(level);
    });
  };
}

export default new AreaStore();
