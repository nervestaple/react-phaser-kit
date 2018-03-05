/* eslint-disable no-unused-vars */

import { Sprite, Text } from './nodes';
import { SPRITE, TEXT } from './instanceTypes';

const instanceTypeHandler = {
  [SPRITE]: Sprite,
  [TEXT]: Text,
};

function createInstance(type, props, rootContainerInstance, hostContext, internalInstanceHandle) {
  const InstanceClass = instanceTypeHandler[type];
  const TheInstance = new InstanceClass(props, rootContainerInstance);
  return TheInstance;
}

export default createInstance;
