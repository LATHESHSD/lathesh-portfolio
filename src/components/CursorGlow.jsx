import { useEffect, useState } from "react";

export default function CursorGlow() {
  const [pos, setPos] = useState({ x: -200, y: -200 });

  useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-30 hidden md:block"
      style={{
        background: `radial-gradient(600px circle at ${pos.x}px ${pos.y}px, rgba(59,130,246,0.08), transparent 40%)`,
      }}
    />
  );
}