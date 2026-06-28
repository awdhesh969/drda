import z from "zod";

export const loginSchema = z.object({
  mobile: z.string()
    .min(10, { message: "Mobile number must be 10 digits" })
    .max(10, { message: "Mobile number must be 10 digits" })
    .regex(/^[0-9]{10}$/, { message: "Mobile number must be 10 digits" }),
  password: z.string()
    .min(8, { message: "Password must be at least 8 characters" }),
});