import React from 'react';
import Phaser from 'phaser';

import PulsarThing from './PulsarThing';
import SpiralThing from './SpiralThing';

const { Input: { Keyboard: { KeyCodes } } } = Phaser;
const INCREMENT = 5;
const calcNewPosition = ({ position: { x, y }, keys }) => ({
  x: x + (keys[KeyCodes.A] ? -INCREMENT : 0) + (keys[KeyCodes.D] ? INCREMENT : 0),
  y: y + (keys[KeyCodes.W] ? -INCREMENT : 0) + (keys[KeyCodes.S] ? INCREMENT : 0),
});

class PhaserExampleComponent extends React.Component {
  constructor() {
    super();
    this.handleUpdate = ::this.handleUpdate;
    this.handleMouseMove = ::this.handleMouseMove;
  }

  state = { time: 0, position: { x: 200, y: 200 }, mousePosition: { x: 0, y: 0 } };

  handleUpdate({ time, keys }) {
    this.setState({ time });
    if (keys) {
      this.setState(({ position }) => ({
        position: calcNewPosition({ position, keys }),
      }));
    }
  }

  handleMouseMove({ position: { x, y } }) {
    this.setState({ mousePosition: { x, y } });
  }

  render() {
    const { time, position, mousePosition } = this.state;
    const roundedTime = Math.round(time / 1000);
    return (
      <React.Fragment>
        <updater
          onUpdate={this.handleUpdate}
          watchKeys={[KeyCodes.W, KeyCodes.A, KeyCodes.S, KeyCodes.D]}
        />
        <input onMouseMove={this.handleMouseMove} />
        <text
          x={25}
          y={25}
          style={{
            fontFamily: 'Helvetica',
            fontSize: 24,
            fill: '#ffffff',
          }}
        >
          {`Hello world ${roundedTime}`}
        </text>
        <PulsarThing x={position.x} y={position.y} time={time} />
        <SpiralThing
          x={mousePosition.x}
          y={mousePosition.y}
          time={time}
          spriteNum={20}
          circleNum={6}
        />
      </React.Fragment>
    );
  }
}

export default PhaserExampleComponent;
