import { Link } from "react-router-dom";
import TerminalWindow from "@/components/TerminalWindow";
import TerminalPrompt from "@/components/TerminalPrompt";
import { ArrowLeft } from "lucide-react";

const About = () => {
  return (
    <div className="min-h-screen relative">
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
                 Hey, I’m Jyotin. I mess around with machine learning and NLP, fiddle with deep learning optimization, and train large models in GPU poor envs. 
                 Basically, I train models and see what happens.
                </p>

                <p className="text-foreground/90 leading-relaxed">
                  I am currently working in aligning large language models to different domains/tasks.
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
                    <span>Natural Language Processing</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">▸</span>
                    <span>Distributed Training & Inference</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-primary">▸</span>
                    <span>Model Editing</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="border-t-2 border-primary/30 pt-6">
              <TerminalPrompt command="cat work_experience.txt" />
              <div className="ml-6 mt-4 space-y-4">
                <h2 className="text-xl font-bold text-accent mb-3">Work Experience</h2>
                <div className="space-y-6">
                  <div>
                  <div className="mb4">
                    <h3 className="text-lg font-semibold text-primary">Research Intern</h3>
                    <p className="text-muted-foreground">Sony Research India</p>
                    <p className="text-sm text-muted-foreground">May 2025 - Present</p>
                    <p className="text-foreground/80 mt-2">
                      Learning to do research and working on large language model alignment.
                    </p>
                  </div>

                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-primary">Voice AI Intern</h3>
                    <p className="text-muted-foreground">Chat360</p>
                    <p className="text-sm text-muted-foreground">Feb 2024 - Jul 2024</p>
                    <p className="text-foreground/80 mt-2">
                      Worked on voice infrastructure, intent and entity detection, NLU engine, and LLM analytics dashboard.
                    </p>
                  </div>

                  <div className="mb-4">
                    <h3 className="text-lg font-semibold text-primary">Research Intern</h3>
                    <p className="text-muted-foreground">AIISC</p>
                    <p className="text-sm text-muted-foreground">Jun 2024 - August 2025 </p>
                    <p className="text-foreground/80 mt-2">
                      Made a MoE external adapter based knowledge editing mechanism for LLMs, works best on long sequences.
                    </p>
                  </div>
                </div>

                </div>
              </div>
            </div>

            <div className="border-t-2 border-primary/30 pt-6">
              <TerminalPrompt command="cat education.txt" />
              <div className="ml-6 mt-4 space-y-4">
                <h2 className="text-xl font-bold text-accent mb-3">Education</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-lg font-semibold text-primary">B.Tech in AI and Data Science</h3>
                    <p className="text-muted-foreground">IIT Jodhpur</p>
                    <p className="text-sm text-muted-foreground">2022 - 2026</p>
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
                    <p className="text-foreground/80">Python, C++, Golang</p>
                  </div>
                  <div>
                    <h3 className="text-primary font-semibold mb-2">Frameworks</h3>
                    <p className="text-foreground/80">PyTorch, PyTorch-Lightning, HuggingFace TRL</p>
                  </div>
                  <div>
                    <h3 className="text-primary font-semibold mb-2">Tools</h3>
                    <p className="text-foreground/80">Docker, Ray, Weights & Biases</p>
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
