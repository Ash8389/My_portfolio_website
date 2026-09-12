import { useMemo } from 'react';
import { getDirectoryContents } from '../data/filesystem';
import { PROJECTS } from '../data/projects';
import { VALID_THEMES } from '../data/themes';

export function useAutocomplete(input, commandList, cwd = '~') {
  const suggestions = useMemo(() => {
    const trimmed = input.trimStart().toLowerCase();
    if (!trimmed) return [];

    const parts = trimmed.split(/\s+/);
    const primary = parts[0];

    // File / Directory path autocompletion for shell commands (cd, cat, ls, tree)
    if (['cd', 'cat', 'ls', 'tree'].includes(primary)) {
      const pathArg = parts.length > 1 ? parts[1] : '';
      const fsResult = getDirectoryContents(cwd, '');
      
      if (!fsResult.isFile && fsResult.entries) {
        const availableNames = fsResult.entries.map(e => e.rawName);
        const matches = availableNames.filter(n => n.toLowerCase().startsWith(pathArg));
        return matches.map(m => `${primary} ${m}`);
      }
    }

    // Subcommand completion for `project <name>`
    if (primary === 'project') {
      const projectNames = Object.keys(PROJECTS);
      const subOptions = ['architecture', 'decisions', 'challenges', 'github'];

      if (parts.length === 2) {
        const targetProjPrefix = parts[1];
        const matchingProjects = projectNames.filter(p => p.startsWith(targetProjPrefix));
        return matchingProjects.map(p => `project ${p}`);
      } else if (parts.length === 3) {
        const targetProj = parts[1];
        const subPrefix = parts[2];
        if (projectNames.includes(targetProj)) {
          const matchingSubs = subOptions.filter(s => s.startsWith(subPrefix));
          return matchingSubs.map(s => `project ${targetProj} ${s}`);
        }
      }
      return projectNames.map(p => `project ${p}`);
    }

    // Argument completion for `theme <name>`
    if (primary === 'theme') {
      const themeArg = parts.length > 1 ? parts[1] : '';
      const matches = VALID_THEMES.filter(t => t.toLowerCase().startsWith(themeArg));
      return matches.map(m => `theme ${m}`);
    }

    // Argument completion for `resume` / `cv` flags
    if (primary === 'resume' || primary === 'cv') {
      const flagArg = parts.length > 1 ? parts[1] : '';
      const resumeFlags = ['--view', '--download', '-v', '-d'];
      const matches = resumeFlags.filter(f => f.startsWith(flagArg));
      return matches.map(m => `${primary} ${m}`);
    }

    // Primary command matching
    if (parts.length === 1) {
      return commandList.filter(cmd => cmd.toLowerCase().startsWith(primary));
    }

    return [];
  }, [input, commandList, cwd]);

  const topSuggestion = suggestions.length > 0 ? suggestions[0] : null;

  return {
    suggestions,
    topSuggestion
  };
}
