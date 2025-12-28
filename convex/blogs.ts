import { mutation } from "./_generated/server";
import { ConvexError, v } from "convex/values";
import { authComponent } from "./auth";
import { query } from "./_generated/server";

export const createBlog = mutation({
  args: {
    title: v.string(),
    content: v.string(),
    imageStorageId: v.optional(v.id("_storage")),
  },
  handler: async (ctx, args) => {
    const user = await authComponent.safeGetAuthUser(ctx);
    if (!user) {  
      throw new ConvexError("Not authenticated");
    }
    const newBlog = await ctx.db.insert("blogs", {
      title: args.title,
      content: args.content,
      authorId: user._id,
      imageStorageId: args.imageStorageId,
    });
    return newBlog;
  },
});

export const getBlogs = query({
  args: {},
  handler: async (ctx) => {
    const blogs = await ctx.db.query("blogs").order("desc").collect();

    // Convert storage IDs to URLs
    const blogsWithUrls = await Promise.all(
      blogs.map(async (blog) => {
        const imageUrl = blog.imageStorageId
          ? await ctx.storage.getUrl(blog.imageStorageId)
          : null;
        return {
          ...blog,
          imageUrl,
        };
      })
    );

    return blogsWithUrls;
  },
});

export const generateImageUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    const user = await authComponent.safeGetAuthUser(ctx);
    if (!user) {
      throw new ConvexError("Not authenticated");
    }
    const uploadUrl = await ctx.storage.generateUploadUrl();
    return uploadUrl;
  },
});
