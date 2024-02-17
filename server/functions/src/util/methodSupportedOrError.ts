import * as functions from 'firebase-functions'

const methodSupportedOrError = (
  req: functions.https.Request,
  supportedMethods: string | string[]
): void => {

  const arrayOfMethods = Array.isArray(supportedMethods) ? supportedMethods : [supportedMethods]

  if (!arrayOfMethods.includes(req.method)) {
    throw new Error('CODE405: Unauthorized Method') 
  }
}

export default methodSupportedOrError