import React from 'react';
import Phaser from 'phaser';
import _ from 'lodash';

import { Game, Updater, Input, Text } from '../src';
import PulsarThing from './PulsarThing';
import SpiralThing from './SpiralThing';
import UIPanel from './UIPanel';
import mushroom from './mushroom2.png';

const INCREMENT = 5;
const FPS_SAMPLES = 120;

const { Input: { Keyboard: { KeyCodes } } } = Phaser;

const calcNewPosition = ({ position: { x, y }, keys }) => ({
  x: x + (keys[KeyCodes.A] ? -INCREMENT : 0) + (keys[KeyCodes.D] ? INCREMENT : 0),
  y: y + (keys[KeyCodes.W] ? -INCREMENT : 0) + (keys[KeyCodes.S] ? INCREMENT : 0),
});

const calcFps = ({ oldFps, delta }) =>
  (oldFps * (1 - (1 / FPS_SAMPLES))) + ((1000 / delta) / FPS_SAMPLES);


class StressTest extends React.Component {
  constructor() {
    super();
    this.originalWidth = window.innerWidth;
    this.originalHeight = window.innerHeight;

    this.handleUpdate = ::this.handleUpdate;
    this.resetCharacterPosition = ::this.resetCharacterPosition;
  }

  state = {
    characterPosition: { x: 100, y: 100 },
    fps: 60,
    time: 0,
  };

  setFps = _.throttle((delta) => {
    this.setState(({ fps }) => ({ fps: calcFps({ oldFps: fps, delta }) }));
  }, 250);

  handleUpdate({ time, delta, keys }) {
    this.setState(({ characterPosition }) => ({
      time,
      characterPosition: calcNewPosition({ position: characterPosition, keys }),
    }));

    this.setFps(delta);
  }

  resetCharacterPosition() {
    this.setState({ characterPosition: { x: 100, y: 100 } });
  }

  render() {
    const { characterPosition, time, fps } = this.state;
    const roundedFps = Math.round(fps * 100) / 100;
    return (
      <div>
        <Game
          assets={[mushroom]}
          width={this.originalWidth}
          height={this.originalHeight}
        >
          <Updater onUpdate={this.handleUpdate} />
          <Text style={{ fontSize: 18 }}>
            {`Use WASD to move lone shroom. FPS: ${roundedFps}`}
          </Text>

          <PulsarThing
            x={characterPosition.x}
            y={characterPosition.y}
            time={time}
          />

          <Input mouseMove>
            {({ mousePosition: { x, y } }) => (
              <SpiralThing x={x} y={y} time={this.state.time} />
            )}
          </Input>

        </Game>
        <UIPanel>
          <button onClick={this.resetCharacterPosition}>
            Reset Shroom
          </button>
        </UIPanel>
      </div>
    );
  }
}

export default StressTest;
