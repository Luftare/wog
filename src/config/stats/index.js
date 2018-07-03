const conf = {
  levelToCreepHp(level) {
    return 100 + level * 10;
  },
  levelToCreepDPS(level) {
    return 250 + level;
  },
  levelToPlayerBaseDamage(level) {
    return 25 + level;
  },
  experienceToNextLevelAtLevel(level) {
    return 500 + level * 20;
  },
  levelToPlayerBaseHp(level) {
    return 200 + level * 10;
  },
  experienceFromNpcKillWithLevel(level) {
    return 50 + level * 2;
  }
};

export default conf;
