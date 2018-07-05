import { action, observable, computed } from "mobx";
import areas from "../config/areas";
import {
  EVENT_NPC_DIED,
  EVENT_NPC_RECEIVE_DAMAGE,
  EVENT_PLAYER_HIT_NPC,
  EVENT_NPC_HIT_PLAYER,
  EVENT_TICK,
  EVENT_PLAYER_DIED,
  EVENT_LOOT_ITEM
} from "../constants";
import { emit, on } from "../utils/eventBus";

class AreaStore {
  @observable npcs = [];
  @observable name = "";
  @observable areaIndex = 0;

  constructor() {
    on(EVENT_TICK, () => {});

    on(EVENT_PLAYER_HIT_NPC, npc => {
      if (npc.aggro) return;
      npc.aggro = true;
      npc.hitIntervalId = setInterval(() => {
        this.handleNpcHittingPlayer(npc);
      }, npc.hitIntervalTime);
    });

    on(EVENT_NPC_DIED, npc => {
      clearInterval(npc.hitIntervalId);
      npc.items = this.generateLoot(npc);
      npc.aggro = false;
      setTimeout(() => {
        this.respawnNewNpcAtExisting(npc);
      }, 10000);
    });

    on(EVENT_NPC_RECEIVE_DAMAGE, ({ npc: targetNpc, damage }) => {
      this.npcs = this.npcs.map(npc => {
        if (npc === targetNpc) {
          npc.hp -= damage;
          npc.messages = [...npc.messages, { value: damage }];
          clearTimeout(npc.messageFlushTimeoutId);
          npc.messageFlushTimeoutId = setTimeout(() => {
            npc.messages = [];
            this.npcs = [...this.npcs];
          }, 5000);
          if (npc.hp <= 0) {
            emit(EVENT_NPC_DIED, npc);
          }
          return npc;
        } else {
          return npc;
        }
      });
    });

    on(EVENT_PLAYER_DIED, () => {
      this.npcs = this.npcs.map(npc => {
        npc.aggro = false;
        clearInterval(npc.hitIntervalId);
        return npc;
      });
    });

    on(EVENT_LOOT_ITEM, item => {
      const npc = this.npcs.find(npc => npc.items.includes(item));
      if (npc) {
        npc.items = npc.items.map(i => (i !== item ? i : null));
        this.npcs = [...this.npcs];
      }
    });
  }

  @computed
  get area() {
    return areas[this.areaIndex];
  }

  @action
  handleNpcHittingPlayer = npc => {
    emit(EVENT_NPC_HIT_PLAYER, npc);
    npc.hitting = true;
    this.npcs = [...this.npcs];
    setTimeout(() => {
      npc.hitting = false;
      this.npcs = [...this.npcs];
    }, 700);
  };

  @action
  setArea = areaIndex => {
    this.areaIndex = areaIndex;
  };

  @action
  createNpcs = () => {
    this.npcs = [...Array(this.area.npcCount)].map(this.getRandomNewCreep);
  };

  @action
  generateLoot = npc => {
    return this.area.drops
      .filter(drop => Math.random() <= drop.dropRate)
      .map(drop => new drop.item());
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
  respawnNewNpcAtExisting(targetNpc) {
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
