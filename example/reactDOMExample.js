import React from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';

import { Game } from '../src';
import PhaserExampleComponent from './PhaserExampleComponent';
import mushroom from './mushroom2.png';

const SceneContext = ({ children }, { scene }) => children({ scene });

SceneContext.contextTypes = { scene: PropTypes.object.isRequired }; // eslint-disable-line

const HybridDOMExample = () => (
  <Game assets={[mushroom]}>
    <SceneContext>
      {({ scene }) => <PhaserExampleComponent scene={scene} />}
    </SceneContext>
  </Game>
);

ReactDOM.render(<HybridDOMExample />, document.getElementById('container'));
