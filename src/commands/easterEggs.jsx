import React from 'react';

export const easterEggCommands = {
  sudo: {
    description: "Superuser execution simulation",
    category: "EASTER_EGG",
    aliases: [],
    handler: (args) => {
      const fullCmd = args.join(" ").toLowerCase();

      if (fullCmd.includes("hire ashish") || fullCmd.includes("hire")) {
        return {
          type: "jsx",
          content: (
            <div className="space-y-2 py-1 text-sm">
              <div className="text-amber-400 font-mono">[sudo] recruiting manager authentication requested...</div>
              <div className="text-emerald-400 font-bold text-base">
                Access granted! Great decision.
              </div>
              <div className="text-slate-300">
                Ashish Jha is ready to bring strong software architecture, Spring Boot microservices, Kafka event streaming, and problem-solving skills to your engineering team.
              </div>
              <div className="text-xs text-slate-400 pt-1">
                Type <span className="text-emerald-400 font-mono">contact</span> or <span className="text-emerald-400 font-mono">email</span> to reach out immediately.
              </div>
            </div>
          )
        };
      }

      return {
        type: "jsx",
        content: (
          <div className="space-y-1 py-1 text-sm font-mono">
            <div className="text-slate-400">[sudo] permission denied: user is not in the sudoers file.</div>
            <div className="text-slate-500 text-xs">This incident will be reported to Ashish.</div>
          </div>
        )
      };
    }
  },

  coffee: {
    description: "Initialize coffee protocol",
    category: "EASTER_EGG",
    aliases: [],
    handler: () => ({
      type: "jsx",
      content: (
        <div className="space-y-2 py-1 text-sm font-mono">
          <div className="text-amber-400 font-bold text-base">☕ Coffee initialized.</div>
          <div className="text-emerald-400">
            Developer productivity +100%. Code compilation speed optimized.
          </div>
        </div>
      )
    })
  },

  42: {
    description: "The answer to life, the universe, and everything",
    category: "EASTER_EGG",
    aliases: [],
    handler: () => ({
      type: "jsx",
      content: (
        <div className="py-1 text-sm text-cyan-400 font-mono">
          42: The answer to the ultimate question of life, the universe, and backend engineering.
        </div>
      )
    })
  },

  matrix: {
    description: "Matrix reference",
    category: "EASTER_EGG",
    aliases: [],
    handler: () => ({
      type: "jsx",
      content: (
        <div className="space-y-1 py-1 text-sm font-mono text-emerald-400">
          <div>Wake up, Neo...</div>
          <div>The Matrix has you.</div>
          <div className="text-xs text-slate-400 pt-1">
            (No matrix rain visual noise here — strictly clean, minimal, production terminal aesthetic!)
          </div>
        </div>
      )
    })
  },

  exit: {
    description: "Terminate terminal session",
    category: "EASTER_EGG",
    aliases: ["quit"],
    handler: () => ({
      type: "jsx",
      content: (
        <div className="space-y-2 py-1 text-sm font-mono">
          <div className="text-amber-400 font-bold">Session terminated.</div>
          <div className="text-slate-300">
            Thanks for visiting Ashish Jha's interactive terminal portfolio.
          </div>
          <div className="text-xs text-slate-500">
            Type <span className="text-emerald-400 font-mono font-bold">help</span> or <span className="text-emerald-400 font-mono font-bold">clear</span> to restart exploring.
          </div>
        </div>
      )
    })
  }
};
