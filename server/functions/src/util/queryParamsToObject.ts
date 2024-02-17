import * as functions from 'firebase-functions'

const queryParamsToObject = (
  req: functions.https.Request,
  paramDescs: Map<string, string> // key => type
): any => {

  const result: any = {}
  paramDescs.forEach((value, key) => {
    if (req.params[key]) {
      switch (value) {
        case 'string':
          result[key] = req.params[key]
        break
        case 'number':
          result[key] = +req.params[key] // unary + ("to number")
        break
        case 'boolean':
          result[key] = JSON.parse(req.params[key])
        break
        case 'Date':
          result[key] = new Date(req.params[key])
        break
      }
    }
  })
  return result
}

export default queryParamsToObject