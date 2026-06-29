import { useEffect, useState } from 'react';

function Sparkle({ id }) {
  const [style] = useState(() => ({
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    animationDuration: `${2 + Math.random() * 3}s`,
    animationDelay: `${Math.random() * 4}s`,
    width: `${2 + Math.random() * 4}px`,
    height: `${2 + Math.random() * 4}px`,
  }));

  return <div className="sparkle" style={style} />;
}

export default function SparkleParticles() {
  const [sparkles] = useState(() =>
    Array.from({ length: 25 }, (_, i) => i)
  );

  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {sparkles.map((id) => (
        <Sparkle key={id} id={id} />
      ))}
    </div>
  );
}
