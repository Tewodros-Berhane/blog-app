import { api } from "@/convex/_generated/api";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { fetchQuery } from "convex/nextjs";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Our Blog',
  description: 'Insights and updates from our team.',
}

export default function BlogPage() {
  return (
    <div className="py-12">
      <div className="text-center pb-12">
        <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
          Our Blog
        </h1>
        <p className="pt-4 max-w-2xl mx-auto text-xl text-muted-foreground">
          Insights and updates from our team.
        </p>
      </div>
      <Suspense fallback={<SkeletonBlog />}>
        <LoadBlog />
      </Suspense>
    </div>
  );
}

async function LoadBlog() {
  const blogs = await fetchQuery(api.blogs.getBlogs);

  return (
    <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {blogs?.map((blog) => (
        <Card key={blog._id} className="pt-0">
          {blog.imageUrl && (
            <div className="relative h-48 w-full overflow-hidden">
              <Image
                fill
                src={
                  blog.imageUrl ??
                  "https://plus.unsplash.com/premium_photo-1683211783920-8c66ab120c09?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                }
                alt={blog.title + " image"}
                className="rounded-t-lg object-cover"
              />
            </div>
          )}
          <CardContent>
            <Link href={`/blog/${blog._id}`}>
              <h1 className="text-2xl font-bold hover:text-primary">
                {blog.title}
              </h1>
            </Link>
            <p className="text-muted-foreground line-clamp-3">{blog.content}</p>
          </CardContent>
          <CardFooter>
            <Link
              className={buttonVariants({
                className: "w-full",
              })}
              href={`/blog/${blog._id}`}
            >
              Read more
            </Link>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
function SkeletonBlog() {
  return (
    <div className="grid gap-6 md:grid-cols-3 lg:grid-cols-3">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="flex flex-col space-y-3">
          <Skeleton className="h-48 w-full rounded-xl" />
          <div className="space-y-2 flex flex-col">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>
      ))}
    </div>
  );
}


