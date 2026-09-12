import React, { useRef, useEffect } from 'react';
import { PROFILE } from '../../data/profile';

export default function TerminalInput({
  input,
  setInput,
  activePrompt,
  onExecute,
  onNavigateUp,
  onNavigateDown,
  topSuggestion,
  isBooting
}) {
  const inputRef = useRef(null);

  // Keep input focused
  useEffect(() => {
    if (!isBooting && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isBooting]);

  const handleKeyDown = (e) => {
    if (isBooting) return;

    // Tab key autocomplete
    if (e.key === 'Tab') {
      e.preventDefault();
      if (topSuggestion) {
        setInput(topSuggestion);
      }
      return;
    }

    // Up Arrow for history
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      const prevCmd = onNavigateUp(input);
      if (prevCmd !== undefined) {
        setInput(prevCmd);
      }
      return;
    }

    // Down Arrow for history
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      const nextCmd = onNavigateDown();
      if (nextCmd !== undefined) {
        setInput(nextCmd);
      }
      return;
    }

    // Enter key execution
    if (e.key === 'Enter') {
      e.preventDefault();
      onExecute(input);
    }
  };

  // Compute ghost suggestion suffix
  let ghostText = '';
  if (topSuggestion && input && topSuggestion.toLowerCase().startsWith(input.toLowerCase())) {
    ghostText = topSuggestion.slice(input.length);
  }

  const displayPrompt = activePrompt || `${PROFILE.fullHandle}:~$`;

  return (
    <div className="relative flex items-center gap-2 font-mono text-sm pt-2">
      {/* Prompt */}
      <span className="text-emerald-400 font-bold select-none whitespace-nowrap">
        {displayPrompt}
      </span>

      {/* Input container with ghost suggestion */}
      <div className="relative flex-1 flex items-center">
        {/* Real Input */}
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => {
            // Replace smart dashes (em-dash, en-dash, horizontal bar) inserted by OS/browser keyboards
            const val = e.target.value
              .replace(/—/g, '--')
              .replace(/–/g, '-')
              .replace(/―/g, '--');
            setInput(val);
          }}
          onKeyDown={handleKeyDown}
          disabled={isBooting}
          className="w-full bg-transparent text-slate-100 font-mono text-sm outline-none border-none p-0 focus:ring-0 z-10"
          style={{ fontVariantLigatures: 'none', fontFeatureSettings: '"liga" 0, "clig" 0' }}
          spellCheck={false}
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="none"
        />

        {/* Inline Ghost Suggestion */}
        {ghostText && (
          <div 
            className="absolute left-0 pointer-events-none z-0 flex whitespace-pre"
            style={{ fontVariantLigatures: 'none', fontFeatureSettings: '"liga" 0, "clig" 0' }}
          >
            {/* Invisible spacer matching typed input length */}
            <span className="opacity-0 whitespace-pre font-mono">{input}</span>
            {/* Ghost suggestion text */}
            <span className="text-slate-600 font-mono">{ghostText}</span>
          </div>
        )}
      </div>
    </div>
  );
}
