import React from 'react'

import { easing, useTweenTime } from 'react-tween-time'

const App = () => {
  const [t] = useTweenTime({
    startAt: 2000,
    mode: 'autostart',
    duration: 2000,
    easingFn: easing.elastic
  })
  const [t2, anim] = useTweenTime({
    startAt: 1000,
    mode: 'manualstart',
    duration: 4000,
    easingFn: easing.inOutCubic,
    onEnd: () => {
      anim.start()
    }
  })
  return (
    <>
      <div
        style={{
          transform: ` translateX(${t * 100}px) rotateZ(${t2 * 360}deg)`,
          width: '100px',
          height: '100px',
          background: 'blue',
          color: 'white'
        }}
      >
        Hello World 1 {t.toFixed(2)}
      </div>
      <div
        style={{
          transform: `translateY(${t2 * 100}px) rotateZ(${t2 * 2}deg)`
        }}
      >
        Hello World2
        <button
          onClick={() => {
            console.log('start')
            anim.start()
          }}
        >
          Start
        </button>
        <button
          onClick={() => {
            anim.pause()
          }}
        >
          Pause
        </button>
        <button
          onClick={() => {
            anim.resume()
          }}
        >
          Resume
        </button>
        {t2.toFixed(2)}
      </div>
    </>
  )
}

export default App
