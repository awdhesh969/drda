import Popup from '@/components/common/Popup'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Field, FieldError, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useDistricts } from '@/features/location/hooks/useLocation'
import { Eye } from 'lucide-react'
import React, { useMemo } from 'react'
import { GradientDialog } from '../modalHead/GradientDialog'

const AddTaluka = ({ open, onClose, formData, setFormData, handleChange, handleSubmit, errors = {}, }) => {
    const {data:districtsData, isLoading: isLoadingDistricts} = useDistricts();
    const districts = useMemo(() => districtsData?.data ?? [], [districtsData]);
  return (
    <Dialog open={open} onOpenChange={onClose}
    >
        <GradientDialog
          title="Add Taluka"
          description="Fill in the details to add a new Taluka"
        >
                <Field className="group/field">
                    <Label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 group-focus-within/field:text-[#3b52ab] transition-colors" htmlFor="name">Taluka Name</Label>
                    <Input
                        aria-invalid={!!errors.name}
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter Taluka Name"
                        autoComplete="off"
                    />
                    {errors.name && (
                        <FieldError className="text-xs">{errors.name}</FieldError>
                    )}
                </Field>
                <Field className="group/field">
                    <FieldLabel className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 group-focus-within/field:text-[#3b52ab] transition-colors" htmlFor="census_code">Census Code</FieldLabel>
                    <Input
                        aria-invalid={!!errors.census_code}
                        id="census_code"
                        name="census_code"
                        value={formData.census_code}
                        onChange={handleChange}
                        placeholder="Enter Census Code"
                        autoComplete="off"
                    />
                    {errors.census_code && (
                        <FieldError className="text-xs">{errors.census_code}</FieldError>
                    )}
                </Field>
                <Field className="group/field">
                    <FieldLabel id="district-label" className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1 group-focus-within/field:text-[#3b52ab] transition-colors">Parent District</FieldLabel>
                    <Select id="district" name="district_id"
                        className="w-full"
                        value={formData.district_id}
                        onValueChange={(value) => handleChange({ target: { name: "district_id", value } })}
                    >
                        <SelectTrigger aria-labelledby="district-label" aria-invalid={!!errors.district_id} className="w-full">
                            <SelectValue placeholder="Select District" />
                        </SelectTrigger>
                        <SelectContent>
                        <SelectGroup>
                            <SelectLabel>Districts</SelectLabel>
                            <SelectItem disabled value="none">Select District</SelectItem>
                            {districts.map((district) => (
                                <SelectItem key={district.id} value={district.id}>
                                    {district.name}
                                </SelectItem>
                            ))}
                        </SelectGroup>
                        </SelectContent>
                    </Select>
                    {errors.district_id && (
                        <FieldError className="text-xs">{errors.district_id}</FieldError>
                )}
                </Field>
            <DialogFooter>
                <Button variant="outline" onClick={onClose}>Cancel</Button>
                <Button onClick={handleSubmit}>Add Taluka</Button>
            </DialogFooter>
        </GradientDialog>
    </Dialog>
  )
}

export default AddTaluka