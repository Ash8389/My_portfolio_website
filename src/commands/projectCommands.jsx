import React from 'react';
import { PROJECTS } from '../data/projects';
import { TerminalHeader, TerminalListOutput } from '../components/TerminalOutputs/TerminalNativeOutput';
import ArchitectureDiagram from '../components/Projects/ArchitectureDiagram';

const VALID_SECTIONS = ['architecture', 'decisions', 'challenges', 'github'];
const PROJECT_IDS = Object.keys(PROJECTS);

export const projectCommands = {
  projects: {
    description: "List backend and AI engineering projects",
    category: "PROJECTS",
    aliases: ["proj", "project-list"],
    handler: (args) => {
      // 1. Unexpected arguments error check
      if (args && args.length > 0) {
        const suggestedCommand = `project ${args.join(' ')}`;
        return {
          type: "jsx",
          content: (
            <div className="space-y-3 py-1 font-mono text-sm">
              <div className="text-red-400 font-bold">projects: unexpected arguments</div>
              <div className="text-slate-300 text-xs">
                Usage:<br />
                &nbsp;&nbsp;projects
              </div>
              <div className="text-slate-300 text-xs">
                Did you mean:<br />
                &nbsp;&nbsp;<span className="text-emerald-400 font-bold">{suggestedCommand}</span>
              </div>
            </div>
          )
        };
      }

      return {
        type: "jsx",
        content: (
          <div className="space-y-3 py-1 font-mono text-sm">
            <TerminalHeader title="~/projects" />
            <div className="text-xs text-slate-400 font-mono">
              {Object.keys(PROJECTS).map(pId => (
                <div key={pId}>drwxr-xr-x  {pId}/</div>
              ))}
            </div>

            <div className="space-y-2 pt-2 border-t border-slate-800 text-xs">
              {Object.values(PROJECTS).map((p) => (
                <div key={p.id} className="space-y-0.5">
                  <div className="text-emerald-400 font-bold font-mono">
                    {p.id}/ <span className="text-slate-400 text-[11px] font-normal">({p.category})</span>
                  </div>
                  <div className="text-slate-300 font-sans pl-3">{p.shortDescription}</div>
                  <div className="text-cyan-300 text-[11px] font-mono pl-3">
                    Stack: {p.techStack.join(" • ")}
                  </div>
                </div>
              ))}
            </div>

            <div className="text-xs text-slate-500 pt-2 border-t border-slate-800 font-sans">
              Use <span className="text-emerald-400 font-mono font-bold">cd &lt;project-name&gt;</span> (e.g. <span className="text-emerald-400 font-mono font-bold">cd ewallet</span>) or <span className="text-emerald-400 font-mono font-bold">project &lt;name&gt;</span> to inspect.
            </div>
          </div>
        )
      };
    }
  },

  project: {
    description: "Open specific project terminal inspection",
    category: "PROJECTS",
    aliases: [],
    handler: (args) => {
      // 1. Missing project name error check (0 arguments)
      if (!args || args.length === 0) {
        return {
          type: "jsx",
          content: (
            <div className="space-y-3 py-1 font-mono text-sm">
              <div className="text-amber-400 font-bold">project: missing project name</div>
              <div>
                <div className="text-slate-300 text-xs">Usage:</div>
                <div className="text-emerald-400 text-xs pl-2">project &lt;name&gt; [section]</div>
              </div>
              <div>
                <div className="text-slate-300 text-xs">Available projects:</div>
                <div className="text-cyan-300 text-xs pl-2">
                  {PROJECT_IDS.join(" • ")}
                </div>
              </div>
              <div>
                <div className="text-slate-300 text-xs">Available sections:</div>
                <div className="text-cyan-300 text-xs pl-2">
                  {VALID_SECTIONS.join(" • ")}
                </div>
              </div>
            </div>
          )
        };
      }

      // 2. Too many arguments error check (>2 arguments)
      if (args.length > 2) {
        return {
          type: "jsx",
          content: (
            <div className="space-y-2 py-1 font-mono text-sm">
              <div className="text-red-400 font-bold">project: too many arguments</div>
              <div className="text-slate-300 text-xs">
                Usage:<br />
                &nbsp;&nbsp;project &lt;name&gt; [section]
              </div>
            </div>
          )
        };
      }

      const targetId = args[0].toLowerCase();
      const subcommand = args[1] ? args[1].toLowerCase() : null;

      // 3. Unknown project error check
      const projectData = PROJECTS[targetId];
      if (!projectData) {
        return {
          type: "jsx",
          content: (
            <div className="space-y-3 py-1 font-mono text-sm">
              <div className="text-red-400 font-bold">project: project '{targetId}' not found</div>
              <div>
                <div className="text-slate-300 text-xs">Available projects:</div>
                <div className="text-cyan-300 text-xs pl-2">
                  {PROJECT_IDS.join(" • ")}
                </div>
              </div>
            </div>
          )
        };
      }

      // 4. Unknown section error check
      if (subcommand && !VALID_SECTIONS.includes(subcommand)) {
        return {
          type: "jsx",
          content: (
            <div className="space-y-3 py-1 font-mono text-sm">
              <div className="text-red-400 font-bold">project: unknown section '{subcommand}'</div>
              <div>
                <div className="text-slate-300 text-xs">Available sections:</div>
                <div className="text-cyan-300 text-xs pl-2">
                  {VALID_SECTIONS.join(" • ")}
                </div>
              </div>
            </div>
          )
        };
      }

      // 5. Valid section handlers
      if (subcommand === 'architecture') {
        return {
          type: "architecture",
          title: `${projectData.name.toUpperCase()} SYSTEM`,
          content: projectData.architectureDiagram,
          keyFlows: projectData.keyFlows
        };
      }

      if (subcommand === 'decisions') {
        return {
          type: "jsx",
          content: (
            <div className="space-y-3 py-1 font-mono text-sm">
              <TerminalHeader title={`${projectData.name.toUpperCase()} — DESIGN DECISIONS`} />
              <div className="space-y-2 text-xs">
                {projectData.decisions.map((d, idx) => (
                  <div key={idx} className="space-y-0.5">
                    <div className="text-emerald-400 font-bold">{idx + 1}. {d.title}</div>
                    <div className="text-slate-300 font-sans pl-3">{d.detail}</div>
                  </div>
                ))}
              </div>
            </div>
          )
        };
      }

      if (subcommand === 'challenges') {
        return {
          type: "jsx",
          content: (
            <div className="space-y-3 py-1 font-mono text-sm">
              <TerminalHeader title={`${projectData.name.toUpperCase()} — CHALLENGES & SOLUTIONS`} />
              <div className="space-y-2 text-xs">
                {projectData.challenges.map((c, idx) => (
                  <div key={idx} className="space-y-0.5 font-sans">
                    <div className="text-amber-400 font-mono font-bold">PROBLEM {idx + 1}: {c.problem}</div>
                    <div className="text-emerald-300 pl-3">SOLUTION: {c.solution}</div>
                  </div>
                ))}
              </div>
            </div>
          )
        };
      }

      if (subcommand === 'github') {
        if (projectData.github) {
          window.open(projectData.github, "_blank", "noopener,noreferrer");
        }
        return {
          type: "jsx",
          content: (
            <div className="py-1 font-mono text-sm text-emerald-400">
              Opening GitHub repository for {projectData.name} ({projectData.github})...
            </div>
          )
        };
      }

      // Default README / Project Overview view
      return {
        type: "jsx",
        content: (
          <div className="space-y-4 py-1 font-mono text-sm max-w-4xl">
            <TerminalHeader title={projectData.name.toUpperCase()} />

            <div>
              <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">DESCRIPTION</div>
              <div className="text-slate-200 font-sans text-xs mt-0.5 leading-relaxed">{projectData.longDescription}</div>
            </div>

            <div>
              <div className="text-xs text-slate-400 font-bold uppercase tracking-wider">TECH STACK</div>
              <div className="text-emerald-400 text-xs mt-0.5">{projectData.techStack.join(" • ")}</div>
            </div>

            {projectData.services && (
              <div>
                <div className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">SERVICES & COMPONENTS</div>
                <div className="space-y-1 pl-2 border-l border-slate-800 text-xs">
                  {projectData.services.map((s, idx) => (
                    <div key={idx} className="text-slate-300">
                      <span className="text-cyan-400 font-bold">{s.name}:</span> {s.desc}
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div>
              <div className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">ENGINEERING HIGHLIGHTS</div>
              <TerminalListOutput items={projectData.highlights} />
            </div>

            <div>
              <div className="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">SYSTEM ARCHITECTURE DIAGRAM</div>
              <ArchitectureDiagram 
                title={`${projectData.name.toUpperCase()} SYSTEM`}
                diagramText={projectData.architectureDiagram} 
                keyFlows={projectData.keyFlows}
              />
            </div>

            {projectData.github && (
              <div className="text-xs text-slate-400 pt-2 border-t border-slate-800">
                GitHub Repository: <a href={projectData.github} target="_blank" rel="noopener noreferrer" className="text-emerald-400 underline font-bold">{projectData.github}</a>
              </div>
            )}
          </div>
        )
      };
    }
  }
};
