import React from 'react';
import PropTypes from 'prop-types';

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

  constructor(props, context) {
    super(props, context);
    const {
      x,
      y,
      style,
      children,
    } = props;
    this.text = context.scene.add.text(x, y, children, style);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.x !== nextProps.x) {
      this.text.x = nextProps.x;
    }
    if (this.props.y !== nextProps.y) {
      this.text.y = nextProps.y;
    }
    if (this.props.style !== nextProps.style) {
      this.text.setStyle(nextProps.style);
    }
    if (this.props.children !== nextProps.children) {
      this.text.setText(nextProps.children);
    }
  }

  render() {
    return null;
  }
}

export default Text;
