import { Link } from "react-router-dom";
import TerminalPrompt from "@/components/TerminalPrompt";
import TerminalWindow from "@/components/TerminalWindow";
import TronBikeAnimation from "@/components/TronBikeAnimation";
import { Github, Linkedin, Mail, BookOpen, Code2, GraduationCap } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen relative">
      <div className="scan-line"></div>
      
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

        {/* Navigation */}
        <nav className="mb-12">
          <TerminalWindow title="~/navigation.sh">
            <div className="flex flex-wrap gap-4">
              <Link 
                to="/about"
                className="flex items-center gap-2 px-4 py-2 border-2 border-primary/30 rounded hover:border-primary hover:bg-primary/10 transition-all terminal-glow"
              >
                <GraduationCap className="w-4 h-4" />
                <span>about</span>
              </Link>
              <Link 
                to="/projects"
                className="flex items-center gap-2 px-4 py-2 border-2 border-primary/30 rounded hover:border-primary hover:bg-primary/10 transition-all terminal-glow"
              >
                <Code2 className="w-4 h-4" />
                <span>projects</span>
              </Link>
              <Link 
                to="/blog"
                className="flex items-center gap-2 px-4 py-2 border-2 border-primary/30 rounded hover:border-primary hover:bg-primary/10 transition-all terminal-glow"
              >
                <BookOpen className="w-4 h-4" />
                <span>blog</span>
              </Link>
            </div>
          </TerminalWindow>
        </nav>

        {/* ASCII Art */}
        <div className="mb-12">
          <TerminalWindow title="~/tron-bike.sh">
            <TronBikeAnimation />
          </TerminalWindow>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <TerminalWindow title="~/research.log">
            <div className="text-center">
              <div className="text-4xl font-bold text-accent terminal-glow mb-2">15+</div>
              <div className="text-muted-foreground">Publications</div>
            </div>
          </TerminalWindow>
          
          <TerminalWindow title="~/projects.log">
            <div className="text-center">
              <div className="text-4xl font-bold text-accent terminal-glow mb-2">30+</div>
              <div className="text-muted-foreground">ML Projects</div>
            </div>
          </TerminalWindow>
          
          <TerminalWindow title="~/citations.log">
            <div className="text-center">
              <div className="text-4xl font-bold text-accent terminal-glow mb-2">500+</div>
              <div className="text-muted-foreground">Citations</div>
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
