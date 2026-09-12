import React from 'react';
import { PROFILE } from '../../data/profile';
import { Terminal, Maximize2, HelpCircle } from 'lucide-react';

export default function TerminalHeader({ currentTheme, onHelpClick }) {
  return (
    <div className="bg-terminal-header border-b border-terminal-border px-4 py-2.5 flex items-center justify-between select-none">
      {/* Window Controls & Title */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors shadow-sm" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500 transition-colors shadow-sm" />
          <div className="w-3 h-3 rounded-full bg-emerald-500/80 hover:bg-emerald-500 transition-colors shadow-sm" />
        </div>
        
        <div className="flex items-center gap-2 text-xs font-mono text-slate-300 font-semibold pl-2 border-l border-slate-700/60">
          <Terminal size={14} className="text-emerald-400" />
          <span>{PROFILE.fullHandle}: ~</span>
        </div>
      </div>

      {/* Terminal Metadata & Theme Indicator */}
      <div className="flex items-center gap-3 text-xs font-mono">
        <span className="hidden sm:inline-block px-2 py-0.5 rounded bg-slate-800/80 text-slate-400 text-[11px] border border-slate-700/50">
          theme: <span className="text-emerald-400 font-semibold">{currentTheme}</span>
        </span>
        
        <button
          onClick={onHelpClick}
          className="text-slate-400 hover:text-emerald-400 transition-colors p-1 rounded hover:bg-slate-800/50"
          title="Show Command Help (help)"
        >
          <HelpCircle size={15} />
        </button>

        <span className="text-slate-600 hidden md:inline">•</span>
        <span className="text-[11px] text-slate-500 hidden md:inline">AshishOS v2.4</span>
      </div>
    </div>
  );
}
