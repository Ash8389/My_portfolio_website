/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: [
          '"JetBrains Mono"',
          '"IBM Plex Mono"',
          '"Geist Mono"',
          'ui-monospace',
          'SFMono-Regular',
          'Menlo',
          'Monaco',
          'Consolas',
          '"Liberation Mono"',
          '"Courier New"',
          'monospace',
        ],
      },
      colors: {
        terminal: {
          bg: '#0c0d10',
          panel: '#12141a',
          header: '#181b22',
          border: '#262a36',
          text: '#e2e8f0',
          muted: '#8a94a7',
          dim: '#4a5568',
          accent: '#10b981', // Emerald green accent
          accentGlow: 'rgba(16, 185, 129, 0.15)',
          amber: '#f59e0b',
          cyan: '#06b6d4',
          purple: '#a855f7',
          error: '#ef4444',
          success: '#10b981',
          warning: '#f59e0b',
          info: '#3b82f6',
        }
      },
      boxShadow: {
        'terminal': '0 20px 50px -10px rgba(0, 0, 0, 0.7), 0 0 30px 0 rgba(16, 185, 129, 0.05)',
        'accent-glow': '0 0 15px rgba(16, 185, 129, 0.4)',
      },
      animation: {
        'pulse-fast': 'pulse 1s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'blink': 'blink 1.1s step-start infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        }
      }
    },
  },
  plugins: [],
}
