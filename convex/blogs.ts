import { mutation } from "./_generated/server";
import { ConvexError, v } from "convex/values";
import { authComponent } from "./auth";
import { query } from "./_generated/server";

export const createBlog = mutation({
  args: { title: v.string(), content: v.string() },
  handler: async (ctx, args) => {
    const user = await authComponent.safeGetAuthUser(ctx);
    if (!user) {
      throw new ConvexError("Not authenticated");
    }
    const newBlog = await ctx.db.insert("blogs", { title: args.title, content: args.content, authorId: user._id });
    return newBlog;
  },
});

export const getBlogs = query({
  args: {},
    handler: async (ctx) => {
      const blogs = await ctx.db.query('blogs').order('desc').collect();
      return blogs;
    },
});
