const keysDown = {};
let keyDownHandlers = [];

window.addEventListener("keydown", e => {
  const key = e.key.toUpperCase();
  if (!keysDown[key]) {
    keysDown[key] = true;
    keyDownHandlers
      .filter(handler => handler.key === key)
      .forEach(handler => handler.cb(e));
  }
});

window.addEventListener("keyup", e => {
  const key = e.key.toUpperCase();
  keysDown[key] = false;
});

export const emit = (eventName, payload) => {
  const e = new CustomEvent(eventName, { detail: payload });
  window.dispatchEvent(e);
};

export const on = (eventName, cb) => {
  window.addEventListener(eventName, ({ detail: payload }) => {
    cb(payload);
  });
};

on.key = (key, cb) => {
  keyDownHandlers.push({
    key: key.toUpperCase(),
    cb
  });
};

export const off = (eventName, cb) => {
  window.removeEventListener(eventName, cb);
};

off.key = (key, cb) => {
  const normalizedKey = key.toUpperCase();
  keyDownHandlers = keyDownHandlers.filter(
    handler => handler.key !== normalizedKey && handler.cb !== cb
  );
};
