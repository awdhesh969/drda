import DashboardHeader from '@/components/common/DashboardHeader'
import Popup from '@/components/common/Popup'
import { talukaColumns } from '@/components/data-table/columns/talukaColumns'
import DataTable from '@/components/data-table/DataTable'
import Layout from '@/components/layout/Layout'
import AddTaluka from '@/components/modals/talukas/AddTaluka'
import { Button } from '@/components/ui/button'
import { useTalukaList, useTalukas } from '@/features/location/hooks/useLocation'
import useAbility from '@/hooks/useAbility'
import { addTalukaSchema } from '@/validation/location/addTalukaSchema'
import { Eye, Plus, PlusIcon } from 'lucide-react'
import React, { useEffect, useMemo } from 'react'

const Talukas = () => {
   const initialFormData = {
      name: "",
      census_code: "",
      district_id: "",
    };
  const [formData, setFormData] = React.useState(initialFormData);
  const {data:talukasData, isLoading: isLoadingTalukas} = useTalukaList();
  const talukas = useMemo(() => talukasData?.data ?? [], [talukasData]);
  const [open, setOpen] = React.useState(false);
  const [errors, setErrors] = React.useState({});
  const ability = useAbility()
  const columns = useMemo(
    () => talukaColumns(ability),
    [ability]
  );

  const handleClose = () => {
    setFormData(initialFormData);
    setErrors({});
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "", // Clear the error for the changed field
    }));
  }

  const handleSubmit = () => {
    const newErrors = addTalukaSchema.safeParse(formData);
    if (!newErrors.success) {
      const fieldErrors = {};
      newErrors.error.issues.forEach((error) => {
        fieldErrors[error.path[0]] = error.message;
      });
      setErrors(fieldErrors);
      return;
    }

    // Handle form submission logic here
  }

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
           <AddTaluka 
              open={open} 
              onClose={handleClose}
              setFormData={setFormData}
              formData={formData}
              handleChange={handleChange}
              errors={errors}
              handleSubmit={handleSubmit}
            />
    </Layout>
  )
}

export default Talukas