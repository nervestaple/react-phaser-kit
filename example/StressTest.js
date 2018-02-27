import React from 'react';
import Phaser from 'phaser';

import { Game, Ticker, Input, Text, Sprite } from '../src';
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

    this.resetCharacterPosition = ::this.resetCharacterPosition;
  }

  state = {
    characterPosition: { x: 100, y: 100 },
    fps: 60,
    time: 0,
  };

  resetCharacterPosition() {
    this.setState({ characterPosition: { x: 100, y: 100 } });
  }

  render() {
    return (
      <div>
        <Game
          assets={[mushroom]}
          width={this.originalWidth}
          height={this.originalHeight}
        >
          <Text textStyle={{ fontSize: 18 }}>
            {`Use WASD to move lone shroom.  FPS: ${this.state.fps}`}
          </Text>
          <Ticker
            onTick={({ time, delta, keys }) => this.setState(({ fps, characterPosition }) => ({
              time,
              fps: calcFps({ oldFps: fps, delta }),
              characterPosition: calcNewPosition({ position: characterPosition, keys }),
            }))}
          />
          <Input mouseMove>
            {({ mousePosition: { x, y } }) => (
              <SpiralThing x={x} y={y} time={this.state.time} />
            )}
          </Input>
          <Sprite
            image={mushroom}
            onClick={console.log}
            x={this.state.characterPosition.x}
            y={this.state.characterPosition.y}
          />
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
