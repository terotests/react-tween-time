import * as React from 'react'

export type TweenArguments = {
  mode: 'autostart' | 'manualstart'
  startAt?: number
  duration?: number
  easingFn?: TEasing
  onEnd?: () => void
}

export interface TweenControl {
  start: () => void
  pause: () => void
  resume: () => void
}

const animData: { listeners: Array<() => void> } = {
  listeners: []
}
const animFrame = () => {
  animData.listeners.forEach((cb) => cb())
  requestAnimationFrame(animFrame)
}
const addListener = (cb: () => void) => {
  animData.listeners.push(cb)
}
const removeListener = (cb: () => void) => {
  animData.listeners = animData.listeners.filter((c) => c !== cb)
}
requestAnimationFrame(animFrame)

export const useTweenTime = (args: TweenArguments): [number, TweenControl] => {
  const startAt = args.startAt || 0
  const duration = args.duration || 1000
  const easingFn = args.easingFn || easing.linear
  const [t0, setT0] = React.useState(() => Date.now())
  const [tPause, setTPause] = React.useState(0)
  const [internalTime, setInternalTime] = React.useState(0)
  const [value, setValue] = React.useState(easingFn(0))
  const [animationOn, setAnimationOn] = React.useState(
    args.mode === 'autostart'
  )

  React.useEffect(() => {
    const callback = () => {
      if (animationOn) {
        if (internalTime >= 1) {
          setAnimationOn(false)
          setInternalTime(1)
          setValue(easingFn(1))
          if (args.onEnd) args.onEnd()
        } else {
          if (internalTime >= 0) {
            setValue(easingFn(internalTime))
          }
        }
        const t = Date.now() - t0 - startAt
        setInternalTime(t / duration)
      } else {
        if (internalTime === 0 && args.mode === 'autostart') {
          setAnimationOn(true)
          setInternalTime(0)
          setT0(Date.now())
        }
      }
    }
    if (animationOn) {
      addListener(callback)
    }
    return () => {
      removeListener(callback)
    }
  }, [animationOn, internalTime])

  return [
    value,
    {
      start: () => {
        setT0(Date.now())
        setInternalTime(0)
        setAnimationOn(true)
        setValue(easingFn(0))
      },
      pause: () => {
        setAnimationOn(false)
        setTPause(Date.now() - t0)
      },
      resume: () => {
        setT0(Date.now() - tPause)
        setAnimationOn(true)
      }
    }
  ]
}

export type TEasing = (time: number) => number

export interface IEasingMap {
  linear: TEasing
  quadratic: TEasing
  cubic: TEasing
  elastic: TEasing
  inQuad: TEasing
  outQuad: TEasing
  inOutQuad: TEasing
  inCubic: TEasing
  outCubic: TEasing
  inOutCubic: TEasing
  inQuart: TEasing
  outQuart: TEasing
  inOutQuart: TEasing
  inQuint: TEasing
  outQuint: TEasing
  inOutQuint: TEasing
  inSine: TEasing
  outSine: TEasing
  inOutSine: TEasing
  inExpo: TEasing
  outExpo: TEasing
  inOutExpo: TEasing
  inCirc: TEasing
  outCirc: TEasing
  inOutCirc: TEasing
}

export const easing: IEasingMap = {
  // No easing, no acceleration
  linear: (t) => t,

  // Accelerates fast, then slows quickly towards end.
  quadratic: (t) => t * (-(t * t) * t + 4 * t * t - 6 * t + 4),

  // Overshoots over 1 and then returns to 1 towards end.
  cubic: (t) => t * (4 * t * t - 9 * t + 6),

  // Overshoots over 1 multiple times - wiggles around 1.
  elastic: (t) =>
    t * (33 * t * t * t * t - 106 * t * t * t + 126 * t * t - 67 * t + 15),

  // Accelerating from zero velocity
  inQuad: (t) => t * t,

  // Decelerating to zero velocity
  outQuad: (t) => t * (2 - t),

  // Acceleration until halfway, then deceleration
  inOutQuad: (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),

  // Accelerating from zero velocity
  inCubic: (t) => t * t * t,

  // Decelerating to zero velocity
  outCubic: (t) => --t * t * t + 1,

  // Acceleration until halfway, then deceleration
  inOutCubic: (t) =>
    t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1,

  // Accelerating from zero velocity
  inQuart: (t) => t * t * t * t,

  // Decelerating to zero velocity
  outQuart: (t) => 1 - --t * t * t * t,

  // Acceleration until halfway, then deceleration
  inOutQuart: (t) => (t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t),

  // Accelerating from zero velocity
  inQuint: (t) => t * t * t * t * t,

  // Decelerating to zero velocity
  outQuint: (t) => 1 + --t * t * t * t * t,

  // Acceleration until halfway, then deceleration
  inOutQuint: (t) =>
    t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t,

  // Accelerating from zero velocity
  inSine: (t) => -Math.cos(t * (Math.PI / 2)) + 1,

  // Decelerating to zero velocity
  outSine: (t) => Math.sin(t * (Math.PI / 2)),

  // Accelerating until halfway, then decelerating
  inOutSine: (t) => -(Math.cos(Math.PI * t) - 1) / 2,

  // Exponential accelerating from zero velocity
  inExpo: (t) => Math.pow(2, 10 * (t - 1)),

  // Exponential decelerating to zero velocity
  outExpo: (t) => -Math.pow(2, -10 * t) + 1,

  // Exponential accelerating until halfway, then decelerating
  inOutExpo: (t) => {
    t /= 0.5
    if (t < 1) return Math.pow(2, 10 * (t - 1)) / 2
    t--
    return (-Math.pow(2, -10 * t) + 2) / 2
  },

  // Circular accelerating from zero velocity
  inCirc: (t) => -Math.sqrt(1 - t * t) + 1,

  // Circular decelerating to zero velocity Moves VERY fast at the beginning and
  // then quickly slows down in the middle. This tween can actually be used
  // in continuous transitions where target value changes all the time,
  // because of the very quick start, it hides the jitter between target value changes.
  outCirc: (t) => Math.sqrt(1 - (t = t - 1) * t),

  // Circular acceleration until halfway, then deceleration
  inOutCirc: (t) => {
    t /= 0.5
    if (t < 1) return -(Math.sqrt(1 - t * t) - 1) / 2
    t -= 2
    return (Math.sqrt(1 - t * t) + 1) / 2
  }
}
