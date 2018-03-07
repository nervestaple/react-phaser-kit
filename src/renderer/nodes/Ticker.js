import Instance from './Instance';

class Ticker extends Instance {
  static type = 'ticker';

  constructor(props, host) {
    super(props, host);
    this.setOnTick = ::this.setOnTick;
    this.removeOnTick = ::this.removeOnTick;
    this.handlers = {
      added: {
        onTick: this.setOnTick,
      },
      modified: {
        onTick: this.setOnTick,
      },
      removed: {
        onTick: this.removeOnTick,
      },
    };
  }

  setOnTick(onTick) {
    this.removeOnTick();
    this.scene.ticker.on('tick', onTick);
    this.currentOnTick = onTick;
  }

  removeOnTick() {
    if (this.currentOnTick) {
      this.scene.ticker.off('tick', this.currentOnTick);
      delete this.currentOnTick;
    }
  }
}

export default Ticker;
