import Instance from './Instance';

class Text extends Instance {
  static type = 'text';

  constructor(props, host) {
    super(props, host);
    this.phaserObject = host.add.text(
      props.x || 0,
      props.y || 0,
      props.children,
    );
    this.text = this.phaserObject;
    this.handlers = {
      added: {
        children: value => this.text.setText(value),
        style: value => this.text.setStyle(value),
      },
      modified: {
        children: value => this.text.setText(value),
        style: value => this.text.setStyle(value),
      },
    };
  }
}

export default Text;
