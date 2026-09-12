import React from 'react';

export default function ArchitectureDiagram({ diagramText, title, keyFlows, explanation }) {
  if (!diagramText) return null;

  const cleanDiagram = diagramText.trim();
  const titleLine = title ? title.toUpperCase() : null;
  const underlineStr = titleLine ? '─'.repeat(Math.max(titleLine.length, 24)) : '';

  return (
    <div className="py-2 font-mono text-sm max-w-full overflow-hidden space-y-3">
      {/* 1. Architecture Title */}
      {titleLine && (
        <div className="space-y-0.5">
          <div className="text-emerald-400 font-bold text-xs uppercase tracking-wider font-mono">
            {titleLine}
          </div>
          <div className="text-slate-600 text-xs font-mono select-none">
            {underlineStr}
          </div>
        </div>
      )}

      {/* 2. Canonical Pre-formatted Terminal Architecture Diagram */}
      <pre 
        className="font-mono text-xs text-emerald-400 leading-[1.35] whitespace-pre overflow-x-auto my-0 block py-1 select-text"
        style={{ fontFamily: 'var(--terminal-font, monospace)' }}
      >
        {cleanDiagram}
      </pre>

      {/* 3. Structured Key Flows Section */}
      {((keyFlows && keyFlows.length > 0) || explanation) && (
        <div className="pt-2 border-t border-slate-800/80 space-y-1.5 font-mono text-xs">
          <div className="text-cyan-400 font-bold uppercase tracking-wider">
            Key flow
          </div>
          <div className="text-slate-600 text-xs select-none">
            ────────
          </div>

          {keyFlows && keyFlows.length > 0 && (
            <div className="space-y-1 text-slate-300 pl-1">
              {keyFlows.map((flow, idx) => (
                <div key={idx} className="flex items-start gap-2">
                  <span className="text-emerald-400 font-bold select-none">•</span>
                  <span>{flow}</span>
                </div>
              ))}
            </div>
          )}

          {explanation && !keyFlows && (
            <div className="text-slate-300 pl-1">
              {explanation}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
