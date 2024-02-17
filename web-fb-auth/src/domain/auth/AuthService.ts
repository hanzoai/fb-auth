
import type { 
  ClientOrgParams,
  CreateUserParams,
  HanzoFBAuthUser,
  UserOrgsResponse,
} from '../../../../shared/types'

import type { StatusResponse } from '../../../../shared'

interface AuthService {

  currentFirebaseUser: firebase.default.User | undefined
  currentHanzoFBAuthUser: HanzoFBAuthUser | undefined
  authStateLoading: boolean   // firebaseUser status is loading
  authQueryLoading: boolean       // any other query: currentHanzoFBAuthUser, clientOrgs, etc
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

export default AuthService
