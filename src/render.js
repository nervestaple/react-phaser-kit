import PhaserRenderer from './PhaserRenderer';

/* eslint-disable */
const render = (element, scene, callback) => {
  let container = scene._reactRootContainer;
  if (!container) {
    container = PhaserRenderer.createContainer(scene);
    scene._reactRootContainer = container;
  }
  PhaserRenderer.updateContainer(element, container, undefined, callback);
  PhaserRenderer.injectIntoDevTools({
    findFiberByHostInstance: PhaserRenderer.findFiberByHostInstance,
    bundleType: 1,
    version: "0.0.2",
    rendererPackageName: "react-phaser-kit",
  });
};
/* eslint-enable */

export default render;
