import React from 'react'
import './App.scss'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import Home from './pages/Home'
import Pay from './pages/Pay'
import Header from './components/Header'
import RegistrationForm from './pages/RegistrationForm'
import Admissions from './pages/Admissions'
import Programs from './pages/Programs'
import ContactUs from './pages/ContactUs'
import AboutUs from './pages/AboutUs'
import NavBar from './components/NavBar'

function App () {
  return (
    <Router>
      <div className='gb'>
        <Header />
        <NavBar />
        <Switch>
          <Route path='/' exact component={Home} />
          <Route path='/admissions' exact component={Admissions} />
          <Route path='/registration' exact component={RegistrationForm} />
          <Route path='/programs' exact component={Programs} />
          <Route path='/contact-us' exact component={ContactUs} />
          <Route path='/about-us' exact component={AboutUs} />
          <Route path='/pay' exact component={Pay} />
        </Switch>
      </div>
    </Router>
   )
}

export default App;
