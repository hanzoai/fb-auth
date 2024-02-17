import * as functions from 'firebase-functions'
import * as admin from 'firebase-admin'
import { v4 as generateUniqueId } from 'uuid'

import { HANZO_RESPONSE_CODES, COLLECTIONS } from '@hanzo/fb-auth-shared'
import type { UpdateClientOrgParams } from '@hanzo/fb-auth-shared/types'
import { errorToCodeAndMessage } from '@hanzo/fb-auth-shared/util'

const updateClientOrg = async (req: functions.https.Request, res: functions.Response<any>): Promise<void> => {
 
  const clientOrg = req.body as UpdateClientOrgParams
  try {
    let update: any = {}
    if (clientOrg.vendor) {
      update.vendor = clientOrg.vendor
    }
    if (clientOrg.adminEmail) {
      update.adminEmail = clientOrg.adminEmail
    }
    if (clientOrg.users) {
      update.users = clientOrg.users
    }
    if ('testOnly' in clientOrg) {
      update.testOnly = clientOrg.testOnly
      if (!clientOrg.testOnly) {
        update.apiKeyProd = `P_${generateUniqueId()}`
        if (!clientOrg.ext || !clientOrg.vendor) {
          throw new Error(
            'Attempting to enable production mode without supplying all vendor info (vendor, and ext)'
          )
        }
      }
    }
    if (clientOrg.details) {
      update.details = clientOrg.details
    }
    if (clientOrg.ext) {
      update.ext = clientOrg.ext
    }
    update.updated = new Date()


    await admin.firestore().collection(COLLECTIONS.CLIENT_ORGS)
      .doc(clientOrg.name!)
      .update(update)

    const successMessage = HANZO_RESPONSE_CODES.API_SUCCESS + `'${clientOrg.name}' successfully updated.`
    res.status(200).json({hanzoAuthMessage: successMessage})
  } 
  catch (e) {
    const pair = errorToCodeAndMessage(e)
    res.status(pair.code).send(pair.message)
  }
}

export default updateClientOrg
