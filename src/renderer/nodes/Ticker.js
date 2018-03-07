import Instance from './Instance';
import { TICKER } from '../instanceTypes';

class Ticker extends Instance {
  constructor(props, host) {
    super(props, host);

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

    this.commitUpdate({ added: props });
  }

  setOnTick = (onTick) => {
    this.removeOnTick();
    this.scene.ticker.on('tick', onTick);
    this.currentOnTick = onTick;
  };

  removeOnTick = () => {
    if (this.currentOnTick) {
      this.scene.ticker.off('tick', this.currentOnTick);
      delete this.currentOnTick;
    }
  }

  type() {
    return TICKER;
  }
}

export default Ticker;
