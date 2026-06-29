import DashboardHeader from '@/components/common/DashboardHeader'
import { columns, getColumns } from '@/components/data-table/columns/userColumns'
import DataTable from '@/components/data-table/DataTable'
import Layout from '@/components/layout/Layout'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import React from 'react'

const data = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    role: "Admin",
  },
  {
    id: 2,
    name: "Jane Doe",
    email: "jane@example.com",
    role: "User",
  },
];

const districts = () => {
  return (
    <Layout>
        <DashboardHeader
          title="Districts Management"
          subtitle="Manage and monitor administrative districts across Goa."
          buttons={[
            {
              label: "Add District",
              icon: Plus,
              onClick: () => {
                // Handle add district action
              },
            },
          ]}
        />
        <DataTable
          columns={columns}
          data={data}
          searchKey={["name", "email", "role"]}
          searchPlaceholder="Search users..."
          toolbarActions={
            <Button onClick={() => {
              // Handle add user action
            }} variant="primary" size="sm">
              Add User
            </Button>
          }
           />
    </Layout>
  )
}

export default districts