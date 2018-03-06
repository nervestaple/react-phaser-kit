import _ from 'lodash';

import Instance from './Instance';
import { TEXT } from '../instanceTypes';

class Text extends Instance {
  constructor(props, host) {
    super(props, host);

    this.text = host.add.text(
      props.x || 0,
      props.y || 0,
      props.children,
    );
  }

  object() {
    return this.text;
  }

  type() {
    return TEXT;
  }

  applyProps(props) {
    _.forEach(props, (value, prop) => {
      if (prop === 'children') {
        this.text.setText(value);
      } else if (prop === 'style') {
        this.text.setStyle(value);
      } else {
        this.text[prop] = value;
      }
    });
  }

  commitUpdate({ modified }) {
    this.applyProps(modified);
  }
}

export default Text;
