import React from 'react';

export default function CommandSuggestions({ suggestions, input, onSelect }) {
  if (!suggestions || suggestions.length <= 1 || !input.trim()) return null;

  return (
    <div className="py-2 pl-4 md:pl-28 font-mono text-xs text-slate-400">
      <div className="text-[11px] text-slate-500 mb-1 font-semibold uppercase tracking-wider">
        Matching Suggestions (press TAB to complete):
      </div>
      <div className="flex flex-wrap gap-2">
        {suggestions.slice(0, 8).map((sugg) => (
          <button
            key={sugg}
            onClick={() => onSelect(sugg)}
            className="px-2 py-1 bg-slate-900/90 hover:bg-slate-800 text-emerald-400 border border-slate-800 hover:border-emerald-500/50 rounded transition-all"
          >
            {sugg}
          </button>
        ))}
      </div>
    </div>
  );
}
