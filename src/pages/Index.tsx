import { Link } from "react-router-dom";
import TerminalPrompt from "@/components/TerminalPrompt";
import TerminalWindow from "@/components/TerminalWindow";
import { Github, Linkedin, Mail, BookOpen, Code2, GraduationCap } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen relative">
      <div className="scan-line"></div>
      
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 border-b-2 border-primary/30 bg-black/95 backdrop-blur-sm">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex items-center justify-between py-3">
            <div className="flex items-center gap-2">
              <span className="text-accent terminal-glow text-sm">guest@portfolio</span>
              <span className="text-muted-foreground">:</span>
              <span className="text-secondary">~</span>
              <span className="text-muted-foreground">$</span>
              <span className="text-foreground/80 text-sm">./navigation.sh</span>
            </div>
            <div className="flex gap-3">
              <Link 
                to="/about"
                className="flex items-center gap-2 px-3 py-1.5 text-sm border border-primary/30 rounded hover:border-primary hover:bg-primary/10 transition-all terminal-glow"
              >
                <GraduationCap className="w-4 h-4" />
                <span>about</span>
              </Link>
              <Link 
                to="/projects"
                className="flex items-center gap-2 px-3 py-1.5 text-sm border border-primary/30 rounded hover:border-primary hover:bg-primary/10 transition-all terminal-glow"
              >
                <Code2 className="w-4 h-4" />
                <span>projects</span>
              </Link>
              <Link 
                to="/blog"
                className="flex items-center gap-2 px-3 py-1.5 text-sm border border-primary/30 rounded hover:border-primary hover:bg-primary/10 transition-all terminal-glow"
              >
                <BookOpen className="w-4 h-4" />
                <span>blog</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>
      
      <div className="relative z-10 container mx-auto px-4 py-12 max-w-6xl">
        {/* Header */}
        <header className="mb-16">
          <TerminalWindow title="~/welcome.sh">
            <div className="space-y-4">
              <TerminalPrompt command="./introduce.sh" />
              <div className="ml-6 space-y-2">
                <h1 className="text-4xl md:text-6xl font-bold text-accent terminal-glow animate-fade-in">
                  ML RESEARCHER
                </h1>
                <p className="text-xl text-foreground/80">
                  <span className="text-primary">$</span> Deep Learning • Neural Architecture • AI Systems
                </p>
              </div>
            </div>
          </TerminalWindow>
        </header>

        {/* Intro Section */}
        <div className="mb-12">
          <TerminalWindow title="~/intro.log">
            <div className="space-y-4">
              <TerminalPrompt command="cat philosophy.txt" />
              <div className="ml-6 space-y-3 text-foreground/90">
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
          </TerminalWindow>
        </div>

        {/* Contact */}
        <TerminalWindow title="~/contact.sh">
          <div className="space-y-4">
            <TerminalPrompt command="cat contact.txt" />
            <div className="ml-6 space-y-3">
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
        </TerminalWindow>

        {/* Footer */}
        <footer className="mt-16 text-center text-sm text-muted-foreground">
          <TerminalPrompt command="echo 'Building the future with AI'" />
        </footer>
      </div>
    </div>
  );
};

export default Index;
