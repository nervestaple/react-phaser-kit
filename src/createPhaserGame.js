import Phaser from 'phaser';
import EventEmitter from 'events';

const createPhaserGame = ({ width, height, files, parent }) => new Promise((resolve) => {
  const updater = new EventEmitter();
  return new Phaser.Game({
    ...(width ? { width } : {}),
    ...(height ? { height } : {}),
    parent,
    scene: {
      files,
      create() {
        this.updater = updater;
        resolve(this);
      },
      update(time, delta) {
        updater.emit('update', { time, delta });
      },
    },
  });
});

export default createPhaserGame;
