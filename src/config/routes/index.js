import Area from "../../pages/Area";
import Town from "../../pages/Town";
import Graveyard from "../../pages/Graveyard";

export default [
  {
    path: "/",
    component: Town
  },
  {
    path: "/graveyard",
    component: Graveyard
  },
  {
    path: "/area/:id",
    component: Area
  }
];
