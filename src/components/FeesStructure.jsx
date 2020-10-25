import React, { useEffect, useState } from 'react'
import { Container, Grid, Card, CardContent } from '@material-ui/core'
import firebase from '../firebase'

function FeesStructure () {
  const [fullTimeOptions, setFullTimeOptions] = useState([])
  const [gurmatOptions, setGurmatOptions] = useState([])

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
        const tempFT = []
        const tempG = []
        querySnapshot.forEach(doc => {
          if (doc.data()['student-type'] === 'full-time') {
            tempFT.push(doc.data())
          }
          else {
            tempG.push(doc.data())
          }
        })
        setFullTimeOptions(tempFT)
        setGurmatOptions(tempG)
      })

    return () => unsubscribe
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
                        Full-Time Student
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                  { fullTimeOptions.map((option, index) =>
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

                <table>
                  <thead>
                  <tr>
                    <th colSpan={3}>
                      Gurmat Student
                    </th>
                  </tr>
                  </thead>

                  <tbody>
                  { gurmatOptions.map((option, index) =>
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
