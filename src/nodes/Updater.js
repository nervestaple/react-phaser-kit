import _ from 'lodash';

import Instance from './Instance';

class Updater extends Instance {
  static type = 'updater';

  constructor(props, host) {
    super(props, host);
    this.handleUpdate = ::this.handleUpdate;
    this.setOnUpdate = ::this.setOnUpdate;
    this.removeOnUpdate = ::this.removeOnUpdate;
    this.setWatchKeys = ::this.setWatchKeys;
    this.removeWatchKeys = ::this.removeWatchKeys;
    this.handlers = {
      added: {
        onUpdate: this.setOnUpdate,
        watchKeys: this.setWatchKeys,
      },
      modified: {
        onUpdate: this.setOnUpdate,
        watchKeys: this.setWatchKeys,
      },
      removed: {
        onUpdate: this.removeOnUpdate,
        watchKeys: this.removeWatchKeys,
      },
    };
  }

  getKeysDown() {
    return _.mapValues(this.currentWatchKeys, 'isDown');
  }

  handleUpdate({ time, delta }) {
    if (this.currentOnUpdate) {
      const updatePayload = {
        time,
        delta,
        ...(this.currentWatchKeys ? { keys: this.getKeysDown() } : {}),
      };
      this.currentOnUpdate(updatePayload);
    }
  }

  setOnUpdate(onUpdate) {
    this.removeOnUpdate();
    this.scene.updater.on('update', this.handleUpdate);
    this.currentOnUpdate = onUpdate;
  }

  removeOnUpdate() {
    if (this.currentOnUpdate) {
      this.scene.updater.off('update', this.currentOnUpdate);
      delete this.currentOnUpdate;
    }
  }

  setWatchKeys(watchKeys) {
    this.removeWatchKeys();
    this.currentWatchKeys = _(watchKeys)
      .keyBy()
      .mapValues(keyCode => this.scene.input.keyboard.addKey(keyCode))
      .value();
  }

  removeWatchKeys() {
    if (this.currentWatchKeys) {
      delete this.currentWatchKeys;
    }
  }

  isPropEqual(prop, oldPropValue, newPropValue) {
    if (prop === 'watchKeys') {
      return _.isEqual(oldPropValue, newPropValue);
    }
    return oldPropValue === newPropValue;
  }
}

export default Updater;
