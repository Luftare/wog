import { action, observable, computed } from "mobx";
import areas from "../config/areas";

class AreaStore {
  @observable npcs = [];
  @observable name = "";
  @observable areaIndex = 0;

  @computed
  get area() {
    return areas[this.areaIndex];
  }

  @action
  setArea = areaIndex => {
    this.areaIndex = areaIndex;
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

  @action
  handleNpcClick = (targetNpc, playerStore) => {
    this.npcs = this.npcs.map(
      npc =>
        npc === targetNpc
          ? { ...npc, hp: npc.hp - playerStore.meleeDamage }
          : npc
    );
  };
}

export default new AreaStore();
