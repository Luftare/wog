export const emit = (eventName, payload) => {
  const e = new CustomEvent(eventName, { detail: payload });
  window.dispatchEvent(e);
};

export const on = (eventName, cb) => {
  window.addEventListener(eventName, ({ detail: payload }) => {
    cb(payload);
  });
};

export const off = (eventName, cb) => {
  window.removeEventListener(eventName, cb);
};
