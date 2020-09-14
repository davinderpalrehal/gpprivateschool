import React, { useEffect, useState } from 'react'
import { Container, Grid, Card, CardContent } from '@material-ui/core'
import firebase from '../firebase'

function FeesStructure () {
  const [paymentOptions, setPaymentOptions] = useState([])

  useEffect(() => {
    const db = firebase.firestore()

    if (window.location.hostname === 'localhost') {
      db.settings({
        host: 'localhost:8080',
        ssl: false
      })
    }

    const unsubscribe = db.collection('payment-options')
      .orderBy('order')
      .get()
      .then(querySnapshot => {
        const temp = []
        querySnapshot.forEach(doc => {
          temp.push(doc.data())
        })
        setPaymentOptions(temp)
      })

    return () => unsubscribe()
  }, [])

  return (
    <section className='gb__fees-structure'>
      <Container>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <table>
                  <thead>
                    <tr>
                      <th colSpan={3}>
                        Tuition For Grade 1 to Grade 7 - $4,000 per year
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                  { paymentOptions.map((option, index) =>
                    <tr key={index}>
                      <td>
                    { option.name }
                    { option['sub-text'] ? <p>{ option['sub-text'] }</p> : ''}
                    </td>
                    <td>{ option.description }</td>
                    <td>{ option.price }</td>
                    </tr>

                  )}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </section>
  )
}

export default FeesStructure
