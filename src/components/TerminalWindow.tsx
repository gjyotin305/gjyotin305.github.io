import { ReactNode } from "react";

interface TerminalWindowProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

const TerminalWindow = ({ title = "terminal", children, className = "" }: TerminalWindowProps) => {
  return (
    <div className={`border-2 border-primary/30 rounded bg-card/50 backdrop-blur-sm overflow-hidden shadow-lg ${className}`}>
      <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 border-b border-primary/30">
        <span className="text-xs text-muted-foreground">{title}</span>
      </div>
      <div className="p-6">
        {children}
      </div>
    </div>
  );
};

export default TerminalWindow;
