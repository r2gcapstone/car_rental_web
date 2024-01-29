import React from 'react'
import { VehicleDashboard } from 'app/admin'
import { AdminLayout } from 'layouts'

const VehicleManagement: React.FC = () => (
  <AdminLayout>
    <VehicleDashboard />
  </AdminLayout>
)

export default VehicleManagement
