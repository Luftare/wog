import { action, observable, computed } from "mobx";
import areas from "../config/areas";
import {
  EVENT_NPC_DIED,
  EVENT_NPC_RECEIVE_DAMAGE,
  EVENT_TICK
} from "../constants";
import emit from "../utils/emitter";

class AreaStore {
  @observable npcs = [];
  @observable name = "";
  @observable areaIndex = 0;

  constructor() {
    window.addEventListener(EVENT_TICK, () => {});

    window.addEventListener(EVENT_NPC_RECEIVE_DAMAGE, ({ detail: data }) => {
      const { npc: targetNpc, damage } = data;
      this.npcs = this.npcs.map(npc => {
        if (npc === targetNpc) {
          npc.hp -= damage;
          if (npc.hp <= 0) {
            this.handleNpcDeath(npc);
          }
          return npc;
        } else {
          return npc;
        }
      });
    });
  }

  @computed
  get area() {
    return areas[this.areaIndex];
  }

  @action
  setArea = areaIndex => {
    this.areaIndex = areaIndex;
  };

  @action
  createNpcs = () => {
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
  handleNpcDeath = npc => {
    emit(EVENT_NPC_DIED, npc);
    setTimeout(() => {
      this.respawnNewNpc(npc);
    }, 1000);
  };

  @action
  respawnNewNpc(targetNpc) {
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
