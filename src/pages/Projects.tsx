import { Link } from "react-router-dom";
import TerminalWindow from "@/components/TerminalWindow";
import TerminalPrompt from "@/components/TerminalPrompt";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";

const projects = [
  {
    title: "AutoNAS: Neural Architecture Search Framework",
    description: "Open-source framework for automated neural architecture search with support for multiple search strategies including RL, evolutionary algorithms, and DARTS.",
    tech: ["Python", "PyTorch", "Ray"],
    github: "https://github.com",
    demo: null,
    metrics: "10x faster than previous NAS methods"
  },
  {
    title: "EdgeML: Efficient Models for Edge Devices",
    description: "Toolkit for optimizing and deploying ML models on resource-constrained edge devices through quantization, pruning, and knowledge distillation.",
    tech: ["C++", "ONNX", "TensorRT"],
    github: "https://github.com",
    demo: "https://demo.com",
    metrics: "5x latency reduction, 80% size reduction"
  },
  {
    title: "FedLearn: Privacy-Preserving ML Platform",
    description: "Production-ready federated learning system supporting multiple aggregation strategies, differential privacy, and secure multi-party computation.",
    tech: ["Python", "gRPC", "Kubernetes"],
    github: "https://github.com",
    demo: null,
    metrics: "1000+ concurrent clients, <100ms latency"
  },
  {
    title: "TransformerOpt: LLM Optimization Suite",
    description: "Comprehensive toolkit for optimizing transformer models including Flash Attention implementation, multi-query attention, and efficient inference kernels.",
    tech: ["CUDA", "PyTorch", "Triton"],
    github: "https://github.com",
    demo: null,
    metrics: "3x faster inference, 40% memory reduction"
  }
];

const Projects = () => {
  return (
    <div className="min-h-screen relative">
      <div className="scan-line"></div>
      
      <div className="relative z-10 container mx-auto px-4 py-12 max-w-6xl">
        <Link to="/" className="inline-flex items-center gap-2 text-accent hover:text-primary transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" />
          <span>back to home</span>
        </Link>

        <TerminalWindow title="~/projects.sh">
          <div className="space-y-8">
            <div>
              <TerminalPrompt command="ls -la ~/projects/" />
              <h1 className="text-3xl font-bold text-accent terminal-glow mt-4 mb-6">Research Projects</h1>
            </div>

            <div className="space-y-6">
              {projects.map((project, index) => (
                <div key={index} className="border-2 border-primary/30 rounded p-6 bg-card/30 hover:border-primary/50 transition-all">
                  <div className="flex items-start justify-between mb-4">
                    <h2 className="text-xl font-bold text-primary terminal-glow">{project.title}</h2>
                    <div className="flex gap-2">
                      {project.github && (
                        <a href={project.github} target="_blank" rel="noopener noreferrer" 
                           className="text-accent hover:text-primary transition-colors">
                          <Github className="w-5 h-5" />
                        </a>
                      )}
                      {project.demo && (
                        <a href={project.demo} target="_blank" rel="noopener noreferrer"
                           className="text-accent hover:text-primary transition-colors">
                          <ExternalLink className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                  </div>

                  <p className="text-foreground/80 mb-4 leading-relaxed">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.tech.map(tech => (
                      <span key={tech} className="text-xs px-2 py-1 rounded bg-primary/10 text-primary border border-primary/30">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="text-sm text-accent">
                    <span className="text-muted-foreground">Performance:</span> {project.metrics}
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t-2 border-primary/30 pt-6 mt-8">
              <TerminalPrompt command="cat publications.txt" />
              <div className="ml-6 mt-4">
                <h2 className="text-2xl font-bold text-accent mb-4">Selected Publications</h2>
                <div className="space-y-4">
                  <div className="text-foreground/80">
                    <p className="font-semibold text-primary">
                      "Efficient Neural Architecture Search via Parameter Sharing"
                    </p>
                    <p className="text-sm text-muted-foreground">NeurIPS 2024 • 150+ citations</p>
                  </div>
                  <div className="text-foreground/80">
                    <p className="font-semibold text-primary">
                      "FedOpt: Federated Learning with Adaptive Optimization"
                    </p>
                    <p className="text-sm text-muted-foreground">ICML 2023 • 200+ citations</p>
                  </div>
                  <div className="text-foreground/80">
                    <p className="font-semibold text-primary">
                      "Transformer Compression via Structured Pruning"
                    </p>
                    <p className="text-sm text-muted-foreground">ICLR 2023 • 180+ citations</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TerminalWindow>
      </div>
    </div>
  );
};

export default Projects;
