import React from 'react'
import './App.scss'
import Header from './components/Header'
import IntroVideo from './components/IntroVideo'
import IntroBlurb from './components/IntroBlurb'
// import Courses from './components/Courses'
// import FeesStructure from './components/FeesStructure'
// import RegistrationForm from './components/RegistrationForm'
// import firebase from './firebase'
//
function App () {
  return (
    <div className='gb'>
       <Header></Header>
       <IntroVideo />
       <IntroBlurb />
       {/*<Courses courses={courses}></Courses>*/}
       {/*<FeesStructure />*/}
       {/*<RegistrationForm />*/}
     </div>
   )
}

export default App;
