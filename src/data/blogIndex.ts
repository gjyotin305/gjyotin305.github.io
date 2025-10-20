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
    title: "Coming soon..",
    date: "2024-02-20",
    tags: ["PyTorch", "LLMs", "Training"],
    excerpt: "Good Training Practices",
    fileName: "transformer-optimization.md"
  }
];
