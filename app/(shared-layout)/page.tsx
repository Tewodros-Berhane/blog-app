import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SearchInput } from "@/components/web/SearchInput";
import { ArrowRight, BookOpen, MessageCircle, Zap } from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative flex flex-col min-h-screen overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-linear-to-b from-primary/5 to-transparent -z-10" />
      <div className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-primary/10 blur-[120px] rounded-full -z-10" />

      {/* Hero Section */}
      <section className="container mx-auto px-4 flex-1 flex flex-col items-center justify-center py-20 md:py-32 text-center space-y-10">
        <div className="space-y-6 max-w-4xl animate-in fade-in slide-in-from-bottom-8 duration-700 ease-out">
          {/* Badge */}
          <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary mb-4">
            ✨ Launching Version 2.0
          </div>
          
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight text-foreground leading-[1.1]">
            Share Your Stories with <br />
            <span className="bg-clip-text text-transparent bg-linear-to-r from-primary to-primary/60">
              the World
            </span>
          </h1>
          
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            A modern platform designed for the next generation of writers. 
            Discover insightful articles, join the conversation, and grow your audience.
          </p>
        </div>

        {/* Search & Actions */}
        <div className="w-full max-w-2xl space-y-8 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-200">
          <div className="relative group p-1 rounded-2xl bg-linear-to-r from-border/50 via-primary/20 to-border/50">
             <div className="bg-background rounded-[calc(1rem-4px)]">
                <SearchInput />
             </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/blog" className="w-full sm:w-auto">
              <Button size="lg" className="h-14 px-10 text-lg w-full rounded-full shadow-lg shadow-primary/20 hover:shadow-primary/30 transition-all">
                Start Reading <ArrowRight className="ml-2 size-5" />
              </Button>
            </Link>
            <Link href="/create" className="w-full sm:w-auto">
              <Button size="lg" variant="ghost" className="h-14 px-10 text-lg w-full rounded-full border-2 border-transparent hover:border-primary/10 transition-all">
                Write a Post
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-32">
        <div className="flex flex-col items-center mb-16 space-y-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center">Why Choose Us?</h2>
          <div className="h-1 w-20 bg-primary rounded-full" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Lightning Fast",
              desc: "Built with the latest tech for instant page loads and seamless interactions.",
              icon: Zap,
            },
            {
              title: "Real-time Discussions",
              desc: "Engage with authors and readers through our live commenting system.",
              icon: MessageCircle,
            },
            {
              title: "Rich Content",
              desc: "Enjoy beautifully formatted articles with support for images.",
              icon: BookOpen,
            },
          ].map((feature, i) => (
            <Card key={i} className="group relative overflow-hidden bg-background/50 backdrop-blur-sm border-muted hover:border-primary/50 transition-all duration-500 hover:-translate-y-2 shadow-sm">
              <CardHeader className="flex flex-col items-center text-center pb-2">
                <div className="p-4 bg-primary/5 rounded-2xl mb-4 group-hover:scale-110 group-hover:bg-primary/10 transition-all duration-500">
                  <feature.icon className="size-8 text-primary" />
                </div>
                <CardTitle className="text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground leading-relaxed">
                  {feature.desc}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}