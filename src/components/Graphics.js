import React from 'react';
import PropTypes from 'prop-types';

class Graphics extends React.Component {
  static defaultProps = {
    lineStyle: null,
    fillStyle: null,
    children: null,
  };

  static propTypes = {
    lineStyle: PropTypes.shape({
      width: PropTypes.number,
      color: PropTypes.number,
    }),
    fillStyle: PropTypes.shape({
      color: PropTypes.number,
    }),
    children: PropTypes.node,
  };

  static contextTypes = {
    scene: PropTypes.object,
  };

  static childContextTypes = {
    graphics: PropTypes.object,
  };

  constructor(props, context) {
    super(props, context);
    this.graphics = context.scene.add.graphics();
    const defaultStyles = {
      ...(props.lineStyle ? { lineStyle: { ...props.lineStyle } } : {}),
      ...(props.fillStyle ? { fillStyle: { ...props.fillStyle } } : {}),
    };
    this.graphics.setDefaultStyles(defaultStyles);
  }

  getChildContext() {
    return {
      graphics: this.graphics,
    };
  }

  render() {
    this.graphics.clear();
    return this.props.children;
  }
}

export default Graphics;
