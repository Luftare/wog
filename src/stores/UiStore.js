import { observable, computed } from "mobx";
import { sizes } from "../style";
import { SCREEN_SIZE_MOBILE, SCREEN_SIZE_TABLET, SCREEN_SIZE_DESKTOP } from "../constants";

class UiStore {
  @observable width = window.innerWidth;
  @observable height = window.innerHeight;

  constructor() {
    window.addEventListener("resize", () => {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
    })
  }

  @computed
  get breakpoint(){
    if(this.width < sizes.tablet) return SCREEN_SIZE_MOBILE;
    if(this.width < sizes.desktop) return SCREEN_SIZE_TABLET;
    return SCREEN_SIZE_DESKTOP;
  };
}

export default new UiStore();
