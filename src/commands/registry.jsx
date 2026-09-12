import React from 'react';
import { coreCommands } from './coreCommands';
import { projectCommands } from './projectCommands';
import { profileCommands } from './profileCommands';
import { shellCommands } from './shellCommands';
import { easterEggCommands } from './easterEggs';
import { findClosestCommand } from '../utils/fuzzyMatch';

// Combine all command maps
const ALL_COMMAND_OBJECTS = {
  ...shellCommands,
  ...coreCommands,
  ...projectCommands,
  ...profileCommands,
  ...easterEggCommands
};

// Create an alias map
const ALIAS_MAP = {};
const COMMAND_NAMES = [];

Object.entries(ALL_COMMAND_OBJECTS).forEach(([cmdName, def]) => {
  COMMAND_NAMES.push(cmdName);
  ALIAS_MAP[cmdName] = cmdName;
  if (def.aliases && Array.isArray(def.aliases)) {
    def.aliases.forEach(alias => {
      ALIAS_MAP[alias] = cmdName;
    });
  }
});

/**
 * Execute a parsed command object
 */
export function executeCommand(parsed, state) {
  const { command, args, raw } = parsed;

  if (!command) {
    return null;
  }

  // Check alias map
  const resolvedName = ALIAS_MAP[command.toLowerCase()];

  if (resolvedName && ALL_COMMAND_OBJECTS[resolvedName]) {
    const cmdDef = ALL_COMMAND_OBJECTS[resolvedName];
    try {
      return cmdDef.handler(args, state);
    } catch (err) {
      console.error(`Error executing command '${command}':`, err);
      return {
        type: "jsx",
        content: (
          <div className="py-1 text-sm text-red-400 font-mono">
            Error executing command <span className="font-bold">{command}</span>: {err.message || "Internal terminal exception"}
          </div>
        )
      };
    }
  }

  // Handle unknown commands & fuzzy matching
  const closest = findClosestCommand(command, COMMAND_NAMES);

  return {
    type: "jsx",
    content: (
      <div className="space-y-1 py-1 text-sm font-mono">
        <div className="text-red-400">
          command not found: <span className="font-bold">{raw}</span>
        </div>
        {closest ? (
          <div className="text-slate-300">
            Did you mean: <span className="text-emerald-400 font-bold underline cursor-pointer">{closest}</span>?
          </div>
        ) : (
          <div className="text-slate-400 text-xs">
            Type <span className="text-emerald-400 font-bold">help</span> to see available commands.
          </div>
        )}
      </div>
    )
  };
}

export function getAllCommandNames() {
  return COMMAND_NAMES;
}

export function getRegistry() {
  return ALL_COMMAND_OBJECTS;
}
