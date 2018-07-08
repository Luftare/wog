const conf = {
  levelToCreepHp(level) {
    return 100 + level * 10;
  },
  levelToCreepDPS(level) {
    return 10 + level;
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
  },
  levelToPlayerHpRegeneration(level) {
    return 1 + level * 0.1;
  },
  levelToWeaponDamage(level) {
    return level;
  },
  itemSellPrice(level, rarity) {
    return level * (1 + rarity);
  },
  levelToBaseCritRate(level) {
    return 0.05 + level * 0.001;
  }
};

export default conf;
