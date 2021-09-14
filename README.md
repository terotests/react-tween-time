# react-tween-time

> Bare Necessities for React Animations

[![NPM](https://img.shields.io/npm/v/react-tween-time.svg)](https://www.npmjs.com/package/react-tween-time) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-tween-time
```

## Usage

```tsx
import React from 'react'
import { easing, useTweenTime } from 'react-tween-time'

const Example = () => {
  // after 1000 milliseconds t scales from 0 to 1 in two seconds
  const [t] = useTweenTime({
    startAt: 1000,
    mode: 'autostart',
    duration: 2000,
    easingFn: easing.inOutQuint
  })
  return (
    <div
      style={{
        transform: `translateX(${t * 100}px)`
      }}
    >
      Moving...
    </div>
  )
}
```

Manual control

```tsx
const [t, anim] = useTweenTime({
  startAt: 1000,
  mode: 'manualstart', // does not start automatically
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

Animation end event

```tsx
const [t, anim] = useTweenTime({
  onEnd: () => {
    /* animation has ended */
  }
})
```

## License

MIT © [terotests](https://github.com/terotests)
