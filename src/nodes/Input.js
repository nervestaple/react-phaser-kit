import Instance from './Instance';

class Input extends Instance {
  static type = 'input';

  constructor(props, host) {
    super(props, host);
    this.setOnMouseMove = ::this.setOnMouseMove;
    this.removeOnMouseMove = ::this.removeOnMouseMove;
    this.handlers = {
      added: {
        onMouseMove: this.setOnMouseMove,
      },
      modified: {
        onMouseMove: this.onMouseMove,
      },
      removed: {
        onMouseMove: this.removeOnMouseMove,
      },
    };
  }

  setOnMouseMove(onMouseMove) {
    this.removeOnMouseMove();
    this.scene.input.on('pointermove', onMouseMove);
    this.currentOnMouseMove = onMouseMove;
  }

  removeOnMouseMove() {
    if (this.currentOnMouseMove) {
      this.scene.ticker.off('tick', this.currentOnMouseMove);
      delete this.currentOnMouseMove;
    }
  }
}

export default Input;
