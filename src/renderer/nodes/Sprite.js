import Instance from './Instance';
import { SPRITE } from '../instanceTypes';

class Sprite extends Instance {
  constructor(props, host) {
    super(props, host);

    this.phaserObject = host.add.sprite(
      props.x || 0,
      props.y || 0,
      props.image,
    );

    this.handlers = {
      added: {
        onClick: this.setOnClick,
        tint: value => this.phaserObject.setTint(value),
      },
      modified: {
        onClick: this.setOnClick,
        tint: value => this.phaserObject.setTint(value),
      },
      removed: {
        onClick: this.removeOnClick,
        tint: () => this.phaserObject.clearTint(),
      },
    };

    this.commitUpdate({ added: props });
  }

  type() {
    return SPRITE;
  }

  setOnClick = (onClick) => {
    this.phaserObject = this.phaserObject.setInteractive();
    this.phaserObject.on('pointerdown', onClick);
    this.currentOnClick = onClick;
  }

  removeOnClick = () => {
    if (this.currentOnClick) {
      this.phaserObject.off('pointerdown', this.currentOnClick);
      delete this.currentOnClick;
    }
  }
}

export default Sprite;
