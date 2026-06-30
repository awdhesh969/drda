import DashboardHeader from '@/components/common/DashboardHeader'
import Popup from '@/components/common/Popup'
import { talukaColumns } from '@/components/data-table/columns/talukaColumns'
import DataTable from '@/components/data-table/DataTable'
import Layout from '@/components/layout/Layout'
import { Button } from '@/components/ui/button'
import { useTalukaList, useTalukas } from '@/features/location/hooks/useLocation'
import useAbility from '@/hooks/useAbility'
import { Eye, Plus, PlusIcon } from 'lucide-react'
import React, { useEffect, useMemo } from 'react'

const Talukas = () => {
  const {data:talukasData, isLoading: isLoadingTalukas} = useTalukaList();
    const talukas = useMemo(() => talukasData?.data ?? [], [talukasData]);
    const [open, setOpen] = React.useState(false);
    const ability = useAbility()
    const columns = useMemo(
      () => talukaColumns(ability),
      [ability]
    );

  return (
    <Layout>
        <DashboardHeader
          title="Talukas Management"
          subtitle="Manage and monitor administrative talukas across Goa."
          buttons={[
            {
              label: "Add Taluka",
              icon: Plus,
              onClick: () => {
                setOpen(true);
              },
            },
          ]}
        />
        <DataTable
          columns={columns}
          data={talukas}
          searchKey={["name", "census_code"]}
          searchPlaceholder="Search talukas..."
          // toolbarActions={
          //   <Button onClick={() => {
          //     // Handle add taluka action
          //   }} variant="default" size="default">
          //     <PlusIcon className="" />
          //     Add Taluka
          //   </Button>
          // }
           />
           <Popup
            open={open} 
            onClose={() => setOpen(false)} 
            // title="Taluka Details" 
            // subtitle="Detailed information about the taluka" 
            icon={Eye}
            className="max-w-4xl"
           >
            <div>
              hello
            </div>

           </Popup>
    </Layout>
  )
}

export default Talukas