import React from 'react';
import PropTypes from 'prop-types';

class Input extends React.Component {
  static defaultProps = {
    mouseMove: false,
    onMouseMove: null,
    onKeyDown: null,
    children: null,
  };

  static propTypes = {
    mouseMove: PropTypes.bool,
    onMouseMove: PropTypes.func,
    onKeyDown: PropTypes.func,
    children: PropTypes.func,
  };

  static contextTypes = {
    scene: PropTypes.object,
  };

  constructor(props, context) {
    super(props, context);
    this.setPosition = ::this.setPosition;
  }

  state = {
    mousePosition: {},
  };

  componentDidMount() {
    if (this.props.mouseMove || this.props.onMouseMove) {
      this.addPointerMoveHandler();
    }
    if (this.props.onKeyDown) {
      this.addKeyDownHandler(this.props.onKeyDown);
    }
  }

  componentWillReceiveProps(nextProps) {
    if (!this.props.mouseMove && nextProps.mouseMove) {
      this.addPointerMoveHandler();
    }
    if (this.props.mouseMove && !nextProps.mouseMove) {
      this.removePointerMoveHandler();
    }
    if (!this.props.onMouseMove && nextProps.onMouseMove) {
      this.addPointerMoveHandler();
    }
    if (this.props.onMouseMove && !nextProps.onMouseMove) {
      this.removePointerMoveHandler();
    }
    if (!this.props.onKeyDown && nextProps.onKeyDown) {
      this.addKeyDownHandler(nextProps.onKeyDown);
    }
    if (this.props.onKeyDown && !nextProps.onKeyDown) {
      this.removeKeyDownHandler(this.props.onKeyDown);
    }
  }

  componentWillUnmount() {
    this.removePointerMoveHandler();
  }

  setPosition(pointer) {
    if (this.props.onMouseMove) {
      this.props.onMouseMove(pointer);
    }
    if (this.props.children) {
      this.setState({ mousePosition: pointer.position });
    }
  }

  addPointerMoveHandler() {
    this.context.scene.input.on('pointermove', this.setPosition);
  }

  removePointerMoveHandler() {
    this.context.scene.input.removeListener('pointermove', this.setPosition);
  }

  addKeyDownHandler(onKeyDown) {
    this.context.scene.input.keyboard.on('keydown', onKeyDown);
  }

  removeKeyDownHandler(onKeyDown) {
    this.context.scene.input.keyboard.removeListener('keydown', onKeyDown);
  }

  render() {
    if (this.props.children) {
      return this.props.children(this.state);
    }
    return null;
  }
}

export default Input;
