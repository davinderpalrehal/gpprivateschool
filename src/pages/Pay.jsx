import React, { useEffect, useState } from 'react'
import { Container, FormControlLabel, Grid, Radio, RadioGroup } from '@material-ui/core'
import firebase from '../firebase'
import { PayPalButton } from "react-paypal-button-v2"

function Pay() {
  const [student, setStudent] = useState({})
  const [paymentOptions, setPaymentOptions] = useState([])
  const [payValue, setPayValue] = useState(0)

  useEffect(() => {
    const db = firebase.firestore()

    if (window.location.hostname === 'localhost') {
      db.settings({
        host: 'localhost:8080',
        ssl: false
      })
    }

    db.collection('registrations')
      .doc(window.localStorage.getItem('reg-number'))
      .get()
      .then(doc => {
        setStudent(doc.data()['student-details'])
      })

    const unsubscribe = db.collection('payment-options')
      .where('pay-now', '>=', 0)
      .orderBy('pay-now', 'desc')
      .get()
      .then(querySnapshot => {
        const temp = []
        querySnapshot.forEach(doc => {
          temp.push(doc.data())
        })
        setPaymentOptions(temp)
      })

    return () => unsubscribe()
  },[])

  const setValue = value => event => {
    setPayValue(event.currentTarget.value)
    console.log('Value set to =', payValue)
  }

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12} className='gb__section-dark'>
          <h2>Payment for {student['first-name']} {student['last-name']}</h2>
        </Grid>

        <Grid item xs={12}>
          <h3>Please select payment plan</h3>
        </Grid>

        <Grid item xs={12}>
          <RadioGroup
            aria-label='payment value'
            value={payValue}
            onChange={setValue('pay value')}
            required
          >
          { paymentOptions.map((option, index) =>
              <FormControlLabel
                key={index}
                value={option['pay-now']}
                control={<Radio />}
                label={option.name + ' - ' + option.price}
              />
          )}
          </RadioGroup>
      </Grid>

        <Grid item xs={12}>
          <p>Pay $ {payValue}</p>
          <p>
            <PayPalButton
              amount={payValue}

              onSuccess={(details, data) => {
                alert("Transaction completed by " + details.payer.name.given_name);

                return fetch("/paypal-transaction-complete", {
                  method: "post",
                  body: JSON.stringify({
                    orderId: data.orderID
                  })
                });
              }}
              options={{
                clientId: CLIENT_ID,
                currency: 'CAD'
              }}
            />
          </p>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Pay
