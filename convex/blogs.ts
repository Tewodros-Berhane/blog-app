import { mutation } from "./_generated/server";
import { ConvexError, v } from "convex/values";
import { authComponent } from "./auth";
import { query } from "./_generated/server";
import { Doc } from "./_generated/dataModel";

export const createBlog = mutation({
  args: {
    title: v.string(),
    content: v.string(),
    imageStorageId: v.id("_storage"),
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

export const getBlogById = query({
  args: {
    blogId: v.id("blogs"),
  },
  handler: async (ctx, args) => {
    const blog = await ctx.db.get(args.blogId);
    if (!blog) {
      throw new ConvexError("Not found");
    }
    const resolvedImageUrl = blog.imageStorageId
      ? await ctx.storage.getUrl(blog.imageStorageId)
      : null;
    return {
      ...blog,
      imageUrl: resolvedImageUrl,
    };
  },
});

interface searchResultTypes {
  _id: string;
  title: string;
  content: string;
}


export const searchBlogs = query({
  args: {
    term: v.string(),
    limit: v.number(),
  },
  handler: async (ctx, args) => {
    const limit = args.limit;
    const results: Array<searchResultTypes> = [];
    const seen = new Set();

    const pushDocs = async (docs: Array<Doc<'blogs'>>) => {
      for (const doc of docs) {
        if (seen.has(doc._id)) {
          continue;
        }
        seen.add(doc._id);
        results.push({
          _id: doc._id,
          title: doc.title,
          content: doc.content,
        });
        if (results.length >= limit) {
          break;
        }
      }
    };

    const titleMatches = await ctx.db.query("blogs").withSearchIndex("search_title", (q) => q.search("title", args.term)).take(limit);
    
    await pushDocs(titleMatches);

    if (results.length < limit) {
      const contentMatches = await ctx.db.query("blogs").withSearchIndex("search_content", (q) => q.search("content", args.term)).take(limit);
      await pushDocs(contentMatches);
    }
    
    return results;
    
  },
});