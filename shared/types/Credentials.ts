interface Credentials {
  email: string
  password: string
  password2?: string
  oobCode?: string
}

export {
  type Credentials as default
} 