'use client';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { logInSchema } from "@/app/schemas/auth";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import z from "zod";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Loader2 } from "lucide-react";

export default function LoginPage() {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();
    const form = useForm({
        resolver: zodResolver(logInSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    })
    function onSubmit(data: z.infer<typeof logInSchema>) {
        startTransition(async () => {
            await authClient.signIn.email({
                email: data.email,
                password: data.password,
                fetchOptions: {
                    onSuccess: () => {
                        toast.success("Logged in successfully");
                        router.push("/");
                    },
                    onError: (error) => {
                        toast.error(error.error.message);
                    }
                }
            })
        })
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
                        <Controller name="email" control={form.control} render={({ field, fieldState }) => (
                            <Field>
                                <FieldLabel>Email</FieldLabel>
                                <Input aria-invalid={fieldState.invalid} placeholder="Enter your email" {...field} />
                                {fieldState.invalid &&
                                    <FieldError errors={[fieldState.error]} />
                                }
                            </Field>
                        )} />
                        <Controller name="password" control={form.control} render={({ field, fieldState }) => (
                            <Field>
                                <FieldLabel>Password</FieldLabel>
                                <Input type="password" aria-invalid={fieldState.invalid} placeholder="********" {...field} />
                                {fieldState.invalid &&
                                    <FieldError errors={[fieldState.error]} />
                                }
                            </Field>
                        )} />
                        <Button disabled={isPending}>{isPending ? (
                            <>
                                <Loader2 className="size-4 animate-spin" />
                                <span>logging in...</span>
                            </>
                        ) : (
                            <span>login</span>
                        )}</Button>
                    </FieldGroup>
                </form>
            </CardContent>
        </Card>
    );
}