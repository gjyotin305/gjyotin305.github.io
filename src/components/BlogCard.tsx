import { Link } from "react-router-dom";
import { BlogPost } from "@/data/blogIndex";
import { Calendar, Tag } from "lucide-react";

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard = ({ post }: BlogCardProps) => {
  return (
    <Link to={`/blog/${post.id}`}>
      <div className="group border-2 border-primary/30 rounded p-4 bg-card/50 backdrop-blur-sm hover:border-primary/60 hover:bg-primary/5 transition-all duration-200">
        <h3 className="text-xl font-bold text-accent terminal-glow mb-2 group-hover:text-primary transition-colors">
          {post.title}
        </h3>
        
        <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            <span>{new Date(post.date).toLocaleDateString()}</span>
          </div>
        </div>

        <p className="text-foreground/80 mb-3 line-clamp-2">
          {post.excerpt}
        </p>

        <div className="flex items-center gap-2 flex-wrap">
          <Tag className="w-3 h-3 text-muted-foreground" />
          {post.tags.map(tag => (
            <span key={tag} className="text-xs px-2 py-1 rounded bg-primary/10 text-primary border border-primary/30">
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-4 text-sm text-accent group-hover:text-primary transition-colors">
          read more →
        </div>
      </div>
    </Link>
  );
};

export default BlogCard;
