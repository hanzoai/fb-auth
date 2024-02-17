import * as functions from 'firebase-functions'

const API_KEY = 'hanzo-client-key'

const apiKeyOrError = (req: functions.https.Request, key: string = API_KEY): string => {
  if (!(key in req.headers)) {
    throw new Error('CODE403: API key required') 
  }

  const found = req.headers[key] as string 
  if (found === 'undefined' || found === undefined) { // rare edge case
    throw new Error('CODE403: API key required') 
  }
  return found
}

export default apiKeyOrError