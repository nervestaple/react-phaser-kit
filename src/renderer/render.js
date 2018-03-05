import PhaserRenderer from './PhaserRenderer';

/* eslint-disable */
const render = (element, scene, callback) => {
  console.log('render', { element, scene, callback});
  let container = scene._reactRootContainer;
  if (!container) {
    container = PhaserRenderer.createContainer(scene);
    scene._reactRootContainer = container;
  }
  PhaserRenderer.updateContainer(element, container, undefined, callback);
  console.log(PhaserRenderer.findFiberByHostInstance);
  PhaserRenderer.injectIntoDevTools({
    findFiberByHostInstance: x => console.log(x),
    bundleType: 1,
    version: "0.0.2",
    rendererPackageName: "react-phaser-kit",
  });
};
/* eslint-enable */

export default render;
