import React, { useRef, useEffect } from 'react';
import { useTerminal } from '../../hooks/useTerminal';
import TerminalHeader from './TerminalHeader';
import TerminalOutput from './TerminalOutput';
import TerminalInput from './TerminalInput';
import CommandSuggestions from './CommandSuggestions';
import BootSequence from './BootSequence';
import TerminalPortrait from './TerminalPortrait';
import { PORTRAIT_B64 } from '../../data/imageB64';
import { THEMES } from '../../data/themes';

export default function Terminal() {
  const {
    outputs,
    input,
    setInput,
    activePrompt,
    execute,
    theme,
    bootComplete,
    setBootComplete,
    navigateUp,
    navigateDown,
    suggestions,
    topSuggestion
  } = useTerminal();

  const terminalBodyRef = useRef(null);

  // Auto-scroll to bottom on new output or input change
  const scrollToBottom = () => {
    if (terminalBodyRef.current) {
      terminalBodyRef.current.scrollTop = terminalBodyRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [outputs, input, bootComplete]);

  // Handle clicking anywhere in the terminal body to focus the input
  const handleTerminalClick = () => {
    // Don't intercept text selection
    if (window.getSelection().toString()) return;
    const inputEl = terminalBodyRef.current?.querySelector('input');
    if (inputEl) {
      inputEl.focus();
    }
  };

  // Get centralized theme class string
  const activeThemeConfig = THEMES[theme] || THEMES.midnight;
  const themeClasses = activeThemeConfig.bgClass;

  return (
    <div className={`min-h-screen w-full flex items-center justify-center p-2 sm:p-4 md:p-6 font-mono transition-colors duration-300 ${
      theme === 'light' ? 'bg-slate-200' : 'bg-slate-950'
    }`}>
      {/* Terminal Window Container */}
      <div 
        className={`w-full max-w-5xl h-[92vh] max-h-[900px] flex flex-col rounded-lg border shadow-2xl overflow-hidden transition-all duration-300 ${themeClasses}`}
      >
        {/* Title Bar */}
        <TerminalHeader 
          currentTheme={theme}
          onHelpClick={() => execute('help')}
        />

        {/* Terminal Body */}
        <div 
          ref={terminalBodyRef}
          onClick={handleTerminalClick}
          className="flex-1 p-3 sm:p-5 overflow-y-auto space-y-4 cursor-text font-mono pb-6"
        >
          {/* Boot Sequence or Initial Welcome Screen */}
          {!bootComplete ? (
            <BootSequence onComplete={() => setBootComplete(true)} />
          ) : (
            <>
              {/* Initial Welcome Screen Banner (Side-by-side Portrait + Info) */}
              {outputs.length === 0 && (
                <div className="space-y-4">
                  <TerminalPortrait b64Image={PORTRAIT_B64} />
                </div>
              )}

              {/* Past Command Outputs */}
              <TerminalOutput outputs={outputs} />

              {/* Command Suggestions (Tab) */}
              <CommandSuggestions 
                suggestions={suggestions}
                input={input}
                onSelect={(cmd) => execute(cmd)}
              />

              {/* Active Prompt & Input */}
              <TerminalInput 
                input={input}
                setInput={setInput}
                activePrompt={activePrompt}
                onExecute={(cmd) => execute(cmd)}
                onNavigateUp={navigateUp}
                onNavigateDown={navigateDown}
                topSuggestion={topSuggestion}
                isBooting={!bootComplete}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}
