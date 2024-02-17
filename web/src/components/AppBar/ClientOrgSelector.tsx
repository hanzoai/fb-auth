import React, { useEffect, useRef } from 'react'
import { observer } from 'mobx-react'
import cx from 'classnames'

import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown'

import { useClientOrgState } from '~/domain/clientOrg'
import type { NavElement } from '~/types/app'
import { 
  ButtonMenu,
  NavElementMenu 
} from '~/components'

import { useAuthService } from '~/domain/auth'

import './clientOrgSelector.scss'

const ClientOrgSelector: React.FC<{
  className?: string
}> = observer(({
  className
}) => {

  const auth = useAuthService()
  const clientOrgState  = useClientOrgState()

  const orgsRef = useRef<NavElement[]>([]) 
  const userIdRef = useRef<string | undefined>(undefined) // uid of FB user 

  useEffect(() => {
      // if loading, wait til a variable changes. Gotta love useEffect()
    if (!auth.authQueryLoading) {
      if (auth.currentPaymintoUser) {
        if (userIdRef.current !== auth.currentPaymintoUser.uid) {
          userIdRef.current = auth.currentPaymintoUser.uid
          clientOrgState.setClientOrgName(auth.currentPaymintoUser.orgs![0].clientId)
            // Create NavElement's that just set the orgName
          orgsRef.current = auth.currentPaymintoUser.orgs!.map((org) => ({
            title: org.clientId,
            handler: () => {
              if (clientOrgState.clientOrgName != org.clientId) {
                clientOrgState.setClientOrgName(org.clientId)
              }
            }
          }))
        }
      }
        // This shouldn't really happen if the widget is shown only when a user 
        // is logged in, but for resiliency we include it.
      else {
        userIdRef.current = undefined
        orgsRef.current = []
      }
    }
  }, [auth.authQueryLoading, auth.currentPaymintoUser])

  return (
    <div className={cx('client-org-selector-outer', className ? className : '')}>
      <ButtonMenu
        id='org-menu-button'
        text={!orgsRef.current ? 'loading...' : clientOrgState.clientOrgName}
        icon={<ArrowDropDownIcon />} 
      >
        <NavElementMenu elements={orgsRef.current} />
      </ButtonMenu>
    </div>
  )
})

export default ClientOrgSelector
