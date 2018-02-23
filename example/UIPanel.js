import React from 'react';
import PropTypes from 'prop-types';

const UIPanel = ({ children }) => (
  <div
    style={{
      color: 'white',
      position: 'fixed',
      bottom: 16,
      left: 16,
    }}
  >
    <span style={{ margin: 8 }}>
      <a
        style={{ color: 'pink' }}
        href="https://github.com/nervestaple/react-phaser-kit"
      >
        Back to react-phaser-kit repo
      </a>
    </span>
    <span style={{ margin: 8 }}>DOM elements for UI!</span>
    {children}
  </div>
);

UIPanel.defaultProps = { children: null };
UIPanel.propTypes = { children: PropTypes.node };

export default UIPanel;
