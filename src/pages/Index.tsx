import { Link } from "react-router-dom";
import TerminalPrompt from "@/components/TerminalPrompt";
import TerminalWindow from "@/components/TerminalWindow";
import { Github, Linkedin, Mail, BookOpen, Code2, GraduationCap } from "lucide-react";
import { useState, KeyboardEvent } from "react";
import { useNavigate } from "react-router-dom";
import profilePic from "@/assets/tron-ichigo.jpg";

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
            <div className="flex items-center justify-between gap-8">
              <div className="space-y-4 flex-1">
                <TerminalPrompt command="./introduce.sh" />
                <div className="ml-6 space-y-3">
                  <h1 className="text-2xl md:text-3xl font-normal text-foreground/90">
                    ml engineer
                  </h1>
                  <p className="text-sm text-muted-foreground">
                    deep learning / natural language processing / ai systems
                  </p>
                </div>
              </div>
              <img 
                src={profilePic} 
                alt="Profile"
                className="w-24 h-24 md:w-32 md:h-32 rounded-full border-2 border-primary/30 object-cover"
              />
            </div>
          </TerminalWindow>
        </header>

        {/* Intro Section */}
        <div className="mb-12">
          <TerminalWindow title="~/intro.log">
            <div className="space-y-4">
              <TerminalPrompt command="cat blabber.txt" />
              <div className="ml-6 space-y-3 text-foreground/90">
                <div className="flex items-start gap-3">
                  <span className="text-accent terminal-glow">▸</span>
                  <p>PyTorch is my go-to playground, where training loops feel like second nature</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-accent terminal-glow">▸</span>
                  <p>XGBoost? Sometimes all you really need to get things done</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-accent terminal-glow">▸</span>
                  <p>RWKV is my current curiosity, exploring its recurrent arch.</p>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-accent terminal-glow">▸</span>
                  <p>Attention: is it really all you need, or is there a horizon beyond the transformer?</p>
                </div>
              </div>
            </div>
          </TerminalWindow>
        </div>

        {/* Work Experience */}
        <div className="mb-12">
          <TerminalWindow title="~/experience.log">
            <div className="space-y-6">
              <TerminalPrompt command="cat current_work.txt" />
              <div className="ml-6 space-y-6">                
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-accent terminal-glow">▸</span>
                    <h3 className="text-lg font-semibold text-foreground">Research Intern</h3>
                  </div>
                  <p className="text-sm text-muted-foreground ml-4">Sony Research India • May 2025 - Present</p>
                  <p className="text-foreground/80 ml-4">learning to do research.</p>
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
              <a href="https://github.com/gjyotin305" target="_blank" rel="noopener noreferrer" 
                 className="flex items-center gap-3 text-foreground/80 hover:text-accent transition-colors">
                <Github className="w-5 h-5" />
                <span className="terminal-glow">github.com/gjyotin305</span>
              </a>
              <a href="https://www.linkedin.com/in/jyotin-goel-16924b263/" target="_blank" rel="noopener noreferrer"
                 className="flex items-center gap-3 text-foreground/80 hover:text-accent transition-colors">
                <Linkedin className="w-5 h-5" />
                <span className="terminal-glow">linkedin.com/in/jyotin</span>
              </a>
              <a href="mailto:b22ai063@iitj.ac.in"
                 className="flex items-center gap-3 text-foreground/80 hover:text-accent transition-colors">
                <Mail className="w-5 h-5" />
                <span className="terminal-glow">b22ai063@iitj.ac.in</span>
              </a>
            </div>
          </div>
        </TerminalWindow>

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
