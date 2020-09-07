import React from 'react'
import { Container } from '@material-ui/core'

function IntroBlurb (props) {
  return (
    <section className='gb__intro-blurb'>
      <Container>
        <h3 className='gb__intro-blurb__title'>{props.blurb.title}</h3>
        <p className='gb__intro-blurb__para'>{props.blurb.para}</p>
      </Container>
    </section>
  )
}

export default IntroBlurb
