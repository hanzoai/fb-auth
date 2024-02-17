import type Address from './Address'

interface ClientOrgParams {

  name: string
  vendor?: string
  adminEmail: string
  users: string[] // pass empty if desired
  testOnly: boolean

  details: {
    fullOrgName: string
    contactEmail: string
    contactPhone?: string
    address?: Address
    website?: string
  }

  ext?: any
}

export {
  type ClientOrgParams as default
} 
