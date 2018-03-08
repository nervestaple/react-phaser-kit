import Phaser from 'phaser';

import Instance from './Instance';

class Circle extends Instance {
  static type = 'circle';

  constructor(props, host) {
    super(props, host);
    this.phaserObject = new Phaser.Geom.Circle(
      props.x || 0,
      props.y || 0,
      props.radius || 100,
    );
    this.circle = this.phaserObject;
  }

  setGraphics(graphics) {
    this.graphics = graphics;
  }

  draw() {
    this.graphics.strokeCircleShape(this.circle);
  }
}

export default Circle;
