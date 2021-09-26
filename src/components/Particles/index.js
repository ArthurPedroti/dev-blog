import React, { memo, useState, useEffect } from 'react'
import Particles from 'react-particles-js'

import * as S from './styles'

function handleQuantityOfParticles() {
  const windowGlobal = typeof window !== 'undefined' && window

  if (windowGlobal.innerWidth < 1500) {
    return 25
  }

  return 50
}

const ParticlesBg = () => {
  const [theme, setTheme] = useState(null)

  useEffect(() => {
    setTheme(window.__theme)
  }, [])
  return (
    <S.Wrapper>
      <Particles
        height="100vh"
        width="100vw"
        params={{
          particles: {
            number: {
              value: handleQuantityOfParticles(),
              density: {
                enable: false
              }
            },
            size: {
              value: 5,
              random: true
            },
            move: {
              direction: 'bottom',
              out_mode: 'out',
              speed: 2
            },
            line_linked: {
              enable: false
            },
            color: theme === 'dark' ? '#fff' : '#88C0D0'
          }
        }}
        style={{
          position: 'absolute'
        }}
      />
    </S.Wrapper>
  )
}

export default memo(ParticlesBg)
