/**
 * Parses raw terminal input string into command name and arguments.
 * Handles quoted arguments cleanly.
 */
export function parseCommand(rawInput) {
  const trimmed = rawInput.trim();
  if (!trimmed) {
    return { command: '', args: [], raw: '' };
  }

  // Regex to split by spaces while respecting double/single quotes
  const regex = /[^\s"']+|"([^"]*)"|'([^']*)'/g;
  const tokens = [];
  let match;

  while ((match = regex.exec(trimmed)) !== null) {
    // Index 1 is double-quoted text, index 2 is single-quoted text, index 0 is unquoted token
    if (match[1] !== undefined) {
      tokens.push(match[1]);
    } else if (match[2] !== undefined) {
      tokens.push(match[2]);
    } else {
      tokens.push(match[0]);
    }
  }

  const command = tokens[0] ? tokens[0].toLowerCase() : '';
  const args = tokens.slice(1);

  return {
    command,
    args,
    raw: trimmed
  };
}
