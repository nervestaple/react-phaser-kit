import React from 'react';
import ReactDOM from 'react-dom';

import StressTest from './StressTest';

const GameExample = () => (
  <div
    style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
    }}
  >
    <StressTest />
  </div>
);

ReactDOM.render(
  <GameExample />,
  document.getElementById('container'),
);
