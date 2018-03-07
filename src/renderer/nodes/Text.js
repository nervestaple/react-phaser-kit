import Instance from './Instance';
import { TEXT } from '../instanceTypes';

class Text extends Instance {
  constructor(props, host) {
    super(props, host);

    this.phaserObject = host.add.text(
      props.x || 0,
      props.y || 0,
      props.children,
    );

    this.handlers = {
      added: {
        children: value => this.phaserObject.setText(value),
        style: value => this.phaserObject.setStyle(value),
      },
      modified: {
        children: value => this.phaserObject.setText(value),
        style: value => this.phaserObject.setStyle(value),
      },
    };
  }

  type() {
    return TEXT;
  }
}

export default Text;
