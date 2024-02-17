import type Address from './Address'

interface ClientOrg { 
    // public 
  name: string        // eg, 'fifth' camelCase, no spaces.  see 'fullOrgName' below
  adminEmail: string  // admin@fifthmedia.org
  users?: string[]    // [user1@fifthmedia.org, user2@fifthmedia.org]
  details: {
    fullOrgName: string
    contactEmail: string
    contactPhone?: string
    address?: Address
    website?: string
  }
    // internal 
  apiKeyProd?: string
  apiKeyTest: string
  testOnly: boolean
  vendor: string      // 'miglite'
  created?: Date
  updated?: Date
  ext?: any           // any vendor-specific keys or other info
}

export {
  type ClientOrg as default
}