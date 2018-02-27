import React from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';

import { Sprite, Graphics, Circle } from '../src';
import ConcentricCircles from './ConcentricCircles';
import mushroom from './mushroom2.png';

const SpiralThing = ({ x, y, time }) => (
  <React.Fragment>
    <Graphics lineStyle={{ width: 19, color: 0x11ff33 }}>
      <ConcentricCircles x={x} y={y} radius={50 + (10 * Math.sin((time / 100)))} num={5} />
    </Graphics>
    <Graphics lineStyle={{ width: 8, color: 0xffff33 }}>
      <Circle
        x={x}
        y={y}
        radius={300 + (10 * Math.sin((time / 100)))}
      />
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

SpiralThing.defaultProps = {
  x: 0,
  y: 0,
  time: 0,
};

SpiralThing.propTypes = {
  x: PropTypes.number,
  y: PropTypes.number,
  time: PropTypes.number,
};

export default SpiralThing;
