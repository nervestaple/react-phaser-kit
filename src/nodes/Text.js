import _ from 'lodash';

import Instance from './Instance';

const dePxify = pxValue => (
  _.endsWith(pxValue, 'px') ? parseInt(pxValue.substr(0, pxValue.length - 2), 10) : pxValue
);

const isStyleValueEqual = (a, b) => dePxify(a) === dePxify(b);

class Text extends Instance {
  static type = 'text';

  constructor(props, host) {
    super(props, host);
    this.phaserObject = host.add.text(
      props.x || 0,
      props.y || 0,
      props.children,
    );
    this.text = this.phaserObject;
    this.handlers = {
      added: {
        children: value => this.text.setText(value),
        style: value => this.text.setStyle(value),
      },
      modified: {
        children: value => this.text.setText(value),
        style: value => this.text.setStyle(value),
      },
    };
  }

  checkPropEqual(prop, oldPropValue, newPropValue) {
    if (prop === 'style') {
      return _.every(
        oldPropValue,
        (oldValue, key) => isStyleValueEqual(oldValue, newPropValue[key]),
      );
    }
    return oldPropValue === newPropValue;
  }
}

export default Text;
