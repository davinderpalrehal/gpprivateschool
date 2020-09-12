import React, { useEffect, useState } from 'react'
import { Container, Grid, Card, CardContent, CardActions } from '@material-ui/core'
import firebase from '../firebase'

function Courses () {
  const [courses, setCourses] = useState([])

  useEffect(() => {
    const db = firebase.firestore()

    const unsubscribe = db.collection('courses')
      .get()
      .then(querySnapshot => {
        const tempCourses = []
        querySnapshot.forEach(doc => {
          tempCourses.push(doc.data())
        })
        setCourses(tempCourses)
      })

      return () => unsubscribe()
  }, [])

  return (
    <Container component="section" className="gb__courses">
      <Grid container spacing={1}>
        {courses.map((course) =>
          <Grid item lg-4>
            <Card variant='outlined' className='gb__course'>
              <CardContent className='gb__course__description'>
                <h4 className='gb__course__title'>{course.title}</h4>
                <p className='gb__course__description'>{course.description}</p>
              </CardContent>
              <CardActions className='gb__course__price'>
                { course.price > 0 ? <p>$ {course.price}</p> : <p>FREE</p> }
              </CardActions>
            </Card>
          </Grid>
        )}
      </Grid>
    </Container>

  )
}

export default Courses
