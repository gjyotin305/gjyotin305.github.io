import { Link } from "react-router-dom";
import TerminalWindow from "@/components/TerminalWindow";
import TerminalPrompt from "@/components/TerminalPrompt";
import BlogCard from "@/components/BlogCard";
import { blogPosts } from "@/data/blogIndex";
import { ArrowLeft } from "lucide-react";
import { useMemo } from "react";

const Blog = () => {
  // Sort blogs by date (newest first)
  const sortedPosts = useMemo(() => {
    return [...blogPosts].sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
  }, []);

  return (
    <div className="min-h-screen relative bg-background">
      {/* Background texture */}
      <div 
        className="fixed inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, hsl(var(--foreground)) 1px, transparent 0)`,
          backgroundSize: '24px 24px'
        }}
      />
      
      <div className="relative z-10 container mx-auto px-4 py-12 max-w-6xl">
        <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" />
          <span>back to home</span>
        </Link>

        <TerminalWindow title="~/blog/index.md">
          <div className="space-y-8">
            <div>
              <TerminalPrompt command="cat blog_posts.txt" />
              <h1 className="text-3xl font-bold text-foreground mt-4 mb-2">Research Blog</h1>
              <p className="text-muted-foreground">
                Thoughts on machine learning, neural networks, and AI systems
              </p>
            </div>

            <div className="space-y-10">
              {sortedPosts.map(post => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          </div>
        </TerminalWindow>
      </div>
    </div>
  );
};

export default Blog;
