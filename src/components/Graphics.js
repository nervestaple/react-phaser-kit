import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { getDiff, renderToPhaser } from '../renderUtils';

class Graphics extends React.Component {
  static defaultProps = {
    x: 0,
    y: 0,
    lineStyle: null,
    fillStyle: null,
    children: null,
  };

  static propTypes = {
    x: PropTypes.number,
    y: PropTypes.number,
    lineStyle: PropTypes.shape({
      width: PropTypes.number,
      color: PropTypes.number,
    }),
    fillStyle: PropTypes.shape({
      color: PropTypes.number,
    }),
    children: PropTypes.node,
  };

  static contextTypes = {
    scene: PropTypes.object,
  };

  static childContextTypes = {
    graphics: PropTypes.object,
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

    const { x, y, lineStyle, fillStyle } = props;

    this.graphics = context.scene.add.graphics();
    const defaultStyles = {
      ...(props.lineStyle ? { lineStyle: { ...lineStyle } } : {}),
      ...(props.fillStyle ? { fillStyle: { ...fillStyle } } : {}),
    };

    this.graphics.x = x;
    this.graphics.y = y;
    this.graphics.setDefaultStyles(defaultStyles);
  }

  state = { diff: {} };

  getChildContext() {
    return {
      graphics: this.graphics,
    };
  }

  setPhaserObject(prop, value) {
    this.graphics[prop] = value;
  }

  handlers = {
    added: {
      lineStyle: value => this.graphics.setDefaultStyles({ lineStyle: value }),
      fillStyle: value => this.graphics.setDefaultStyles({ fillStyle: value }),
    },
    modified: {
      lineStyle: value => this.graphics.setDefaultStyles({ lineStyle: value }),
      fillStyle: value => this.graphics.setDefaultStyles({ fillStyle: value }),
    },
    removed: {
      lineStyle: () => this.graphics.setDefaultStyles({
        lineStyle: { width: 1, color: 0xffffff, alpha: 1 },
      }),
      fillStyle: () => this.graphics.setDefaultStyles({
        fillStyle: { color: 0xffffff, alpha: 1 },
      }),
    },
  };

  render() {
    renderToPhaser({
      setPhaserObject: this.setPhaserObject,
      diff: this.state.diff,
      handlers: this.handlers,
    });

    this.graphics.clear();
    return this.props.children;
  }
}

export default Graphics;
