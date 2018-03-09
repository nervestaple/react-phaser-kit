import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

const calcFps = ({ oldFps, delta, samples }) =>
  (oldFps * (1 - (1 / samples))) + ((1000 / delta) / samples);

class FPSCounter extends React.Component {
  static defaultProps = { samples: 60 };
  static propTypes = { samples: PropTypes.number };

  constructor() {
    super();
    this.setFps = _.throttle(::this.setFps, 250);
  }

  state = { fps: 60 };

  setFps({ delta }) {
    this.setState(({ fps }) => ({
      fps: calcFps({ oldFps: fps, delta, samples: this.props.samples }),
    }));
  }

  render() {
    const roundedFps = Math.round(this.state.fps * 100) / 100;
    return (
      <React.Fragment>
        <updater onUpdate={this.setFps} />
        <text
          x={25}
          y={25}
          style={{
            fontFamily: 'Helvetica',
            fontSize: 24,
            fill: '#ffffff',
          }}
        >
          {`FPS: ${roundedFps}`}
        </text>
      </React.Fragment>
    );
  }
}

export default FPSCounter;
