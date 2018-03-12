/* eslint-disable no-param-reassign */

import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import mushroom from './mushroom2.png';

class OptimizedSpiralThing extends React.Component {
  static propTypes = {
    scene: PropTypes.object.isRequired, // eslint-disable-line
    x: PropTypes.number,
    y: PropTypes.number,
  };

  static defaultProps = {
    x: 0,
    y: 0,
  };

  constructor() {
    super();
    this.handleUpdate = ::this.handleUpdate;
  }

  componentDidMount() {
    this.sprites = _.range(20).map(() => this.props.scene.add.sprite(0, 0, mushroom));
  }

  shouldComponentUpdate() {
    return false;
  }

  handleUpdate({ time }) {
    this.sprites.forEach((sprite, n) => {
      sprite.x = this.props.x + (10 * n * Math.sin(((time / 1000)) + n));
      sprite.y = this.props.y + (10 * n * Math.cos(((time / 1000)) + n));
    });
  }

  render() {
    return <updater onUpdate={this.handleUpdate} />;
  }
}

export default OptimizedSpiralThing;
