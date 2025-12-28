"use server";

import z from "zod";
import { blogSchema } from "./schemas/blog";
import { getToken } from "@/lib/auth-server";
import { api } from "@/convex/_generated/api";
import { redirect } from "next/navigation";
import { fetchMutation } from "convex/nextjs";
import { revalidatePath } from "next/cache";

export async function createBlogAction(data: z.infer<typeof blogSchema>) {
  try {
    const validatedData = blogSchema.safeParse(data);
    if (!validatedData.success) {
      throw new Error("Something went wrong");
    }

    const token = await getToken();
    if (!token) {
      throw new Error("Unauthorized");
    }
    const uploadUrl = await fetchMutation(
      api.blogs.generateImageUploadUrl,
      {},
      { token }
    );
    const uploadResult = await fetch(uploadUrl, {
      method: "POST",
      headers: {
        "Content-Type": validatedData.data.image.type,
      },
      body: validatedData.data.image,
    });

    if (!uploadResult.ok) {
      return {
        error: "Failed to upload file",
      };
    }

    const { storageId } = await uploadResult.json();

    await fetchMutation(
      api.blogs.createBlog,
      {
        title: validatedData.data.title,
        content: validatedData.data.content,
        imageStorageId: storageId,
      },
      { token }
    );
  } catch (error) {
    return {
      error: "Failed to create blog",
    };
  }
  revalidatePath("/blog");
  return redirect("/blog");
}
