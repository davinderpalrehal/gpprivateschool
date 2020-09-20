import React, { useEffect, useState } from 'react'
import { Container } from '@material-ui/core'
import firebase from '../firebase'

function IntroBlurb () {
  const [title, setTitle] = useState('')
  const [paragraphs, setParagraphs] = useState([])

  useEffect(() => {
    const db = firebase.firestore()

    if (window.location.hostname === 'localhost') {
      db.settings({
        host: 'localhost:8080',
        ssl: false
      })
    }

    db.collection('dynamic-content')
      .where('type', '==', 'intro-title')
      .limit(1)
      .get()
      .then(querySnapshot => {
        querySnapshot.forEach(doc => {
          setTitle(doc.data().content)
        })
      })

    const unsubscribe = db.collection('dynamic-content')
      .where('type', '==', 'intro-para')
      .orderBy('order', 'asc')
      .get()
      .then(querySnapshot => {
        const tempPara = []
        querySnapshot.forEach(doc => {
          tempPara.push(doc.data().content)
        })
        setParagraphs(tempPara)
      })

    return () => unsubscribe
  }, [])

  return (
    <section className='gb__intro-blurb'>
      <Container>
        <h2 className='gb__intro-blurb__title'>{ title }</h2>
        <div className="gb__intro-blurb__paras">
          { paragraphs.map((para, index) =>
            <p className='gb__intro-blurb__para' key={index}>{ para }</p>
          )}
        </div>
      </Container>
    </section>
  )
}

export default IntroBlurb
