import React from 'react'
import { Button, SwipeableDrawer } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import CancelIcon from '@material-ui/icons/Cancel'
import { BrowserRouter as Router } from 'react-router-dom'
import './styles/MobileMenu.scss'

function Header () {
  const [state, setState] = React.useState(false)

  const toggleDrawer = (open) => (event) => {
    if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return
    }
    setState(open)
  }

  return (
    <div className='xs-only'>
      <Button onClick={toggleDrawer(true)} className='gb__nav-mobile__toggle btn-circle p-absolute btn-shadow-light'><MenuIcon /></Button>
      <SwipeableDrawer
        anchor="right"
        open={state}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        <Button onClick={toggleDrawer(false)}><CancelIcon className='gb__nav-mobile__close cancel-btn' /></Button>
        <Router>
          <ul className='gb__nav__mobile'>
            <li className='gb__nav__item'>
              <a href="/">Home</a>
            </li>
            <li className='gb__nav__item'>
              <a href="/registration">Admission</a>
              <ul>
                <li className='gb__nav__item'>
                  <a href="/registration">Registration Form</a>
                </li>
                <li className='gb__nav__item'>
                  <a href='/tuition-fee'>Tuition Fee Options</a>
                </li>
              </ul>
            </li>
            <li className='gb__nav__item'>
              <a href='/programs'>Programs</a>
            </li>
            <li className='gb__nav__item'>
              <a href='/contact-us'>Contact Us</a>
            </li>
            <li className='gb__nav__item'>
              <a href='/about-us'>About Us</a>
            </li>
          </ul>
        </Router>
      </SwipeableDrawer>
    </div>
  )
}

export default Header
