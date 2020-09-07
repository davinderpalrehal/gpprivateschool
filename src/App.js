import React from 'react';
import firebase from './firebase'
import './App.scss';
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardActions from '@material-ui/core/CardActions'
import TextField from '@material-ui/core/TextField'
import Button from '@material-ui/core/Button'

class App extends React.Component{
  constructor () {
    super();

    this.state = {
      courses: [],
      video: ''
    }

    const db = firebase.firestore()
    db.collection('courses').get().then((querySnapshot) => {
      querySnapshot.forEach(doc => {
        this.setState(state => {
          const courses = state.courses.concat(doc.data());
          const video = ''

          return {
            courses,
            video
          };
        });
      })
    });

    db.collection('intro-video').get().then((querySnapshot) => {
      querySnapshot.forEach(doc => {
        this.setState(state => {
          const courses = state.courses
          const video = doc.data().video.split('=')[1]

          return {
            courses,
            video
          };
        });
      })
    });
  }

  render () {
    return (
      <div className='gb'>
        <header className='gb__header'>
          <Container>
            <div className="shape-1"></div>
            <div className="shape-2"></div>
            <div className="shape-3"></div>
            <div className="shape-4"></div>
            <div className="shape-5"></div>
            <h1>Gurmat Bibek Private School</h1>
          </Container>
        </header>

        <main>
          <Container component="section" className="gb__courses">
            <Grid container alignContent='center' justify='center' className='gb__video'>
              <iframe
                title="YouTube Video"
                width="90%" height="700" src={`https://www.youtube.com/embed/${ this.state.video }`} frameBorder="0"
                      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen></iframe>
            </Grid>

            <Grid container spacing={1}>
              <Grid item xs={12}>
                This is the write up
              </Grid>
            </Grid>

            <Grid container spacing={1}>
              {this.state.courses.map((course) =>
                <Grid item lg-4>
                  <Card variant='outlined' className='gb__course'>
                    <CardContent className='gb__course__description'>
                      <h4>{course.title}</h4>
                      <p>{course.description}</p>
                    </CardContent>
                    <CardActions className='gb__course__price'>
                      <p>$ {course.price}</p>
                    </CardActions>
                  </Card>
                </Grid>
              )}
            </Grid>
          </Container>

          <div className='gb__section-dark'>
            <Container component='section'>
                <Grid container spacing={1}>
                  <Grid item lg={4}>
                    <TextField id="standard-basic" label="Full Name" />
                  </Grid>
                  <Grid item lg={4}>
                    <TextField id="standard-basic" label="Email Address" />
                  </Grid>
                  <Grid item lg={4}>
                    <Button variant="contained">Sign Up for Updates</Button>
                  </Grid>
                </Grid>
            </Container>
          </div>
        </main>
      </div>
    );
  }
}

export default App;
