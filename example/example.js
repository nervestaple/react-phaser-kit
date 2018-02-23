import React from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import Phaser from 'phaser';

import { Game, Sprite, Ticker, Input, Graphics, Circle, Text } from '../src';
import mushroom from './mushroom2.png';

const originalWidth = window.innerWidth;
const originalHeight = window.innerHeight;

const INCREMENT = 5;

const { Input: { Keyboard: { KeyCodes } } } = Phaser;

const calcNewPosition = ({ position: { x, y }, keys }) => ({
  x: x + (keys[KeyCodes.A] ? -INCREMENT : 0) + (keys[KeyCodes.D] ? INCREMENT : 0),
  y: y + (keys[KeyCodes.W] ? -INCREMENT : 0) + (keys[KeyCodes.S] ? INCREMENT : 0),
});

const SAMPLES = 120;
const calcFps = ({ oldFps, delta }) => (oldFps * (1 - (1 / SAMPLES))) + ((1000 / delta) / SAMPLES);

class GameExample extends React.Component {
  state = {
    characterPosition: { x: 100, y: 100 },
    fps: 60,
  };

  render() {
    return (
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      >
        <Game assets={[mushroom]} width={originalWidth} height={originalHeight}>
          <Ticker
            onTick={({ delta, keys }) => this.setState(({ fps, characterPosition }) => ({
              fps: calcFps({ oldFps: fps, delta }),
              characterPosition: calcNewPosition({ position: characterPosition, keys }),
            }))}
          >
            {({ time }) => (
              <Input mouseMove>
                {({ mousePosition: { x, y } }) => (
                  <React.Fragment>
                    <Graphics lineStyle={{ width: 19, color: 0x11ff33 }}>
                      {_.range(1, 6).map(n => (
                        <Circle
                          key={n}
                          x={x}
                          y={y}
                          radius={n * (50 + (10 * Math.sin((time / 100))))}
                        />
                      ))}
                    </Graphics>
                    {_.range(1, 20).map(n => (
                      <Sprite
                        key={n}
                        image={mushroom}
                        x={x + (10 * n * Math.sin(((time / 195)) + n))}
                        y={y + (10 * n * Math.cos(((time / 200)) + n))}
                      />
                    ))}
                    <Sprite
                      image={mushroom}
                      onClick={console.log}
                      x={this.state.characterPosition.x}
                      y={this.state.characterPosition.y}
                    />
                    <Text style={{ fontSize: 18 }}>
                      {`Use arrow keys to move lone shroom. FPS: ${this.state.fps}`}
                    </Text>
                  </React.Fragment>
                )}
              </Input>
            )}
          </Ticker>
        </Game>
        <div
          style={{
            color: 'white',
            position: 'fixed',
            bottom: 16,
            left: 16,
          }}
        >
          <span style={{ margin: 8 }}>
            <a href="https://github.com/nervestaple/react-phaser-kit">
              Back to react-phaser-kit repo
            </a>
          </span>
          <span style={{ margin: 8 }}>DOM elements for UI!</span>
          <button onClick={() => this.setState({ characterPosition: { x: 100, y: 100 } })}>
            Reset Shroom
          </button>
        </div>
      </div>
    );
  }
}

ReactDOM.render(
  <GameExample />,
  document.getElementById('container'),
);
