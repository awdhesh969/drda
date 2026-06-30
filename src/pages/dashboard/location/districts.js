import DashboardHeader from '@/components/common/DashboardHeader'
import { districtColumns, getUserColumns } from '@/components/data-table/columns/districtColumn'
import DataTable from '@/components/data-table/DataTable'
import Layout from '@/components/layout/Layout'
import { Button } from '@/components/ui/button'
import { useDistricts } from '@/features/location/hooks/useLocation'
import useAbility from '@/hooks/useAbility'
import { Plus, PlusIcon } from 'lucide-react'
import React, { useMemo } from 'react'

const Districts = () => {
  const {data:districtsData, isLoading: isLoadingDistricts} = useDistricts();
  const districts = useMemo(() => districtsData?.data ?? [], [districtsData]);

  const ability = useAbility()
  const columns = useMemo(
    () => districtColumns(ability),
    [ability]
  );
  return (
    <Layout>
        <DashboardHeader
          title="Districts Management"
          subtitle="Manage and monitor administrative districts across Goa."
          // buttons={[
          //   {
          //     label: "Add District",
          //     icon: Plus,
          //     onClick: () => {
        
          //     },
          //   },
          // ]}
        />
        <DataTable
          columns={columns}
          data={districts}
          searchKey={["name", "email", "role"]}
          searchPlaceholder="Search users..."
          toolbarActions={
            <Button onClick={() => {
              // Handle add user action
            }} variant="default" size="default">
              <PlusIcon className="" />
              Add District
            </Button>
          }
           />
    </Layout>
  )
}

export default Districts