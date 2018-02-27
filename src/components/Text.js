import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

const shallowEquals = (a, b) => {
  const keysA = _.keys(a);
  const keysB = _.keys(b);
  console.log({ a, b, keysA, keysB, ' _.union(keysA, keysB)':  _.union(keysA, keysB), ' _.union(keysA, keysB).every(k => a[k] === b[k])':  _.union(keysA, keysB).every(k => { console.log({ k, a, b, 'a[k]': a[k], 'b[k]': b[k] }); return a[k] === b[k]; }) });
  if (keysA.length !== keysB.length) {
    return false;
  }
  return _.union(keysA, keysB).every(k => a[k] === b[k]);
};

/* TODO: IMPORTANT! style.fontSize converts str to number so it'll trigger
  Text.setStyle every time if u use str (perf hit) */
class Text extends React.PureComponent {
  static defaultProps = {
    x: 0,
    y: 0,
    textS: {
      fontFamily: 'Helvetica',
      fontSize: 48,
      fill: '#ffffff',
    },
    children: '',
  };

  static propTypes = {
    x: PropTypes.number,
    y: PropTypes.number,
    textS: PropTypes.shape({
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
      textS,
      children,
    } = props;
    this.text = context.scene.add.text(x, y, children, textS);
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.x !== nextProps.x) {
      this.text.x = nextProps.x;
    }
    if (this.props.y !== nextProps.y) {
      this.text.y = nextProps.y;
    }
    if (!shallowEquals(this.props.textS, nextProps.textS)) {
      console.log('setStyle');
      this.text.setStyle(nextProps.textS);
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
