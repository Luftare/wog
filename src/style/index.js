import { css } from "styled-components";

export const sizes = {
  desktop: 1090,
  tablet: 600
};

export const media = Object.keys(sizes).reduce((accumulator, label) => {
  const emSize = sizes[label] / 16;
  accumulator[label] = (...args) => css`
    @media (min-width: ${emSize}em) {
      ${css(...args)};
    }
  `;
  return accumulator;
}, {});

export const theme = {
  primary: "#2e9",
  secondary: "#8bf",
  white: "#fff",
  black: "#222",
  grey: "#777",
  shadow: "1px 1px 4px rgba(0, 0, 0, 0.5)",
  smoke: "rgba(50, 50, 50, 0.7)",
  red: "#e44",
  gutter: {
    m: "32px",
    l: "80px",
    xl: "240px"
  },
  rarityColor(rarity) {
    return ["#aaa", "#fff", "#2e4", "44f", "#c2c", "#fa3"][rarity];
  }
};
