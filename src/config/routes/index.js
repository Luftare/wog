import Area from "../../pages/Area";
import Town from "../../pages/Town";

export default [
  {
    path: "/",
    component: Town
  },
  {
    path: "/area/:id",
    component: Area
  }
];
