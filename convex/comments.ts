import { mutation } from "./_generated/server";
import { ConvexError, v } from "convex/values";
import { authComponent } from "./auth";
import { query } from "./_generated/server";

export const createComment = mutation({
  args: {
    blogId: v.id("blogs"),
    content: v.string(),
  },
  handler: async (ctx, args) => {
    const user = await authComponent.safeGetAuthUser(ctx);
    if (!user) {
      throw new ConvexError("Not authenticated");
    }
    const newComment = await ctx.db.insert("comments", {
      blogId: args.blogId,
      content: args.content,
      authorId: user._id,
      authorName: user.name,
    });
    return newComment;
  },
});

export const getComments = query({
  args: {
    blogId: v.id("blogs"),
  },
  handler: async (ctx, args) => {
    const comments = await ctx.db
      .query("comments")
      .filter((q) => q.eq(q.field("blogId"), args.blogId))
      .order("desc")
      .collect();
    return comments;
  },
});
