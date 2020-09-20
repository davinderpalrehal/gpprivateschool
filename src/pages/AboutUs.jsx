import React, { useEffect, useState } from 'react'
import { Container } from '@material-ui/core'
import firebase from '../firebase'

function AboutUs () {
  const [ aboutUs, setAboutUs ] = useState([])

  useEffect(() => {
    const db = firebase.firestore()

    if (window.location.hostname === 'localhost') {
      db.settings({
        host: 'localhost:8080',
        ssl: false
      })
    }

    const unsubscribe = db.collection('dynamic-content')
      .where('type', '==', 'about-us')
      .get()
      .then(querySnapshot => {
        const temp = []
        querySnapshot.forEach(doc => {
          doc.data().content.map(para => temp.push(para))
        })
        setAboutUs(temp)
      })

      return () => unsubscribe
  }, [])

  return (
    <section className='gb__about-us'>
      <Container>
        <h2>About Us</h2>
        { aboutUs.map(para =>
          <p>{ para }</p>
        )}
      </Container>
    </section>
  )
}

export default AboutUs
