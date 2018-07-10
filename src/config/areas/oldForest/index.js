import background from "./background.svg";
import SmallDagger from "../../../models/Item/Weapon/SmallDagger";
import Gold from "../../../models/Currency";
import Rat from "../../../models/NPC/Creep/Rat";

export default {
  name: "Old forest",
  level: 1,
  npcCount: 3,
  npcs: [Rat],
  background,
  drops: [
    {
      item: Gold,
      dropRate: 0.9
    }
  ]
};
