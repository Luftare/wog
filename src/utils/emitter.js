const emitter = (eventName, payload) => {
  const e = new CustomEvent(eventName, { detail: payload });
  window.dispatchEvent(e);
};

export default emitter;
