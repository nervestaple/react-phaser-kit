import React from 'react';
import PropTypes from 'prop-types';
import Phaser from 'phaser';
import EventEmitter from 'events';

const gameConfig = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const createPhaserGame = ({
  width,
  height,
  files,
  parent,
}) => new Promise((resolve) => {
  const ticker = new EventEmitter();
  return new Phaser.Game({
    ...gameConfig,
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

class Game extends React.Component {
  static defaultProps = {
    width: 800,
    height: 600,
    assets: [],
    children: null,
  };

  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    assets: PropTypes.arrayOf(PropTypes.string),
    children: PropTypes.node,
  };

  static childContextTypes = {
    scene: PropTypes.object,
  };

  state = {};

  getChildContext() {
    return {
      scene: this.state.scene,
    };
  }

  componentDidMount() {
    const {
      width,
      height,
      assets,
    } = this.props;

    const files = assets.map(url => ({ type: 'image', key: url, url }));
    createPhaserGame({
      width,
      height,
      files,
      parent: this.phaserContainerRef,
    }).then((scene) => {
      this.setState({ scene });
    });
  }

  render() {
    return (
      <div>
        <div ref={(ref) => { this.phaserContainerRef = ref; }} />
        <div>{this.state.scene ? this.props.children : null}</div>
      </div>
    );
  }
}

export default Game;
