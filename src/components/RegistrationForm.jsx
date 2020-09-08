import React, { useState } from 'react'
import { Container, Grid, Button, TextField, Select, MenuItem, FormControlLabel, Checkbox, InputLabel } from '@material-ui/core'

function RegistrationForm () {
  const [showRegForm, setShowRegForm] = useState(false)

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
          <Grid container spacing={3}>
            <Grid item xs={12} className='gb__section-dark'>
              <h3>Student Information</h3>
            </Grid>

            <Grid item xs={4}>
              <TextField label='First Name' id='student-first-name' />
            </Grid>

            <Grid item xs={4}>
              <TextField label='Last Name' id='student-last-name' />
            </Grid>

            <Grid item xs={4}>
              <TextField label='Date of Birth' type='date' defaultValue='1699-04-13' />
            </Grid>

            <Grid item xs={4}>
              <InputLabel id='student-gender-label'>Gender</InputLabel>
              <Select
                label='Gender'
                style={{
                  width: '100%',
                }}
                id='student-gender'
              >
                <MenuItem>Male</MenuItem>
                <MenuItem>Female</MenuItem>
              </Select>
            </Grid>

            <Grid item xs={4}>
              <TextField label='Place of birth' id='student-place-of-birth' />
            </Grid>

            <Grid item xs={4}>
              <TextField label='Address' id='student-address' />
            </Grid>

            <Grid item xs={4}>
              <TextField label='Postal code' id='student-postal-code' />
            </Grid>

            <Grid item xs={4}>
              <TextField label='Residency status' id='student-residency-status' />
            </Grid>

            <Grid item xs={4}>
              <FormControlLabel
                control={<Checkbox name="amritdhari" />}
                label="Amritdhari"
                id='student-amritdhari'
              />
            </Grid>

            <Grid item xs={4}>
              <FormControlLabel
                control={<Checkbox name="nitnem" />}
                label="Does the student do Nitnem Daily?"
                id='student-nitnem'
              />
            </Grid>

            <Grid item xs={4}>
              <TextField label='Entering grade' id='student-entering-grade' type='number' />
            </Grid>

            <Grid item xs={4}>
              <FormControlLabel
                control={<Checkbox name="returning-student" />}
                label="Are you a returning student at GB?"
                id='student-returning-to-gb'
              />
            </Grid>

            <Grid item xs={12} className='gb__section-dark'>
              <h3>Previous School</h3>
            </Grid>

            <Grid item xs={4}>
              <TextField
                label="Last School Attended"
                id='student-last-school'
              />
            </Grid>

            <Grid item xs={4}>
              <InputLabel id='student-last-school-type-label'>Gender</InputLabel>
              <Select
                label='Type'
                style={{
                  width: '100%',
                }}
                id='student-last-school-type'
              >
                <MenuItem>Private</MenuItem>
                <MenuItem>Public Elementary</MenuItem>
                <MenuItem>Public Secondary</MenuItem>
              </Select>
            </Grid>

            <Grid item xs={4}>
              <InputLabel id='student-suspended-label'>Is student currently on explusion or suspension</InputLabel>
              <Select
                label='Type'
                style={{
                  width: '100%',
                }}
                id='student-suspended'
              >
                <MenuItem>Yes</MenuItem>
                <MenuItem>No</MenuItem>
              </Select>
            </Grid>

            <Grid item xs={12} className='gb__section-dark'>
              <h3>Siblings Attending Gurmat Bibek School</h3>
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="Full name"
                id='student-sibling-1-full-name'
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="Grade"
                id='student-sibling-1-grade'
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="Full name"
                id='student-sibling-2-full-name'
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                label="Grade"
                id='student-sibling-2-grade'
              />
            </Grid>

            <Grid item xs={12} className='gb__section-dark'>
              <h3>Parent/Guardian Information</h3>
            </Grid>

            <Grid item xs={12}>
              <TextField
                label='Legal Custodian (father) name'
                id='father-name'
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                label='Legal Custodian (father) email'
                id='father-email'
                type='email'
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                label='Legal Custodian (father) Work Phone'
                id='father-work-phone'
                type='phone'
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                label='Legal Custodian (father) Cell Phone'
                id='father-cell-phone'
                type='phone'
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                label='Legal Custodian (father) Home Phone'
                id='father-home-phone'
                type='phone'
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                label='Legal Custodian (father) Address'
                id='father-address'
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                label='Legal Custodian (father) Residency Status'
                id='father-residency-status'
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                label='Legal Custodian (mother) name'
                id='mother-name'
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                label='Legal Custodian (mother) email'
                id='mother-email'
                type='email'
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                label='Legal Custodian (mother) Work Phone'
                id='mother-work-phone'
                type='phone'
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                label='Legal Custodian (mother) Cell Phone'
                id='mother-cell-phone'
                type='phone'
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                label='Legal Custodian (mother) Home Phone'
                id='mother-home-phone'
                type='phone'
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                label='Legal Custodian (mother) Address'
                id='mother-address'
              />
            </Grid>

            <Grid item xs={4}>
              <TextField
                label='Legal Custodian (mother) Residency Status'
                id='mother-residency-status'
              />
            </Grid>

            <Grid item xs={12} className='gb__section-dark'>
              <h3>Emergency Contact Information</h3>
            </Grid>

            <Grid item xs={3}>
              <TextField label='First name' id='emergency-first-name' />
            </Grid>

            <Grid item xs={3}>
              <TextField label='Last name' id='emergency-last-name' />
            </Grid>

            <Grid item xs={3}>
              <TextField label='Phone number' id='emergency-phone-number' />
            </Grid>

            <Grid item xs={3}>
              <TextField label='Relationship With The Student' id='emergency-relationship' />
            </Grid>

            <Grid item xs={12} className='gb__section-dark'>
              <h3>Medical Information</h3>
            </Grid>

            <Grid item xs={3}>
              <TextField
                label='Health Card Number'
                id='student-health-card'
              />
            </Grid>

            <Grid item xs={3}>
              <TextField
                label='Health Card Expiry Date'
                type='date'
                id='student-health-card-expiry'
              />
            </Grid>

            <Grid item xs={3}>
              <TextField
                label='Family Doctor Name'
                id='family-doctor-name'
              />
            </Grid>

            <Grid item xs={3}>
              <TextField
                label='Family Doctor Phone Number'
                id='family-doctor-phone'
              />
            </Grid>

            <Grid item xs={12}>
              <FormControlLabel
                control={<Checkbox name="contagious-diseases" />}
                label="Does the student have any serious or potentilally life threatening conditions or communicable diseases (Chickenpox, Measles, etc.)?"
                id='contagious-diseases'
              />
            </Grid>

            <Grid item xs={4}>
              <TextField label="Serious medical conditions" id='serious-medical-conditions' />
            </Grid>

            <Grid item xs={4}>
              <TextField label="Is your child on daily medications? Yes/no" id='daily-medications' />
            </Grid>

            <Grid item xs={4}>
              <TextField label="If yes the list the medications here" id='critical-medications' />
            </Grid>

            <Grid item xs={12} className='gb__section-dark'>
              <h3>Please read the information below before signing the form:</h3>
            </Grid>

            <Grid item={12}>
              <ul>
                <li>I certify that the information provided on this form is accurate to the best of my knowledge</li>
                <li>Gurmat Bibek Private School expects the student to follow all the rules and shows exemplary behaviour consistent with the school ideals</li>
                <li>I understand to abide by the rules, regulations, policies & procedures as made from time to time by Gurmat Bibek Private School. I also authorize Gurmat Bibek Private School to use my child's photo or achievement record for promotional</li>
              </ul>
              <p>Accept terms and conditions</p>
            </Grid>

            <Grid item xs={12} container alignContent='center' justify='center'>
              <Button variant='contained' color='primary' disabled>Accept Terms & Conditions and Submit</Button>
            </Grid>
          </Grid>
          : ''
        }
      </Container>
    </section>
  )
}

export default RegistrationForm
