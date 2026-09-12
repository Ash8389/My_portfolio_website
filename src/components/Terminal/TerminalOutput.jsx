import React from 'react';
import ArchitectureDiagram from '../Projects/ArchitectureDiagram';

export default function TerminalOutput({ outputs }) {
  if (!outputs || outputs.length === 0) return null;

  return (
    <div className="space-y-4">
      {outputs.map((item) => (
        <div key={item.id} className="space-y-2">
          {/* Command Prompt Line */}
          {item.commandStr !== undefined && (
            <div className="flex items-start gap-2 text-sm font-mono flex-wrap">
              <span className="text-emerald-400 font-bold select-none whitespace-nowrap">
                {item.prompt}
              </span>
              <span className="text-slate-100 font-semibold break-all">
                {item.commandStr}
              </span>
            </div>
          )}

          {/* Dedicated Architecture Output Renderer */}
          {item.result && item.result.type === "architecture" && (
            <div className="text-slate-300 font-mono text-sm leading-relaxed pl-1 md:pl-2">
              <ArchitectureDiagram 
                title={item.result.title} 
                diagramText={typeof item.result.content === 'string' ? item.result.content : null} 
                keyFlows={item.result.keyFlows}
                explanation={item.result.explanation}
              />
              {React.isValidElement(item.result.content) && item.result.content}
            </div>
          )}

          {/* Standard JSX / Text Command Output Content */}
          {item.result && item.result.type !== "architecture" && item.result.content && (
            <div className="text-slate-300 font-mono text-sm leading-relaxed pl-1 md:pl-2">
              {item.result.content}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
