import React, { useEffect, useState } from 'react'
import { Container, Grid, Button, TextField, FormControlLabel, Checkbox, FormLabel, RadioGroup, Radio } from '@material-ui/core'
import firebase from '../firebase'

function RegistrationForm () {
  const [showRegForm, setShowRegForm] = useState(false)
  const [studentDetails, setStudentDetails] = useState({})
  const [previousSchoolDetails, setPreviousSchoolDetails] = useState({})
  const [fatherDetails, setFatherDetails] = useState({})
  const [motherDetails, setMotherDetails] = useState({})
  const [emergencyDetails, setEmergencyDetails] = useState({})
  const [medicalDetails, setMedicalDetails] = useState({})
  const [waivers, setWaivers] = useState([])

  const handleChange = property => event => {
    setStudentDetails({
      ...studentDetails,
      [property]: event.currentTarget.value
    })
  }

  const handlePreviousSchoolDetails = property => event => {
    setPreviousSchoolDetails({
      ...previousSchoolDetails,
      [property]: event.currentTarget.value
    })
  }

  const handleFatherChange = property => event => {
    setFatherDetails({
      ...fatherDetails,
      [property]: event.currentTarget.value
    })
  }

  const handleMotherChange = property => event => {
    setMotherDetails({
      ...motherDetails,
      [property]: event.currentTarget.value
    })
  }

  const handleEmergencyChange = property => event => {
    setEmergencyDetails({
      ...emergencyDetails,
      [property]: event.currentTarget.value
    })
  }

  const handleMedicalChange = property => event => {
    setMedicalDetails({
      ...medicalDetails,
      [property]: event.currentTarget.value
    })
  }

  useEffect(() => {
    const db = firebase.firestore()

    if (window.location.hostname === 'localhost') {
      db.settings({
        host: 'localhost:8080',
        ssl: false
      })
    }

    const unsubscribe = db.collection('dynamic-content')
      .where('type', '==', 'waiver-line')
      .orderBy('order')
      .get()
      .then(querySnapshot => {
        const tempWaiver = []
        querySnapshot.forEach(doc => {
          tempWaiver.push(doc.data().content)
        })
        setWaivers(tempWaiver)
      })

    return () => unsubscribe()
  }, [])

  const registerStudent = () => {
    const db = firebase.firestore()

    if (window.location.hostname === 'localhost') {
      db.settings({
        host: 'localhost:8080',
        ssl: false
      })
    }

    db.collect('registrations').add({
      'student-details': studentDetails,
      'previous-school': previousSchoolDetails,
      'father': fatherDetails,
      'mother': motherDetails,
      'emergency-details': emergencyDetails,
      'medical-details': medicalDetails
    })
      .then(docRef => {
        window.localStorage.setItem('reg-number', docRef)
        alert('Registration form submitted, navigating to payment page')
      })
  }

  return (
    <section className="gb__registration-form">
      <Container>
        <Grid container alignContent='center' justify='center'>
        { !showRegForm
          ? <Button variant='contained' color='primary' onClick={() => setShowRegForm(true)}>Show Registration Form</Button>
          : <Button variant='contained' color='secondary' onClick={() => setShowRegForm(false)}>Close Registration Form</Button>
        }
        </Grid>
      </Container>
      <Container>
        { showRegForm ?
          <form onSubmit={registerStudent}>
          <Grid container spacing={3}>
            <Grid item xs={12} className='gb__section-dark'>
              <h3>Student Information</h3>
            </Grid>

            <Grid item xs={4}>
              <TextField
                label='First Name'
                hintText='First name of the student'
                value={studentDetails['first-name']}
                onChange={handleChange('first-name')}
                required
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                label='Last Name'
                id='student-last-name'
                hintText='Last name of the student'
                value={studentDetails['last-name']}
                onChange={handleChange('last-name')}
                required
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                label='Email address'
                hintText='Student email address'
                type='email'
                value={studentDetails['email']}
                onChange={handleChange('email')}
                required
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                label='Date of Birth'
                type='date'
                helperText='YYYY-MM-DD'
                defaultValue='1699-04-13'
                value={studentDetails['date-of-birth']}
                onChange={handleChange('date-of-birth')}
                required
              />
            </Grid>

            <Grid item xs={4}>
              <Grid container>
                <Grid item xs={4}>
                  <FormLabel component='legend'>Gender *</FormLabel>
                </Grid>
                <Grid item xs={8}>
                  <RadioGroup
                    aria-label='gender'
                    value={studentDetails['gender']}
                    onChange={handleChange('gender')}
                    required
                  >
                    <FormControlLabel value='male' control={<Radio />} label='Male' className='MuiGrid-grid-xs-4' />
                    <FormControlLabel value='female' control={<Radio />} label='Female' className='MuiGrid-grid-xs-4' />
                  </RadioGroup>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={4}>
              <TextField
                label='Place of birth'
                value={studentDetails['place-of-birth']}
                onChange={handleChange('place-of-birth')}
                required
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                label='Address'
                value={studentDetails['address']}
                onChange={handleChange('address')}
                required
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                label='Postal code'
                value={studentDetails['postal-code']}
                onChange={handleChange('postal-code')}
                required
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                label='Residency status'
                value={studentDetails['residency-status']}
                onChange={handleChange('residency-status')}
                required
              />
            </Grid>

            <Grid item xs={4}>
              <FormControlLabel
                control={<Checkbox name="amritdhari" />}
                label="Amritdhari"
                value={studentDetails['amritdhari']}
                onChange={handleChange('amritdhari')}
              />
            </Grid>

            <Grid item xs={4}>
              <FormControlLabel
                control={<Checkbox name="nitnem" />}
                label="Does the student do Nitnem Daily?"
                value={studentDetails['nitnem']}
                onChange={handleChange('nitnem')}
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                label='Entering grade'
                type='number'
                value={studentDetails['entering-grade']}
                onChange={handleChange('entering-grade')}
                required
              />
            </Grid>

            <Grid item xs={4}>
              <FormControlLabel
                control={<Checkbox name="returning-student" />}
                label="Are you a returning student at GB?"
                value={studentDetails['returning-student']}
                onChange={handleChange('returning-student')}
              />
            </Grid>

            <Grid item xs={12} className='gb__section-dark'>
              <h3>Previous School</h3>
            </Grid>

            <Grid item xs={4}>
              <TextField
                label="Last School Attended"
                value={previousSchoolDetails['name']}
                onChange={handlePreviousSchoolDetails('name')}
                required
              />
            </Grid>

            <Grid item xs={4}>
              <Grid container>
                <Grid item xs={4}>
                  <FormLabel component='legend'>Last School Type</FormLabel>
                </Grid>
                <Grid item xs={8}>
                  <RadioGroup
                    aria-label='Last school type'
                    value={previousSchoolDetails['type']}
                    onChange={handlePreviousSchoolDetails('type')}
                    required
                  >
                    <FormControlLabel value='private' control={<Radio />} label='Private' />
                    <FormControlLabel value='public-elementary' control={<Radio />} label='Public Elementary' />
                    <FormControlLabel value='public-secondary' control={<Radio />} label='Public Secondary' />
                  </RadioGroup>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={4}>
              <Grid container>
                <Grid item xs={4}>
                  <FormLabel component='legend'>Is student currently on explusion or suspension</FormLabel>
                </Grid>
                <Grid item xs={8}>
                  <RadioGroup
                    aria-label='Last school type'
                    value={previousSchoolDetails['previously-expelled']}
                    onChange={handlePreviousSchoolDetails('previously-expelled')}
                    required
                  >
                    <FormControlLabel value={true} control={<Radio />} label='Yes' />
                    <FormControlLabel value={false} control={<Radio />} label='No' />
                  </RadioGroup>
                </Grid>
              </Grid>
            </Grid>

            <Grid item xs={12} className='gb__section-dark'>
              <h3>Siblings Attending Gurmat Bibek School</h3>
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="Full name"
                value={studentDetails['sibling-1-name']}
                onChange={handleChange('sibling-1-name')}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="Grade"
                value={studentDetails['sibling-1-grade']}
                onChange={handleChange('sibling-1-grade')}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="Full name"
                value={studentDetails['sibling-2-name']}
                onChange={handleChange('sibling-2-name')}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="Grade"
                value={studentDetails['sibling-2-grade']}
                onChange={handleChange('sibling-2-grade')}
              />
            </Grid>

            <Grid item xs={12} className='gb__section-dark'>
              <h3>Parent/Guardian Information</h3>
            </Grid>

            <Grid item xs={12}>
              <TextField
                label='Legal Custodian (father) name'
                value={fatherDetails['name']}
                onChange={handleFatherChange('name')}
                required
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                label='Legal Custodian (father) email'
                type='email'
                value={fatherDetails['email']}
                onChange={handleFatherChange('email')}
                required
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                label='Legal Custodian (father) Work Phone'
                type='phone'
                value={fatherDetails['work-phone']}
                onChange={handleFatherChange('work-phone')}
                required
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                label='Legal Custodian (father) Cell Phone'
                type='phone'
                value={fatherDetails['cell-phone']}
                onChange={handleFatherChange('cell-phone')}
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                label='Legal Custodian (father) Home Phone'
                type='phone'
                value={fatherDetails['home-phone']}
                onChange={handleFatherChange('home-phone')}
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                label='Legal Custodian (father) Address'
                value={fatherDetails['address']}
                onChange={handleFatherChange('address')}
                required
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                label='Legal Custodian (father) Residency Status'
                value={fatherDetails['residency-status']}
                onChange={handleFatherChange('residency-status')}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label='Legal Custodian (mother) name'
                value={motherDetails['name']}
                onChange={handleMotherChange('name')}
                required
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                label='Legal Custodian (mother) email'
                type='email'
                value={motherDetails['email']}
                onChange={handleMotherChange('email')}
                required
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                label='Legal Custodian (mother) Work Phone'
                type='phone'
                value={motherDetails['work-phone']}
                onChange={handleMotherChange('work-phone')}
                required
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                label='Legal Custodian (mother) Cell Phone'
                type='phone'
                value={motherDetails['cell-phone']}
                onChange={handleMotherChange('cell-phone')}
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                label='Legal Custodian (mother) Home Phone'
                type='phone'
                value={motherDetails['home-phone']}
                onChange={handleMotherChange('home-phone')}
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                label='Legal Custodian (mother) Address'
                value={motherDetails['address']}
                onChange={handleMotherChange('address')}
                required
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                label='Legal Custodian (mother) Residency Status'
                value={motherDetails['residency-status']}
                onChange={handleMotherChange('residency-status')}
                required
              />
            </Grid>

            <Grid item xs={12} className='gb__section-dark'>
              <h3>Emergency Contact Information</h3>
            </Grid>

            <Grid item xs={3}>
              <TextField
                label='First name'
                value={emergencyDetails['first-name']}
                onChange={handleEmergencyChange('first-name')}
                required
              />
            </Grid>

            <Grid item xs={3}>
              <TextField
                label='Last name'
                value={emergencyDetails['last-name']}
                onChange={handleEmergencyChange('last-name')}
                required
              />
            </Grid>

            <Grid item xs={3}>
              <TextField
                label='Phone number'
                type='tel'
                value={emergencyDetails['phone-number']}
                onChange={handleEmergencyChange('phone-number')}
                required
              />
            </Grid>

            <Grid item xs={3}>
              <TextField
                label='Relationship With The Student'
                value={emergencyDetails['relation']}
                onChange={handleEmergencyChange('relation')}
                required
              />
            </Grid>

            <Grid item xs={12} className='gb__section-dark'>
              <h3>Medical Information</h3>
            </Grid>

            <Grid item xs={3}>
              <TextField
                label='Health Card Number'
                id='student-health-card'
                value={medicalDetails['card-number']}
                onChange={handleMedicalChange('card-number')}
                required
              />
            </Grid>

            <Grid item xs={3}>
              <TextField
                label='Health Card Expiry Date'
                type='date'
                value={medicalDetails['expiry']}
                onChange={handleMedicalChange('expiry')}
                required
              />
            </Grid>

            <Grid item xs={3}>
              <TextField
                label='Family Doctor Name'
                value={medicalDetails['doctor-name']}
                onChange={handleMedicalChange('doctor-name')}
                required
              />
            </Grid>

            <Grid item xs={3}>
              <TextField
                label='Family Doctor Phone Number'
                value={medicalDetails['doctor-phone']}
                onChange={handleMedicalChange('doctor-phone')}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox name="contagious-diseases" />}
                label="Does the student have any serious or potentilally life threatening conditions or communicable diseases (Chickenpox, Measles, etc.)?"
                value={medicalDetails['contagious-disease']}
                onChange={handleMedicalChange('contagious-disease')}
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                label="Serious medical conditions"
                value={medicalDetails['medical-conditions']}
                onChange={handleMedicalChange('medical-conditions')}
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                label="Is your child on daily medications? Yes/no"
                value={medicalDetails['daily-medication']}
                onChange={handleMedicalChange('daily-medication')}
                required
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                label="If yes the list the medications here"
                value={medicalDetails['critical-medications']}
                onChange={handleMedicalChange('critical-medications')}
                required
              />
            </Grid>

            <Grid item xs={12} className='gb__section-dark'>
              <h3>Please read the information below before signing the form:</h3>
            </Grid>

            <Grid item={12}>
              <ul>
                { waivers.map((waiver, index) =>
                  <li className='gb__waiver-line' key={index}>{ waiver }</li>
                )}
              </ul>
            </Grid>

            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox name="TandCs" />}
                label="By checking this box you accept the Terms and Conditions of the Gurmat Bibek Private School."
                value={true}
                required
              />
            </Grid>

            <Grid item xs={12} container alignContent='center' justify='center'>
              <Button variant='contained' color='primary' type='submit'>Accept Terms & Conditions and Submit</Button>
            </Grid>
          </Grid>
          </form>
          : ''
        }
      </Container>
    </section>
  )
}

export default RegistrationForm
