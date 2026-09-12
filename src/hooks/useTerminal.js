import { useState, useCallback, useMemo } from 'react';
import { parseCommand } from '../utils/commandParser';
import { executeCommand, getAllCommandNames } from '../commands/registry.jsx';
import { useCommandHistory } from './useCommandHistory';
import { useAutocomplete } from './useAutocomplete';
import { PROFILE } from '../data/profile';

export function useTerminal() {
  const [outputs, setOutputs] = useState([]);
  const [input, setInput] = useState('');
  const [cwd, setCwd] = useState('~');
  const [theme, setThemeState] = useState(() => {
    return localStorage.getItem('ashish_portfolio_theme') || 'midnight';
  });

  const [bootComplete, setBootComplete] = useState(false);

  const { history, pushHistory, clearHistory, navigateUp, navigateDown, resetHistoryIndex } = useCommandHistory();
  const commandNames = getAllCommandNames();
  const { suggestions, topSuggestion } = useAutocomplete(input, commandNames, cwd);

  // Save theme changes
  const setTheme = useCallback((newTheme) => {
    setThemeState(newTheme);
    localStorage.setItem('ashish_portfolio_theme', newTheme);
  }, []);

  const clearOutputs = useCallback(() => {
    setOutputs([]);
  }, []);

  const activePrompt = useMemo(() => {
    return `${PROFILE.fullHandle}:${cwd}$`;
  }, [cwd]);

  const execute = useCallback((cmdString) => {
    const raw = cmdString || input;
    if (!raw.trim()) {
      // Empty enter pressed
      setOutputs(prev => [
        ...prev,
        {
          id: Date.now() + Math.random(),
          prompt: activePrompt,
          commandStr: '',
          result: null
        }
      ]);
      setInput('');
      resetHistoryIndex();
      return;
    }

    const parsed = parseCommand(raw);
    
    // Check if command is 'clear' or 'cls'
    const cmdLower = parsed.command.toLowerCase();
    if (cmdLower === 'clear' || cmdLower === 'cls') {
      pushHistory(raw);
      clearOutputs();
      setInput('');
      resetHistoryIndex();
      return;
    }

    const executionState = {
      history,
      clearHistory,
      cwd,
      setCwd,
      currentTheme: theme,
      setTheme,
      clearOutputs
    };

    const result = executeCommand(parsed, executionState);

    pushHistory(raw);

    setOutputs(prev => [
      ...prev,
      {
        id: Date.now() + Math.random(),
        prompt: activePrompt,
        commandStr: raw,
        result
      }
    ]);

    setInput('');
    resetHistoryIndex();
  }, [input, history, clearHistory, theme, cwd, activePrompt, pushHistory, clearOutputs, setTheme, resetHistoryIndex]);

  return {
    outputs,
    input,
    setInput,
    cwd,
    setCwd,
    activePrompt,
    execute,
    clearOutputs,
    theme,
    setTheme,
    bootComplete,
    setBootComplete,
    history,
    navigateUp,
    navigateDown,
    suggestions,
    topSuggestion
  };
}
