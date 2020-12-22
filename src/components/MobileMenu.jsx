import React from 'react'
import { Button, SwipeableDrawer } from '@material-ui/core'
import MenuIcon from '@material-ui/icons/Menu'
import CancelIcon from '@material-ui/icons/Cancel'
import { BrowserRouter as Router, Link } from 'react-router-dom'
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
    <React.Fragment>
      <Button onClick={toggleDrawer(true)} className='btn-circle p-absolute btn-shadow-light'><MenuIcon /></Button>
      <SwipeableDrawer
        anchor="right"
        open={state}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        <Button onClick={toggleDrawer(false)}><CancelIcon className='cancel-btn' /></Button>
        <Router>
          <ul className='gb__nav__mobile'>
            <li className='gb__nav__item'>
              <Link to='/'>Home</Link>
            </li>
            <li className='gb__nav__item'>
              <Link className='dropdown' to='/registration'>Admission</Link>
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
            <li className='gb__nav__item'>
              <Link to='/contact-us'>Contact Us</Link>
            </li>
            <li className='gb__nav__item'>
              <Link to='/about-us'>About Us</Link>
            </li>
          </ul>
        </Router>
      </SwipeableDrawer>
    </React.Fragment>
  )
}

export default Header
