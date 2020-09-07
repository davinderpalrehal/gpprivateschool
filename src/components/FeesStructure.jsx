import React from 'react'
import { Container, Grid, Card, CardContent } from '@material-ui/core'

function FeesStructure () {
  return (
    <section className='gb__fees-structure'>
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Card>
              <CardContent>
                <h4>Grade 1 - Grade 7</h4>
                <h5>Full-time School + Gurmat Curriculum</h5>
                <p>Yearly fee: $4,000.00</p>
                <p>Registration/Admin Fee: $500.00</p>
                <p>Total: $4,500.00</p>
                <p>There are 3 pay options</p>
                <ol>
                  <li>Full fee upfront: $4,500.00</li>
                  <li>Bi-annual fee of $2,250.00 due at start and March 2<sup>nd</sup></li>
                  <li>Deposit + 1<sup>st</sup> installment: $1,500.00 due at start. Then, 3 installments of $1,000.00 on November 2<sup>nd</sup>, January 2<sup>nd</sup> and May 2<sup>nd</sup></li>
                </ol>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={6}>
            <Card>
              <CardContent>
                <h4>Grade 1 - 7</h4>
                <h5>Only Gurmat Curriculum</h5>
                <p>Yearly fee: $500.00</p>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </section>
  )
}

export default FeesStructure
