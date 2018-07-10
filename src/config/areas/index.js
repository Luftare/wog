import Rat from "../../models/NPC/Creep/Rat";
import Item from "../../models/Item";
import SmallDagger from "../../models/Item/Weapon/SmallDagger";
import Gold from "../../models/Currency";
import forestBackground from "./forest.svg";

export default [
  {
    name: "Old forest",
    level: 1,
    npcCount: 3,
    npcs: [Rat],
    background: forestBackground,
    drops: [
      {
        item: Gold,
        dropRate: 0.9
      },
      {
        item: Item,
        dropRate: 0.2
      },
      {
        item: Item,
        dropRate: 0.1
      }
    ]
  },
  {
    name: "Farms",
    level: 4,
    npcCount: 2,
    npcs: [Rat],
    background: forestBackground,
    drops: [
      {
        item: Gold,
        dropRate: 0.9
      },
      {
        item: SmallDagger,
        dropRate: 0.99
      },
      {
        item: Item,
        dropRate: 0.1
      }
    ]
  }
];
