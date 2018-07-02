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
    this.npcs = [...Array(this.area.npcCount)].map(this.getRandomNewCreep);
  };

  @action
  getRandomNewCreep = () => {
    const npcConstructorIndex = Math.floor(
      Math.random() * this.area.npcs.length
    );
    const npcConstructor = this.area.npcs[npcConstructorIndex];
    const level = this.area.level + Math.floor(Math.random() * 2);
    return new npcConstructor(level);
  };

  @action
  handleNpcClick = (targetNpc, playerStore) => {
    this.npcs = this.npcs.map(npc => {
      if (npc === targetNpc) {
        npc.hp -= playerStore.meleeDamage;
        if (npc.hp <= 0) {
          setTimeout(() => {
            this.respawnNewNPC(npc);
          }, 1000);
        }
        return npc;
      } else {
        return npc;
      }
    });
  };

  @action
  respawnNewNPC(targetNpc) {
    this.npcs = this.npcs.map(npc => {
      if (npc === targetNpc) {
        return this.getRandomNewCreep();
      } else {
        return npc;
      }
    });
  }
}

export default new AreaStore();
