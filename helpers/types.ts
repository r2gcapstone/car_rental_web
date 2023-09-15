export interface SignUpTypes {
  email: string
  firstName: string
  lastName: string
  address: string
  password: string
  confirmPassword: string
  mobileNumber: string
  uploadImage?: File[]
}

export interface AccountDataTypes {
  dateCreated: string
  email: string
  firstName: string
  lastName: string
  address: string
  mobileNumber: string
  imageUrl: string
}
