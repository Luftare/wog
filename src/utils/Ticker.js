export default class {
  constructor({ time, eventName }) {
    setInterval(() => {
      const e = new CustomEvent(eventName, { detail: time });
      window.dispatchEvent(e);
    }, time);
  }
}
