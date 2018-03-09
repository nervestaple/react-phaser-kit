import _ from 'lodash';

const getDiff = (prevProps, nextProps) => {
  const oldKeys = _.keys(prevProps);
  const newKeys = _.keys(nextProps);

  const addedKeys = _.difference(newKeys, oldKeys);
  const added = _(nextProps)
    .pick(addedKeys)
    .pickBy()
    .value();

  const sharedKeys = _.intersection(newKeys, oldKeys);
  const modified = _(nextProps)
    .pick(sharedKeys)
    .pickBy((newValue, prop) => !_.isEqual(prevProps[prop], newValue))
    .value();

  const removed = _.difference(oldKeys, newKeys);

  return { added, modified, removed };
};

const tryHandleProp = ({ diffType, prop, value, handlers }) => {
  const handler = _.get(handlers, [diffType, prop]);
  if (handler) {
    handler(value);
    return true;
  }
  return false;
};

const removeProp = ({ prop, handlers }) => {
  tryHandleProp({ diffType: 'removed', prop, handlers });
};

const applyProp = ({
  setPhaserObject,
  diffType,
  prop,
  value,
  handlers,
}) => {
  const didHandleProp = tryHandleProp({ diffType, prop, value, handlers });
  if (!didHandleProp && prop !== 'children') {
    setPhaserObject(prop, value);
  }
};

const renderToPhaser = ({ setPhaserObject, diff, handlers }) => {
  const { added, modified, removed } = diff;

  _.forEach({ added, modified }, (diffValues, diffType) => (
    _.forEach(diffValues, (value, prop) => applyProp({
      setPhaserObject,
      diffType,
      prop,
      value,
      handlers,
    }))
  ));

  _.forEach(removed, prop => removeProp({
    prop,
    handlers,
  }));
};

const tryRemovePx = pxValue => (
  _.endsWith(pxValue, 'px') ?
    parseInt(pxValue.substr(0, pxValue.length - 2), 10) :
    pxValue
);

const fixPxProps = props => _.mapValues(props, (value, prop) => {
  if (prop === 'style') {
    return _.mapValues(value, tryRemovePx);
  }
  return value;
});

export { renderToPhaser, getDiff, fixPxProps };
