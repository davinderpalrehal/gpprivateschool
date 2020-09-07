import React from 'react'
import { Container, Grid } from '@material-ui/core'

function IntroVideo (props) {
  return (
    <section className="gb__video">
      <Container>
        <Grid container alignContent='center' justify='center'>
          <iframe
            title="YouTube Video"
            width="90%"
            height="700"
            src={`https://www.youtube.com/embed/${props.video}`}
            frameBorder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        </Grid>
      </Container>
    </section>
  )
}

export default IntroVideo
