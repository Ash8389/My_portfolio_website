import React from 'react';
import { 
  resolveFsPath, 
  getNodeAtPath, 
  getDirectoryContents, 
  getDirectoryTree 
} from '../data/filesystem';
import { 
  TerminalHeader, 
  TerminalSection, 
  TerminalTreeOutput, 
  TerminalListOutput,
  TerminalKeyValueList 
} from '../components/TerminalOutputs/TerminalNativeOutput';
import ArchitectureDiagram from '../components/Projects/ArchitectureDiagram';

export const shellCommands = {
  cd: {
    description: "Change virtual working directory",
    category: "NAVIGATION",
    aliases: [],
    handler: (args, state) => {
      const targetPath = args[0] || "~";
      const currentCwd = state?.cwd || "~";
      const resolved = resolveFsPath(currentCwd, targetPath);
      const node = getNodeAtPath(resolved);

      if (!node) {
        return {
          type: "jsx",
          content: (
            <div className="py-1 text-sm font-mono text-red-400">
              cd: no such directory: <span className="font-bold">{targetPath}</span>
            </div>
          )
        };
      }

      if (node.type === "file") {
        return {
          type: "jsx",
          content: (
            <div className="py-1 text-sm font-mono text-red-400">
              cd: not a directory: <span className="font-bold">{targetPath}</span>
            </div>
          )
        };
      }

      // Update terminal CWD state
      if (state?.setCwd) {
        state.setCwd(resolved);
      }

      return null; // `cd` traditionally produces no output on success
    }
  },

  pwd: {
    description: "Print virtual working directory path",
    category: "NAVIGATION",
    aliases: [],
    handler: (args, state) => {
      const currentCwd = state?.cwd || "~";
      return {
        type: "jsx",
        content: (
          <div className="py-1 text-sm font-mono text-emerald-400 font-bold">
            {currentCwd}
          </div>
        )
      };
    }
  },

  ls: {
    description: "List directory contents",
    category: "NAVIGATION",
    aliases: ["dir"],
    handler: (args, state) => {
      const currentCwd = state?.cwd || "~";
      const targetPath = args[0] || "";
      const result = getDirectoryContents(currentCwd, targetPath);

      if (result.error) {
        return {
          type: "jsx",
          content: (
            <div className="py-1 text-sm font-mono text-red-400">
              {result.error}
            </div>
          )
        };
      }

      if (result.isFile) {
        return {
          type: "jsx",
          content: (
            <div className="py-1 text-sm font-mono text-emerald-400">
              {result.entries[0]}
            </div>
          )
        };
      }

      return {
        type: "jsx",
        content: (
          <div className="py-1 text-sm font-mono space-y-2">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-slate-200">
              {result.entries.map((item) => (
                <div key={item.name} className="flex items-center gap-1.5">
                  {item.type === "dir" ? (
                    <span className="text-cyan-400 font-bold">{item.name}</span>
                  ) : (
                    <span className="text-slate-300">{item.name}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )
      };
    }
  },

  cat: {
    description: "Display contents of a virtual file",
    category: "NAVIGATION",
    aliases: ["read"],
    handler: (args, state) => {
      if (!args || args.length === 0) {
        return {
          type: "jsx",
          content: (
            <div className="py-1 text-sm font-mono text-amber-400">
              Usage: <span className="font-bold">cat &lt;filename&gt;</span> (e.g. <span className="font-bold">cat README.md</span> or <span className="font-bold font-mono">cat about</span>)
            </div>
          )
        };
      }

      const fileName = args[0];
      const currentCwd = state?.cwd || "~";
      const resolved = resolveFsPath(currentCwd, fileName);
      const node = getNodeAtPath(resolved);

      if (!node) {
        return {
          type: "jsx",
          content: (
            <div className="py-1 text-sm font-mono text-red-400">
              cat: no such file or directory: <span className="font-bold">{fileName}</span>
            </div>
          )
        };
      }

      if (node.type === "dir") {
        return {
          type: "jsx",
          content: (
            <div className="py-1 text-sm font-mono text-amber-400">
              cat: <span className="font-bold">{fileName}</span>: Is a directory. Use <span className="text-emerald-400 font-bold">cd {fileName}</span> or <span className="text-emerald-400 font-bold">ls</span>.
            </div>
          )
        };
      }

      if (node.action === "resume") {
        return {
          type: "jsx",
          content: (
            <div className="space-y-2 py-1 font-mono text-sm">
              <TerminalHeader title="Resume" />
              <div className="text-slate-400 text-xs">
                Resume file is not configured yet.
              </div>
            </div>
          )
        };
      }

      if (node.getContent) {
        const data = node.getContent();
        
        // Handle README.md or project file outputs
        if (data.description || data.diagram || data.decisions || data.challenges) {
          return {
            type: "jsx",
            content: (
              <div className="space-y-4 py-1 text-sm font-mono max-w-4xl">
                <TerminalHeader title={data.title} />

                {data.category && (
                  <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">
                    CATEGORY: <span className="text-cyan-300 font-normal">{data.category}</span>
                  </div>
                )}

                {data.description && (
                  <TerminalSection label="DESCRIPTION" value={data.description} />
                )}

                {data.stack && (
                  <TerminalListOutput title="TECH STACK" items={data.stack} />
                )}

                {data.services && (
                  <div className="space-y-1">
                    <div className="text-cyan-400 font-bold uppercase tracking-wider text-xs">SERVICES & COMPONENTS</div>
                    <div className="space-y-1 pl-2 border-l border-slate-800">
                      {data.services.map((s, idx) => (
                        <div key={idx} className="text-slate-300">
                          <span className="text-emerald-400 font-bold">{s.name}:</span> {s.desc}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {data.highlights && (
                  <TerminalListOutput title="ENGINEERING HIGHLIGHTS" items={data.highlights} />
                )}

                {data.diagram && (
                  <div>
                    <ArchitectureDiagram 
                      title={data.title}
                      diagramText={data.diagram} 
                      keyFlows={data.keyFlows}
                    />
                  </div>
                )}

                {data.decisions && (
                  <div className="space-y-2">
                    <div className="text-cyan-400 font-bold uppercase tracking-wider text-xs">ENGINEERING DESIGN DECISIONS</div>
                    {data.decisions.map((d, idx) => (
                      <div key={idx} className="space-y-0.5">
                        <div className="text-emerald-400 font-bold">{idx + 1}. {d.title}</div>
                        <div className="text-slate-300 text-xs pl-3">{d.detail}</div>
                      </div>
                    ))}
                  </div>
                )}

                {data.challenges && (
                  <div className="space-y-2">
                    <div className="text-cyan-400 font-bold uppercase tracking-wider text-xs">ENGINEERING CHALLENGES & SOLUTIONS</div>
                    {data.challenges.map((c, idx) => (
                      <div key={idx} className="space-y-0.5">
                        <div className="text-amber-400 font-bold text-xs">PROBLEM {idx + 1}: {c.problem}</div>
                        <div className="text-emerald-300 text-xs pl-3">SOLUTION: {c.solution}</div>
                      </div>
                    ))}
                  </div>
                )}

                {data.github && (
                  <div className="text-xs text-slate-400 pt-2 border-t border-slate-800">
                    GitHub Repository: <a href={data.github} target="_blank" rel="noopener noreferrer" className="text-emerald-400 underline font-bold">{data.github}</a>
                  </div>
                )}
              </div>
            )
          };
        }

        // Handle contact node
        if (data.personal) {
          return {
            type: "jsx",
            content: (
              <div className="space-y-3 py-1 font-mono text-sm">
                <TerminalHeader title="CONTACT" />
                <div className="space-y-1.5 text-xs pl-1 font-mono">
                  <div className="grid grid-cols-[100px_1fr] gap-2">
                    <span className="text-slate-400 font-bold">Name</span>
                    <span className="text-slate-100">{data.personal.name}</span>
                  </div>
                  <div className="grid grid-cols-[100px_1fr] gap-2">
                    <span className="text-slate-400 font-bold">Email</span>
                    <a href={`mailto:${data.personal.email}`} className="text-emerald-400 underline font-bold hover:text-emerald-300">
                      {data.personal.email}
                    </a>
                  </div>
                  <div className="grid grid-cols-[100px_1fr] gap-2">
                    <span className="text-slate-400 font-bold">Phone</span>
                    <a href={`tel:${data.personal.phone}`} className="text-emerald-400 underline font-bold hover:text-emerald-300">
                      {data.personal.phone}
                    </a>
                  </div>
                  <div className="grid grid-cols-[100px_1fr] gap-2">
                    <span className="text-slate-400 font-bold">GitHub</span>
                    <a href={data.personal.github} target="_blank" rel="noopener noreferrer" className="text-cyan-400 underline font-bold hover:text-cyan-300">
                      github.com/Ash8389
                    </a>
                  </div>
                  <div className="grid grid-cols-[100px_1fr] gap-2">
                    <span className="text-slate-400 font-bold">LinkedIn</span>
                    <a href={data.personal.linkedin} target="_blank" rel="noopener noreferrer" className="text-cyan-400 underline font-bold hover:text-cyan-300">
                      linkedin.com/in/ashish-jha-0344a4243/
                    </a>
                  </div>
                </div>
              </div>
            )
          };
        }

        // Handle about, skills, experience, education, achievements
        if (data.sections) {
          return {
            type: "jsx",
            content: (
              <div className="space-y-3 py-1 font-mono text-sm">
                <TerminalHeader title={data.title} />
                <TerminalKeyValueList pairs={data.sections.map(s => ({ label: s.label, value: s.value }))} />
              </div>
            )
          };
        }

        if (data.items) {
          return {
            type: "jsx",
            content: (
              <div className="space-y-2 py-1 font-mono text-sm">
                <TerminalHeader title={data.title} />
                <TerminalListOutput items={data.items} />
              </div>
            )
          };
        }

        if (data.entries) {
          return {
            type: "jsx",
            content: (
              <div className="space-y-3 py-1 font-mono text-sm">
                <TerminalHeader title={data.title} />
                <div className="space-y-3 font-mono text-xs">
                  {data.entries.map((entry, idx) => (
                    <div key={idx} className="space-y-0.5">
                      {entry.platform ? (
                        <>
                          <div className="text-emerald-400 font-bold text-sm">{entry.platform}</div>
                          <div className="text-slate-200 pl-2">{entry.achievement}</div>
                          {entry.rating && <div className="text-slate-300 pl-2">{entry.rating}</div>}
                          {entry.url && (
                            <div className="pl-2 pt-0.5">
                              <a href={entry.url} target="_blank" rel="noopener noreferrer" className="text-cyan-400 underline font-semibold hover:text-cyan-300 break-all">
                                {entry.url}
                              </a>
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="space-y-1 border-b border-slate-800 pb-2">
                          <div className="text-emerald-400 font-bold">{entry.role || entry.degree || entry.title}</div>
                          {entry.institution && <div className="text-cyan-400 text-xs">{entry.institution} ({entry.period})</div>}
                          {entry.detail && <div className="text-slate-300 text-xs">{entry.detail}</div>}
                          {entry.contributions && (
                            <TerminalListOutput items={entry.contributions} />
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )
          };
        }
      }

      return {
        type: "jsx",
        content: (
          <div className="py-1 text-sm font-mono text-slate-300">
            [file: {fileName}]
          </div>
        )
      };
    }
  },

  tree: {
    description: "Display directory tree of virtual filesystem",
    category: "NAVIGATION",
    aliases: [],
    handler: (args, state) => {
      const currentCwd = state?.cwd || "~";
      const targetPath = args[0] || "";
      const result = getDirectoryTree(currentCwd, targetPath);

      if (result.error) {
        return {
          type: "jsx",
          content: (
            <div className="py-1 text-sm font-mono text-red-400">
              {result.error}
            </div>
          )
        };
      }

      return {
        type: "jsx",
        content: <TerminalTreeOutput lines={result.lines} />
      };
    }
  }
};
