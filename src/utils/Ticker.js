export default class {
  constructor({ time, eventName }) {
    setInterval(() => {
      const e = new CustomEvent(eventName, { detail: time / 1000 });
      window.dispatchEvent(e);
    }, time);
  }
}
