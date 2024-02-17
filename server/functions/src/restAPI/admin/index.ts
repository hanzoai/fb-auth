//import * as functions from 'firebase-functions'
import { onRequest } from 'firebase-functions/v2/https'

import { errorToCodeAndMessage } from '@hanzo/fb-auth-shared/util'

import { apiKeyOrError, methodSupportedOrError} from '../../util'

import createClientOrg from './createClientOrg'
import updateClientOrg from './updateClientOrg'

// https://firebase.google.com/docs/functions/config-env?gen=2nd#params
//const ADMIN_API_KEY = functions.config().hanzo.apikey
const ADMIN_API_KEY =  "2fad3d066701"

const HEADER_KEY = 'my-prescious'

const client = onRequest(async (req, res): Promise<void> => {

  try {
    methodSupportedOrError(req, ['POST', 'PUT'])
    const apiKey = apiKeyOrError(req, HEADER_KEY)
    //functions.logger.log("KEY SOUGHT: " + ADMIN_API_KEY + ', KEY FOUND: ' + apiKey)
    if (apiKey !== ADMIN_API_KEY) {
      throw new Error('CODE401: Unauthorized Access')
    }
  }
  catch (e) {
    const pair = errorToCodeAndMessage(e)
    res.status(pair.code).send(pair.message)
    return
  }
  return (req.method === "POST") ? createClientOrg(req, res) : updateClientOrg(req, res)
})

export { client }