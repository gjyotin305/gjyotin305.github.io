import { Link } from "react-router-dom";
import TerminalPrompt from "@/components/TerminalPrompt";
import TerminalWindow from "@/components/TerminalWindow";
import { Github, Linkedin, Mail, BookOpen, Code2, GraduationCap } from "lucide-react";
import { useState, KeyboardEvent } from "react";
import { useNavigate } from "react-router-dom";
import profilePic from "@/assets/tron-profile.jpg";

const Index = () => {
  const [command, setCommand] = useState("");
  const navigate = useNavigate();

  const handleCommand = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const cmd = command.trim().toLowerCase();
      if (cmd === "about") navigate("/about");
      else if (cmd === "projects") navigate("/projects");
      else if (cmd === "blog") navigate("/blog");
      else if (cmd === "home" || cmd === "index") navigate("/");
      setCommand("");
    }
  };

  return (
    <div className="min-h-screen relative">
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 border-b-2 border-primary/30 bg-black/95 backdrop-blur-sm">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center gap-2 flex-1 max-w-md">
              <span className="text-accent terminal-glow text-sm">guest@portfolio</span>
              <span className="text-muted-foreground">:</span>
              <span className="text-secondary">~</span>
              <span className="text-muted-foreground">$</span>
              <input
                type="text"
                value={command}
                onChange={(e) => setCommand(e.target.value)}
                onKeyDown={handleCommand}
                placeholder="type command (about, projects, blog)..."
                className="flex-1 bg-transparent border-none outline-none text-foreground text-sm font-mono placeholder:text-muted-foreground/50"
              />
              <span className="cursor inline-block"></span>
            </div>
            <div className="flex gap-6">
              <Link 
                to="/about"
                className="flex items-center gap-2 text-sm text-foreground/70 hover:text-accent transition-colors relative group"
              >
                <GraduationCap className="w-4 h-4" />
                <span>about</span>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link 
                to="/projects"
                className="flex items-center gap-2 text-sm text-foreground/70 hover:text-accent transition-colors relative group"
              >
                <Code2 className="w-4 h-4" />
                <span>projects</span>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300"></span>
              </Link>
              <Link 
                to="/blog"
                className="flex items-center gap-2 text-sm text-foreground/70 hover:text-accent transition-colors relative group"
              >
                <BookOpen className="w-4 h-4" />
                <span>blog</span>
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-accent group-hover:w-full transition-all duration-300"></span>
              </Link>
            </div>
          </div>
        </div>
      </nav>
      
      <div className="relative z-10 container mx-auto px-4 py-12 max-w-6xl">
        {/* Header */}
        <header className="mb-16">
          <div className="border-l-2 border-accent/50 pl-6 py-4">
            <TerminalPrompt command="./introduce.sh" />
            <div className="flex items-center justify-between gap-8 mt-4">
              <div className="space-y-3 flex-1">
                <h1 className="text-2xl md:text-3xl font-normal text-foreground/90">
                  ml researcher
                </h1>
                <p className="text-sm text-muted-foreground">
                  deep learning / neural architecture / ai systems
                </p>
              </div>
              <img 
                src={profilePic} 
                alt="Profile"
                className="w-24 h-24 md:w-32 md:h-32 rounded-full border-2 border-primary/30 object-cover"
              />
            </div>
          </div>
        </header>

        {/* Intro Section */}
        <div className="mb-12">
          <div className="border-l-2 border-accent/50 pl-6 py-4">
            <TerminalPrompt command="cat philosophy.txt" />
            <div className="mt-4 space-y-3 text-foreground/90">
              <div className="flex items-start gap-3">
                <span className="text-accent terminal-glow">▸</span>
                <p>PyTorch is my muse, where tensors flow like verses in an epic poem</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-accent terminal-glow">▸</span>
                <p>Gradients are my poetry, descending through layers of meaning and abstraction</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-accent terminal-glow">▸</span>
                <p>Each backprop is a stanza, teaching networks to see patterns in chaos</p>
              </div>
              <div className="flex items-start gap-3">
                <span className="text-accent terminal-glow">▸</span>
                <p>Neural architectures are my canvas, painted with mathematics and intuition</p>
              </div>
            </div>
          </div>
        </div>

        {/* Work Experience */}
        <div className="mb-12">
          <div className="border-l-2 border-accent/50 pl-6 py-4">
            <TerminalPrompt command="cat work_history.txt" />
            <div className="mt-4 space-y-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-accent terminal-glow">▸</span>
                  <h3 className="text-lg font-semibold text-foreground">Senior ML Researcher</h3>
                </div>
                <p className="text-sm text-muted-foreground ml-4">AI Research Lab • 2022 - Present</p>
                <p className="text-foreground/80 ml-4">Leading neural architecture search and transformer optimization research</p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-accent terminal-glow">▸</span>
                  <h3 className="text-lg font-semibold text-foreground">ML Engineer</h3>
                </div>
                <p className="text-sm text-muted-foreground ml-4">Tech Company • 2020 - 2022</p>
                <p className="text-foreground/80 ml-4">Developed production-scale deep learning systems and optimized inference pipelines</p>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-accent terminal-glow">▸</span>
                  <h3 className="text-lg font-semibold text-foreground">Research Intern</h3>
                </div>
                <p className="text-sm text-muted-foreground ml-4">University Lab • 2019 - 2020</p>
                <p className="text-foreground/80 ml-4">Explored federated learning approaches for privacy-preserving AI</p>
              </div>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="mb-12">
          <div className="border-l-2 border-accent/50 pl-6 py-4">
            <TerminalPrompt command="cat contact.txt" />
            <div className="mt-4 space-y-3">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" 
                 className="flex items-center gap-3 text-foreground/80 hover:text-accent transition-colors">
                <Github className="w-5 h-5" />
                <span className="terminal-glow">github.com/researcher</span>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"
                 className="flex items-center gap-3 text-foreground/80 hover:text-accent transition-colors">
                <Linkedin className="w-5 h-5" />
                <span className="terminal-glow">linkedin.com/in/researcher</span>
              </a>
              <a href="mailto:research@example.com"
                 className="flex items-center gap-3 text-foreground/80 hover:text-accent transition-colors">
                <Mail className="w-5 h-5" />
                <span className="terminal-glow">research@example.com</span>
              </a>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 text-center space-y-2">
          <TerminalPrompt command="echo 'Building the future with AI'" />
          <div className="text-xs text-muted-foreground/60 pt-4 border-t border-primary/20 mt-6">
            <p>© 2025 ML Researcher. All rights reserved.</p>
            <p className="mt-1">Last updated: October 2025</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
