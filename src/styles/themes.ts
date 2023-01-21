import baseStyled, { ThemedStyledInterface } from 'styled-components';

const color = {
  white: '#ffffff',
  blue: '#4394F0',
  red: '#E85440',
};

const themes = {
  color,
};

export type Theme = typeof themes;
export const styled = baseStyled as ThemedStyledInterface<Theme>;
export default themes;
