import { observable, action, computed } from "mobx";
import stats from "../config/stats";
import emit from "../utils/emitter";
import {
  EVENT_NPC_DIED,
  EVENT_TICK,
  EVENT_PLAYER_LEVEL_UP,
  EVENT_PLAYER_HIT_NPC,
  EVENT_NPC_RECEIVE_DAMAGE
} from "../constants";

class PlayerStore {
  @observable level = 1;
  @observable experience = 0;
  @observable hp = 100;

  constructor() {
    window.addEventListener(EVENT_TICK, () => {});

    window.addEventListener(EVENT_NPC_DIED, ({ detail: npc }) => {
      const experience = stats.experienceFromNpcKillWithLevel(npc.level);
      this.handleExperienceGain(experience);
    });

    window.addEventListener(EVENT_PLAYER_HIT_NPC, ({ detail: npc }) => {
      const damage = this.meleeDamage;
      emit(EVENT_NPC_RECEIVE_DAMAGE, {
        npc,
        damage
      });
    });

    this.hp = this.maxHp;
  }

  @action
  handleExperienceGain = experience => {
    const experienceToNextLevel = stats.experienceToNextLevelAtLevel(
      this.level
    );
    if (experience >= experienceToNextLevel) {
      this.experience = experience - experienceToNextLevel;
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
  get experienceProgress() {
    return this.experience / stats.experienceToNextLevelAtLevel(this.level);
  }

  @computed
  get meleeDamage() {
    return stats.levelToPlayerBaseDamage(this.level);
  }
}

export default new PlayerStore();
