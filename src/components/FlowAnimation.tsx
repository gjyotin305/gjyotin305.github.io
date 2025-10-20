import { useEffect, useState } from "react";

interface Fish {
  id: number;
  x: number;
  y: number;
  duration: number;
  delay: number;
  size: number;
}

interface FlowAnimationProps {
  isActive: boolean;
}

const FlowAnimation = ({ isActive }: FlowAnimationProps) => {
  const [fishes, setFishes] = useState<Fish[]>([]);

  useEffect(() => {
    if (isActive) {
      // Generate 20-30 fish at random positions
      const newFishes: Fish[] = Array.from({ length: 25 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: Math.random() * 100,
        duration: 15 + Math.random() * 20, // 15-35 seconds
        delay: Math.random() * 5, // 0-5 seconds delay
        size: 20 + Math.random() * 20, // 20-40px
      }));
      setFishes(newFishes);
    } else {
      setFishes([]);
    }
  }, [isActive]);

  if (!isActive) return null;

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {fishes.map((fish) => (
        <div
          key={fish.id}
          className="absolute opacity-30"
          style={{
            left: `${fish.x}%`,
            top: `${fish.y}%`,
            animation: `float-fish ${fish.duration}s linear ${fish.delay}s infinite`,
            width: `${fish.size}px`,
            height: `${fish.size}px`,
          }}
        >
          {/* Simple fish emoji/icon */}
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="text-accent"
          >
            <path d="M6.5 12c.94-3.46 4.94-6 8.5-6 3.56 0 6.06 2.54 7 6-1 3.46-3.44 6-7 6s-7.56-2.54-8.5-6Z" />
            <path d="M18 12v.5" />
            <path d="M16 17.93a9.77 9.77 0 0 1 0-11.86" />
            <path d="M7 10.67C7 8 5.58 5.97 2.73 5.5c-1 1.5-1 5 .23 6.5-1.24 1.5-1.24 5-.23 6.5C5.58 18.03 7 16 7 13.33" />
            <path d="M10.46 7.26C10.2 5.88 9.17 4.24 8 3h5.8a2 2 0 0 1 1.98 1.67l.23 1.4" />
            <path d="m16.01 17.93-.23 1.4A2 2 0 0 1 13.8 21H9.5a5.96 5.96 0 0 0 1.49-3.98" />
          </svg>
        </div>
      ))}
    </div>
  );
};

export default FlowAnimation;
