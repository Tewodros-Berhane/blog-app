'use client';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signUpSchema } from "@/app/schemas/auth";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SignUpPage() {
    const form =useForm({
        resolver:zodResolver(signUpSchema),
        defaultValues:{
            name:"",
            email:"",
            password:"",
        }
    })
    function onSubmit() {
        console.log("Form submitted")
    }
    return (
        <Card>
            <CardHeader>
                <CardTitle>Sign Up</CardTitle>
                <CardDescription>Sign up to create an account</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup className="gap-y-4">
                        <Controller name="name" control={form.control} render={({field, fieldState}) => (
                            <Field>
                                <FieldLabel>Full Name</FieldLabel>
                                <Input aria-invalid={fieldState.invalid} placeholder="Enter your full name" {...field}/>
                                {fieldState.invalid && 
                                <FieldError errors={[fieldState.error]}/>
                                }
                            </Field>
                        )}/>
                        <Controller name="email" control={form.control} render={({field, fieldState}) => (
                            <Field>
                                <FieldLabel>Email</FieldLabel>
                                <Input aria-invalid={fieldState.invalid} placeholder="Enter your email" {...field}/>
                                {fieldState.invalid && 
                                <FieldError errors={[fieldState.error]}/>
                                }
                            </Field>
                        )}/>
                        <Controller name="password" control={form.control} render={({field, fieldState}) => (
                            <Field>
                                <FieldLabel>Password</FieldLabel>
                                <Input type="password" aria-invalid={fieldState.invalid} placeholder="********" {...field}/>
                                {fieldState.invalid && 
                                <FieldError errors={[fieldState.error]}/>
                                }
                            </Field>
                        )}/>
                        <Button>Sign Up</Button>
                    </FieldGroup>
                </form>
            </CardContent>
        </Card>
    );
}