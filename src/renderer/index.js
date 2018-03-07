import render from './render';

const ReactPhaser = { render };

export default ReactPhaser;
export {
  GRAPHICS as Graphics,
  CIRCLE as Circle,
  SPRITE as Sprite,
  TEXT as Text,
  TICKER as Ticker,
} from './instanceTypes';
export { default as createPhaserGame } from './createPhaserGame';
