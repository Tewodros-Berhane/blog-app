import { buttonVariants } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { fetchQuery, preloadQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { Separator } from "@/components/ui/separator";
import CommentSection from "@/components/web/CommentSection";
import { Metadata } from "next";
import { BlogPresence } from "@/components/web/BlogPresence";
import { getToken } from "@/lib/auth-server";
import { redirect } from "next/navigation";

interface blogIdRouteProps {
  params: Promise<{
    blogId: Id<"blogs">;
  }>;
}

// export const dynamic = "force-static";
// export const revalidate = 30;

export async function generateMetadata({
  params,
}: blogIdRouteProps): Promise<Metadata> {
  const { blogId } = await params;
  const blog = await fetchQuery(api.blogs.getBlogById, { blogId });
  return {
    title: blog.title,
    description: blog.content,
  };
}

export default async function BlogPage({ params }: blogIdRouteProps) {
  const { blogId } = await params;
  const token = await getToken();

  const [blog, preloadedComments, userId] = await Promise.all([
    await fetchQuery(api.blogs.getBlogById, { blogId }),
    await preloadQuery(api.comments.getComments, { blogId }),
    await fetchQuery(api.presence.getUserId, {}, { token }),
  ]);

  if(!userId) {
    return redirect("/auth/login");
  }
  return (
    <div className="max-w-3xl mx-auto py-6 px-4 animate-in fade-in duration-500 relative">
      <Link
        className={buttonVariants({ variant: "outline", className: "mb-4" })}
        href="/blog"
      >
        <ArrowLeft className="size-4" />
        Back to blog
      </Link>
      <div className="relative w-full h-[400px] mb-8 rounded-xl overflow-hidden shadow-sm">
        <Image
          src={
            blog.imageUrl ??
            "https://plus.unsplash.com/premium_photo-1683211783920-8c66ab120c09?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          }
          alt={blog.title}
          fill
          className="object-cover hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="space-y-4  flex flex-col">
        <h1 className="text-4xl font-bold tracking-tight text-foreground">
          {blog.title}
        </h1>
        <div className="flex items-center gap-4">
            <p className="text-sm text-muted-foreground">
                Posted on: {new Date(blog._creationTime).toLocaleDateString()}
            </p>
            {userId && <BlogPresence roomId={blogId} userId={userId} />}
        </div>
      </div>
      <Separator className="my-8" />
      <p className="text-lg leading-relaxed text-foreground/90 whitespace-pre-wrap wrap-break-word">
        {blog.content}
      </p>
      <Separator className="my-8" />
      <CommentSection preloadedComments={preloadedComments} />
    </div>
  );
}
