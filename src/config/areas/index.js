import Rat from "../../models/NPC/Rat";
import Item from "../../models/Item";

export default [
  {
    name: "Old forest",
    level: 1,
    npcCount: 3,
    npcs: [Rat],
    drops: [
      {
        item: Item,
        dropRate: 0.5
      },
      {
        item: Item,
        dropRate: 0.5
      },
      {
        item: Item,
        dropRate: 0.5
      },
      {
        item: Item,
        dropRate: 0.5
      },
      {
        item: Item,
        dropRate: 0.5
      },
    ]
  },
  {
    name: "Farms",
    level: 4,
    npcCount: 2,
    npcs: [Rat]
  }
];
