import React from 'react';
import PropTypes from 'prop-types';
import Phaser from 'phaser';

class Circle extends React.PureComponent {
  static defaultProps = {
    x: 0,
    y: 0,
    radius: 1,
  };

  static propTypes = {
    x: PropTypes.number,
    y: PropTypes.number,
    radius: PropTypes.number,
  };

  static contextTypes = {
    scene: PropTypes.object,
    graphics: PropTypes.object,
  };

  constructor(props, context) {
    super(props, context);
    this.circle = new Phaser.Geom.Circle(props.x, props.y, props.radius);
    this.context.graphics.strokeCircleShape(this.circle);
  }

  render() {
    Object.assign(this.circle, this.props);
    this.context.graphics.strokeCircleShape(this.circle);
    return null;
  }
}

export default Circle;
