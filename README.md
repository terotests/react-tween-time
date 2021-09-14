# react-tween-time

> Bare Necessities for React Animations

[![NPM](https://img.shields.io/npm/v/react-tween-time.svg)](https://www.npmjs.com/package/react-tween-time) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-tween-time
```

## Usage

```tsx
// after 2000 milliseconds t scales from 0 to 1
const [t] = useTweenTime({
  startAt: 1000,
  mode: 'autostart',
  duration: 2000,
  easingFn: easing.inOutQuint
})
```

Manual control

```tsx
// after 2000 milliseconds t scales from 0 to 1
const [t, anim] = useTweenTime({
  startAt: 1000,
  mode: 'manualstart',
  duration: 2000,
  easingFn: easing.inOutQuint
})

// start animation
anim.start()
// pause animation
anim.pause()
// continue paused animation
anim.resume()
```

## License

MIT © [terotests](https://github.com/terotests)
