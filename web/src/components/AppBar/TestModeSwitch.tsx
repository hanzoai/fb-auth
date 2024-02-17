import React from 'react'
import { observer } from 'mobx-react'

import { makeStyles } from '@material-ui/core'

import { BinarySwitch } from '~/components'
import { useClientOrgState } from '~/domain/clientOrg'

const useStyles = makeStyles((theme: any) => ({

  testModeSmallLabel: {
    color: theme.palette.secondary.main,
    fontWeight: 700
  },

  nonTestModeSmallLabel: {
    fontWeight: 700
  },
}))

const TestModeSwitch: React.FC<{}> = observer(({}) => {

  const clientOrgState = useClientOrgState()
  const s = useStyles()

  return (
    <BinarySwitch
      name='testMode'
      ariaLabel='Test Mode switch'
      leftLabel='Production'
      rightLabel='Test'
      muiColor='secondary'
      disabled={clientOrgState.clientOrgLoading || clientOrgState.clientOrg?.testOnly }
      isRight={(!clientOrgState.clientOrgLoading && clientOrgState.clientOrg?.testOnly) || clientOrgState.testMode}
      setRight={clientOrgState.setTestMode.bind(clientOrgState)}
      leftClass={s.nonTestModeSmallLabel}
      rightClass={s.testModeSmallLabel}
    />
  )
})

export default TestModeSwitch

