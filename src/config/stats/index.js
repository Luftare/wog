const conf = {
  levelToCreepHp(level) {
    return 100 + level * 10;
  },
  levelToCreepDPS(level) {
    return 2 + level;
  },
  levelToPlayerBaseDamage(level) {
    return 5 + level;
  }
};

export default conf;
