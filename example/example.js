import React from 'react';

import ReactPhaser from '../src/renderer';
import mushroom from './mushroom2.png';

class Example extends React.Component {
  state = { time: 0, color: 0xff00000 };

  setRandomColor = () => {
    this.setState({ color: Math.random() * 0xffffff });
  };

  handleTick = ({ time }) => {
    this.setState({ time });
  };

  render() {
    const { time, color } = this.state;
    return [
      <ticker onTick={this.handleTick} />,
      <text
        x={25}
        y={25}
        style={{
          fontFamily: 'Helvetica',
          fontSize: 36,
          fill: '#ffffff',
        }}
      >
        {`Hello world ${time}`}
      </text>,
      <sprite
        x={200 + (20 * Math.sin(time / 195))}
        y={200 + (20 * Math.cos(time / 195))}
        image={mushroom}
        tint={color}
        onClick={this.setRandomColor}
      />,
      <graphics lineStyle={{ width: 10, color }} x={200} y={200}>
        <circle radius={100 + (20 * Math.sin(time / 195))} />
      </graphics>,
    ];
  }
}

const assets = [mushroom];
const files = assets.map(url => ({ type: 'image', key: url, url }));
ReactPhaser.createPhaserGame({
  files,
  parent: document.getElementById('container'),
}).then((scene) => {
  ReactPhaser.render(
    <Example />,
    scene,
  );
});
