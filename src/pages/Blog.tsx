import { Link } from "react-router-dom";
import TerminalWindow from "@/components/TerminalWindow";
import TerminalPrompt from "@/components/TerminalPrompt";
import BlogCard from "@/components/BlogCard";
import { blogPosts } from "@/data/blogIndex";
import { ArrowLeft } from "lucide-react";

const Blog = () => {
  return (
    <div className="min-h-screen relative">
      <div className="scan-line"></div>
      
      <div className="relative z-10 container mx-auto px-4 py-12 max-w-6xl">
        <Link to="/" className="inline-flex items-center gap-2 text-accent hover:text-primary transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" />
          <span>back to home</span>
        </Link>

        <TerminalWindow title="~/blog/index.md">
          <div className="space-y-8">
            <div>
              <TerminalPrompt command="cat blog_posts.txt" />
              <h1 className="text-3xl font-bold text-accent terminal-glow mt-4 mb-2">Research Blog</h1>
              <p className="text-foreground/70">
                Thoughts on machine learning, neural networks, and AI systems
              </p>
            </div>

            <div className="space-y-6">
              {blogPosts.map(post => (
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
