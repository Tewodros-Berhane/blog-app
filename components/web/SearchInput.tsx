"use client";
import { Loader2, Search } from "lucide-react";
import { Input } from "../ui/input";
import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import Link from "next/link";

export function SearchInput() {
  const [term, setTerm] = useState("");
  const [open, setOpen] = useState(false);

  const results = useQuery(
    api.blogs.searchBlogs,
    term.length >= 2 ? { limit: 5, term: term } : "skip"
  );

  function handleInputChange(event: React.ChangeEvent<HTMLInputElement>) {
    setTerm(event.target.value);
    setOpen(true);
  }

  return (
    <div className="relative w-full z-10">
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 size-4 text-muted-foreground" />
        <Input
          className="w-full pl-8 bg-background"
          type="search"
          value={term}
          onChange={handleInputChange}
          placeholder="Search Blogs..."
        />
      </div>
      {open && term.length > 2 && (
        <div className="absolute top-full border mt-2 rounded-md bg-popover text-popover-foreground shadow-md outline-none animate-in fade-in-0">
          {results === undefined ? (
            <div className="flex items-center justify-center p-4 text-sm text-muted-foreground">
              <Loader2 className=" mr-2 size-4 animate-spin" />
              Searching...
            </div>
          ) : results.length === 0 ? (
            <p className="p-4 text-sm text-muted-foreground text-center">
              No results found
            </p>
          ) : (
            <div className="py-1">
              {results.map((blog) => (
                <Link
                  className="flex flex-col px-4 py-2 text-sm cursor-pointer hover:bg-accent hover:text-accent-foreground"
                  key={blog._id}
                  href={`/blog/${blog._id}`}
                  onClick={() => {setOpen(false); setTerm("");}}
                > 
                  <p className="font-medium truncate">{blog.title}</p>
                  <p className="text-xs text-muted-foreground pt-1">
                    {blog.content.slice(0, 50)}
                  </p>
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
