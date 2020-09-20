import React, { useEffect, useState } from 'react'
import {
  Container,
  FormControl,
  Grid,
  InputLabel,
  Select
} from '@material-ui/core'
import firebase from '../firebase'
import { PayPalButton } from "react-paypal-button-v2"

function Pay() {
  const [student, setStudent] = useState({})
  const [paymentOptions, setPaymentOptions] = useState([])
  const [paymentIndex, setPaymentIndex] = useState(-1)
  const [selectedPayment, setSelectedPayment] = useState({})

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

    return () => unsubscribe
  },[])

  const setValue = event => {
    setPaymentIndex(event.currentTarget.value)
    setSelectedPayment(paymentOptions[event.currentTarget.value])
  }

  return (
    <Container>
      <Grid container spacing={3}>
        <Grid item xs={12} className='gb__section-dark'>
          <h2>Payment for {student['first-name']} {student['last-name']} as a { student.type === 'gurmat' ? 'Gurmat Curriculum Student' : 'Full-Time Student' }</h2>
        </Grid>

        <Grid item xs={12}>
          <h3>Please select payment plan</h3>
        </Grid>

        <Grid item xs={12}>
          <FormControl style={{ width: '100%'}}>
            <InputLabel htmlFor="payment-option" style={{ width: '100%'}}>Select a Payment Option</InputLabel>
            <Select
              native
              value={paymentIndex}
              onChange={setValue}
              inputProps={{
                name: 'type',
                id: 'payment-option',
              }}
              style={{ width: '100%'}}
              required
            >
              <option aria-label="None" value=""></option>
              { paymentOptions.map((option, index) =>
                <option value={index}>{option.name} - {option.price}</option>
              )}
            </Select>
          </FormControl>
        </Grid>

        <Grid item xs={12}>
          <p>Payment options available</p>
          <table>
            <thead>
            <tr>
              <th>Payment Option Name</th>
              <th>Payment Due Today</th>
              <th>Number of Installments</th>
            </tr>
            </thead>
            <tbody>
            { paymentOptions.map((option, index) =>
              <tr key={index} className={ option.name === selectedPayment.name ? 'highlight' : '' }>
                <td>{option['name']}</td>
                <td>${option['pay-now']}</td>
                <td>{option['number-of-installments']}</td>
              </tr>
            )}
            </tbody>
          </table>
        </Grid>

        {/*<Grid item xs={12}>
          <p>Pay $ {paymentOptions[paymentIndex]['pay-now']}</p>
          <p>
            <PayPalButton
              amount={paymentOptions[paymentIndex]['pay-now']}
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
                clientId: "AV2FlpQvVZChWtogYH-D6Tnz7hz8j4dr5AujeMp7mynNi42WA02sabzVYc2KhSW26MAZF-0XmS5Be-Aq",
                currency: 'CAD'
              }}
            />
          </p>
        </Grid>*/}
      </Grid>
    </Container>
  )
}

export default Pay
