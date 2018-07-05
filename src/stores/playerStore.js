import { observable, action, computed } from "mobx";
import stats from "../config/stats";
import { emit, on } from "../utils/eventBus";
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
  @observable avatar = "http://pixelartmaker.com/art/951833d1834e60c.png";

  constructor() {
    on(EVENT_TICK, () => {});

    on(EVENT_NPC_DIED, npc => {
      const experience = stats.experienceFromNpcKillWithLevel(npc.level);
      this.handleExperienceGain(experience);
    });

    on(EVENT_NPC_HIT_PLAYER, npc => {
      const damage = stats.levelToCreepDPS(npc.level);
      emit(EVENT_PLAYER_RECEIVE_DAMAGE, damage);
    });

    on(EVENT_PLAYER_HIT_NPC, npc => {
      const damage = this.meleeDamage;
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
    });

    on(EVENT_PLAYER_RESPAWN, () => {
      this.hp = this.maxHp * 0.7;
    });

    this.hp = this.maxHp;
  }

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
  get meleeDamage() {
    return stats.levelToPlayerBaseDamage(this.level);
  }
}

export default new PlayerStore();
