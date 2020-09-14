import React from 'react'
import { Container } from '@material-ui/core'

function Pay() {
  return (
    <Container>
      <ol>
        <li>Get the doc ref for the registration</li>
        <li>Let the user choose a payment plan</li>
        <li>Send user to PayPal payment page</li>
      </ol>
    </Container>
  )
}

export default Pay
