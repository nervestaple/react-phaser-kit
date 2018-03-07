import Phaser from 'phaser';
import EventEmitter from 'events';

const createPhaserGame = ({
  width,
  height,
  files,
  parent,
}) => new Promise((resolve) => {
  const ticker = new EventEmitter();
  return new Phaser.Game({
    ...(width ? { width } : {}),
    ...(height ? { height } : {}),
    parent,
    scene: {
      files,
      create() {
        this.ticker = ticker;
        resolve(this);
      },
      update(time, delta) {
        ticker.emit('tick', { time, delta });
      },
    },
  });
});

export default createPhaserGame;
