import React from 'react'
import IntroVideo from '../components/IntroVideo'
import IntroBlurb from '../components/IntroBlurb'
import Courses from '../components/Courses'
import FeesStructure from '../components/FeesStructure'
import RegistrationForm from './RegistrationForm'

function Home () {
  return (
    <>
      <IntroVideo/>
      <IntroBlurb/>
      <Courses/>
      <FeesStructure/>
      <RegistrationForm/>
    </>
  )
}

export default Home
