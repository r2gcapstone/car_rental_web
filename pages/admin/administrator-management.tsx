import React from 'react'
import AdministratorDashboard from 'app/admin/administratorManagement/administrator-dashboard'
import { AdminLayout } from 'layouts'

const AdministratorManagement: React.FC = () => (
  <AdminLayout>
    <AdministratorDashboard />
  </AdminLayout>
)

export default AdministratorManagement
