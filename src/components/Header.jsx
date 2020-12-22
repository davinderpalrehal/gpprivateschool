import React from 'react'
import { Container, Typography } from '@material-ui/core';
import './styles/Header.scss'

function Header () {
  return (
    <header className='gb__header'>
      <Container>
        <Typography variant='h1'>Dasmesh Khalsa School</Typography>
      </Container>
    </header>
  )
}

export default Header
