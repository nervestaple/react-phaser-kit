import React from 'react';

import ReactPhaser from '../src';
import PhaserExampleComponent from './PhaserExampleComponent';
import mushroom from './mushroom2.png';

const assets = [mushroom];
const files = assets.map(url => ({ type: 'image', key: url, url }));

ReactPhaser.createPhaserGame({ files, parent: document.getElementById('container') })
  .then((scene) => {
    ReactPhaser.render(<PhaserExampleComponent scene={scene} />, scene);
  });
