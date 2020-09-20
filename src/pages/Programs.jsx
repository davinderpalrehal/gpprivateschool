import React, { useEffect, useState } from 'react'
import { Container } from '@material-ui/core'
import firebase from '../firebase'

function Programs () {
  const [programs, setPrograms] = useState([])

  useEffect(() => {
    const db = firebase.firestore()

    if (window.location.hostname === 'localhost') {
      db.settings({
        host: 'localhost:8080',
        ssl: false
      })
    }

    const unsubscribe = db.collection('programs')
      .get()
      .then(querySnapshot => {
        const temp = []
        querySnapshot.forEach(doc => {
          temp.push(doc.data())
        })
        console.log(temp)
        setPrograms(temp)
      })

    return () => unsubscribe
  }, [])

  return (
    <section className='gb__programs'>
      <Container>
        <h1>Programs</h1>
        { programs.map(program =>
          <article className='gb__program'>
            <h2 className='gb__program__name'>{ program.name }</h2>
              { program.intro.map(para =>
                <p>{ para }</p>
              )}

              { program.subjects
                ? program.subjects.map(subject =>
                  <div className='gb__program__subject'>
                    <h3>{ subject.title }</h3>
                    { subject['intro-para']
                      ? subject['intro-para'].map(introPara =>
                        <p>{introPara}</p>
                      )
                      : ''
                    }
                    { subject['break-down']
                      ? <ol>
                          { subject['break-down'].map(breakDown =>
                            <li>{breakDown}</li>
                          )}
                        </ol>
                      : ''
                    }
                  </div>
                )
                : ''
              }

              { console.log(program) }
          </article>
        )}
      </Container>
    </section>
  )
}

export default Programs
