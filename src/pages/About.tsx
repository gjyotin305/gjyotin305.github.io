import { Link } from "react-router-dom";
import TronAnimation from "@/components/TronAnimation";
import TerminalWindow from "@/components/TerminalWindow";
import TerminalPrompt from "@/components/TerminalPrompt";
import { ArrowLeft } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen relative">
      <TronAnimation />
      <div className="scan-line"></div>
      
      <div className="relative z-10 container mx-auto px-4 py-12 max-w-4xl">
        <Link to="/" className="inline-flex items-center gap-2 text-accent hover:text-primary transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" />
          <span>back to home</span>
        </Link>

        <TerminalWindow title="~/about.md">
          <div className="space-y-6">
            <div>
              <TerminalPrompt command="cat bio.txt" />
              <div className="ml-6 mt-4 space-y-4">
                <h1 className="text-3xl font-bold text-accent terminal-glow mb-4">About Me</h1>
                
                <p className="text-foreground/90 leading-relaxed">
                  I'm a machine learning researcher and engineer specializing in neural architecture search, 
                  deep learning optimization, and large-scale AI systems. My work focuses on making advanced 
                  ML techniques more efficient, accessible, and practical for real-world applications.
                </p>

                <p className="text-foreground/90 leading-relaxed">
                  Currently researching automated machine learning (AutoML) and neural architecture optimization, 
                  with a particular interest in making AI more energy-efficient and deployable on edge devices.
                </p>
              </div>
            </div>

            <div className="border-t-2 border-primary/30 pt-6">
              <TerminalPrompt command="ls expertise/" />
              <div className="ml-6 mt-4 space-y-2">
                <h2 className="text-xl font-bold text-accent mb-3">Research Areas</h2>
                <ul className="space-y-2 text-foreground/80">
                  <li className="flex items-start gap-2">
                    <span className="text-primary">▸</span>
                    <span>Neural Architecture Search & AutoML</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">▸</span>
                    <span>Transformer Model Optimization</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">▸</span>
                    <span>Federated & Privacy-Preserving ML</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">▸</span>
                    <span>Large Language Model Deployment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">▸</span>
                    <span>Edge AI & Model Compression</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t-2 border-primary/30 pt-6">
              <TerminalPrompt command="cat education.txt" />
              <div className="ml-6 mt-4 space-y-4">
                <h2 className="text-xl font-bold text-accent mb-3">Education</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-primary">Ph.D. in Computer Science</h3>
                    <p className="text-muted-foreground">Focus: Neural Architecture Search</p>
                    <p className="text-sm text-muted-foreground">2020 - 2024</p>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-primary">M.S. in Machine Learning</h3>
                    <p className="text-muted-foreground">Thesis: Efficient Transformer Architectures</p>
                    <p className="text-sm text-muted-foreground">2018 - 2020</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="border-t-2 border-primary/30 pt-6">
              <TerminalPrompt command="python skills.py --list" />
              <div className="ml-6 mt-4">
                <h2 className="text-xl font-bold text-accent mb-3">Technical Skills</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-primary font-semibold mb-2">Languages</h3>
                    <p className="text-foreground/80">Python, C++, Julia, CUDA</p>
                  </div>
                  <div>
                    <h3 className="text-primary font-semibold mb-2">Frameworks</h3>
                    <p className="text-foreground/80">PyTorch, TensorFlow, JAX, ONNX</p>
                  </div>
                  <div>
                    <h3 className="text-primary font-semibold mb-2">Tools</h3>
                    <p className="text-foreground/80">Docker, Kubernetes, Ray, Weights & Biases</p>
                  </div>
                  <div>
                    <h3 className="text-primary font-semibold mb-2">Cloud</h3>
                    <p className="text-foreground/80">AWS, GCP, Azure ML</p>
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

export default About;
