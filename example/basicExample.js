import React from 'react';
import ReactDOM from 'react-dom';

import { Game } from '../src';
import Toy from './Toy';
import mushroom from './mushroom2.png';

class Example extends React.Component {
  constructor() {
    super();
    this.originalWidth = window.innerWidth;
    this.originalHeight = window.innerHeight;
  }

  render() {
    return (
      <Game
        assets={[mushroom]}
        width={this.originalWidth}
        height={this.originalHeight}
      >
        <Toy />
      </Game>
    );
  }
}

ReactDOM.render(
  <Example />,
  document.getElementById('container'),
);
