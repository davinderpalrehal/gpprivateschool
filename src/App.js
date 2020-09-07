import React, { useEffect, useState } from 'react'
import './App.scss'
import Header from './components/Header'
import IntroVideo from './components/IntroVideo'
import IntroBlurb from './components/IntroBlurb'
import Courses from './components/Courses'
import FeesStructure from './components/FeesStructure'
import firebase from './firebase'

function App () {
  const [video, setVideo] = useState('')
  const [introBlurb, setIntroBlurb] = useState('')
  const [courses, setCourses] = useState([])

  useEffect(() => {
    const db = firebase.firestore()
    const getOptions = {}

    db.collection('intro')
      .doc('video')
      .get(getOptions)
      .then(doc => {
        setVideo(doc.data().link.split('=')[1])
      })

    db.collection('intro')
      .doc('blurb')
      .get(getOptions)
      .then(doc => {
        setIntroBlurb(doc.data())
      })

    const unsubscribe = db.collection('courses')
      .onSnapshot( snapshot => {
        const tempCourses = []
        snapshot.forEach(doc => {
          tempCourses.push(doc.data())
        })
        setCourses(tempCourses)
      })

    return () => unsubscribe()
  })

  return (
    <div className='gb'>
      <Header></Header>
      <IntroVideo video={video}></IntroVideo>
      <IntroBlurb blurb={introBlurb}></IntroBlurb>
      <Courses courses={courses}></Courses>
      <FeesStructure />

      {/*  <div className='gb__section-dark'>*/}
      {/*    <Container component='section'>*/}
      {/*      <Grid container spacing={1}>*/}
      {/*        <Grid item lg={4}>*/}
      {/*          <TextField id="standard-basic" label="Full Name"/>*/}
      {/*        </Grid>*/}
      {/*        <Grid item lg={4}>*/}
      {/*          <TextField id="standard-basic" label="Email Address"/>*/}
      {/*        </Grid>*/}
      {/*        <Grid item lg={4}>*/}
      {/*          <Button variant="contained">Sign Up for Updates</Button>*/}
      {/*        </Grid>*/}
      {/*      </Grid>*/}
      {/*    </Container>*/}
      {/*  </div>*/}
      {/*</main>*/}
    </div>
  )
}

export default App;
