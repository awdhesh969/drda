import z from "zod";

export const addTalukaSchema = z.object({
  name: z
    .string()
    .trim()
    // 1. If blank after trim, this fires first and stops
    .min(1, { message: "Taluka name is required" }) 
    .max(100, { message: "Taluka name must be at most 100 characters" })
    // 2. Changing + to * ensures this doesn't conflict with min(1) on empty inputs
    .regex(/^[A-Za-z\s]*$/, { message: "Taluka name must contain only letters and spaces" }),

  census_code: z
    .string()
    .trim()
    // 1. If blank, this fires first
    .min(1, { message: "Census code is required" })
    // 2. Changing + to * ensures it only checks format if text exists
    .regex(/^[0-9]*$/, { message: "Census code must contain only numbers" })
    .max(4, { message: "Census code must be at most 4 digits" }),

  district_id: z
    .string()
    .trim()
    .min(1, { message: "Parent district is required" }),
});