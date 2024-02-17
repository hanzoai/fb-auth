import firebase from 'firebase/compat/app'
import { useMediaQuery, useTheme } from '@material-ui/core'

import type {SimpleHandler, NavElement} from '~/types/app'

export const useIsMobile = (): boolean => {
  const theme = useTheme()
  return useMediaQuery(theme.breakpoints.down('sm'))
}

export const mapNavElementHandler = (
  el: NavElement, 
  map?: Map<string, SimpleHandler>
): SimpleHandler | undefined => {
  if (el.handler) return el.handler
  if (el.namedHandler) {
    if (!map) {
      throw new Error('mapNavElementHandler(): NavElement contains named handler, but no Map was provided!')
    }
    const handler = (map as Map<string, SimpleHandler>).get(el.namedHandler)
    if (!handler) {
      throw new Error(`mapNavElementHandler(): NavElement contains named handler, but Map contains no function matching ${el.namedHandler}!`)
    }
    return handler
  }
  return undefined
} 

export const isValidEmail = (str: string): boolean => (
  /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(str) 
)

  // acceptable types:
  // 1) firestore.Timestamp,
  // 2) Date,
  // 3) string that is UTC ish
  
export const datetimeToDateWeb = ( obj: any ): Date => {

  if ('nanoseconds' in obj && 'seconds' in obj) {
    
    return new firebase.firestore.Timestamp(obj.seconds, obj.nanoseconds).toDate() 
  }
  else if (!!obj.getDate()) {
    return obj as Date
  }
  return (new Date((typeof obj === 'string')? obj as string : obj.toString()))
}
  

// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~



export { 
  pluralize, 
  fillNounDisplay 
} from './pluralize'

export { default as FieldRenderer } from './FieldRenderer'
export type { FieldRenderDescriptor, RenderedFieldProps } from './FieldRenderer'

export { default as creditCardImageUrlFromType, renderDefaultCCImage } from './creditCardFromType'
export type { ImageDesc } from './creditCardFromType' // promote this?

export { default as getTestTransaction} from './getTestTransaction'
export { default as Bouncer} from './Bouncer'
