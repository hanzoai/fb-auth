
import type firebase from 'firebase/compat/app'
import 'firebase/compat/auth'

import type { 
  ClientOrgParams,
  CreateUserParams,
  HanzoFBAuthUser,
  UserOrgsResponse,
} from '@hanzo/fb-auth-shared/types'

import type { StatusResponse } from '@hanzo/fb-auth-shared'
interface AuthService {

  currentFirebaseUser: firebase.User | undefined
  currentPaymintoUser: HanzoFBAuthUser | undefined
  authStateLoading: boolean   // firebaseUser status is loading
  authQueryLoading: boolean       // any other query: currentPaymintoUser, clientOrgs, etc
  isLoading(): boolean        // (authStateLoading || authQueryLoading)

  isPaymintoAdmin(): boolean

  getUserOrgsFromEmail(email: string): Promise<UserOrgsResponse>
  createUser(params: CreateUserParams): Promise<StatusResponse>
  createClientOrg(params: ClientOrgParams): Promise<StatusResponse>

  requestPasswordUpdate(email: string): Promise<StatusResponse>
  completePasswordUpdate(oobCode: string, password: string): Promise<void>

  login(email: string, password: string): Promise<void>
  logout(): Promise<void>
}

export {
  type AuthService as default
} 
