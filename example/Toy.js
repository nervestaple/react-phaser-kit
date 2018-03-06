import React from 'react';
import PropTypes from 'prop-types';

import { Text, Sprite } from '../src';
import mushroom from './mushroom2.png';

class Toy extends React.Component {
  static contextTypes = {
    scene: PropTypes.object,
  };

  constructor() {
    super();
    this.tick = ::this.tick;
  }

  state = { x: 100, y: 100 };
  componentDidMount() {
    this.context.scene.ticker.on('tick', this.tick);
  }
  tick({ time }) {
    this.setState({
      x: 100 + (10 * Math.sin(((time / 195)))),
      y: 100 + (10 * Math.cos(((time / 195)))),
    });
  }

  render() {
    return [
      <Text x={this.state.x + 100} y={this.state.y + 100}>{`Hello world ${this.state.x}`}</Text>,
      <Sprite x={this.state.x} y={this.state.y} image={mushroom} />,
    ];
  }
}

export default Toy;
