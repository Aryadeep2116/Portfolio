import { useEffect, useState } from "react";

export function CursorGlow() {
  const [position, setPosition] = useState({ x: -100, y: -100 });

  useEffect(() => {
    const move = (event: MouseEvent) => setPosition({ x: event.clientX, y: event.clientY });
    window.addEventListener("mousemove", move, { passive: true });
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div
      aria-hidden
      className="cursor-glow pointer-events-none fixed left-0 top-0 z-[90] hidden h-8 w-8 rounded-full border border-accent/60 md:block"
      style={{ transform: `translate3d(${position.x - 16}px, ${position.y - 16}px, 0)` }}
    />
  );
}
