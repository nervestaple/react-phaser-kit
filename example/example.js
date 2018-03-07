import React from 'react';

import ReactPhaser, { createPhaserGame, Text, Sprite, Ticker } from '../src/renderer';
import mushroom from './mushroom2.png';

class Example extends React.Component {
  state = { x: 100, y: 100, tint: 0xff00000 };

  setRandomTint = () => {
    this.setState({ tint: Math.random() * 0xffffff });
  }

  handleTick = ({ time }) => {
    this.setState({
      x: 100 + (10 * Math.sin(((time / 195)))),
      y: 100 + (10 * Math.cos(((time / 195)))),
    });
  }

  render() {
    return [
      <Ticker onTick={this.handleTick} />,
      <Text
        x={this.state.x + 100}
        y={this.state.y + 100}
        style={{
          fontFamily: 'Helvetica',
          fontSize: 48,
          fill: '#ffffff',
        }}
      >
        {`Hello world ${this.state.x}`}
      </Text>,
      <Sprite
        x={this.state.x}
        y={this.state.y}
        image={mushroom}
        tint={this.state.tint}
        onClick={this.setRandomTint}
      />,
    ];
  }
}


const assets = [mushroom];
const files = assets.map(url => ({ type: 'image', key: url, url }));
createPhaserGame({
  files,
  parent: document.getElementById('container'),
}).then((scene) => {
  ReactPhaser.render(
    <Example />,
    scene,
  );
});
