import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import mushroom from './mushroom2.png';

const SpiralThing = ({
  x, y, time, spriteNum, circleNum,
}) => (
  <React.Fragment>
    <graphics lineStyle={{ width: 19, color: 0x11ff33 }}>
      {_.range(1, circleNum).map(n => (
        <circle
          key={n}
          x={x}
          y={y}
          radius={n * (50 + (10 * Math.sin((time / 500))))}
        />
      ))}
    </graphics>
    {_.range(1, spriteNum).map(n => (
      <sprite
        key={n}
        image={mushroom}
        x={x + (10 * n * Math.sin(((time / 1000)) + n))}
        y={y + (10 * n * Math.cos(((time / 1000)) + n))}
      />
    ))}
  </React.Fragment>
);

SpiralThing.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  time: PropTypes.number,
  spriteNum: PropTypes.number,
  circleNum: PropTypes.number,
};

SpiralThing.defaultProps = {
  x: 0,
  y: 0,
  time: 0,
  spriteNum: 20,
  circleNum: 6,
};

export default SpiralThing;
