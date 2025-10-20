import { Link } from "react-router-dom";
import TerminalWindow from "@/components/TerminalWindow";
import TerminalPrompt from "@/components/TerminalPrompt";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";

const projects = [
  {
    title: "AutoDLTorch: Bare Bones PyTorch Implementation",
    description: "Open-source framework for training and finetuning different DL archs w different optimisations",
    tech: ["Python", "PyTorch", "HuggingFace"],
    github: "https://github.com/gjyotin305/AutoDLTorch",
    demo: null,
    metrics: "more stable than trl xdxd"
  },
  {
    title: "Model Editing",
    description: "Toolkit for editing factual knowledge in llms using locate and edit methods along with MoE based external memory adapter methods",
    tech: ["PyTorch"],
    github: "https://github.com/gjyotin305/ModelEdit-Benchmark",
    demo: null,
    metrics: "More robust than ROME and works for longer sequences as well."
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
                      "A Traditional Approach to Symbolic Piano Continuation"
                    </p>
                    <p className="text-sm text-muted-foreground">MIREX 2025</p>
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
