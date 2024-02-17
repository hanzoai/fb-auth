
import type Address from './Address'
import type Name from './Name'

export default interface PersonalInfo {
  name: Name
  address: Address
  phone?: string
  email?: string
}
