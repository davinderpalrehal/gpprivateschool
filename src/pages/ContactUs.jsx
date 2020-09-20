import React from 'react'
import { Container } from '@material-ui/core'

function ContactUs () {
  return (
    <section className='gb__contact-us'>
      <Container>
        <h2>Contact Us</h2>
        <address>
          <p className='gb__contact-us__email'><a href="mailto:admin@gbprivateschool.com">admin@gbprivateschool.com</a></p>
          <p className='gb__contact-us__email'><a href="tel:+16475131413">(647) 513-1413</a></p>
        </address>
      </Container>
    </section>
  )
}

export default ContactUs
