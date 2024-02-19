import type { User } from 'firebase/auth'

import type { 
  ClientOrgParams,
  CreateUserParams,
  HanzoFBAuthUser,
  UserOrgsResponse,
} from '@hanzo/fb-auth-shared/types'

import type { StatusResponse } from '@hanzo/fb-auth-shared'

interface AuthService {
  currentFirebaseUser: User | undefined
  currentHanzoUser: HanzoFBAuthUser | undefined
  authStateLoading: boolean   // firebaseUser status is loading
  authQueryLoading: boolean       // any other query: currentHanzoUser, clientOrgs, etc
  isLoading(): boolean        // (authStateLoading || authQueryLoading)

  isAdmin(): boolean

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
