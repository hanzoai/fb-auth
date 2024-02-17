import React, { useState } from 'react'
import { observer } from 'mobx-react'
import { useHistory, useLocation } from 'react-router'

import { 
  Button,
  LinearProgress,
  Paper
} from '@material-ui/core'

import {
 Formik, Field, Form 
} from 'formik'
import { TextField } from 'formik-material-ui'

import type { Credentials } from '@hanzo/fb-auth-shared/types'
import  { errorToString } from '@hanzo/fb-auth-shared/util'
import { Link } from '~/components'
import { useAuthService } from '~/domain/auth'

const initialValues: Credentials = { 
  email: '',
  password: ''
}

const validate = (values) => {
  const errors: Partial<Credentials> = {}
  if (!values.password) {
    errors.password = 'required'
  } 
  if (!values.email) {
    errors.email = 'required'
  } 
  else if (
    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
  ) {
    errors.email = 'invalid email address'
  }
  return errors
}

const LoginForm: React.FC<{}> = observer(({ children }) => {

  const auth = useAuthService()
  const [errorString, setErrorSting] = useState<string | undefined>(undefined)
  const location = useLocation()

  const history = useHistory()

  const handleSubmit = async (values) => {
    try {
      setErrorSting(undefined)
      await auth.login(values.email, values.password)

      if (location.state && (location.state as any).from) {
        const from = (location.state as any).from
        history.push(from.pathname + (from.search ? from.search : ''))
      }
      else {
        history.push('/payments')
      }
    } 
    catch (e){
      setErrorSting(errorToString(e)) 
    }
  }

  const error = !!errorString

  return (
    <div className='form-outer signup-form'>
      <Paper>
        <h2 className='form-title'>Log In</h2>
        {error && (
          <h6 className='error-string'>{errorString}</h6>
        )}
        <Formik
          initialValues={initialValues}
          validate={validate}
          onSubmit={handleSubmit}
        >
        {({ submitForm, isSubmitting, touched, isValid }) => {
          const disableSubmit = isSubmitting || auth.authStateLoading ||  !isValid || (Object.keys(touched).length === 0 && touched.constructor === Object)
          return (
            <Form className='form-root' onKeyDown={(e) => {if (e.key === 'Enter' && !disableSubmit) { submitForm() }}}>
              <Field
                component={TextField}
                name='email'
                type='email'
                label='Email'
              />
              <Field
                component={TextField}
                name='password'
                type='password'
                label='Password'
              />
              {children}
              <Button
                variant='contained'
                color='primary'
                disabled={disableSubmit}
                onClick={submitForm}
                size='large'
                className='form-button'
              >
                Log In
              </Button>
              <div className='form-alternative-prompt forgot-password-outer'>
                <Link to="/requestPasswordUpdate">Forgot Password?</Link>
              </div>
              <div className='form-alternative-prompt signup-outer'>
                <span className='prompt'>Don't have an account?</span>
                <Link to='/signup'>Join now</Link>
              </div>
            </Form>
          )
        }}      
        </Formik>
        {auth.authStateLoading && <LinearProgress />}
      </Paper>
    </div>
  )
}) 

export default LoginForm
