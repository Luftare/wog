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
  orange: "#fa3",
  yellow: "#cc3",
  shadow: "1px 1px 4px rgba(0, 0, 0, 0.5)",
  smoke: "rgba(50, 50, 50, 0.7)",
  lightSmoke: "rgba(50, 50, 50, 0.3)",
  red: "#e44",
  lightBlue: "#9af",
  green: "#2e4",
  gutter: {
    m: "32px",
    l: "80px",
    xl: "240px"
  },
  rarityColor(rarity) {
    return ["#aaa", "#fff", "#2e4", "44f", "#c2c", "#fa3"][rarity];
  },
  levelDiffColor(diff) {
    if (diff <= -3) return "#aaa";
    if (diff <= -1) return "#2e4";
    if (diff <= 1) return "#ee5";
    return "#f44";
  }
};
