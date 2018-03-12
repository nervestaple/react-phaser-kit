import React from 'react';
import PropTypes from 'prop-types';
import Phaser from 'phaser';
import _ from 'lodash';

import PulsarThing from './PulsarThing';
import OptimizedSpiralThing from './OptimizedSpiralThing';
import SpiralThing from './SpiralThing';
import FPSCounter from './FPSCounter';

const { Input: { Keyboard: { KeyCodes } } } = Phaser;
const INCREMENT = 5;
const calcNewPosition = ({ position: { x, y }, keys }) => ({
  x: x + (keys[KeyCodes.A] ? -INCREMENT : 0) + (keys[KeyCodes.D] ? INCREMENT : 0),
  y: y + (keys[KeyCodes.W] ? -INCREMENT : 0) + (keys[KeyCodes.S] ? INCREMENT : 0),
});

class PhaserExampleComponent extends React.Component {
  static propTypes = { scene: PropTypes.shape(Phaser.Scene).isRequired };

  constructor() {
    super();
    this.handleUpdate = ::this.handleUpdate;
    this.handleMouseMove = _.throttle(::this.handleMouseMove, 16);
  }

  state = {
    time: 0,
    position: { x: 200, y: 200 },
    mousePosition: { x: 0, y: 0 },
  };

  shouldComponentUpdate(nextProps, nextState) {
    return nextState.time >= this.state.time + 16;
  }

  handleMouseMove({ position: { x, y } }) {
    this.setState({ mousePosition: { x, y } });
  }

  handleUpdate({ time, delta, keys }) {
    this.setState(({ position }) => ({
      time,
      delta,
      ...(keys ? { position: calcNewPosition({ position, keys }) } : {}),
    }));
  }

  render() {
    const { time, delta, position, mousePosition } = this.state;
    return (
      <React.Fragment>
        <updater
          onUpdate={this.handleUpdate}
          watchKeys={[KeyCodes.W, KeyCodes.A, KeyCodes.S, KeyCodes.D]}
        />
        <input onMouseMove={this.handleMouseMove} />
        <FPSCounter />
        <PulsarThing x={position.x} y={position.y} time={time} />
        <SpiralThing
          x={mousePosition.x}
          y={mousePosition.y}
          time={time}
          delta={delta}
          spriteNum={20}
          circleNum={6}
        />
        {/* <OptimizedSpiralThing
          x={mousePosition.x}
          y={mousePosition.y}
          scene={this.props.scene}
        /> */}
      </React.Fragment>
    );
  }
}

export default PhaserExampleComponent;
