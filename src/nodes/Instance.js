import _ from 'lodash';

class Instance {
  constructor(props, host) {
    this.scene = host;
    this.applyProp = ::this.applyProp;
    this.removeProp = ::this.removeProp;
    this.tryHandleProp = ::this.tryHandleProp;
  }

  object() {
    return this.phaserObject || {};
  }

  type() {
    return this.type;
  }

  finalizeInitialChildren(props) {
    this.commitUpdate({ added: props });
  }

  tryHandleProp(diffType, prop, value) {
    const handler = _.get(this.handlers, [diffType, prop]);
    if (handler) {
      handler(value);
      return true;
    }
    return false;
  }

  applyProp(diffType, prop, value) {
    const didHandleProp = this.tryHandleProp(diffType, prop, value);
    if (!didHandleProp) {
      this.phaserObject[prop] = value;
    }
  }

  removeProp(prop) {
    this.tryHandleProp('removed', prop);
  }

  commitUpdate({ added, modified, removed }) {
    _.forEach({ added, modified }, (diffValues, diffType) => (
      _.forEach(diffValues, (value, prop) => this.applyProp(diffType, prop, value))
    ));
    _.forEach(removed, this.removeProp);
    this.update();
  }

  appendInitialChild() {}

  appendChild() {}

  removeChild() {}

  insertBefore() {}

  prepareUpdate(oldProps, newProps, { allowChildren }) {
    const diff = {
      removed: [],
      added: {},
      modified: {},
    };

    Object.keys(oldProps).forEach((oldProp) => {
      if (!_.has(newProps, oldProp)) {
        diff.removed.push(oldProp);
      }
    });

    Object.keys(newProps).forEach((newProp) => {
      if (!_.has(oldProps, newProp)) {
        diff.added[newProp] = newProps[newProp];
      }
    });

    Object.keys(oldProps).forEach((oldProp) => {
      const propStillExists = _.has(newProps, oldProp);
      const propsAreEqual = this.checkPropEqual(oldProp, oldProps[oldProp], newProps[oldProp]);
      const propIsNotChildren = oldProp !== 'children' || allowChildren;

      if (propStillExists && !propsAreEqual && propIsNotChildren) {
        diff.modified[oldProp] = newProps[oldProp];
      }
    });

    if (_.size(diff.added) > 0 || _.size(diff.modified) > 0 || diff.removed.length > 0) {
      return diff;
    }
    return null;
  }

  checkPropEqual(prop, oldPropValue, newPropValue) {
    return oldPropValue === newPropValue;
  }

  update() {}
}

export default Instance;
