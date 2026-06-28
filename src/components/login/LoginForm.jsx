import React from 'react';
import { Button } from '../ui/button';
import { zodResolver } from "@hookform/resolvers/zod";
import { Field, FieldDescription, FieldLabel } from '../ui/field';
import { InputGroup, InputGroupAddon, InputGroupInput } from '../ui/input-group';
import { ArrowBigLeft, ArrowRight, Eye, EyeOff, LoaderCircle, Lock, Phone } from 'lucide-react';
import { useForm } from "react-hook-form"
import { loginSchema } from '@/validation/login/loginSchema';
import { useLogin } from '@/features/login/useLogin';
import { useRouter } from 'next/router';
import FormStatus from './FormStatus';

const LoginForm = () => {
    const [error, setError] = React.useState("");
    const [showPassword, setShowPassword] = React.useState(false);
    const loginMutation = useLogin();
    const router = useRouter();

   const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm({
        resolver: zodResolver(loginSchema),
    });

    const onSubmit = async (data) => {
       try {
            const response = await loginMutation.mutateAsync(data);
            if (response.status === true && response?.data?.token) {
                router.push("/dashboard");
            }else {
                setError(response.data.message || "Login failed. Please check your credentials and try again.");
            }
        } catch (error) {
            console.error("Login failed:", error);
            setError("Login failed. Please check your credentials and try again.");
        }
    };
    
  return (
    <div>
        <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
            {error && <FormStatus error={error} />}
            <Field>
                <FieldLabel htmlFor="user-mobile">Official Phone Number</FieldLabel>
                <InputGroup className="w-full h-10 has-[[data-slot=input-group-control]:focus-visible]:ring-blue-600/50">
                    <InputGroupInput minLength={10} maxLength={10} id="user-mobile" {...register("mobile")} placeholder="Enter 10 digit mobile number" className="" required />
                    <InputGroupAddon className="px-2">
                    <Phone />
                    </InputGroupAddon>
                </InputGroup>
                {errors.mobile && <FieldDescription className="text-xs text-red-500 font-bold">{errors.mobile.message}</FieldDescription>}
            </Field>
            <Field>
                <FieldLabel htmlFor="user-password">Password</FieldLabel>
                <InputGroup className="w-full h-10 has-[[data-slot=input-group-control]:focus-visible]:ring-blue-600/50">
                    <InputGroupInput className="" id="user-password" {...register("password")} type={showPassword ? "text" : "password"} placeholder="Enter your password (min. 8 characters)" required />
                    <InputGroupAddon className="px-2">
                        <Lock />
                    </InputGroupAddon>
                    <InputGroupAddon align="inline-end">
                        <Button type="button" onClick={() => setShowPassword(!showPassword)} variant="ghost" size="icon" className="h-10 w-10 p-0">
                            {
                            showPassword ? 
                            <EyeOff className="h-4 w-4" />
                             : <Eye className="h-4 w-4" />
                            }
                        </Button>
                    </InputGroupAddon>
                </InputGroup>
                {errors.password && <FieldDescription className="text-xs text-red-500 font-bold">{errors.password.message}</FieldDescription>}
            </Field>
            <Field>
                <Button className="w-full h-12 px-6 py-4 rounded-xl bg-gradient-to-r from-tech-blue-600 to-tech-blue-500 text-white font-bold text-sm shadow-lg shadow-tech-blue-500/30 hover:shadow-xl hover:shadow-tech-blue-500/40 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed" type="submit" size="lg">
                    {isSubmitting ?  
                    <>
                        <LoaderCircle className="ml-2 h-4 w-4 animate-spin" />
                        Logging in...
                    </> : 
                    <span className="flex items-center justify-center gap-2">
                        <span>Access Dashboard</span> <ArrowRight className="h-4 w-4" />
                    </span>
                    }
                </Button>
            </Field>
        </form>
    </div>
  )
}

export default LoginForm