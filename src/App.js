import React, { useEffect, useState } from 'react'
import './App.scss'
import Header from './components/Header'
import IntroVideo from './components/IntroVideo'
import IntroBlurb from './components/IntroBlurb'
import Courses from './components/Courses'
import FeesStructure from './components/FeesStructure'
import RegistrationForm from './components/RegistrationForm'
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
      <RegistrationForm />
    </div>
  )
}

export default App;
