import React from 'react';
import PropTypes from 'prop-types';

import { Sprite, Graphics, Circle } from '../src';
import mushroom from './mushroom2.png';

class PulsarThing extends React.Component {
  static defaultProps = {
    x: 0,
    y: 0,
  };

  static propTypes = {
    x: PropTypes.number,
    y: PropTypes.number,
    time: PropTypes.number.isRequired,
  };

  constructor() {
    super();
    this.randomizeColor = ::this.randomizeColor;
  }

  state = { color: 0xffff11 };

  randomizeColor() {
    this.setState({ color: Math.random() * 0xffffff });
  }

  render() {
    const { x, y, time } = this.props;
    return (
      <React.Fragment>
        <Sprite
          image={mushroom}
          tint={this.state.color}
          onClick={this.randomizeColor}
          x={x + (30 * Math.sin(time / 195))}
          y={y + (30 * Math.cos(time / 195))}
        />
        <Graphics
          lineStyle={{ width: 10, color: this.state.color }}
          x={x}
          y={y}
        >
          <Circle radius={120 + (20 * Math.sin(time / 195))} />
        </Graphics>
      </React.Fragment>
    );
  }
}

export default PulsarThing;
