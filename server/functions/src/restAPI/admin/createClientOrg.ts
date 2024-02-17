import  { onRequest} from 'firebase-functions/v2/https'
import * as admin from 'firebase-admin'
import { v4 as generateUniqueId } from 'uuid'

import type { ClientOrg, ClientOrgParams } from '@hanzo/fb-auth-shared/types'
import { errorToCodeAndMessage } from '@hanzo/fb-auth-shared/util'

import { HANZO_RESPONSE_CODES,COLLECTIONS } from '@hanzo/fb-auth-shared'

const createClientOrg = onRequest(async (req, res): Promise<void> => {

  const { 
    name,
    vendor,
    adminEmail,
    users,
    testOnly,
    details,
    ext 
  } = req.body as ClientOrgParams

  let optional: any = {}
  if (ext) {
    optional.ext = ext
  }
  if (testOnly) {
    optional.vendor = 'none'
  } 
  else {
    optional.apiKeyProd = `P_${generateUniqueId()}`
  }

  const clientOrg: ClientOrg = {
    name,
    vendor,
    adminEmail,
    testOnly,
    details,
    users: users ? users : [],
    apiKeyTest: `T_${generateUniqueId()}`,
    created: new Date(),
    updated: new Date(),
    ...optional
  }

  try {
    await admin
      .firestore()
      .collection(COLLECTIONS.CLIENT_ORGS)
      .doc(clientOrg.name)  // so that it's human readable in Firestore
      .set(clientOrg)

    const successMessage = `'${clientOrg.name}' created successfully.`
    res.status(200).json({hanzoAuthMessage: HANZO_RESPONSE_CODES.API_SUCCESS + successMessage})
  } 
  catch (e) {
    const pair = errorToCodeAndMessage(e)
    res.status(pair.code).send(pair.message)
  }
})

export default createClientOrg
