/* eslint-disable no-unused-vars */
import assert from 'assert';
import _ from 'lodash';

import * as nodes from './nodes';

assert(_.every(nodes, nodeClass => _.has(nodeClass, 'type')));

const instanceTypeHandler = _.keyBy(nodes, 'type');

const notAllowedTags = ['div'];
function createInstance(type, props, rootContainerInstance, hostContext, internalInstanceHandle) {
  if (notAllowedTags.includes(type)) {
    return null;
  }
  const InstanceClass = instanceTypeHandler[type];
  const TheInstance = new InstanceClass(props, rootContainerInstance);
  return TheInstance;
}

export default createInstance;
