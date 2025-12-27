export interface BlogPost {
  id: string;
  title: string;
  date: string;
  tags: string[];
  excerpt: string;
  fileName: string;
}

export const blogPosts: BlogPost[] = [
  {
    id: "transformer-optimization",
    title: "Efficient Training for Deep Learning Models",
    date: "2025-11-02",
    tags: ["PyTorch", "LLMs", "Training"],
    excerpt: "Good Training Practices",
    fileName: "transformer-optimization.md"
  },
  {
    id: "moondream-technical",
    title: "DeepDive on Moondream2",
    date: "2025-12-27",
    tags: ["PyTorch", "VLMs", "Object Detection", "VQA"],
    excerpt: "Moondream technical deepdive",
    fileName: "moondream_blog.md"
  }
];
