import React from 'react';
import PropTypes from 'prop-types';

class Sprite extends React.Component {
  static defaultProps = {
    x: 0,
    y: 0,
    scale: 1,
    onClick: null,
  };

  static propTypes = {
    x: PropTypes.number,
    y: PropTypes.number,
    scale: PropTypes.number,
    image: PropTypes.string.isRequired,
    onClick: PropTypes.func,
  };

  static contextTypes = {
    scene: PropTypes.object,
  };

  constructor(props, context) {
    super(props, context);
    this.sprite = context.scene.add.sprite(props.x, props.y, props.image);
  }

  componentDidMount() {
    if (this.props.onClick) {
      this.setOnClick(this.props.onClick);
    }
  }

  /*
    does this make sense? techically using componentWillReceiveProps()
    as a 'render' func here. could use shouldComponentUpdate() and render()
    to set updated props, but then couldn't optionally set single properties like we do here
  */
  componentWillReceiveProps(nextProps) {
    if (!this.props.onClick && nextProps.onClick) {
      this.setOnClick(nextProps.onClick);
    }
    if (this.props.x !== nextProps.x) {
      this.sprite.x = nextProps.x;
    }
    if (this.props.y !== nextProps.y) {
      this.sprite.y = nextProps.y;
    }
    if (this.props.scale !== nextProps.scale) {
      this.sprite.scale = { x: nextProps.scale, y: nextProps.scale };
    }
  }

  setOnClick(onClick) {
    this.sprite = this.sprite.setInteractive();
    this.sprite.on('pointerdown', onClick);
  }

  render() {
    return null;
  }
}

export default Sprite;
