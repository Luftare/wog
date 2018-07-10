import background from "./background.svg";
import SmallDagger from "../../../models/Item/Weapon/SmallDagger";
import Gold from "../../../models/Currency";
import Rat from "../../../models/NPC/Creep/Rat";

export default {
  name: "Farms",
  level: 4,
  npcCount: 2,
  npcs: [Rat],
  background,
  drops: [
    {
      item: Gold,
      dropRate: 0.9
    },
    {
      item: SmallDagger,
      dropRate: 0.99
    }
  ]
};
