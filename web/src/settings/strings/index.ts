import Strings from './Strings'

export const APP_NAME = 'lux login'
const inst = new Strings([
  ['appTitleShortLower', 'login'],
  ['appTitleShortCaps', APP_NAME],
  ['appTitleFull', APP_NAME],
  ['appTitleLegal', 'Payminto, Inc'],
  ['copyright', 'Copyright © 2020'],
  ['allRights', 'All Rights Reserved'],
  ['contactUs', 'Contact Us'],
  ['searchResults', 'Search Results'],
  ['product', 'payment'],  
  ['productCaps', 'Payment'],  
  ['productPlural', 'payments'],
  ['productPluralCaps', 'Payments'],
//  ['signupThankYouTitle', 'Check your email'],
//  ['signupThankYouDetail', 'You will receive further instructions on how to complete the process.'],
])

export default (key: string, d?: string): string => (inst.get(key, d))
