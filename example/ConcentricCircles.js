import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

class ConcentricCircles extends React.PureComponent {
  static defaultProps = {
    num: 1,
  };

  static propTypes = {
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired,
    radius: PropTypes.number.isRequired,
    num: PropTypes.number,
  };

  static contextTypes = {
    scene: PropTypes.object,
    graphics: PropTypes.object,
  };

  render() {
    const {
      x,
      y,
      radius,
      num,
    } = this.props;

    _.range(num).forEach(n => (
      this.context.graphics.strokeCircle(x, y, n * radius)
    ));

    return null;
  }
}


export default ConcentricCircles;
