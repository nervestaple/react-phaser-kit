/* eslint-disable no-unused-vars */

import { Sprite, Text, Ticker } from './nodes';
import { SPRITE, TEXT, TICKER } from './instanceTypes';

const instanceTypeHandler = {
  [SPRITE]: Sprite,
  [TEXT]: Text,
  [TICKER]: Ticker,
};

function createInstance(type, props, rootContainerInstance, hostContext, internalInstanceHandle) {
  const InstanceClass = instanceTypeHandler[type];
  const TheInstance = new InstanceClass(props, rootContainerInstance);
  return TheInstance;
}

export default createInstance;
