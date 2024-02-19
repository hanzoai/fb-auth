import {
  action,
  makeObservable, 
  observable, 
} from 'mobx'

import type { User as FirebaseUser } from 'firebase/auth'
import { 
  collection, 
  doc, 
  getDoc,
  getDocs,
  onSnapshot, 
  query, 
  where, 
  limit 
} from 'firebase/firestore'

//import { v4 as generateUniqueId } from 'uuid'
 
import type {
  ClientOrg,
  ClientOrgRef,
  CreateUserParams,
  ClientOrgParams,
  UserOrgsResponse,
  HanzoFBAuthUser 
} from '@hanzo/fb-auth-shared/types'
 
import { COLLECTIONS, type StatusResponse  } from '@hanzo/fb-auth-shared'
import { errorToString } from '@hanzo/fb-auth-shared/util'

//import Bouncer from '@/util/Bouncer'

import type AuthService from './AuthService'
import { 
  //requestPasswordUpdate as requestPasswordUpdate_remote,
  auth as firebaseAuth,
  fsDB
} from './firebaseConf'

/*
const EXT = {
  baseUrlForEmailLinks: process.env.EMAIL_LINK_BASE_URL
}
 
const adminBouncer = new Bouncer(process.env.NEXT_PUBLIC_HANZO_AUTH_ADMIN_EMAILS ? 
  process.env.NEXT_PUBLIC_HANZO_AUTH_ADMIN_EMAILS.split('|') : []
)
*/ 
class AuthServiceImpl implements AuthService  {
 
  currentFirebaseUser: FirebaseUser | undefined = undefined
  currentHanzoUser: HanzoFBAuthUser | undefined = undefined
  authStateLoading: boolean = false   // firebaseUser status is loading
  authQueryLoading: boolean = false      // any other query: currentHanzoUser, clientOrgs, etc
  disposers: (() => void)[] = []

  constructor() {
    makeObservable(this, {
      currentFirebaseUser: observable,
      currentHanzoUser: observable,
      authStateLoading: observable,
      authQueryLoading: observable,
    })

      // https://mobx.js.org/observable-state.html#limitations
    makeObservable<AuthServiceImpl, 
      '_setQueryLoading' | 
      '_setCurrentFirebaseUser' | 
      '_setCurrentHanzoFBAuthUser'
    >(this, {
      _setQueryLoading: action,
      _setCurrentFirebaseUser: action,
      _setCurrentHanzoFBAuthUser: action
    })

    console.log("SERVICE: ", "In service Const()")

    this.disposers.push( firebaseAuth.onAuthStateChanged( 
      async (fbUser: FirebaseUser | null) => {
        console.log("SERVICE: ", "In Auth state changed")

        if (!fbUser) {
          console.log('FIRST RUN / LOGGED OUT')
          this._setCurrentFirebaseUser(undefined)
          this._setCurrentHanzoFBAuthUser(undefined)
        }
        else {
          console.log('LOG IN ')
          this._setCurrentFirebaseUser(fbUser)
          
          this._setQueryLoading(true)
          if (!this.currentHanzoUser || this.currentHanzoUser.uid !== fbUser.uid) {
            await this._refreshHanzoUser()
          }

            // An undefined result means a new user has been created in the system
            // but the HanzoFBAuthUser hasn't yet. This can't be avoided.
          if (!!this.currentHanzoUser) {
            const usersCol = collection(fsDB, COLLECTIONS.HANZO_USERS)
            const userDoc = doc(usersCol, fbUser.uid)

            this.disposers.push( 
              onSnapshot(userDoc, async (docSnap) => {
                if (docSnap.exists()) {
                  let hanzoUser = docSnap.data() as HanzoFBAuthUser
                  //hanzoUser = await this._getHanzoFBAuthUserTransientData(hanzoUser)
                  this._setCurrentHanzoFBAuthUser(hanzoUser)
                }
              })
            )
          }
          this._setQueryLoading(false)
        }
      }
    ))
  }

  private _setCurrentFirebaseUser(u: FirebaseUser | undefined): void {
    this.currentFirebaseUser = u
  }

  private _setCurrentHanzoFBAuthUser(u: HanzoFBAuthUser | undefined): void {
    this.currentHanzoUser = u
  }

  private _setQueryLoading(b: boolean): void {this.authQueryLoading = b} 

  /*
  public getUserOrgsFromEmail(email: string): Promise<UserOrgsResponse> {

    return new Promise<UserOrgsResponse>( async(resolve, reject) => {
      try {
        this._setQueryLoading(true)
        const usersCol = collection(fsDB, COLLECTIONS.HANZO_USERS)
        const usersQ = query(usersCol, where('email', '==', email), limit(1) )
        const userSnap = await getDocs(usersQ)
        const user = userSnap.empty ? undefined : userSnap.docs[0].data() as HanzoFBAuthUser 

        const clientOrgsCol = collection(fsDB, COLLECTIONS.CLIENT_ORGS)
        const orgsQ = query(clientOrgsCol, where('adminEmail', '==', email))
        const adminOrgsSnap = await getDocs(orgsQ)

          // fill transient Data
          // and response data
        const orgRefs: ClientOrgRef[] = []
        adminOrgsSnap.forEach((doc) => {
          const org = doc.data() as ClientOrg 
          orgRefs.push({
            clientId: org.name,
            fullOrgName: org.details.fullOrgName,
            isAdmin: true
          })
        })

        const orgUsersQ = query(clientOrgsCol, where('users', 'array-contains', email), )
        const memberOrgsSnap = await getDocs(orgUsersQ)

          // Populate transient Data
          // and response data
        memberOrgsSnap.forEach((doc) => {
          const org = doc.data() as ClientOrg 
          orgRefs.push({
            clientId: org.name,
            fullOrgName: org.details.fullOrgName,
            isAdmin: false
          })
        })

        if (user) {
          user!.orgs = orgRefs
        }

        const result: UserOrgsResponse = {
          hanzoUser: user,
          clientOrgs: orgRefs,
        }
          // edge case, calling code could pretend there is no user
        if (user && orgRefs.length === 0) {
          result.message = 'A User exists, but is not associated with any organizations.'
        }
        else if (!user && orgRefs.length > 0) {
          result.message = `No User exists yet, but ${email} is associated with organizations.`
        }
        resolve(result)
      }
      catch (e) {
        reject(errorToString(e))
      }
      finally {
        this._setQueryLoading(false)
      }
    })
  }
  

  public createUser({
    firstName,
    lastName,
    email,
    password
  }: CreateUserParams): Promise<StatusResponse> {

    return new Promise<StatusResponse>( async(resolve, reject) => {
      resolve({
        status: 'ignore me'
      })
    
      try {
        this._setQueryLoading(true)
        const userCredential = await firebaseAuth.createUserWithEmailAndPassword(email, password)
        const uid = userCredential.user!.uid
        await firestore
          .collection(COLLECTIONS.HANZO_USERS)
          .doc(uid)
          .set({ 
            uid, 
            email,
            firstName,
            lastName 
          })

        resolve({
          status: `Org ${email} created successfully.`
        })
      }
      catch (e) {
        reject(errorToString(e))
      }
      finally {
        this._setQueryLoading(false)
      }
      
    })
  }
 
  public createClientOrg(params: ClientOrgParams): Promise<StatusResponse>  {

    return new Promise<StatusResponse>( async(resolve, reject) => {
      resolve({
        status: 'ignore me'
      })
      
      try {
        this._setQueryLoading(false)

        const orgDoc = await firestore
          .collection(COLLECTIONS.CLIENT_ORGS)
          .doc(params.name)  
          .get()

        if (orgDoc.exists) {
          throw new Error(`An organization that uses the name ${params.name} already exists. Please try another name.`)
        }

        const clientOrg: ClientOrg = {
          name: params.name,
          vendor: 'none',
          adminEmail: params.adminEmail,
          users: [], 
          testOnly: true,
          details: params.details,
          apiKeyTest: `T_${generateUniqueId()}`,
          created: new Date(),
          updated: new Date(),
        }

        await firestore
          .collection(COLLECTIONS.CLIENT_ORGS)
          .doc(clientOrg.name)  
          .set(clientOrg)
    
        resolve({
          status: `Org ${params.name} created successfully.`
        })
      }
      catch (e) {
        reject(errorToString(e))
      }
      finally {
        this._setQueryLoading(false)
      }
      
    })
  }
 
  public login(email: string, password: string): Promise<void> {

    return new Promise<void>((resolve, reject) => {
      resolve()
      
      this._setQueryLoading(true)
      firebaseAuth.signInWithEmailAndPassword(email, password)
        .then( async (userCred: firebase.default.auth.UserCredential) => {
            // No need to track this use here, since we are subscribing to auth changes
            // and will bolt a HanzoFBAuthUser onto the logged in Firebase User there. 
          //const msg = `User ${userCred.user!.email} successfully logged in.`
          //console.log(msg)
          resolve()
        })
        .catch((e) => {
          let errorMessage = ''
          if (e.code) {
            console.log('LOGIN ERROR: ' + e.code + ' ' + e.message)
            switch (e.code) {
              case 'auth/wrong-password':
              case 'auth/invalid-email':
              case 'auth/user-not-found': 
              {
                errorMessage = 'invalid password or username'
              } 
              break
              default: 
              {
                errorMessage = e.message     
              }
            }
          }
          else {
            errorMessage = errorToString(e)
          }
          reject(errorMessage)
        })
        .finally(() => {
          this._setQueryLoading(false)
        })
      
    })
  }
*/
  public logout(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      
      this._setQueryLoading(true)
        firebaseAuth.signOut()
        .then(() => {
          //history.push('/publicSite')
          console.log('LOGGED OUT')
          resolve()
        })
        .catch((e) => {
          reject(errorToString(e))
        })
        .finally(() => {
          this._setQueryLoading(false)
        })
      
    })
  }

  /*
  public requestPasswordUpdate(email: string): Promise<StatusResponse> {

    return new Promise<StatusResponse>((resolve, reject) => {
      resolve({ status: 'ignore me' })
    
      this._setQueryLoading(true)
      requestPasswordUpdate_remote({ email, ext: EXT })
        .then(({data}) => {
          const status = data as string
          resolve({ status })
        })
        .catch((error) => {
          reject(errorToString(error))
        })
        .finally(() => {
          this._setQueryLoading(false)
        })
       
    })
  }

  public completePasswordUpdate(oobCode: string, password: string): Promise<void> {

    return new Promise<void>( async (resolve, reject) => {
      resolve()
      
      try {
        this._setQueryLoading(true)
        await firebaseAuth.checkActionCode(oobCode)
        await firebaseAuth.confirmPasswordReset(oobCode, password)
        await this.logout()
        resolve()
      }
      catch (e) {
        reject(errorToString(e))
      }
      finally {
        this._setQueryLoading(false)
      }
      
    })
  }
 
  private _getHanzoFBAuthUserTransientData(user: HanzoFBAuthUser): Promise<HanzoFBAuthUser> {

    return new Promise<HanzoFBAuthUser>( async(resolve, reject) => {
      try {
        this._setQueryLoading(true)

        
        const adminOrgsSnap = await firestore.collection(COLLECTIONS.CLIENT_ORGS)
          .where('adminEmail', '==', user.email)
          .get()
        
        const clientOrgsCol = collection(fsDB, COLLECTIONS.CLIENT_ORGS)
        const adminQ = query(clientOrgsCol, where('adminEmail', '==', user.email))
        const adminOrgsSnap = await getDocs(adminQ)

        user.orgs = [] 
        adminOrgsSnap.forEach((doc) => {
          const org = doc.data() as ClientOrg 
          user.orgs!.push({
            clientId: org.name,
            fullOrgName: org.details.fullOrgName,
            isAdmin: true
          })
        })

        const memdersQ = query(clientOrgsCol, where('users', 'array-contains', user.email))
        const memberOrgsSnap = await getDocs(memdersQ)

        memberOrgsSnap.forEach((doc) => {
          const org = doc.data() as ClientOrg 
          user.orgs!.push({
            clientId: org.name,
            fullOrgName: org.details.fullOrgName,
            isAdmin: false
          })
        })
        resolve(user)
      }
      catch (e) {
        reject(errorToString(e))
      }
      finally {
        this._setQueryLoading(false)
      }
      
    })
  }
*/
  private _refreshHanzoUser(): Promise<void> {
    return new Promise<void>( async(resolve, reject) => {
      try {
        if ( !this.currentFirebaseUser ) {
          reject('No logged in user')  
          return
        }
        this._setQueryLoading(true)
        this._setCurrentHanzoFBAuthUser(await this._fetchHanzoUser(this.currentFirebaseUser.uid))
        if (!this.currentHanzoUser) {
          reject('No HanzoFBAuthUser corresponding to logged in user found.')
          this._setQueryLoading(false)
          return
        }
        resolve()
      }
      catch (e) {
        reject(errorToString(e))
      }
      finally {
        this._setQueryLoading(false)
      }
    })
  }


  private _fetchHanzoUser(uid: string): Promise<HanzoFBAuthUser | undefined> {

    return new Promise<HanzoFBAuthUser | undefined>( async (resolve, reject) => {
      try {
        const usersCol = collection(fsDB, COLLECTIONS.HANZO_USERS)
        const userDoc = doc(usersCol, uid)
        const userDocSnap = await getDoc(userDoc)
 
        const user = userDocSnap.exists() ? (userDocSnap.data() as HanzoFBAuthUser) : undefined
        if (!user) {
          resolve(undefined)
        }
        else {
          //const result = await this._getHanzoFBAuthUserTransientData(user)
          resolve(user)
        }
      } 
      catch (e) {
        reject(errorToString(e))
      }
    })
  }
 
  public isLoading(): boolean {return (this.authQueryLoading || this.authStateLoading)}
 /*
  useEffect(() => {
    let userUnsubscribe: (() => void) | undefined = undefined
    const unsubscribe = firebaseAuth.onAuthStateChanged( async(fbUser: firebase.User | null) => {

      if (!fbUser) {
        console.log('SOMEOME LOGGED OUT')
          // clear the HanzoFBAuthUser info
        HanzoFBAuthUserRef.current = undefined
      }
      else {
        setLoading(true)
        let HanzoFBAuthUser = getCurrentHanzoFBAuthUser()
        if (!HanzoFBAuthUser || HanzoFBAuthUser.uid !== fbUser.uid) {
          HanzoFBAuthUser = await refreshHanzoFBAuthUser()
        }
        

          // An undefined result means a new user has been created in the system
          // but the HanzoFBAuthUser hasn't yet. This can't be avoided.
          // We must call createNewUserFromEmailAndPassword() before creating the 
          // corresponding HanzoFBAuthUser, since we need to know the uid to assign.
        if (!HanzoFBAuthUser) {
          userUnsubscribe = await firestore
            .collection(COLLECTIONS.HANZO_USERS)
            .doc(fbUser.uid)
            .onSnapshot( async (doc) => {
              if (doc.exists) {
                let HanzoFBAuthUser = doc.data() as HanzoFBAuthUser
                HanzoFBAuthUser = await getHanzoFBAuthUserTransientData(HanzoFBAuthUser)
                HanzoFBAuthUserRef.current = HanzoFBAuthUser
              }
            })
        }
        setLoading(false)
      }
    })
    return () => {unsubscribe(); (userUnsubscribe && userUnsubscribe())} // return cleanup function
  }, [])
 */

  public disposer(): void {
    this.disposers.forEach((d) => {d()})
  }

  /*
  public isAdmin(): boolean {
    return !!this.currentFirebaseUser && adminBouncer.in(this.currentFirebaseUser!.email!)
  }
  */
}
 
export default AuthServiceImpl