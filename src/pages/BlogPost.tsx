import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import TerminalWindow from "@/components/TerminalWindow";
import TerminalPrompt from "@/components/TerminalPrompt";
import { blogPosts } from "@/data/blogIndex";
import { ArrowLeft } from "lucide-react";

const BlogPost = () => {
  const { id } = useParams();
  const [content, setContent] = useState("");
  const post = blogPosts.find(p => p.id === id);

  useEffect(() => {
    if (post) {
      fetch(`/blogs/${post.fileName}`)
        .then(res => res.text())
        .then(text => setContent(text))
        .catch(err => console.error("Error loading blog post:", err));
    }
  }, [post]);

  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl text-accent mb-4">Blog post not found</h1>
          <Link to="/blog" className="text-primary hover:underline">
            ← Back to blog
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative">
      <div className="scan-line"></div>
      
      <div className="relative z-10 container mx-auto px-4 py-12 max-w-4xl">
        <Link to="/blog" className="inline-flex items-center gap-2 text-accent hover:text-primary transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" />
          <span>back to blog</span>
        </Link>

        <TerminalWindow title={`~/blog/${post.fileName}`}>
          <div className="space-y-4">
            <TerminalPrompt command={`cat ${post.fileName}`} />
            
            <article className="prose prose-invert prose-cyan max-w-none ml-6 mt-6">
              <ReactMarkdown 
                remarkPlugins={[remarkGfm]}
                components={{
                  h1: ({ children }) => (
                    <h1 className="text-3xl font-bold text-accent terminal-glow mb-4">{children}</h1>
                  ),
                  h2: ({ children }) => (
                    <h2 className="text-2xl font-bold text-primary terminal-glow mt-8 mb-4">{children}</h2>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-xl font-bold text-accent mt-6 mb-3">{children}</h3>
                  ),
                  p: ({ children }) => (
                    <p className="text-foreground/90 leading-relaxed mb-4">{children}</p>
                  ),
                  code: ({ className, children }) => {
                    const isInline = !className;
                    return isInline ? (
                      <code className="px-1.5 py-0.5 rounded bg-primary/10 text-primary border border-primary/30 text-sm">
                        {children}
                      </code>
                    ) : (
                      <code className="block p-4 rounded bg-card/50 border-2 border-primary/30 text-primary text-sm overflow-x-auto">
                        {children}
                      </code>
                    );
                  },
                  pre: ({ children }) => (
                    <pre className="mb-4 overflow-x-auto">{children}</pre>
                  ),
                  ul: ({ children }) => (
                    <ul className="list-none space-y-2 mb-4 ml-4">{children}</ul>
                  ),
                  li: ({ children }) => (
                    <li className="flex gap-2 text-foreground/90">
                      <span className="text-primary">▸</span>
                      <span>{children}</span>
                    </li>
                  ),
                  a: ({ href, children }) => (
                    <a href={href} className="text-accent hover:text-primary underline transition-colors">
                      {children}
                    </a>
                  ),
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-primary pl-4 italic text-foreground/80 my-4">
                      {children}
                    </blockquote>
                  ),
                  table: ({ children }) => (
                    <div className="overflow-x-auto mb-4">
                      <table className="min-w-full border-2 border-primary/30">{children}</table>
                    </div>
                  ),
                  th: ({ children }) => (
                    <th className="border border-primary/30 px-4 py-2 bg-primary/10 text-accent font-semibold">
                      {children}
                    </th>
                  ),
                  td: ({ children }) => (
                    <td className="border border-primary/30 px-4 py-2 text-foreground/90">
                      {children}
                    </td>
                  ),
                }}
              >
                {content}
              </ReactMarkdown>
            </article>
          </div>
        </TerminalWindow>
      </div>
    </div>
  );
};

export default BlogPost;
