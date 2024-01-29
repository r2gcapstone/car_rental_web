import React from 'react'
import { TransactionDashboard } from 'app/admin'
import { AdminLayout } from 'layouts'

const TransactionManagement: React.FC = () => (
  <AdminLayout>
    <TransactionDashboard />
  </AdminLayout>
)

export default TransactionManagement
