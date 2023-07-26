import React from 'react'
import { DefaultLayout } from 'layouts'
import { SignIn } from 'app/sign-in/SignIn'

const UserAccount: React.FC = () => (
  <DefaultLayout>
    <SignIn />
  </DefaultLayout>
)

export default UserAccount
