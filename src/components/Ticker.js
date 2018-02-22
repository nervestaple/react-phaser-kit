import React from 'react';
import PropTypes from 'prop-types';
import Phaser from 'phaser';
import _ from 'lodash';

const { Input: { Keyboard: { KeyCodes } } } = Phaser;

const keyCodesToWatch = [KeyCodes.W, KeyCodes.A, KeyCodes.S, KeyCodes.D];

class Ticker extends React.Component {
  static defaultProps = {
    children: null,
    onTick: null,
  };

  static propTypes = {
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    onTick: PropTypes.func,
  };

  static contextTypes = {
    scene: PropTypes.object,
  };

  constructor(props, context) {
    super(props, context);
    this.tick = ::this.tick;
    this.scene = context.scene;
    this.scene.ticker.on('tick', this.tick);
    this.keys = _(keyCodesToWatch)
      .keyBy()
      .mapValues(keyCode => this.scene.input.keyboard.addKey(keyCode))
      .value();
  }

  state = {};

  componentDidMount() {
  }

  componentDidUpdate() {
  }

  componentWillUnmount() {
    this.scene.ticker.removeListener('tick', this.tick);
  }

  getKeysDown() {
    return _.mapValues(this.keys, 'isDown');
  }

  tick({ time, delta }) {
    this.setState({ time, delta });
    if (this.props.onTick) {
      this.props.onTick({
        time,
        delta,
        keys: this.getKeysDown(),
      });
    }
  }

  // TODO: decide whether to use render-func or onTick prop. leaning towards onTick prop
  render() {
    const { time, delta } = this.state;
    return this.props.children({
      time,
      delta,
      keys: this.getKeysDown(),
    });
  }
}

export default Ticker;
