import React, { useEffect, useState } from 'react'
import { Container, Grid } from '@material-ui/core'
import firebase from '../firebase'
import './styles/IntroVideo.scss'

function IntroVideo () {
    const [video, setVideo] = useState('')

  useEffect(() => {
    const db = firebase.firestore()

    if (window.location.hostname === 'localhost') {
      db.settings({
        host: 'localhost:8080',
        ssl: false
      })
    }

    db.collection("dynamic-content")
      .where('type', '==', 'intro-video')
      .limit(1)
      .get()
      .then(function(querySnapshot) {
        querySnapshot.forEach(function(doc) {
          setVideo(doc.data().content.split('=')[1])
      });
    });
  })


  return (
    <section className="gb__video">
      <Container>
        <Grid container alignContent='center' justify='center'>
          <iframe
            title="YouTube Video"
            src={`https://www.youtube.com/embed/${video}`}
            frameBorder="0"
            allowFullScreen
          />
        </Grid>
      </Container>
    </section>
  )
}

export default IntroVideo
