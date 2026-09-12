import React, { useState, useEffect } from 'react';

export default function BootSequence({ onComplete }) {
  const [lines, setLines] = useState([]);
  const [done, setDone] = useState(false);

  useEffect(() => {
    // Check prefers-reduced-motion
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
      onComplete();
      return;
    }

    const bootSteps = [
      { text: "Initializing AshishOS environment...", delay: 200 },
      { text: "Loading identity........... [OK]", delay: 450 },
      { text: "Loading projects........... [OK]", delay: 700 },
      { text: "Loading skills............. [OK]", delay: 950 },
      { text: "Loading experience......... [OK]", delay: 1200 },
      { text: "System ready.", delay: 1450 },
    ];

    const timers = [];

    bootSteps.forEach((step) => {
      const timer = setTimeout(() => {
        setLines(prev => [...prev, step.text]);
      }, step.delay);
      timers.push(timer);
    });

    const finalTimer = setTimeout(() => {
      setDone(true);
      onComplete();
    }, 1700);
    timers.push(finalTimer);

    return () => {
      timers.forEach(t => clearTimeout(t));
    };
  }, [onComplete]);

  const handleSkip = () => {
    if (!done) {
      setDone(true);
      onComplete();
    }
  };

  return (
    <div 
      className="space-y-1.5 py-3 font-mono text-sm cursor-pointer select-none"
      onClick={handleSkip}
    >
      {lines.map((line, idx) => (
        <div key={idx} className="flex items-center gap-2">
          {line.includes("[OK]") ? (
            <>
              <span className="text-slate-300">{line.replace(" [OK]", "")}</span>
              <span className="text-emerald-400 font-bold">[OK]</span>
            </>
          ) : line.includes("System ready") ? (
            <span className="text-emerald-400 font-bold text-base mt-1">{line}</span>
          ) : (
            <span className="text-cyan-400">{line}</span>
          )}
        </div>
      ))}
      {!done && (
        <div className="text-xs text-slate-500 italic pt-2 flex items-center gap-2 animate-pulse">
          <span>[Press Enter or click to skip boot sequence]</span>
        </div>
      )}
    </div>
  );
}
