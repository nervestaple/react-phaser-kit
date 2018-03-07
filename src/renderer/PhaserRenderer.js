/* eslint-disable no-unused-vars */

import ReactFiberReconciler from 'react-reconciler';
import now from 'performance-now';
import _ from 'lodash';

import { TEXT } from './instanceTypes';
import createInstance from './createInstance';

const reconcilerConfig = {
  getRootHostContext(rootContainerInstance) {
    return rootContainerInstance;
  },

  getChildHostContext(parentHostContext, type) {
    return parentHostContext;
  },

  getPublicInstance(instance) {
    return instance;
  },

  prepareForCommit() {

  },

  resetAfterCommit() {

  },

  createInstance,

  appendInitialChild(parentInstance, child) {
  },

  finalizeInitialChildren(instance, type, props, rootContainerInstance) {
    instance.finalizeInitialChildren(props);
  },

  prepareUpdate(instance, type, oldProps, newProps, rootContainerInstance, hostContext) {
    return instance.prepareUpdate(oldProps, newProps, { allowChildren: type === TEXT });
  },

  createTextInstance(text, rootContainerInstance, hostContext, internalInstanceHandle) {},

  shouldDeprioritizeSubtree(type, props) {
    // const isAlphaVisible = typeof props.alpha === "undefined" || props.alpha > 0;
    // const isRenderable = typeof props.renderable === "undefined" || props.renderable === true;
    // const isVisible = typeof props.visible === "undefined" || props.visible === true;
    //
    // return !(isAlphaVisible && isRenderable && isVisible);
  },

  now,

  useSyncScheduling: true,

  shouldSetTextContent() {
    return false;
  },

  mutation: {
    commitMount(domElement, type, newProps, internalInstanceHandle) {
      // Despite the naming that might imply otherwise, this method only
      // fires if there is an `Update` effect scheduled during mounting.
      // This happens if `finalizeInitialChildren` returns `true` (which it
      // does to implement the `autoFocus` attribute on the client). But
      // there are also other cases when this might happen (such as patching
      // up text content during hydration mismatch). So we'll check this again.
    },

    commitUpdate(instance, diff, type, oldProps, newProps, internalInstanceHandle) {
      instance.commitUpdate(diff);
    },

    // resetTextContent(domElement: Instance) {
    //   setTextContent(domElement, '');
    // },
    //
    // commitTextUpdate(textInstance, oldText, newText) {
    //   textInstance.nodeValue = newText;
    // },

    appendChild(parentInstance, child) {},

    appendChildToContainer(container, child) {},

    insertBefore(parentInstance, child, beforeChild) {},

    insertInContainerBefore(container, child, beforeChild) {},

    removeChild(parentInstance, child) {},

    removeChildFromContainer(container, child) {},
  },
  scheduleDeferredCallback() {},
  cancelDeferredCallback() {},
};

const fnLog = (fnName, ...rest) => console.log(fnName, ...rest); // eslint-disable-line

const injectLogging = (fn, fnName) => function newFn(...args) {
  const strippedFn = fn.toString().replace(`function ${fnName}(`, '');
  const indexOfParamEnd = strippedFn.indexOf(') ');
  const paramString = strippedFn.substr(0, indexOfParamEnd);
  if (paramString.length > 0) {
    const paramNames = paramString.split(',').map(s => s.trim());
    const argsObj = _.fromPairs(_.zip(paramNames, args));
    fnLog.call(this, fnName, argsObj);
  } else {
    fnLog.call(this, fnName);
  }

  return fn.apply(this, args);
};

const dontLog = ['now'];

const injectLoggingInObjectFunctions = objectWithFunctions => (
  _.mapValues(objectWithFunctions, (value, key) => {
    if (dontLog.includes(key)) {
      return value;
    }
    if (_.isFunction(value)) {
      return injectLogging(value, key);
    }
    if (_.isObject(value)) {
      return injectLoggingInObjectFunctions(value);
    }
    return value;
  })
);

// const loggedReconcilerConfig = injectLoggingInObjectFunctions(reconcilerConfig);
// const PhaserRenderer = ReactFiberReconciler(loggedReconcilerConfig);
const PhaserRenderer = ReactFiberReconciler(reconcilerConfig);

export default PhaserRenderer;
