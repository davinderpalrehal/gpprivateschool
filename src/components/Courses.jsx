import React from 'react'
import { Container, Grid, Card, CardContent, CardActions } from '@material-ui/core'

function Courses (props) {
  return (
    <Container component="section" className="gb__courses">
      <Grid container spacing={1}>
        {props.courses.map((course) =>
          <Grid item lg-4>
            <Card variant='outlined' className='gb__course'>
              <CardContent className='gb__course__description'>
                <h4 className='gb__course__title'>{course.title}</h4>
                <p className='gb__course__description'>{course.description}</p>
              </CardContent>
              <CardActions className='gb__course__price'>
                <p>$ {course.price}</p>
              </CardActions>
            </Card>
          </Grid>
        )}
      </Grid>
    </Container>

  )
}

export default Courses
