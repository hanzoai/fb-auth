import type HanzoFBAuthUser from './HanzoFBAuthUser'
import type ClientOrgRef from './ClientOrgRef'

interface UserOrgsResponse {
  hanzoUser: HanzoFBAuthUser | undefined
  clientOrgs: ClientOrgRef[]
  message?: string 
}

export {
  type UserOrgsResponse as default
}