import Instance from './Instance';
import { SPRITE } from '../instanceTypes';

class Sprite extends Instance {
  constructor(props, host) {
    super(props, host);
    console.log('new Sprite()', { props, host, this: this });

    this.sprite = host.add.sprite(
      props.x || 0,
      props.y || 0,
      props.image,
    );
  }

  object() {
    return this.sprite;
  }

  type() {
    return SPRITE;
  }

  update(props, diff) {
    super.update(props, diff);

    this.sprite.x = props.x || 0;
    this.sprite.y = props.y || 0;

    if (props.width) {
      this.sprite.width = props.width;
    }

    if (props.height) {
      this.sprite.height = props.height;
    }
  }

  commitUpdate({ added, modified, removed }) {
    _.forEach(modified, (value, prop) => {
      this.sprite[prop] = value;
    });
  }
}

export default Sprite;
