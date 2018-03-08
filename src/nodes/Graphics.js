import Instance from './Instance';

class Graphics extends Instance {
  static type = 'graphics';

  constructor(props, host) {
    super(props, host);
    this.phaserObject = host.add.graphics();
    this.graphics = this.phaserObject;
    this.handlers = {
      added: {
        lineStyle: value => this.graphics.setDefaultStyles({ lineStyle: value }),
        fillStyle: value => this.graphics.setDefaultStyles({ fillStyle: value }),
      },
      modified: {
        lineStyle: value => this.graphics.setDefaultStyles({ lineStyle: value }),
        fillStyle: value => this.graphics.setDefaultStyles({ fillStyle: value }),
      },
      removed: {
        lineStyle: () => this.graphics.setDefaultStyles({
          lineStyle: { width: 1, color: 0xffffff, alpha: 1 },
        }),
        fillStyle: () => this.graphics.setDefaultStyles({
          fillStyle: { color: 0xffffff, alpha: 1 },
        }),
      },
    };
  }

  children = [];

  appendInitialChild(child) {
    if (child) {
      child.setGraphics(this.graphics);
      this.children.push(child);
    }
  }

  appendChild(child) {
    if (child) {
      child.setGraphics(this.graphics);
      this.children.push(child);
      this.draw();
    }
  }

  insertBefore(child, beforeChild) {
    if (child) {
      child.setGraphics(this.graphics);
      const index = this.children.findIndex(c => c === beforeChild);

      if (index >= 0) {
        this.children.splice(index, 0, child);
      } else {
        this.children.push(child);
      }

      this.draw();
    }
  }

  removeChild(oldChild) {
    if (oldChild) {
      this.children = this.children.filter(child => child !== oldChild);
    }
  }

  update() {
    this.draw();
  }

  draw() {
    this.graphics.clear();
    this.children.forEach((child) => {
      child.draw();
    });
  }
}
export default Graphics;
