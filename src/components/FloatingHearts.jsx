import { useEffect, useState } from 'react';

const HEART_CHARS = ['❤️', '💕', '💖', '💗', '💝', '💘', '🩷', '✨'];

function Heart({ id }) {
  const [style] = useState(() => ({
    left: `${Math.random() * 100}%`,
    animationDuration: `${8 + Math.random() * 8}s`,
    animationDelay: `${Math.random() * 5}s`,
    fontSize: `${12 + Math.random() * 18}px`,
  }));

  const char = HEART_CHARS[Math.floor(Math.random() * HEART_CHARS.length)];

  return (
    <div className="floating-heart" style={style}>
      {char}
    </div>
  );
}

export default function FloatingHearts() {
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    const initial = Array.from({ length: 12 }, (_, i) => i);
    setHearts(initial);

    let counter = initial.length;
    const interval = setInterval(() => {
      setHearts((prev) => {
        const next = [...prev, counter++];
        // Keep only last 20 hearts
        if (next.length > 20) return next.slice(-20);
        return next;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {hearts.map((id) => (
        <Heart key={id} id={id} />
      ))}
    </div>
  );
}
