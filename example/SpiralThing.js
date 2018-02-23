import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { Sprite, Graphics, Circle } from '../src';
import mushroom from './mushroom2.png';

const SpiralThing = ({ x, y, time }) => (
  <React.Fragment>
    <Graphics lineStyle={{ width: 19, color: 0x11ff33 }}>
      {_.range(1, 6).map(n => (
        <Circle
          key={n}
          x={x}
          y={y}
          radius={n * (50 + (10 * Math.sin((time / 100))))}
        />
      ))}
    </Graphics>
    {_.range(1, 20).map(n => (
      <Sprite
        key={n}
        image={mushroom}
        x={x + (10 * n * Math.sin(((time / 195)) + n))}
        y={y + (10 * n * Math.cos(((time / 200)) + n))}
      />
    ))}
  </React.Fragment>
);

SpiralThing.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  time: PropTypes.number.isRequired,
};

export default SpiralThing;
