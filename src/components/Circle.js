import React from 'react';
import PropTypes from 'prop-types';
import Phaser from 'phaser';

class Circle extends React.Component {
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
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.x !== nextProps.x) {
      this.circle.x = nextProps.x;
    }
    if (this.props.y !== nextProps.y) {
      this.circle.y = nextProps.y;
    }
    if (this.props.radius !== nextProps.radius) {
      this.circle.radius = nextProps.radius;
    }
  }

  render() {
    this.context.graphics.strokeCircleShape(this.circle);
    return null;
  }
}

export default Circle;
