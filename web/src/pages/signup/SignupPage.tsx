import React, { useState, useRef } from 'react'
import { useHistory } from 'react-router-dom'

import { 
  Button, 
  LinearProgress, 
  Paper 
} from '@material-ui/core'

//import { GoogleReCaptcha } from 'react-google-recaptcha-v3'

import type { CreateUserParams } from '@hanzo/fb-auth-shared/types'
import { errorToString } from '@hanzo/fb-auth-shared/util'

import { Link } from '~/components'
import { useAuthService } from '~/domain/auth'
import _str from '~/settings/strings'

import type WizardStop from './WizardStop'
import EmailAndPasswordForm  from './EmailAndPasswordForm'
import OrgForm  from './OrgForm'
import OrgListCard  from './OrgListCard'
import type WizardStopProps from './WizardStopProps'

import './style.scss'

const stopMap = new Map<string, WizardStop>()
stopMap.set('user', {
  Component: EmailAndPasswordForm,
  title: 'Create an account',
  fieldNames: ['firstName', 'lastName', 'email', 'password']
})
stopMap.set('org', {
  Component: OrgForm,
  title: 'New organization',
  fieldNames: ['clientId', 'adminEmail', 'fullOrgName', 'contactEmail', 'contactPhone']
})
stopMap.set('orgList', {
    // @ts-ignore
  Component: OrgListCard,
  title: 'Your Organizations',
  fieldNames: ['afterList']
})


const SignupPage: React.FC<{}> = () => {

  const auth = useAuthService()
  
  const history = useHistory()
  const [stop, setStop] = useState<string>('user')
  const bucketRef = useRef<any>({
    userFormIsLogin: false,
    stops: {}
  })
  const [errorString, setErrorString] = useState<string | undefined>(undefined)
  const [messageStrings, setMessageStrings] = useState<string[] | undefined>(undefined)
    // Setting this staying on the same stop, displays the thank you message
    // and the success message.  Only draws the 'Continue' button.
  const [successStrings, setSuccessStrings] = useState<string[] | undefined>(undefined)

//const [recaptchaSatisfied, setRecaptchaSatisfied] = useState(false)

  const wizardStop = stopMap.get(stop) as WizardStop

  const bucket = () => ( bucketRef.current )

  const back = () => {
    if (stop === 'orgList') {
      setStop('user')
    }
    else if (stop === 'org') {
      setStop('user')
    }
  }

  const storeStopValues = (newValues: any): void => {
    let desiredValues: any = {}
    wizardStop!.fieldNames.forEach((key) => {
      desiredValues[key] = newValues[key]
    })
    bucket().stops[stop] = desiredValues

  }

  const fromUserStop = (newValues: any): Promise<void> => {

    return new Promise<void>( async(resolve, reject) => {
      try {
        storeStopValues(newValues)
        const res = await auth.getUserOrgsFromEmail(bucket().stops[stop].email)
        bucket().clientOrgs = res.clientOrgs
        //console.log('ORGS: ', bucket().orgList)
        if (res.paymintoUser) {
          bucket().paymintoUser = res.paymintoUser
          if (bucket().clientOrgs.length === 0) {
            setStop('org') 
          }
          else {
            setStop('orgList')
          }
        }
        else if (bucket().clientOrgs.length > 0) {
          const params = {
            ...bucket().stops[stop]  
          } as CreateUserParams
            // Also logs in the new user
          const status = await auth.createUser(params)
          //console.log(status)
          bucket().userCreated = true
            // A marker for later
          bucket().paymintoUser = {
            email: bucket().stops[stop].email
          }
          setStop('orgList') 
        }
        else {
          setStop('org') 
        }
        resolve()
      }
      catch (e) {
        bucketRef.current = {}
        const msg = errorToString(e)
        setErrorString(msg)
        console.log(msg)
        reject(msg)
      }
    })
  }

  const fromOrgListStop = (values: any) => {

    storeStopValues(values)
    if (bucket().stops['orgList'].afterList === 'newOrg') {
      setStop('org')
    }
      // 'afterList' === 'dashboard'
    else {
        // If a new user wasn't just created
      if (!bucket().userCreated) {
        auth.login(bucket().stops['user'].email, bucket().stops['user'].password)
          .then(() => {
            history.push('/payments')
          })
          .catch((e) => {
            setErrorString(errorToString(e))
          })
      }
      else {
        history.push('/payments')
      }
    }
  }

  const fromOrgStop = async (values: any): Promise<void> => {
    return new Promise( async(resolve, reject) => {

      try {
        if (bucket().done) {
          history.push('/payments')
          resolve()
          return
        }

        storeStopValues(values)
        //console.log('ORG', bucket().stops['org'])
        const clientOrgParams: any = {
          name: bucket().stops['org'].clientId,
          adminEmail: bucket().stops['org'].adminEmail, 
          testOnly: true, 
          details: {
            fullOrgName: bucket().stops['org'].fullOrgName,
            contactEmail: bucket().stops['org'].contactEmail
          }
        }
        if (bucket().stops['org'].contactPhone) {
          clientOrgParams.details.contactPhone = bucket().stops['org'].contactPhone
        }
        const status = await auth.createClientOrg(clientOrgParams)
        //console.log(status)
        bucket().orgCreated = true

          // No user yet
        if (!bucket().paymintoUser) {
          const params = {
            ...bucket().stops['user']  
          } as CreateUserParams
            // Also logs in the new user
          const status = await auth.createUser(params)
          bucket().userCreated = true
        }
          // Was a user just created (and logged in)?
        else if (!bucket().userCreated) {
          await auth.login(
            bucket().stops['user'].email, 
            bucket().stops['user'].password
          )
        }
        setSuccessStrings([
          ((bucket().userCreated) ? 'Account created' : 'Existing user logged in'),
          `User '${bucket().stops['user'].email}' logged in.`,
          `Organization '${clientOrgParams.name}' (${clientOrgParams.details.fullOrgName}) created.`
        ])

        bucket().done = true
        resolve()
      }
      catch (e) {
        setErrorString(errorToString(e))
        reject(errorToString(e))
      }
    })
  }

  let nextProps: WizardStopProps
  switch (stop) {
    case ('user'): {
      nextProps = {
        forward: fromUserStop,
        isLoading: auth.isLoading.bind(auth),
        bucket: bucketRef.current
      }
    }
    break
    case ('orgList'): {
      nextProps = {
        forward: fromOrgListStop,
        finalActionName: 'Done',
        //back,
        isLoading: auth.isLoading.bind(auth),
        bucket: bucketRef.current
      }
    }
    break
    case ('org'): {
      nextProps = {
        forward: fromOrgStop,
        finalActionName: 'Create',
        //back,
        isLoading: auth.isLoading.bind(auth),
        bucket: bucketRef.current
      } 
    }
    break
  }

  const SuccessCard: React.FC<{}> = () => (
    <Paper className='form-success-card pseudo-form'>
      {successStrings!.map((str: string, index) => (
        (index === 0) 
          ? <h3 className='success-message-title'>{str}</h3>
          : <p className='success-message-detail' key={index}>{str}</p>  
      ))}
      <div className='back-and-forward-buttons last'>
        <Button
          variant="contained"
          color="primary"
          onClick={nextProps!.forward}
          size='large'
          className='form-button'
        >
          Done
        </Button>
      </div>
    </Paper>
  )

  const error: boolean = (errorString !== undefined)
  const message: boolean = (messageStrings !== undefined)
  const success: boolean = (successStrings !== undefined)
  const Component = wizardStop.Component

  return (
    <div className='just-form-outer'>
      <div className={`form-outer signup-form ${success ? 'on-success' : ''}`}>
      {(success) ? (<SuccessCard />) : (
        <Paper>
          <h2 className='form-title'>{wizardStop.title}</h2>
          {message && messageStrings!.map((str: string, index) => {
            if (index === 0) {
              <h6 className='message-title '>{str}</h6>
            }
            else {
              <p className='message-detail' key={index}>{str}</p> 
            }
          })}
          {error && ( <h6 className='error-string'>{errorString}</h6> )}
          <Component {...nextProps!} />
          {auth.isLoading() && <LinearProgress />}
        </Paper>
      )} 
        <div className='form-alternative-prompt login-outer'>
          <span className='prompt'>Already have an account?</span>
          <Link to="/paymints">Log In</Link>
        </div>
      </div>
    </div>
  )
}

// <GoogleReCaptcha onVerify={() => { setRecaptchaSatisfied(true) }} />

export default SignupPage
