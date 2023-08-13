import React from 'react'
import { AdminLayout } from 'layouts'
import { Dashboard } from 'app/dashboard/Dashboard'

const UserAccount: React.FC = () => (
  <AdminLayout>
    <Dashboard />
  </AdminLayout>
)

export default UserAccount
