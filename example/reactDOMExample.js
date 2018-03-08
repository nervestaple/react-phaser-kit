import React from 'react';
import ReactDOM from 'react-dom';

import { Game } from '../src';
import PhaserExampleComponent from './PhaserExampleComponent';
import mushroom from './mushroom2.png';

const HybridDOMExample = () => (
  <Game assets={[mushroom]}>
    <PhaserExampleComponent />
  </Game>
);

ReactDOM.render(<HybridDOMExample />, document.getElementById('container'));
