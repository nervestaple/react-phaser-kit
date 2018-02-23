# React Phaser Kit

a (currently minimal) set of ReactDOM components used to render a Phaser 3 scene.

[check out the demo!!!](https://nervestaple.github.io/react-phaser-kit/dist/)

![Image of example code in browser](https://i.imgur.com/LR5BQgp.png)

see [`example/example.js`](example/example.js) for a showcase / usage experimentation.

extremely in flux, will break.

my original approach used a custom React Fiber renderer/reconciler (it was much harder than this!) but i didn't see any clear benefit over this ReactDOM component-only approach. maybe a benefit (perf?) will become clear as i try more complex games with this setup and i'll try switching back.
