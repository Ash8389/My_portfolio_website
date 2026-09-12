/**
 * Computes Levenshtein distance between two strings
 */
export function editDistance(a, b) {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;

  const matrix = [];

  for (let i = 0; i <= b.length; i++) {
    matrix[i] = [i];
  }

  for (let j = 0; j <= a.length; j++) {
    matrix[0][j] = j;
  }

  for (let i = 1; i <= b.length; i++) {
    for (let j = 1; j <= a.length; j++) {
      if (b.charAt(i - 1) === a.charAt(j - 1)) {
        matrix[i][j] = matrix[i - 1][j - 1];
      } else {
        matrix[i][j] = Math.min(
          matrix[i - 1][j - 1] + 1, // substitution
          matrix[i][j - 1] + 1,     // insertion
          matrix[i - 1][j] + 1      // deletion
        );
      }
    }
  }

  return matrix[b.length][a.length];
}

/**
 * Finds closest command recommendation for unknown commands
 */
export function findClosestCommand(input, validCommands) {
  if (!input || !validCommands || validCommands.length === 0) return null;

  const query = input.toLowerCase();
  let bestMatch = null;
  let minDistance = Infinity;

  for (const cmd of validCommands) {
    const dist = editDistance(query, cmd.toLowerCase());
    // Only match if distance is reasonably small relative to string length
    if (dist < minDistance && dist <= 3) {
      minDistance = dist;
      bestMatch = cmd;
    }
  }

  return bestMatch;
}
