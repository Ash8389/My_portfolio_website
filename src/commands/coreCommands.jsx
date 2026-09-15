import React from 'react';
import { PROFILE } from '../data/profile';
import { SKILLS_TREE } from '../data/skills';
import { PORTRAIT_B64 } from '../data/imageB64';
import { VALID_THEMES } from '../data/themes';
import { personalInfo } from '../data/personal';
import { TerminalHeader, TerminalTreeOutput } from '../components/TerminalOutputs/TerminalNativeOutput';
import TerminalPortrait from '../components/Terminal/TerminalPortrait';

export const coreCommands = {
  help: {
    description: "Display terminal shell documentation and command guide",
    category: "CORE",
    aliases: ["?"],
    handler: () => ({
      type: "jsx",
      content: (
        <div className="space-y-4 py-1 text-sm font-mono leading-relaxed">
          <TerminalHeader title="ASHISH PORTFOLIO SHELL COMMAND MANUAL" />

          <div className="space-y-3">
            <div>
              <div className="text-cyan-400 font-bold text-xs uppercase tracking-wider">FILESYSTEM NAVIGATION & EXPLORATION</div>
              <div className="space-y-0.5 text-xs text-slate-300 pl-2">
                <div><span className="text-emerald-400 font-bold">ls [path]</span> - List virtual directory contents</div>
                <div><span className="text-emerald-400 font-bold">cd &lt;dir&gt;</span> - Change virtual working directory (e.g. <span className="text-emerald-400 font-bold">cd projects</span>, <span className="text-emerald-400 font-bold">cd ewallet</span>, <span className="text-emerald-400 font-bold">cd ..</span>, <span className="text-emerald-400 font-bold">cd ~</span>)</div>
                <div><span className="text-emerald-400 font-bold">pwd</span> - Print working directory path</div>
                <div><span className="text-emerald-400 font-bold">tree [path]</span> - Display ASCII filesystem directory tree</div>
                <div><span className="text-emerald-400 font-bold">cat &lt;file&gt;</span> - Read virtual file contents (e.g. <span className="text-emerald-400 font-bold">cat README.md</span>, <span className="text-emerald-400 font-bold">cat architecture</span>)</div>
              </div>
            </div>

            <div>
              <div className="text-cyan-400 font-bold text-xs uppercase tracking-wider">PROFILE & CREDENTIALS</div>
              <div className="space-y-0.5 text-xs text-slate-300 pl-2">
                <div><span className="text-emerald-400 font-bold">whoami</span> - Quick professional introduction</div>
                <div><span className="text-emerald-400 font-bold">about</span> - Detailed profile and engineering focus</div>
                <div><span className="text-emerald-400 font-bold">skills [category]</span> - Technical skills tree (languages, backend, databases...)</div>
                <div><span className="text-emerald-400 font-bold">experience</span> - Internship experience & achievements</div>
                <div><span className="text-emerald-400 font-bold">education</span> - Academic degree & university</div>
                <div><span className="text-emerald-400 font-bold">achievements</span> - Competitive programming ratings & stats</div>
              </div>
            </div>

            <div>
              <div className="text-cyan-400 font-bold text-xs uppercase tracking-wider">PROJECTS & ARCHITECTURE</div>
              <div className="space-y-0.5 text-xs text-slate-300 pl-2">
                <div><span className="text-emerald-400 font-bold">projects</span> - List backend & AI projects</div>
                <div><span className="text-emerald-400 font-bold">project &lt;name&gt;</span> - Open project (ewallet, flash-sale, codebase-rag, document-rag, agent-reliability, tinyllama-tutor)</div>
                <div><span className="text-emerald-400 font-bold">project &lt;name&gt; architecture</span> - Show ASCII architecture diagram</div>
                <div><span className="text-emerald-400 font-bold">project &lt;name&gt; decisions</span> - Show design decisions</div>
                <div><span className="text-emerald-400 font-bold">project &lt;name&gt; challenges</span> - Show technical challenges</div>
              </div>
            </div>

            <div>
              <div className="text-cyan-400 font-bold text-xs uppercase tracking-wider">ACTIONS & EXTERNAL LINKS</div>
              <div className="space-y-0.5 text-xs text-slate-300 pl-2">
                <div><span className="text-emerald-400 font-bold">resume</span> - Display resume in terminal</div>
                <div><span className="text-emerald-400 font-bold">resume --view</span> - Open formatted PDF resume (-v)</div>
                <div><span className="text-emerald-400 font-bold">resume --download</span> - Download PDF resume (-d)</div>
                <div><span className="text-emerald-400 font-bold">github</span> - Open GitHub profile</div>
                <div><span className="text-emerald-400 font-bold">linkedin</span> - Open LinkedIn profile</div>
                <div><span className="text-emerald-400 font-bold">email / contact</span> - Direct email & contact channels</div>
                <div><span className="text-emerald-400 font-bold">phone / call</span> - Open phone dialer</div>
              </div>
            </div>

            <div>
              <div className="text-cyan-400 font-bold text-xs uppercase tracking-wider">SYSTEM & UTILITIES</div>
              <div className="space-y-0.5 text-xs text-slate-300 pl-2">
                <div><span className="text-emerald-400 font-bold">neofetch</span> - Display system specifications & green phosphor portrait</div>
                <div><span className="text-emerald-400 font-bold">history [n | -c]</span> - View session command history (or clear with -c)</div>
                <div><span className="text-emerald-400 font-bold">clear / cls</span> - Clear terminal screen (Ctrl+L)</div>
                <div><span className="text-emerald-400 font-bold">theme [name]</span> - Change color theme (midnight, amber, matrix, dracula, light)</div>
              </div>
            </div>

            <div className="pt-1 text-xs text-slate-400">
              KEYBOARD SHORTCUTS: Use <kbd className="px-1 text-slate-200">TAB</kbd> for autocomplete, <kbd className="px-1 text-slate-200">↑/↓</kbd> for command history.
            </div>
          </div>
        </div>
      )
    })
  },

  whoami: {
    description: "Quick professional introduction",
    category: "CORE",
    aliases: ["me"],
    handler: () => ({
      type: "jsx",
      content: (
        <div className="space-y-3 py-1 font-mono text-sm leading-relaxed max-w-2xl">
          <div>
            <div className="text-emerald-400 font-bold text-base">{PROFILE.name}</div>
            <div className="text-slate-600 text-xs select-none">──────────</div>
            <div className="text-slate-200 text-xs mt-0.5">{PROFILE.title} / {PROFILE.subtitle}</div>
          </div>

          <div className="space-y-2 text-xs">
            <div>
              <div className="text-slate-400 font-bold">Education</div>
              <div className="text-slate-300 pl-2">
                {PROFILE.education.degree} · {PROFILE.education.institution} ({PROFILE.education.period})
              </div>
            </div>

            <div>
              <div className="text-slate-400 font-bold">Focus</div>
              <div className="text-cyan-300 pl-2">
                {PROFILE.focus.join(" · ")}
              </div>
            </div>

            <div>
              <div className="text-slate-400 font-bold">Engineering</div>
              <div className="text-emerald-400 pl-2 font-mono">
                {PROFILE.engineering.join(" · ")}
              </div>
            </div>

            {PROFILE.experience && (
              <div>
                <div className="text-slate-400 font-bold">Experience</div>
                <div className="text-slate-300 pl-2">
                  {PROFILE.experience.role} · {PROFILE.experience.company}
                </div>
              </div>
            )}

            <div>
              <div className="text-slate-400 font-bold">Learning & Exploration</div>
              <div className="text-cyan-300 pl-2">
                AI/ML · LLMs · RAG · Python · NumPy · Pandas · Matplotlib · PyTorch
              </div>
            </div>

            <div>
              <div className="text-slate-400 font-bold">Problem Solving</div>
              <div className="text-slate-300 pl-2">
                {PROFILE.problemSolvingSummary}
              </div>
            </div>
          </div>
        </div>
      )
    })
  },

  about: {
    description: "Detailed professional overview",
    category: "CORE",
    aliases: [],
    handler: () => ({
      type: "jsx",
      content: (
        <div className="space-y-4 py-1 font-mono text-sm leading-relaxed max-w-3xl">
          <TerminalHeader title={`ABOUT ${PROFILE.name.toUpperCase()}`} />

          <div className="space-y-3 text-xs">
            <div>
              <div className="text-cyan-400 font-bold uppercase tracking-wider mb-1">SUMMARY</div>
              <div className="text-slate-200 pl-2 leading-relaxed">{PROFILE.summaryText}</div>
            </div>

            <div>
              <div className="text-cyan-400 font-bold uppercase tracking-wider mb-1">EDUCATION</div>
              <div className="text-slate-200 pl-2">
                <div className="text-emerald-400 font-bold">{PROFILE.education.degree}</div>
                <div className="text-slate-300">{PROFILE.education.institution} ({PROFILE.education.period})</div>
              </div>
            </div>

            {PROFILE.experience && (
              <div>
                <div className="text-cyan-400 font-bold uppercase tracking-wider mb-1">EXPERIENCE</div>
                <div className="text-slate-200 pl-2">
                  <div className="text-emerald-400 font-bold">{PROFILE.experience.role}</div>
                  <div className="text-slate-300">{PROFILE.experience.company}</div>
                </div>
              </div>
            )}

            <div>
              <div className="text-cyan-400 font-bold uppercase tracking-wider mb-1">PRIMARY ENGINEERING FOCUS</div>
              <div className="text-emerald-400 font-mono pl-2">
                {PROFILE.focus.join(" • ")} • {PROFILE.engineering.join(" • ")}
              </div>
            </div>

            <div>
              <div className="text-cyan-400 font-bold uppercase tracking-wider mb-1">LEARNING & EXPLORATION</div>
              <div className="text-slate-300 pl-2 leading-relaxed font-mono space-y-1.5">
                <div className="text-slate-400 italic">
                  {PROFILE.learningAndExploration.summary}
                </div>
                <div className="pt-1">
                  <span className="text-cyan-300 font-bold">AI / MACHINE LEARNING:</span> {PROFILE.learningAndExploration.aiMl.join(" • ")}
                </div>
                <div>
                  <span className="text-cyan-300 font-bold">LLM / GENERATIVE AI:</span> {PROFILE.learningAndExploration.llmGenAi.join(" • ")}
                </div>
                <div>
                  <span className="text-cyan-300 font-bold">RETRIEVAL / AI SYSTEMS:</span> {PROFILE.learningAndExploration.retrievalAiSystems.join(" • ")}
                </div>
                <div>
                  <span className="text-cyan-300 font-bold">EXPERIMENTATION & EVALUATION:</span> {PROFILE.learningAndExploration.experimentation.join(" • ")}
                </div>
              </div>
            </div>

            <div>
              <div className="text-cyan-400 font-bold uppercase tracking-wider mb-1">PROBLEM SOLVING & COMPETITIVE PROGRAMMING</div>
              <div className="text-slate-300 pl-2 leading-relaxed font-mono">
                {PROFILE.aboutSections.find(s => s.label === "PROBLEM SOLVING")?.content}
              </div>
            </div>
          </div>
        </div>
      )
    })
  },

  skills: {
    description: "Technical skills tree",
    category: "CORE",
    aliases: ["skill"],
    handler: (args) => {
      const requestedCat = args[0] ? args[0].toLowerCase() : null;

      if (requestedCat && SKILLS_TREE[requestedCat]) {
        return {
          type: "jsx",
          content: (
            <div className="space-y-2 py-1 text-sm font-mono">
              <TerminalHeader title={`~/skills/${requestedCat}`} />
              <div className="space-y-1 text-slate-200 pl-2">
                {SKILLS_TREE[requestedCat].map(item => (
                  <div key={item}>• {item}</div>
                ))}
              </div>
            </div>
          )
        };
      }

      const lines = ["skills/"];
      Object.entries(SKILLS_TREE).forEach(([cat, items], idx, arr) => {
        const isLastCat = idx === arr.length - 1;
        const catPrefix = isLastCat ? "└── " : "├── ";
        const childIndent = isLastCat ? "    " : "│   ";
        lines.push(`${catPrefix}${cat}/`);
        items.forEach((item, iIdx) => {
          const isLastItem = iIdx === items.length - 1;
          const itemPrefix = isLastItem ? "└── " : "├── ";
          lines.push(`${childIndent}${itemPrefix}${item}`);
        });
      });

      return {
        type: "jsx",
        content: (
          <div className="space-y-2 py-1 text-sm font-mono">
            <TerminalHeader title="TECHNICAL SKILLS TAXONOMY" />
            <TerminalTreeOutput lines={lines} />
          </div>
        )
      };
    }
  },

  history: {
    description: "Display session command history list",
    category: "SYSTEM",
    aliases: ["hist"],
    handler: (args, state) => {
      // 1. Check if history clear requested (history -c or history clear)
      if (args && args.length > 0 && (args[0] === '-c' || args[0].toLowerCase() === 'clear')) {
        if (state?.clearHistory) {
          state.clearHistory();
        }
        return {
          type: "jsx",
          content: (
            <div className="py-1 font-mono text-sm text-emerald-400">
              Command history cleared.
            </div>
          )
        };
      }

      // Combine existing history with current history command
      const rawCmd = args && args.length > 0 ? `history ${args.join(' ')}` : 'history';
      const historyList = [...(state?.history || []), rawCmd];

      // Optional limit (e.g. history 5)
      let displayList = historyList;
      if (args && args.length > 0 && !isNaN(parseInt(args[0], 10))) {
        const limit = parseInt(args[0], 10);
        if (limit > 0) {
          displayList = historyList.slice(-limit);
        }
      }

      const startIndex = historyList.length - displayList.length + 1;

      return {
        type: "jsx",
        content: (
          <div className="space-y-2 py-1 font-mono text-sm">
            <TerminalHeader title="SESSION COMMAND HISTORY" />
            <div className="space-y-0.5 text-xs text-slate-300 font-mono pl-1">
              {displayList.map((cmd, idx) => {
                const num = startIndex + idx;
                return (
                  <div key={idx} className="flex gap-3">
                    <span className="text-slate-500 w-8 text-right select-none font-mono">{num}</span>
                    <span className="text-emerald-400 font-semibold">{cmd}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )
      };
    }
  },

  theme: {
    description: "Change terminal color scheme",
    category: "SYSTEM",
    aliases: ["colors"],
    handler: (args, state) => {
      // 1. Too many arguments error check
      if (args && args.length > 1) {
        return {
          type: "jsx",
          content: (
            <div className="space-y-2 py-1 font-mono text-sm">
              <div className="text-red-400 font-bold">theme: too many arguments</div>
              <div className="text-slate-300 text-xs">
                Usage:<br />
                &nbsp;&nbsp;theme &lt;name&gt;
              </div>
            </div>
          )
        };
      }

      const currentTheme = state?.currentTheme || "midnight";

      // 2. No arguments: display current theme and available options
      if (!args || args.length === 0) {
        return {
          type: "jsx",
          content: (
            <div className="space-y-3 py-1 font-mono text-sm">
              <div>Current theme: <span className="text-emerald-400 font-bold">{currentTheme}</span></div>
              <div>
                <div>Available themes:</div>
                <div className="pl-2 space-y-0.5 text-slate-300">
                  {VALID_THEMES.map(t => (
                    <div key={t}>&nbsp;&nbsp;{t}</div>
                  ))}
                </div>
              </div>
              <div className="text-xs text-slate-400">
                Usage:<br />
                &nbsp;&nbsp;theme &lt;name&gt;
              </div>
            </div>
          )
        };
      }

      const requestedTheme = args[0].toLowerCase();

      // 3. Unknown theme error check
      if (!VALID_THEMES.includes(requestedTheme)) {
        return {
          type: "jsx",
          content: (
            <div className="space-y-3 py-1 font-mono text-sm">
              <div className="text-red-400 font-bold">theme: unknown theme '{requestedTheme}'</div>
              <div>
                <div>Available themes:</div>
                <div className="pl-2 space-y-0.5 text-slate-300">
                  {VALID_THEMES.map(t => (
                    <div key={t}>&nbsp;&nbsp;{t}</div>
                  ))}
                </div>
              </div>
            </div>
          )
        };
      }

      // 4. Valid theme change execution
      if (state?.setTheme) {
        state.setTheme(requestedTheme);
      }

      return {
        type: "jsx",
        content: (
          <div className="py-1 font-mono text-sm text-emerald-400 font-bold">
            Theme changed: {requestedTheme}
          </div>
        )
      };
    }
  },

  neofetch: {
    description: "Display portfolio system information and green phosphor portrait",
    category: "SYSTEM",
    aliases: [],
    handler: () => ({
      type: "jsx",
      content: <TerminalPortrait b64Image={PORTRAIT_B64} />
    })
  }
};
