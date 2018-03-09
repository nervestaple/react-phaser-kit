import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { renderToPhaser, getDiff } from '../renderUtils';

class Sprite extends React.Component {
  static defaultProps = {
    x: 0,
    y: 0,
  };

  static propTypes = {
    x: PropTypes.number,
    y: PropTypes.number,
    image: PropTypes.string.isRequired,
  };

  static contextTypes = {
    scene: PropTypes.object,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const prevProps = _.get(prevState, 'props', {});
    return {
      diff: getDiff(prevProps, nextProps),
      props: nextProps,
    };
  }

  constructor(props, context) {
    super(props, context);
    this.setPhaserObject = ::this.setPhaserObject;
    this.setOnClick = ::this.setOnClick;
    this.removeOnClick = ::this.removeOnClick;

    this.sprite = context.scene.add.sprite(props.x, props.y, props.image);
  }

  state = { diff: {} };

  shouldComponentUpdate(nextProps, nextState) {
    const { diff: { added, modified, removed } } = nextState;
    if (_.isEmpty(added) && _.isEmpty(modified) && removed.length === 0) {
      return false;
    }
    return true;
  }

  setOnClick(onClick) {
    this.removeOnClick();
    this.sprite.setInteractive();
    this.sprite.on('pointerdown', onClick);
    this.currentOnClick = onClick;
  }

  setPhaserObject(prop, value) {
    this.sprite[prop] = value;
  }

  removeOnClick() {
    if (this.currentOnClick) {
      this.context.scene.input.clear(this.sprite);
      this.sprite.off('pointerdown', this.currentOnClick);
      delete this.currentOnClick;
    }
  }

  handlers = {
    added: {
      onClick: ::this.setOnClick,
      tint: value => this.sprite.setTint(value),
    },
    modified: {
      onClick: ::this.setOnClick,
      tint: value => this.sprite.setTint(value),
    },
    removed: {
      onClick: ::this.removeOnClick,
      tint: () => this.sprite.clearTint(),
    },
  };


  render() {
    renderToPhaser({
      setPhaserObject: this.setPhaserObject,
      diff: this.state.diff,
      handlers: this.handlers,
    });

    return null;
  }
}

export default Sprite;
