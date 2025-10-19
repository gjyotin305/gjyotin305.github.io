interface TerminalPromptProps {
  command?: string;
  className?: string;
}

const TerminalPrompt = ({ command = "", className = "" }: TerminalPromptProps) => {
  return (
    <div className={`flex items-center gap-2 font-mono text-sm ${className}`}>
      <span className="text-accent terminal-glow">guest@portfolio</span>
      <span className="text-muted-foreground">:</span>
      <span className="text-secondary">~</span>
      <span className="text-muted-foreground">$</span>
      {command && <span className="text-foreground">{command}</span>}
      <span className="cursor inline-block"></span>
    </div>
  );
};

export default TerminalPrompt;
