'use server';

import z from "zod";
import { blogSchema } from "./schemas/blog";
import { getToken } from "@/lib/auth-server";
import { api } from "@/convex/_generated/api";
import { redirect } from "next/navigation";
import { fetchMutation } from "convex/nextjs";

export async function createBlogAction(data: z.infer<typeof blogSchema>) {
    const validatedData = blogSchema.safeParse(data);
    if (!validatedData.success) {
        throw new Error("Something went wrong");
    }

    const token = await getToken();
    if (!token) {
        throw new Error("Unauthorized");
    }
    await fetchMutation(api.blogs.createBlog, {
        title: validatedData.data.title,
        content: validatedData.data.content,
    }, { token });
    return redirect("/");
}

