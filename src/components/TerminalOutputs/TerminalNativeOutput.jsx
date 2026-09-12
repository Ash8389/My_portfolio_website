import React from 'react';

/**
 * Terminal-Native Plain-Text Renderer primitives.
 * Strictly outputs raw CLI stream text, indented sections, underline headers,
 * ASCII trees, and plain tables WITHOUT any cards, panels, or rounded UI containers.
 */

export function TerminalHeader({ title, underlineChar = "=" }) {
  if (!title) return null;
  const line = underlineChar.repeat(title.length);
  return (
    <div className="font-mono text-emerald-400 font-bold py-1">
      <div>{title}</div>
      <div className="text-emerald-500 select-none">{line}</div>
    </div>
  );
}

export function TerminalSection({ label, value, indent = 2 }) {
  if (!label) return null;
  const indentSpaces = " ".repeat(indent);
  return (
    <div className="font-mono text-sm py-1">
      <div className="text-cyan-400 font-bold uppercase tracking-wider text-xs">{label}</div>
      <div className="text-slate-200 whitespace-pre-wrap leading-relaxed mt-0.5" style={{ paddingLeft: `${indent * 0.5}rem` }}>
        {value}
      </div>
    </div>
  );
}

export function TerminalTreeOutput({ lines }) {
  if (!lines || lines.length === 0) return null;
  return (
    <div className="font-mono text-sm py-1 space-y-0.5">
      {lines.map((line, idx) => {
        const isDir = line.endsWith("/");
        const isRoot = idx === 0;
        return (
          <div key={idx} className="whitespace-pre">
            {isRoot ? (
              <span className="text-emerald-400 font-bold">{line}</span>
            ) : isDir ? (
              <span className="text-cyan-400 font-semibold">{line}</span>
            ) : (
              <span className="text-slate-300">{line}</span>
            )}
          </div>
        );
      })}
    </div>
  );
}

export function TerminalListOutput({ title, items }) {
  if (!items || items.length === 0) return null;
  return (
    <div className="font-mono text-sm py-1 space-y-1">
      {title && <div className="text-emerald-400 font-bold mb-1">{title}</div>}
      <div className="space-y-1 pl-2 border-l border-slate-800">
        {items.map((item, idx) => (
          <div key={idx} className="text-slate-300 flex items-start gap-2">
            <span className="text-emerald-500 font-bold select-none">•</span>
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function TerminalKeyValueList({ pairs }) {
  if (!pairs || pairs.length === 0) return null;
  return (
    <div className="font-mono text-sm py-1 space-y-1.5">
      {pairs.map((pair, idx) => (
        <div key={idx} className="grid grid-cols-[140px_1fr] gap-2">
          <span className="text-slate-400 font-bold uppercase text-xs">{pair.label}:</span>
          <span className="text-slate-200">{pair.value}</span>
        </div>
      ))}
    </div>
  );
}
