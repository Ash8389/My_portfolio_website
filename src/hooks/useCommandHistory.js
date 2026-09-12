import { useState, useCallback } from 'react';

export function useCommandHistory(maxHistory = 100) {
  const [history, setHistory] = useState([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [tempInput, setTempInput] = useState('');

  const pushHistory = useCallback((cmd) => {
    if (!cmd || !cmd.trim()) return;
    setHistory((prev) => {
      // Don't add duplicate if it matches the last command
      if (prev.length > 0 && prev[prev.length - 1] === cmd.trim()) {
        return prev;
      }
      const updated = [...prev, cmd.trim()];
      return updated.length > maxHistory ? updated.slice(updated.length - maxHistory) : updated;
    });
    setHistoryIndex(-1);
    setTempInput('');
  }, [maxHistory]);

  const clearHistory = useCallback(() => {
    setHistory([]);
    setHistoryIndex(-1);
    setTempInput('');
  }, []);

  const navigateUp = useCallback((currentInputValue) => {
    if (history.length === 0) return currentInputValue;

    if (historyIndex === -1) {
      setTempInput(currentInputValue);
      const newIdx = history.length - 1;
      setHistoryIndex(newIdx);
      return history[newIdx];
    } else if (historyIndex > 0) {
      const newIdx = historyIndex - 1;
      setHistoryIndex(newIdx);
      return history[newIdx];
    }
    return history[0];
  }, [history, historyIndex]);

  const navigateDown = useCallback(() => {
    if (historyIndex === -1) return tempInput;

    if (historyIndex < history.length - 1) {
      const newIdx = historyIndex + 1;
      setHistoryIndex(newIdx);
      return history[newIdx];
    } else {
      setHistoryIndex(-1);
      return tempInput;
    }
  }, [history, historyIndex, tempInput]);

  const resetHistoryIndex = useCallback(() => {
    setHistoryIndex(-1);
    setTempInput('');
  }, []);

  return {
    history,
    historyIndex,
    pushHistory,
    clearHistory,
    navigateUp,
    navigateDown,
    resetHistoryIndex
  };
}
