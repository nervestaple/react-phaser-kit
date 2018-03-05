import _ from 'lodash';

// const mapKeysToObject = (keys, accessedObject) => (
//   keys.reduce((acc, key) => ({ ...acc, [key]: accessedObject[key] }), {})
// );

class Instance {
  object() {}

  finalizeInitialChildren(props) {
    this.applyProps(props);
  }

  applyProps() {}

  commitUpdate() {}

  appendInitialChild() {}

  appendChild() {}

  removeChild() {}

  insertBefore() {}

  prepareUpdate(oldProps, newProps, { allowChildren }) {
    // console.log('Instance.prepareUpdate', { oldProps, newProps });

    // const oldPropKeys = _.keys(oldProps);
    // const newPropKeys = _.keys(newProps);
    //
    // const removed = _.difference(oldPropKeys, newPropKeys);
    //
    // const added = mapKeysToObject(_.difference(newPropKeys, oldPropKeys));
    //
    // const modified = mapKeysToObject(_.intersection(oldPropKeys, newPropKeys)
    //   .filter(key => key !== 'children'));
    //
    // const diff = { removed, added, modified };
    //
    // console.log('Instance.prepareUpdate DONE', diff);

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
}

export default Instance;
