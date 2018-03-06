import React from 'react';
import Phaser from 'phaser';
import EventEmitter from 'events';
import PropTypes from 'prop-types';

import ReactPhaser, { Text, Sprite } from '../src/renderer';
import mushroom from './mushroom2.png';

const createPhaserGame = ({
  width,
  height,
  files,
  parent,
}) => new Promise((resolve) => {
  const ticker = new EventEmitter();
  return new Phaser.Game({
    ...(width ? { width } : {}),
    ...(height ? { height } : {}),
    parent,
    scene: {
      files,
      create() {
        this.ticker = ticker;
        resolve(this);
      },
      update(time, delta) {
        ticker.emit('tick', { time, delta });
      },
    },
  });
});

class Example extends React.Component {
  static propTypes = { ticker: PropTypes.instanceOf(EventEmitter).isRequired };
  constructor(props) {
    super(props);
    this.tick = ::this.tick;
    this.setRandomTint = ::this.setRandomTint;
    props.ticker.on('tick', this.tick);
  }

  state = { x: 100, y: 100, d: 0 };

  setRandomTint() {
    this.setState({ tint: Math.random() * 0xffffff });
  }

  tick({ time }) {
    this.setState({
      x: 100 + (10 * Math.sin(((time / 195)))),
      y: 100 + (10 * Math.cos(((time / 195)))),
    });
  }

  render() {
    return [
      <Text
        x={this.state.d + this.state.x + 100}
        y={this.state.y + 100}
      >
        {`Hello world ${this.state.x}`}
      </Text>,
      <Sprite
        x={this.state.d + this.state.x}
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
    <Example ticker={scene.ticker} />,
    scene,
  );
});
