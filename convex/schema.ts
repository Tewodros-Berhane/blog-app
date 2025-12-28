import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    blogs: defineTable({
        title: v.string(),
        content: v.string(),
        authorId: v.string(),
        imageStorageId: v.id("_storage")
    }),
    comments: defineTable({
        blogId: v.id("blogs"),
        content: v.string(),
        authorId: v.string(),
        authorName: v.string(),
    })
})