import { observable, action, computed } from "mobx";
import stats from "../config/stats";
import areaStore from "./areaStore";
import { emit, on } from "../utils/eventBus";
import rootStore from "./index";

import {
  EVENT_NPC_DIED,
  EVENT_TICK,
  EVENT_PLAYER_LEVEL_UP,
  EVENT_PLAYER_HIT_NPC,
  EVENT_NPC_RECEIVE_DAMAGE,
  EVENT_NPC_HIT_PLAYER,
  EVENT_PLAYER_RECEIVE_DAMAGE,
  EVENT_PLAYER_DIED,
  EVENT_PLAYER_RESPAWN
} from "../constants";

class PlayerStore {
  @observable level = 1;
  @observable name = "Jeppe";
  @observable experience = 90;
  @observable hp = 100;
  @observable messages = [];
  @observable messageFlushTimeoutId = null;
  @observable avatar = "http://pixelartmaker.com/art/951833d1834e60c.png";
  @observable profileIsOpen = false;

  constructor() {
    on(EVENT_TICK, dt => {
      if (!this.inFight) {
        this.hp = Math.min(
          this.maxHp,
          this.hp + stats.levelToPlayerHpRegeneration(this.level) * dt
        );
      }
    });

    on(EVENT_NPC_DIED, npc => {
      const experience = stats.experienceFromNpcKillWithLevel(npc.level);
      this.handleExperienceGain(experience);
    });

    on(EVENT_NPC_HIT_PLAYER, npc => {
      const damage = stats.levelToCreepDPS(npc.level);
      emit(EVENT_PLAYER_RECEIVE_DAMAGE, damage);
    });

    on(EVENT_PLAYER_HIT_NPC, npc => {
      const damage = this.damage;
      emit(EVENT_NPC_RECEIVE_DAMAGE, {
        npc,
        damage
      });
    });

    on(EVENT_PLAYER_RECEIVE_DAMAGE, damage => {
      this.hp = Math.max(0, this.hp - damage);
      if (this.hp <= 0) {
        emit(EVENT_PLAYER_DIED);
      }
      this.messages = [...this.messages, { value: damage }];
      clearTimeout(this.messageFlushTimeoutId);
      this.messageFlushTimeoutId = setTimeout(() => {
        this.messages = [];
      }, 5000);
    });

    on(EVENT_PLAYER_RESPAWN, () => {
      this.hp = this.maxHp * 0.7;
    });

    this.hp = this.maxHp;
  }

  @action
  toggleProfile = () => {
    this.profileIsOpen = !this.profileIsOpen;
  };

  @action
  handleExperienceGain = experience => {
    const experienceToNextLevel = stats.experienceToNextLevelAtLevel(
      this.level
    );
    if (this.experience + experience >= experienceToNextLevel) {
      this.experience = this.experience + experience - experienceToNextLevel;
      this.levelUp();
    } else {
      this.experience += experience;
    }
  };

  @action
  levelUp = () => {
    this.level += 1;
    emit(EVENT_PLAYER_LEVEL_UP, this.level);
  };

  @computed
  get inFight() {
    return !!areaStore.npcs.find(npc => npc.aggro);
  }

  @computed
  get maxHp() {
    return stats.levelToPlayerBaseHp(this.level);
  }

  @computed
  get hpRatio() {
    return this.hp / this.maxHp;
  }

  @computed
  get experienceRatio() {
    return this.experience / stats.experienceToNextLevelAtLevel(this.level);
  }

  @computed
  get baseDamage() {
    return stats.levelToPlayerBaseDamage(this.level);
  }

  @computed
  get damage() {
    return this.baseDamage + rootStore.inventory.equippedItemsDamageModifier;
  }
}

export default new PlayerStore();
