import Instance from './Instance';

class Sprite extends Instance {
  static type = 'sprite';

  constructor(props, host) {
    super(props, host);
    this.phaserObject = host.add.sprite(
      props.x || 0,
      props.y || 0,
      props.image,
    );
    this.sprite = this.phaserObject;
    this.setOnClick = ::this.setOnClick;
    this.removeOnClick = ::this.removeOnClick;
    this.handlers = {
      added: {
        onClick: this.setOnClick,
        tint: value => this.sprite.setTint(value),
      },
      modified: {
        onClick: this.setOnClick,
        tint: value => this.sprite.setTint(value),
      },
      removed: {
        onClick: this.removeOnClick,
        tint: () => this.sprite.clearTint(),
      },
    };
  }

  setOnClick(onClick) {
    this.removeOnClick();
    this.sprite.setInteractive();
    this.sprite.on('pointerdown', onClick);
    this.currentOnClick = onClick;
  }

  removeOnClick() {
    if (this.currentOnClick) {
      this.sprite.off('pointerdown', this.currentOnClick);
      delete this.currentOnClick;
    }
  }
}

export default Sprite;
