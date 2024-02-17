import type ClientOrgRef from './ClientOrgRef'

  /** This is supplimental to Firebase's User */
interface HanzoFBAuthUser {
  uid: string   
  email: string

  firstName: string
  lastName: string

  orgs?: ClientOrgRef[]  // transient (for convenience)
  ext?: any
}

export {
  type HanzoFBAuthUser as default
}