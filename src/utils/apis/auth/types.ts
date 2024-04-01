import * as z from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email("Not a valid email"),
  password: z.string().min(1, { message: "Password is required" }),
});

export const registerSchema = z
  .object({
    fullname: z.string().min(1, { message: "Full name is required" }),
    email: z
      .string()
      .min(1, { message: "Email is required" })
      .email("Not a valid email"),
    handphone: z
      .string()
      .min(8, { message: "Phone Number minimum length is 8" }),
    password: z
      .string()
      .min(6, { message: "Password must be at least 6 characters" }),
    ktp: z
      .string()
      .min(16, { message: "Ktp Number minimum length is 16" }),
    npwp: z
      .string()
      .min(8, { message: "Phone Number minimum length is 16" }),
    
  })

  export const verificationSchema = z
  .object({
    photo_ktp: z.string().min(1, {message: "Upload your photo first"}),
    photo_npwp: z.string().min(1, {message: "Upload your photo first"}),
    photo_selfie: z.string().min(1, {message: "Upload your photo first"}),

  });
  
export type LoginType = z.infer<typeof loginSchema>;
export type RegisterType = z.infer<typeof registerSchema>;
export type  VerificationType = z.infer<typeof verificationSchema>;