import React from 'react'
import './App.scss'
import './components/styles/NavBar.scss'
import {
  BrowserRouter,
  Link,
  Switch,
  Route
} from 'react-router-dom'
import Header from './components/Header'
// import Home from './pages/Home'
// import RegistrationForm from './pages/RegistrationForm'
// import ContactUs from './pages/ContactUs'
// import AboutUs from './pages/AboutUs'
// import TuitionFee from './components/TuitionFee'
import { Container } from '@material-ui/core'
import Admissions from './pages/Admissions'
import RegistrationForm from './pages/RegistrationForm'
import TuitionFee from './components/TuitionFee'
import Programs from './pages/Programs'
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

function App () {
  return (
    <div className="gb">
      <Header/>

      <BrowserRouter>
        <section className='gb__nav-bar'>
          <Container>
            <nav className='gb__nav'>
              <ul>
                <li className='gb__nav__item'>
                  <Link to="/">Home</Link>
                </li>
                <li className='gb__nav__item'>
                  <Link to="/admission" className='dropdown'>Admission</Link>
                  <ul>
                    <li className='gb__nav__item'>
                      <Link to='/registration'>Registration Form</Link>
                    </li>
                    <li className='gb__nav__item'>
                      <Link to='/tuition-fee'>Tuition Fee Options</Link>
                    </li>
                  </ul>
                </li>
                <li className='gb__nav__item'>
                  <Link to='/programs'>Programs</Link>
                </li>
              </ul>
            </nav>
          </Container>
        </section>

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
        </Switch>


        {/*//             <li className='gb__nav__item'>*/}
        {/*/!*              <Link to='/contact-us'>Contact Us</Link>*!/*/}
        {/*/!*            </li>*!/*/}
        {/*//             <li className='gb__nav__item'>*/}
        {/*//               <Link to='/about-us'>About Us</Link>*/}
        {/*//             </li>*/}
        {/*//           </ul>*/}
        {/*/!*        </nav>*!/*/}
        {/*/!*      </Router>*!/*/}
        {/*//     </Container>*/}
        {/*//   </section>*/}
        {/*//*/}
        {/*//   <Switch>*/}
        {/*    <Route exact path='/'>*/}
        {/*//       <Home />*/}
        {/*//     </Route>*/}
        {/*//     <Route exact path='/registration'>*/}
        {/*//       <RegistrationForm />*/}
        {/*//     </Route>*/}
        {/*    <Route exact path='/tuition-fee'>*/}
        {/*      <TuitionFee />*/}
        {/*//     </Route>*/}
        {/*//     <Route exact path='/programs'>*/}
        {/*//       <Programs />*/}
        {/*//     </Route>*/}
        {/*//     <Route exact path='/contact-us'>*/}
        {/*//       <ContactUs />*/}
        {/*//     </Route>*/}
        {/*    <Route exact path='/about-us'>*/}
        {/*      <AboutUs />*/}
        {/*    </Route>*/}
        {/*  </Switch>*/}
        {/*</div>*/}
        {/*<div className='gb'>*/}
        {/*  <Header />*/}
        {/*  <NavBar />*/}
        {/*  <Switch>*/}
        {/*    <Route path='/' exact component={Home} />*/}
        {/*    <Route path='/admissions' exact component={Admissions} />*/}
        {/*    <Route path='/registration' exact component={RegistrationForm} />*/}
        {/*    <Route path='/programs' exact component={Programs} />*/}
        {/*    <Route path='/contact-us' exact component={ContactUs} />*/}
        {/*    <Route path='/about-us' exact component={AboutUs} />*/}
        {/*    <Route path='/pay' exact component={Pay} />*/}
        {/*  </Switch>*/}
        {/*</div>*/}
      </BrowserRouter>
    </div>
  )
}

function Home () {
  return (
    <h1>Home page</h1>
  )
}

export default App
