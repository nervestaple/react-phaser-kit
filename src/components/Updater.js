import React from 'react';
import PropTypes from 'prop-types';
import Phaser from 'phaser';
import _ from 'lodash';

const { Input: { Keyboard: { KeyCodes } } } = Phaser;

const keyCodesToWatch = [KeyCodes.W, KeyCodes.A, KeyCodes.S, KeyCodes.D];

class Updater extends React.Component {
  static defaultProps = {
    children: null,
    onUpdate: null,
  };

  static propTypes = {
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
    onUpdate: PropTypes.func,
  };

  static contextTypes = {
    scene: PropTypes.object,
  };

  constructor(props, context) {
    super(props, context);
    this.handleUpdate = ::this.handleUpdate;

    this.context.scene.updater.on('update', this.handleUpdate);
    this.keys = _(keyCodesToWatch)
      .keyBy()
      .mapValues(keyCode => this.context.scene.input.keyboard.addKey(keyCode))
      .value();
  }

  state = {};

  componentDidMount() {
  }

  componentDidUpdate() {
  }

  componentWillUnmount() {
    this.context.scene.ticker.removeListener('update', this.handleUpdate);
  }

  getKeysDown() {
    return _.mapValues(this.keys, 'isDown');
  }

  handleUpdate({ time, delta }) {
    if (this.props.children) {
      this.setState({ time, delta });
    }
    if (this.props.onUpdate) {
      this.props.onUpdate({
        time,
        delta,
        keys: this.getKeysDown(),
      });
    }
  }

  // TODO: decide whether to use render-func or onTick prop. leaning towards onTick prop
  render() {
    const { time, delta } = this.state;
    if (this.props.children) {
      return this.props.children({
        time,
        delta,
        keys: this.getKeysDown(),
      });
    }
    return null;
  }
}

export default Updater;
