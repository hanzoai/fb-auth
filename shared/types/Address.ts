interface Address {
  line1: string
  line2?: string
  city: string
  state: string
  postalCode: string
  country?: string
}

export {
  type Address as default
}