# React Phaser Kit

a (currently minimal) set of ReactDOM components used to render a Phaser 3 scene.

[check out the demo!!!](https://nervestaple.github.io/react-phaser-kit/dist/)

![Image of example code in browser](https://i.imgur.com/LR5BQgp.png)

i need better example code but here's part of [`example/example.js`](example/example.js) for now:
```jsx
<Game assets={[mushroom]}>
  <Ticker
    onTick={({ delta, keys }) => this.setState(({ characterPosition }) => ({
      characterPosition: calcNewPosition({ position: characterPosition, keys }),
    }))}
  >
    {({ time }) => (
      <Input mouseMove>
        {({ mousePosition: { x, y } }) => (
          <React.Fragment>
            <Graphics lineStyle={{ width: 19, color: 0x11ff33 }}>
              {_.range(1, 6).map(n => (
                <Circle
                  key={n}
                  x={x}
                  y={y}
                  radius={n * (50 + (10 * Math.sin((time / 100))))}
                />
              ))}
            </Graphics>
            {_.range(1, 20).map(n => (
              <Sprite
                key={n}
                image={mushroom}
                x={x + (10 * n * Math.sin(((time / 195)) + n))}
                y={y + (10 * n * Math.cos(((time / 200)) + n))}
              />
            ))}
            <Sprite
              image={mushroom}
              onClick={console.log}
              x={this.state.characterPosition.x}
              y={this.state.characterPosition.y}
            />
            <Text style={{ fontSize: 18 }}>
              {`Use WASD to move lone shroom. FPS: ${this.state.fps}`}
            </Text>
          </React.Fragment>
        )}
      </Input>
    )}
  </Ticker>
</Game>
```

see [`example/example.js`](example/example.js) for a showcase / usage experimentation.

extremely in flux, will break.

my original approach used a custom React Fiber renderer/reconciler (it was much harder than this!) but i didn't see any clear benefit over this ReactDOM component-only approach. maybe a benefit (perf?) will become clear as i try more complex games with this setup and i'll try switching back.
