'use client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { blogSchema } from "@/app/schemas/blog";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import z from "zod";
import { useTransition } from "react";
// import { toast } from "sonner";
import { createBlogAction } from "@/app/actions";


export default function CreateRoute() {
    const [isPending, startTransition] = useTransition();
    const form =useForm({
            resolver:zodResolver(blogSchema),
            defaultValues:{
                title:"",
                content:"",
            }
        })
    function onSubmit(data: z.infer<typeof blogSchema>) {
        startTransition(async () => {
            console.log("From the client");
            await createBlogAction(data);
            // toast.success("Blog created successfully");
        })
    }
    return (
        <div className="py-12">
            <div className="text-center mb-4">
                <h1 className="font-extrabold text-4xl tracking-tight sm:text-5xl">Create your own article</h1>
                <p className="pt-4 text-xl text-muted-foreground">Share your knowledge and experience with the world</p>
            </div>
            <Card className="w-full max-w-xl mx-auto">
                <CardHeader>
                    <CardTitle>Create blog article</CardTitle>
                    <CardDescription>Create a new blog article</CardDescription>
                </CardHeader>
                <CardContent>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup className="gap-y-4">
                        <Controller name="title" control={form.control} render={({ field, fieldState }) => (
                            <Field>
                                <FieldLabel>Title</FieldLabel>
                                <Input aria-invalid={fieldState.invalid} placeholder="Enter your title" {...field} />
                                {fieldState.invalid &&
                                    <FieldError errors={[fieldState.error]} />
                                }
                            </Field>
                        )} />
                        <Controller name="content" control={form.control} render={({ field, fieldState }) => (
                            <Field>
                                <FieldLabel>Content</FieldLabel>
                                <Textarea aria-invalid={fieldState.invalid} placeholder="Enter your content" {...field} />
                                {fieldState.invalid &&
                                    <FieldError errors={[fieldState.error]} />
                                }
                            </Field>
                        )} />
                        <Button disabled={isPending}>{isPending ? (
                            <>
                                <Loader2 className="size-4 animate-spin" />
                                <span>Creating...</span>
                            </>
                        ) : (
                            <span>Create Blog</span>
                        )}</Button>
                    </FieldGroup>
                </form>
                </CardContent>
            </Card>
        </div>
    )
}