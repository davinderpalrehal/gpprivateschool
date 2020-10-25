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
              option['student-type'] === student.type
              ? <tr key={index} className={ option.name === selectedPayment.name ? 'highlight' : '' }>
                <td>{option['name']}</td>
                <td>${option['pay-now']}</td>
                <td>{option['number-of-installments']}</td>
              </tr>
                : ''
            )}
            </tbody>
          </table>
        </Grid>

        <Grid item xs={12}>
          { selectedPayment['pay-now'] ===  150
            ? <PayPalButton
              options={{vault: true}}
              createSubscription={(data, actions) => {
                return actions.subscription.create({
                  plan_id: 'P-9YA263398M752212BL5TZW2Q'
                });
              }}
              onApprove={(data, actions) => {
                // Capture the funds from the transaction
                return actions.subscription.get().then(function(details) {
                  // Show a success message to your buyer
                  alert("Subscription completed");

                  // OPTIONAL: Call your server to save the subscription
                  return fetch("/paypal-subscription-complete", {
                    method: "post",
                    body: JSON.stringify({
                      orderID: data.orderID,
                      subscriptionID: data.subscriptionID
                    })
                  });
                });
              }}
                  // eslint-disable-next-line
              options={{
                clientId: "AV2FlpQvVZChWtogYH-D6Tnz7hz8j4dr5AujeMp7mynNi42WA02sabzVYc2KhSW26MAZF-0XmS5Be-Aq",
                currency: 'CAD'
              }}
            />
            : ''
          }

          { selectedPayment['pay-now'] ===  1045
            ? <PayPalButton
              options={{vault: true}}
              createSubscription={(data, actions) => {
                return actions.subscription.create({
                  plan_id: 'P-8G526678W0850173WL5RD62Y'
                });
              }}
              onApprove={(data, actions) => {
                // Capture the funds from the transaction
                return actions.subscription.get().then(function(details) {
                  // Show a success message to your buyer
                  alert("Subscription completed");

                  // OPTIONAL: Call your server to save the subscription
                  return fetch("/paypal-subscription-complete", {
                    method: "post",
                    body: JSON.stringify({
                      orderID: data.orderID,
                      subscriptionID: data.subscriptionID
                    })
                  });
                });
              }}
                  // eslint-disable-next-line
              options={{
                clientId: "AV2FlpQvVZChWtogYH-D6Tnz7hz8j4dr5AujeMp7mynNi42WA02sabzVYc2KhSW26MAZF-0XmS5Be-Aq",
                currency: 'CAD'
              }}
            />
            : ''
          }

          { selectedPayment['pay-now'] !==  1045 && selectedPayment['pay-now'] !==  150
            ? <PayPalButton
              amount={selectedPayment['pay-now']}
              // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
              onSuccess={(details, data) => {
                alert("Transaction completed by " + details.payer.name.given_name);

                // OPTIONAL: Call your server to save the transaction
                return fetch("/paypal-transaction-complete", {
                  method: "post",
                  body: JSON.stringify({
                    orderID: data.orderID
                  })
                });
              }}
              options={{
                clientId: "AV2FlpQvVZChWtogYH-D6Tnz7hz8j4dr5AujeMp7mynNi42WA02sabzVYc2KhSW26MAZF-0XmS5Be-Aq",
                currency: 'CAD'
              }}
            />
            : ''
          }
        </Grid>

        {/*<Grid item xs={12}>

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


/**

 <script src="https://www.paypal.com/sdk/js?client-id=AV2FlpQvVZChWtogYH-D6Tnz7hz8j4dr5AujeMp7mynNi42WA02sabzVYc2KhSW26MAZF-0XmS5Be-Aq&vault=true" data-sdk-integration-source="button-factory"></script>
 <script>
 paypal.Buttons({
      style: {
          shape: 'rect',
          color: 'gold',
          layout: 'vertical',
          label: 'subscribe'
      },
      createSubscription: function(data, actions) {
        return actions.subscription.create({
          'plan_id': 'P-'
        });
      },
      onApprove: function(data, actions) {
        alert(data.subscriptionID);
      }
  }).render('#paypal-button-container');
 </script>
 [21:12, 20/09/2020] Preetam Singh: that is for multiple children gurmat curriculum
 [21:12, 20/09/2020] Preetam Singh: $150
 [21:12, 20/09/2020] Preetam Singh: <div id="paypal-button-container"></div>
 <script src="https://www.paypal.com/sdk/js?client-id=AV2FlpQvVZChWtogYH-D6Tnz7hz8j4dr5AujeMp7mynNi42WA02sabzVYc2KhSW26MAZF-0XmS5Be-Aq&vault=true" data-sdk-integration-source="button-factory"></script>
 <script>
 paypal.Buttons({
      style: {
          shape: 'rect',
          color: 'gold',
          layout: 'vertical',
          label: 'subscribe'
      },
      createSubscription: function(data, actions) {
        return actions.subscription.create({
          'plan_id': 'P-8G526678W0850173WL5RD62Y'
        });
      },
      onApprove: function(data, actions) {
        alert(data.subscriptionID);
      }
  }).render('#paypal-button-container');
 </script>
 [21:13, 20/09/2020] Preetam Singh: this one is the one you had made
 [21:13, 20/09/2020] Preetam Singh: <div id="smart-button-container">
 <div style="text-align: center;">
 <div id="paypal-button-container"></div>
 </div>
 </div>
 <script src="https://www.paypal.com/sdk/js?client-id=AV2FlpQvVZChWtogYH-D6Tnz7hz8j4dr5AujeMp7mynNi42WA02sabzVYc2KhSW26MAZF-0XmS5Be-Aq&currency=CAD" data-sdk-integration-source="button-factory"></script>
 <script>
 function initPayPalButton() {
      paypal.Buttons({
        style: {
          shape: 'rect',
          color: 'gold',
          layout: 'vertical',
          label: 'paypal',

        },

        createOrder: function(data, actions) {
          return actions.order.create({
            purchase_units: [{"amount":{"currency_code":"CAD","value":1}}]
          });
        },

        onApp…
[21:13, 20/09/2020] Preetam Singh: this is for the smart button
 */
