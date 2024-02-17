import type { ClientOrg } from '@hanzo/fb-auth-shared/types'

export default interface ClientOrgState {

  clientOrgName: string 
  setClientOrgName(n: string): void
  testMode: boolean
  setTestMode(b: boolean): void
  clientOrg: ClientOrg | undefined
  clientOrgLoading: boolean
  clientOrgErrorString: string
}

