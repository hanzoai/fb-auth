import React from 'react'

import type { ClientOrgRef } from '@hanzo/fb-auth-shared/types'

import { Link } from '~/components'

import type WizardStopProps from './WizardStopProps'
import BackAndForwardButtons from './BackAndForwardButtons'

const OrgListCard: React.FC<WizardStopProps> = ({
  step,
  totalSteps,
  finalActionName,
  forward,
  back,
  isLoading,
  bucket
}) => {
  
  const goToApp = () => {
    forward && forward({afterList: 'dashboard'})
  }

  const createNewOrg = () => {
    forward && forward({afterList: 'newOrg'})
  }

  return (<>
    <div className='org-list-outer pseudo-form'>
      <p className='message-detail'>You are a member of the following Organizations:</p>
      <ul className='org-list'>
      {bucket.clientOrgs.map((def: ClientOrgRef) => (
        <li className='org-list-item' key={def.clientId}>{def.clientId}:&nbsp;{def.fullOrgName}</li>        
      ))}
      </ul>
      <p className='create-new-message'>
        You can access any of them from the dashboard, <br/>
        or you can <Link className='create-new-org-link' onClick={createNewOrg}>create a new one.</Link></p>
    </div>
    <BackAndForwardButtons
      step={step}
      totalSteps={totalSteps}
      finalActionName={finalActionName}
      disableForward={false}
      disableBack={false}
      forward={goToApp}
      back={back}
    />
  </>)
} 

export default OrgListCard
