/**
 * Utility functions for creating, formatting, and validating
 * terminal-native Unicode box-drawing architecture diagrams.
 */

/**
 * Creates a single formatted box using standardized Unicode box-drawing characters.
 * @param {string|string[]} content - Single line or array of lines for box content.
 * @param {number} minWidth - Minimum target box width (including borders).
 * @param {Object} options - Custom options (topChar, bottomChar, etc.)
 */
export function drawBox(content, minWidth = 0, options = {}) {
  const lines = Array.isArray(content) ? content : [content];
  const maxContentLength = Math.max(...lines.map(l => l.length));
  
  // Calculate width ensuring at least 2 chars padding on each side
  const padding = options.padding !== undefined ? options.padding : 2;
  const calculatedWidth = maxContentLength + (padding * 2) + 2;
  const width = Math.max(calculatedWidth, minWidth);
  
  const innerWidth = width - 2;

  const topConn = options.topConn || '─';
  const bottomConn = options.bottomConn || '─';

  const topBorder = '┌' + topConn.repeat(Math.floor((innerWidth - 1) / 2)) + 
                    (options.topMid || topConn) + 
                    topConn.repeat(Math.ceil((innerWidth - 1) / 2)) + '┐';
                    
  const bottomBorder = '└' + bottomConn.repeat(Math.floor((innerWidth - 1) / 2)) + 
                       (options.bottomMid || bottomConn) + 
                       bottomConn.repeat(Math.ceil((innerWidth - 1) / 2)) + '┘';

  const formattedLines = lines.map(line => {
    const totalSpaces = innerWidth - line.length;
    const leftSpaces = Math.floor(totalSpaces / 2);
    const rightSpaces = Math.ceil(totalSpaces / 2);
    return '│' + ' '.repeat(leftSpaces) + line + ' '.repeat(rightSpaces) + '│';
  });

  return [topBorder, ...formattedLines, bottomBorder];
}

/**
 * Merges sibling box line arrays horizontally with specified spacing.
 * Ensures sibling boxes visually align on top and bottom borders.
 */
export function drawSiblingBoxes(boxArrays, spacing = 3) {
  if (!boxArrays || boxArrays.length === 0) return [];
  
  const maxHeight = Math.max(...boxArrays.map(b => b.length));
  const spaceStr = ' '.repeat(spacing);
  const result = [];

  for (let i = 0; i < maxHeight; i++) {
    const lineParts = boxArrays.map(box => {
      if (i < box.length) return box[i];
      // Pad empty height if one box is shorter
      const boxWidth = box[0] ? box[0].length : 0;
      return ' '.repeat(boxWidth);
    });
    result.push(lineParts.join(spaceStr));
  }

  return result;
}

/**
 * Validates diagram string formatting to ensure alignment and readability.
 */
export function validateDiagram(diagramText) {
  if (!diagramText || typeof diagramText !== 'string') {
    return { valid: false, errors: ['Diagram content is empty or invalid'] };
  }

  const lines = diagramText.split('\n');
  const errors = [];
  const warnings = [];

  let maxLineLength = 0;
  lines.forEach((line, idx) => {
    if (line.length > maxLineLength) maxLineLength = line.length;

    // Check for inconsistent mixed brackets
    if (line.includes('[ ') || line.includes(' ]') || line.includes('< ') || line.includes(' >')) {
      warnings.push(`Line ${idx + 1}: Found non-standard box delimiter syntax.`);
    }
  });

  if (maxLineLength > 100) {
    warnings.push(`Diagram width (${maxLineLength} chars) may cause horizontal scrolling on smaller screens.`);
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings,
    maxLineLength,
    lineCount: lines.length
  };
}
