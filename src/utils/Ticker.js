export default class {
  constructor({ time, eventName, payload }) {
    setInterval(() => {
      const e = new CustomEvent(eventName, { detail: payload });
      window.dispatchEvent(e);
    }, time);
  }
}
