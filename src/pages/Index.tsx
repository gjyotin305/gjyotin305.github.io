import { Link } from "react-router-dom";
import TerminalPrompt from "@/components/TerminalPrompt";
import TerminalWindow from "@/components/TerminalWindow";
import FlowAnimation from "@/components/FlowAnimation";
import { Github, Linkedin, Mail, BookOpen, Code2, GraduationCap, Twitter } from "lucide-react";
import { useState, KeyboardEvent } from "react";
import { useNavigate } from "react-router-dom";
import profilePic from "@/assets/tron-ichigo.jpg";

const Index = () => {
  const [command, setCommand] = useState("");
  const [showFlow, setShowFlow] = useState(false);
  const navigate = useNavigate();

  const handleCommand = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const cmd = command.trim().toLowerCase();
      if (cmd === "about") navigate("/about");
      else if (cmd === "projects") navigate("/projects");
      else if (cmd === "blog") navigate("/blog");
      else if (cmd === "home" || cmd === "index") navigate("/");
      else if (cmd === "flow") {
        setShowFlow(!showFlow);
      }
      setCommand("");
    }
  };

  return (
    <div className="min-h-screen relative">
      <FlowAnimation isActive={showFlow} />
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-50 border-b-2 border-primary/30 bg-black/95 backdrop-blur-sm">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between py-3 gap-3">
            <div className="flex items-center gap-1 sm:gap-2 flex-1 max-w-full sm:max-w-md">
              <span className="text-accent terminal-glow text-xs sm:text-sm whitespace-nowrap">guest@portfolio</span>
              <span className="text-muted-foreground text-xs sm:text-sm">:</span>
              <span className="text-secondary text-xs sm:text-sm">~</span>
              <span className="text-muted-foreground text-xs sm:text-sm">$</span>
              <input
                type="text"
                value={command}
                onChange={(e) => setCommand(e.target.value)}
                onKeyDown={handleCommand}
                placeholder="type command..."
                className="flex-1 bg-transparent border-none outline-none text-foreground text-xs sm:text-sm font-mono placeholder:text-muted-foreground/50 min-w-0"
              />
              <span className="cursor inline-block"></span>
            </div>
            <div className="flex gap-2 sm:gap-3 justify-center">
              <Link 
                to="/about"
                className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 text-xs sm:text-sm border border-primary/30 rounded hover:border-primary hover:bg-primary/10 transition-all terminal-glow"
              >
                <GraduationCap className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>about</span>
              </Link>
              <Link 
                to="/projects"
                className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 text-xs sm:text-sm border border-primary/30 rounded hover:border-primary hover:bg-primary/10 transition-all terminal-glow"
              >
                <Code2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>projects</span>
              </Link>
              <Link 
                to="/blog"
                className="flex items-center gap-1.5 sm:gap-2 px-2 sm:px-3 py-1.5 text-xs sm:text-sm border border-primary/30 rounded hover:border-primary hover:bg-primary/10 transition-all terminal-glow"
              >
                <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                <span>blog</span>
              </Link>
            </div>
          </div>
        </div>
      </nav>
      
      <div className="relative z-10 container mx-auto px-4 py-6 sm:py-8 md:py-12 max-w-6xl">
        {/* Header */}
        <header className="mb-8 sm:mb-12 md:mb-16">
          <TerminalWindow title="~/welcome.sh">
            <div className="flex flex-col sm:flex-row items-center sm:items-center justify-between gap-6 sm:gap-8">
              <div className="space-y-3 sm:space-y-4 flex-1 text-center sm:text-left">
                <TerminalPrompt command="./introduce.sh" />
                <div className="sm:ml-6 space-y-2 sm:space-y-3">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-accent terminal-glow">
                    Jyotin Goel
                  </h1>
                  <p className="text-base sm:text-lg md:text-xl text-foreground/90 font-semibold">
                    Machine Learning Engineer
                  </p>
                  <p className="text-xs sm:text-sm text-primary/80">
                    Deep Learning • Natural Language Processing • AI Systems
                  </p>
                </div>
              </div>
              <img 
                src={profilePic} 
                alt="Profile"
                className="w-20 h-20 sm:w-24 sm:h-24 md:w-32 md:h-32 rounded-full border-2 border-primary/30 object-cover shrink-0"
              />
            </div>
          </TerminalWindow>
        </header>

        {/* Welcome Section */}
        <div className="mb-8 sm:mb-10 md:mb-12">
          <TerminalWindow title="~/welcome.log">
            <div className="space-y-4 sm:space-y-5">
              <TerminalPrompt command="cat welcome_message.txt" />
              <div className="sm:ml-6 space-y-4 text-sm sm:text-base text-foreground/90">
                <p className="leading-relaxed">
                  Salut, mes amis. I’m a ML engineer who lives at the intersection of theory and systems.
                  I train large models, debug their odd behaviors, and occasionally convince them to behave.
                  Some call it engineering — I prefer <span className="font-mono">model whispering</span>.
                </p>
                <p className="leading-relaxed">
                  My work spans deep learning architectures, NLP, and scalable AI infrastructure.
                  I enjoy turning research papers into reproducible systems, pushing models to their limits,
                  and understanding why they break when they do.
                </p>
                <p className="leading-relaxed text-muted-foreground">
                  Currently exploring pre-doctoral and research engineer roles —
                  with a strong interest in foundational models, efficient training,
                  and real-world deployment at scale.
                </p>
              </div>
            </div>
          </TerminalWindow>
        </div>


        {/* CTA to About Page */}
        <div className="mb-8 sm:mb-10 md:mb-12">
          <TerminalWindow title="~/navigate.sh">
            <div className="space-y-4 sm:space-y-5">
              <TerminalPrompt command="echo $NEXT_STEPS" />
              <div className="sm:ml-6 space-y-4">
                <p className="text-sm sm:text-base text-foreground/90 leading-relaxed">
                  To learn more about my background, skills, education, and research interests, visit my About page.
                </p>
                <Link 
                  to="/about"
                  className="inline-flex items-center gap-2 px-4 py-2 text-sm sm:text-base border-2 border-accent/50 rounded hover:border-accent hover:bg-accent/10 transition-all terminal-glow text-accent font-medium"
                >
                  <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5" />
                  <span>View Full Profile →</span>
                </Link>
              </div>
            </div>
          </TerminalWindow>
        </div>

        {/* Contact */}
        <TerminalWindow title="~/contact.sh">
          <div className="space-y-3 sm:space-y-4">
            <TerminalPrompt command="cat contact.txt" />
            <div className="sm:ml-6 space-y-2 sm:space-y-3">
              <a href="https://github.com/gjyotin305" target="_blank" rel="noopener noreferrer" 
                 className="flex items-center gap-2 sm:gap-3 text-foreground/80 hover:text-accent transition-colors text-sm sm:text-base">
                <Github className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                <span className="terminal-glow break-all">github.com/gjyotin305</span>
              </a>
              <a href="https://www.linkedin.com/in/jyotin-goel-16924b263/" target="_blank" rel="noopener noreferrer"
                 className="flex items-center gap-2 sm:gap-3 text-foreground/80 hover:text-accent transition-colors text-sm sm:text-base">
                <Linkedin className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                <span className="terminal-glow break-all">linkedin.com/in/jyotin</span>
              </a>
              <a href="https://x.com/GoelJyotin94856" target="_blank" rel="noopener noreferrer"
                 className="flex items-center gap-2 sm:gap-3 text-foreground/80 hover:text-accent transition-colors text-sm sm:text-base">
                <Twitter className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                <span className="terminal-glow break-all">x.com/GoelJyotin94856</span>
              </a>
              <a href="mailto:b22ai063@iitj.ac.in"
                 className="flex items-center gap-2 sm:gap-3 text-foreground/80 hover:text-accent transition-colors text-sm sm:text-base">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 shrink-0" />
                <span className="terminal-glow break-all">b22ai063@iitj.ac.in</span>
              </a>
            </div>
          </div>
        </TerminalWindow>

        {/* Footer */}
        <footer className="mt-12 sm:mt-16 text-center space-y-2">
          <div className="text-xs text-muted-foreground/60 pt-3 sm:pt-4 border-t border-primary/20 mt-4 sm:mt-6 px-4">
            <p>© 2025 Jyotin Goel. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
