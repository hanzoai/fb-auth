import * as admin from 'firebase-admin'

const datetimeToDateServer = ( obj: any ): Date => {

  if ('nanoseconds' in obj && 'seconds' in obj) {
    return new admin.firestore.Timestamp(obj.seconds, obj.nanoseconds).toDate() 
  }
  else if (!!obj.getDate()) {
    return obj as Date
  }
  return (new Date((typeof obj === 'string')? obj as string : obj.toString()))
}

export default datetimeToDateServer