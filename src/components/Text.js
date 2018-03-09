import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { getDiff, renderToPhaser, fixPxProps } from '../renderUtils';


class Text extends React.Component {
  static defaultProps = {
    x: 0,
    y: 0,
    style: {
      fontFamily: 'Helvetica',
      fontSize: 48,
      fill: '#ffffff',
    },
    children: '',
  };

  static propTypes = {
    x: PropTypes.number,
    y: PropTypes.number,
    style: PropTypes.shape({
      fontFamily: PropTypes.string,
      fontSize: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
      fill: PropTypes.string,
    }),
    children: PropTypes.string,
  };

  static contextTypes = {
    scene: PropTypes.object,
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    const fixedPrevProps = fixPxProps(_.get(prevState, 'props', {}));
    return {
      diff: getDiff(fixedPrevProps, nextProps),
      props: nextProps,
    };
  }

  constructor(props, context) {
    super(props, context);
    this.setPhaserObject = ::this.setPhaserObject;

    const { x, y, style, children } = props;
    this.text = context.scene.add.text(x, y, children, style);
  }

  state = { diff: {} };

  shouldComponentUpdate(nextProps, nextState) {
    const { diff: { added, modified, removed } } = nextState;
    if (_.isEmpty(added) && _.isEmpty(modified) && removed.length === 0) {
      return false;
    }
    return true;
  }

  setPhaserObject(prop, value) {
    this.text[prop] = value;
  }

  handlers = {
    added: {
      children: value => this.text.setText(value),
      style: value => this.text.setStyle(value),
    },
    modified: {
      children: value => this.text.setText(value),
      style: value => this.text.setStyle(value),
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

export default Text;
