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
    id: "neural-architecture-search",
    title: "Neural Architecture Search: Automating Deep Learning Design",
    date: "2024-03-15",
    tags: ["Machine Learning", "Neural Architecture Search", "AutoML"],
    excerpt: "Exploring how NAS revolutionizes deep learning model design through automated architecture optimization.",
    fileName: "neural-architecture-search.md"
  },
  {
    id: "transformer-optimization",
    title: "Optimizing Transformers for Production: Lessons from the Trenches",
    date: "2024-02-20",
    tags: ["Transformers", "Optimization", "MLOps"],
    excerpt: "Practical techniques for deploying transformer models at scale with reduced latency and cost.",
    fileName: "transformer-optimization.md"
  },
  {
    id: "federated-learning",
    title: "Federated Learning: Privacy-Preserving ML at Scale",
    date: "2024-01-10",
    tags: ["Federated Learning", "Privacy", "Distributed ML"],
    excerpt: "Deep dive into federated learning architecture and its applications in privacy-sensitive domains.",
    fileName: "federated-learning.md"
  }
];
