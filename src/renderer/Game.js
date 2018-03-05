import React from 'react';
import PropTypes from 'prop-types';
import Phaser from 'phaser';
import EventEmitter from 'events';

import PhaserRenderer from './PhaserRenderer';

const defaultGameConfig = {};

const createPhaserGame = ({
  width,
  height,
  files,
  parent,
}) => new Promise((resolve) => {
  const ticker = new EventEmitter();
  return new Phaser.Game({
    ...defaultGameConfig,
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
    width: window.innerWidth,
    height: window.innerHeight,
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

  getChildContext() {
    return { scene: this.scene };
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
      this.scene = scene;
      this.mountNode = PhaserRenderer.createContainer(this.scene);
      PhaserRenderer.updateContainer(this.props.children, this.mountNode, this);

      PhaserRenderer.injectIntoDevTools({
        findFiberByHostInstance: PhaserRenderer.findFiberByHostInstance,
        bundleType: 1,
        version: '0.0.2',
        rendererPackageName: 'react-phaser-kit',
      });
    });
  }

  componentDidUpdate() {
    PhaserRenderer.updateContainer(this.props.children, this.mountNode, this);
  }

  componentWillUnmount() {
    PhaserRenderer.updateContainer(null, this.mountNode, this);
  }

  render() {
    return <div ref={(ref) => { this.phaserContainerRef = ref; }} />;
  }
}

export default Game;
