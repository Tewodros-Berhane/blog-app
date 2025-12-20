'use client';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema } from "@/app/schemas/auth";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import z from "zod";

export default function LoginPage() {
    const form =useForm({
        resolver:zodResolver(signInSchema),
        defaultValues:{
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
                <CardTitle>Login</CardTitle>
                <CardDescription>Login to your account</CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup className="gap-y-4">
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
                        <Button>Login</Button>
                    </FieldGroup>
                </form>
            </CardContent>
        </Card>
    );
}