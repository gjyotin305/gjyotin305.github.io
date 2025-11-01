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
  }
];
