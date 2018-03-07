import _ from 'lodash';

class Instance {
  constructor(props, host) {
    this.scene = host;
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

  commitUpdate({ added, modified, removed }) {
    _.forEach({ added, modified, removed }, (diffValues, diffType) => (
      _.forEach(diffValues, (value, prop) => {
        const handler = _.get(this.handlers, [diffType, prop]);
        if (handler) {
          handler(value);
        } else if (this.phaserObject && (diffType === 'added' || diffType === 'modified')) {
          this.phaserObject[prop] = value;
        }
      })
    ));
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
      if (
        _.has(newProps, oldProp) &&
        oldProps[oldProp] !== newProps[oldProp] &&
        (oldProp !== 'children' || allowChildren)
      ) {
        diff.modified[oldProp] = newProps[oldProp];
      }
    });

    if (_.size(diff.added) > 0 || _.size(diff.modified) > 0 || diff.removed.length > 0) {
      return diff;
    }
    return null;
  }

  update() {}
}

export default Instance;
