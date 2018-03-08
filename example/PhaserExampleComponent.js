import React from 'react';
import Phaser from 'phaser';
// import _ from 'lodash';

import mushroom from './mushroom2.png';

const { Input: { Keyboard: { KeyCodes } } } = Phaser;
const INCREMENT = 5;
const calcNewPosition = ({ position: { x, y }, keys }) => ({
  x: x + (keys[KeyCodes.A] ? -INCREMENT : 0) + (keys[KeyCodes.D] ? INCREMENT : 0),
  y: y + (keys[KeyCodes.W] ? -INCREMENT : 0) + (keys[KeyCodes.S] ? INCREMENT : 0),
});

class PhaserExampleComponent extends React.Component {
  state = { time: 0, color: 0xff00000, position: { x: 200, y: 200 } };

  setRandomColor = () => {
    this.setState({ color: Math.random() * 0xffffff });
  };

  handleUpdate = ({ time, keys }) => {
    this.setState({ time });
    if (keys) {
      this.setState(({ position }) => ({
        position: calcNewPosition({ position, keys }),
      }));
    }
  }

  render() {
    const { time, color, position: { x, y } } = this.state;
    const roundedTime = Math.round(time / 1000);
    return (
      <React.Fragment>
        <updater
          onUpdate={this.handleUpdate}
          watchKeys={[KeyCodes.W, KeyCodes.A, KeyCodes.S, KeyCodes.D]}
        />
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
        <sprite
          x={x + (30 * Math.sin(time / 195))}
          y={y + (30 * Math.cos(time / 195))}
          image={mushroom}
          tint={color}
          onClick={this.setRandomColor}
        />
        <graphics lineStyle={{ width: 10, color }} x={x} y={y}>
          <circle radius={120 + (20 * Math.sin(time / 195))} />
        </graphics>
      </React.Fragment>
    );
  }
}

export default PhaserExampleComponent;
