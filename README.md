# React Phaser Kit

a (raw, unfinished) custom React Fiber renderer for [Phaser 3](https://github.com/photonstorm/phaser/)

Open questions:
  - Is React performant enough for this to even make sense?
    - Initial experiments with 60FPS show `setState`/re-rendering can take under 1ms, so... maybe?
    - Complex games might be a no-go without optimization
  - I've been waffling between the custom Fiber renderer approach. and simply doing everything in ReactDOM components.
    - ReactDOM components is much less complex to implement, easier to read, and mostly does the same stuff (checking props and applying them to phaser objects ('rendering'), sometimes calling phaser functions)
    - Potential performance optimizations from a custom fiber renderer?
      - No ReactDOM dependency (unless you want a React UI overlay in DOM which seems like a main reason you'd want to do this anyway)


[check out the demo!!!](https://nervestaple.github.io/react-phaser-kit/dist/)

![Image of example code in browser](https://i.imgur.com/LR5BQgp.png)

i need better example code but here's part of [`example/PhaserExampleComponent.js`](example/PhaserExampleComponent.js) for now:
```jsx
<React.Fragment>
  <updater
    onUpdate={this.handleUpdate}
    watchKeys={[KeyCodes.W, KeyCodes.A, KeyCodes.S, KeyCodes.D]}
  />
  <text
    x={25}
    y={25}
    style={{
      fontFamily: 'Helvetica',
      fontSize: 24,
      fill: '#ffffff',
    }}
  >
    {`Hello world ${Math.round(this.state.time, 1000)}`}
  </text>
  <sprite
    x={this.state.x + (30 * Math.sin(this.state.time / 195))}
    y={this.state.y + (30 * Math.cos(this.state.time / 195))}
    image={mushroom}
    tint={color}
    onClick={this.setRandomColor}
  />
  <graphics lineStyle={{ width: 10, color }} x={this.state.x} y={this.state.y}>
    <circle radius={120 + (20 * Math.sin(this.state.time / 195))} />
  </graphics>
</React.Fragment>
```

see [`example/example.js`](example/example.js) for a showcase / usage experimentation.

extremely in flux, will break.

my original approach used a custom React Fiber renderer/reconciler (it was much harder than this!) but i didn't see any clear benefit over this ReactDOM component-only approach. maybe a benefit (perf?) will become clear as i try more complex games with this setup and i'll try switching back.
