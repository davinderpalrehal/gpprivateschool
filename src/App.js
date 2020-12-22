import React from 'react'
import {
  BrowserRouter,
  Link,
  Switch,
  Route
} from 'react-router-dom'
import Header from './components/Header'
import MobileMenu from './components/MobileMenu'
import { Container } from '@material-ui/core'
import { Typography } from '@material-ui/core';
import Home from './pages/Home'
import Admissions from './pages/Admissions'
import RegistrationForm from './pages/RegistrationForm'
import TuitionFee from './components/TuitionFee'
import Programs from './pages/Programs'
import ContactUs from './pages/ContactUs'
import AboutUs from './pages/AboutUs'
import Pay from './pages/Pay'
import PrivacyPolicy from './pages/PrivacyPolicy'
import './App.scss'

function App () {
  return (
    <div className="gb">

      <Header/>

      <MobileMenu />

      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Home/>
          </Route>
          <Route path="/admission">
            <Admissions/>
          </Route>
          <Route path="/registration">
            <RegistrationForm/>
          </Route>
          <Route path="/tuition-fee">
            <TuitionFee/>
          </Route>
          <Route path="/programs">
            <Programs/>
          </Route>
          <Route path="/contact-us">
            <ContactUs/>
          </Route>
          <Route path="/about-us">
            <AboutUs/>
          </Route>
          <Route path="/pay">
            <Pay/>
          </Route>
          <Route path="/policy">
            <PrivacyPolicy/>
          </Route>
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App
