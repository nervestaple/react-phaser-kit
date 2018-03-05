import Instance from './Instance';
import { TEXT } from '../instanceTypes';

class Text extends Instance {
  constructor(props, host) {
    super(props, host);
    console.log('new Text()', { props, host, this: this });

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

  commitUpdate({ added, modified, removed }) {
    _.forEach(modified, (value, prop) => {
      if (prop === 'children') {
        this.text.setText(value);
      } else {
        this.text[prop] = value;
      }
    });
  }
}

export default Text;
