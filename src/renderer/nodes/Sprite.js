import _ from 'lodash';

import Instance from './Instance';
import { SPRITE } from '../instanceTypes';

class Sprite extends Instance {
  constructor(props, host) {
    super(props, host);

    this.sprite = host.add.sprite(
      props.x || 0,
      props.y || 0,
      props.image,
    );
    this.commitUpdate({ added: props });
  }

  object() {
    return this.sprite;
  }

  type() {
    return SPRITE;
  }

  setOnClick(onClick) {
    this.sprite = this.sprite.setInteractive();
    this.sprite.on('pointerdown', onClick);
    this.currentOnClick = onClick;
  }

  removeOnClick() {
    this.sprite.off('pointerdown', this.currentOnClick);
    delete this.currentOnClick;
  }

  commitUpdate({ added, modified, removed }) {
    _.forEach(added, (value, prop) => {
      if (prop === 'onClick') {
        this.setOnClick(added.onClick);
      } else if (prop === 'tint') {
        this.sprite.setTint(value);
      }
    });

    _.forEach(modified, (value, prop) => {
      if (prop === 'tint') {
        this.sprite.setTint(value);
      } else {
        this.sprite[prop] = value;
      }
    });

    _.forEach(removed, (prop) => {
      if (prop === 'onClick') {
        this.removeOnClick();
      } else if (prop === 'tint') {
        this.sprite.clearTint();
      }
    });
  }
}

export default Sprite;
