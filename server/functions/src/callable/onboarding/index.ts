// @ts-ignore
//import * as functions from 'firebase-functions'
import { HttpsError, onCall } from 'firebase-functions/v2/https'
import * as admin from 'firebase-admin'
//import { v4 as uuid } from 'uuid'

const mailchimp = require('@mailchimp/mailchimp_transactional')('t1GtHp-jZFZpBTp3LVacsA')

import { COLLECTIONS } from '@hanzo/fb-auth-shared'
import type {
  HanzoFBAuthUser,
  RequestPasswordUpdateParams,
} from '@hanzo/fb-auth-shared/types'

import { errorToString } from '@hanzo/fb-auth-shared/util'

//const COMPLETE_SIGNUP_ROUTE = '/completeSignup'
const COMPLETE_PASSWORD_UPDATE_ROUTE = '/updatePassword'
const PARAMS_START = 'action?'

//https://firebase.google.com/docs/functions/config-env?gen=2nd#params
//const BASE_URL = functions.config().hanzo.baseurl
const BASE_URL = "https://main--hanzo.netlify.app"
admin.initializeApp()

const getEmailLinkBaseUrl = (ext: any): string =>
  ext && ext.baseUrlForEmailLinks && ext.baseUrlForEmailLinks !== 'default'
    ? ext.baseUrlForEmailLinks
    : BASE_URL

    /*
export const signup = onCall(
  async ({data}): Promise<void> => {

    const uid = uuid()
    const params = data as SignupParams
    const { clientId } = params

    try {
      const clientOrgDocs = await admin
        .firestore()
        .collection(COLLECTIONS.CLIENT_ORGS)
        .where('name', '==', clientId)
        .limit(1)
        .get()

      if (clientOrgDocs.empty) {
        throw new Error(`Org "${clientId}" not found!`)
      }
      const org = clientOrgDocs.docs[0].data() as ClientOrg
      if (org.adminEmail !== params.email && (!org.users || !org.users!.includes(params.email))) {
        throw new Error (
          `"${clientId}" has not designated ${params.email} as a Dashboard admin.<br/> \
          If you feel this is an oversight, please contact them.`
        )
      }

        // This will contain the email base URL (for dev purposes),
        // plus any API keys necessary for that client.
      await admin.firestore().collection(COLLECTIONS.HANZO_USERS)
        .doc(uid)
        .set({ ...params, id: uid })

      await admin.auth().createUser({
        uid: uid,
        email: params.email,
        emailVerified: false,
        displayName: params.firstName + ' ' + params.firstName,
        disabled: false,
      })
    } 
    catch (e) {
      throw new HttpsError('permission-denied', errorToString(e))
    }
  }
)
*/
  // Promise contains email if successful
  /*
export const updatePassword = onCall(
  async ({data}): Promise<string> => {

    const { email, password } = data
    try {
      let userRecord: admin.auth.UserRecord = await admin.auth().getUserByEmail(email)
      userRecord = await admin.auth().updateUser(userRecord.uid, {
        emailVerified: true,
        password: password,
      })
      return email
    } 
    catch (e) {
      throw new HttpsError('permission-denied', errorToString(e))
    }
  }
)
  */
  // Promise contains email if successful
/* unused
export const refreshHanzoUser = onCall(
  async ({data}): Promise<HanzoFBAuthUser> => {

    const { email } = data
    try {

      let userDocs = await admin.firestore().collection(COLLECTIONS.HANZO_USERS)
        .where('email', '==', email)
        .limit(1)
        .get()

      let user = userDocs.docs[0].data() as HanzoFBAuthUser
      return user
    } 
    catch (e) {
      throw new HttpsError('permission-denied', errorToString(e))
    }
  }
)
*/ 

export const requestPasswordUpdate = onCall(
  async ({data}): Promise<string> => {

    const request = data as RequestPasswordUpdateParams
    try {
      let link = await admin.auth().generatePasswordResetLink(request.email, {
        url: 'https://hanzoai.com', // we will ignore this, but it's required by typescript and the API expect it.
      })

      let userDocs = await admin.firestore().collection(COLLECTIONS.HANZO_USERS)
        .where('email', '==', request.email)
        .limit(1)
        .get()

      let user = userDocs.docs[0].data() as HanzoFBAuthUser

        // parse out just the params appended to the link
      let index = link.indexOf(PARAMS_START)
      index += PARAMS_START.length
      link = getEmailLinkBaseUrl(user.ext) + COMPLETE_PASSWORD_UPDATE_ROUTE + '?' + link.slice(index)

      // TODO create a proper email template  (mailchimp dashboard?)
      const message = {
        from_email: 'no-reploy@lux.market',
        subject: 'Your password reset request.',
        text: `Please use the following link to reset your password: ${link}`,
        to: [
          {
            email: request.email,
            type: 'to',
          },
        ],
      }
      await mailchimp.messages.send({ message })
      return `A reset password link has been sent to ${request.email}.`
    } 
    catch (e) {
      throw new HttpsError('permission-denied', errorToString(e))
    }
  }
)

// https://medium.com/firebase-developers/generating-email-action-links-with-the-firebase-admin-sdk-4b9d5e2cf914
/*
export const addUser = functions.auth.user().onCreate(
  (user: admin.auth.UserRecord, context: any) => {
    functions.logger.log("ADDUSER CALLED")

    return new Promise<void>(async (resolve, reject) => {
      try {
        const { email, uid  } = user
        //let link = 
        let link = await admin.auth().generateEmailVerificationLink(email as string, {
          url: 'https://hanzoai.com', // we ignore this, but it's required by typescript and the API!
        })
       
        const doc = await admin.firestore().collection(COLLECTIONS.HANZO_USERS)
          .doc(uid)
          .get()

        const hanzoUser = doc.data()
          // Sometimes during dev, we create users manually without a hanzo user
        if (!hanzoUser) {
          resolve()
          return
        }

          // parse out just the params appended to the link
        let index = link.indexOf(PARAMS_START)
        index += PARAMS_START.length
        link = getEmailLinkBaseUrl(hanzoUser!.ext!) + COMPLETE_SIGNUP_ROUTE + '?' + link.slice(index)
        functions.logger.log("ADD USER VERIFY LINK: " + link)

        const message = {
          from_email: 'signup@lux.market',
          subject: 'Welcome to Lux',
          text: `Welcome to Lux!
        Please verify your account by creating a password here: ${link}
        and then follow the link to proceed to login.`,
          to: [{
              email: email,
              type: 'to',
          }],
        }
        await mailchimp.messages.send({ message })
        resolve()
      }
      catch (e) {
        reject(errorToString(e))
      }
    })
  }
)
*/
