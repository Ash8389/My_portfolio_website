import { PROFILE } from './profile';
import { PROJECTS } from './projects';
import { SKILLS_TREE } from './skills';
import { EXPERIENCE } from './experience';
import { EDUCATION } from './education';
import { ACHIEVEMENTS } from './achievements';
import { personalInfo } from './personal';

// Helper to generate project virtual node directory dynamically from PROJECTS
function createProjectDirNode(id, proj) {
  return {
    type: "dir",
    name: id,
    projectId: id,
    children: {
      "README.md": {
        type: "file",
        name: "README.md",
        getContent: () => ({
          title: proj.name.toUpperCase(),
          category: proj.category,
          description: proj.longDescription,
          stack: proj.techStack,
          services: proj.services,
          highlights: proj.highlights,
          github: proj.github
        })
      },
      "architecture": {
        type: "file",
        name: "architecture",
        getContent: () => ({
          title: `${proj.name.toUpperCase()} SYSTEM`,
          diagram: proj.architectureDiagram,
          keyFlows: proj.keyFlows
        })
      },
      "decisions": {
        type: "file",
        name: "decisions",
        getContent: () => ({
          title: `${proj.name.toUpperCase()} — ENGINEERING DECISIONS`,
          decisions: proj.decisions
        })
      },
      "challenges": {
        type: "file",
        name: "challenges",
        getContent: () => ({
          title: `${proj.name.toUpperCase()} — ENGINEERING CHALLENGES`,
          challenges: proj.challenges
        })
      },
      "stack": {
        type: "file",
        name: "stack",
        getContent: () => ({
          title: `${proj.name.toUpperCase()} — TECH STACK`,
          items: proj.techStack
        })
      }
    }
  };
}

const projectDirChildren = {};
Object.entries(PROJECTS).forEach(([id, proj]) => {
  projectDirChildren[id] = createProjectDirNode(id, proj);
});

// Virtual Filesystem Nodes Definition
export const VIRTUAL_FILESYSTEM = {
  "~": {
    type: "dir",
    name: "~",
    children: {
      "about": {
        type: "file",
        name: "about",
        category: "profile",
        getContent: () => ({
          title: `ABOUT ${personalInfo.name.toUpperCase()}`,
          sections: [
            { label: "NAME", value: personalInfo.name },
            { label: "ROLE", value: `${PROFILE.title} (${PROFILE.subtitle})` },
            { label: "EDUCATION", value: `${PROFILE.education.degree} — ${PROFILE.education.institution} (${PROFILE.education.period})` },
            { label: "EXPERIENCE", value: `${PROFILE.experience.role} — ${PROFILE.experience.company}` },
            { label: "PRIMARY STACK", value: `${PROFILE.focus.join(" • ")} • ${PROFILE.engineering.join(" • ")}` },
            { label: "LEARNING & EXPLORATION", value: PROFILE.aboutSections.find(s => s.label === "LEARNING & EXPLORATION")?.content },
            { label: "PROBLEM SOLVING", value: PROFILE.aboutSections.find(s => s.label === "PROBLEM SOLVING")?.content },
            { label: "LOCATION", value: PROFILE.location },
            { label: "STATUS", value: PROFILE.status },
            { label: "SUMMARY", value: PROFILE.summaryText }
          ]
        })
      },

      "skills": {
        type: "dir",
        name: "skills",
        children: {
          "languages": {
            type: "file",
            name: "languages",
            getContent: () => ({
              title: "SKILLS / LANGUAGES",
              items: SKILLS_TREE.languages
            })
          },
          "backend": {
            type: "file",
            name: "backend",
            getContent: () => ({
              title: "SKILLS / BACKEND ENGINEERING",
              items: SKILLS_TREE.backend
            })
          },
          "databases": {
            type: "file",
            name: "databases",
            getContent: () => ({
              title: "SKILLS / DATABASES & STORAGE",
              items: SKILLS_TREE.databases
            })
          },
          "infrastructure": {
            type: "file",
            name: "infrastructure",
            getContent: () => ({
              title: "SKILLS / INFRASTRUCTURE & DEVOPS",
              items: SKILLS_TREE.infrastructure
            })
          },
          "ai-ml": {
            type: "file",
            name: "ai-ml",
            getContent: () => ({
              title: "SKILLS / AI & CODE INTELLIGENCE",
              items: SKILLS_TREE["ai-ml"]
            })
          }
        }
      },

      "projects": {
        type: "dir",
        name: "projects",
        children: projectDirChildren
      },

      "experience": {
        type: "file",
        name: "experience",
        getContent: () => ({
          title: "PROFESSIONAL EXPERIENCE",
          entries: EXPERIENCE
        })
      },

      "education": {
        type: "file",
        name: "education",
        getContent: () => ({
          title: "ACADEMIC EDUCATION",
          entries: EDUCATION
        })
      },

      "achievements": {
        type: "file",
        name: "achievements",
        getContent: () => ({
          title: "VERIFIED ACHIEVEMENTS",
          entries: ACHIEVEMENTS
        })
      },

      "contact": {
        type: "file",
        name: "contact",
        getContent: () => ({
          title: "CONTACT",
          personal: personalInfo
        })
      },

      "resume.pdf": {
        type: "file",
        name: "resume.pdf",
        action: "resume",
        getContent: () => ({
          title: "Resume",
          configured: false
        })
      }
    }
  }
};

/**
 * Resolves path relative to current working directory (cwd)
 */
export function resolveFsPath(cwd, targetPath) {
  if (!targetPath || targetPath === "." || targetPath === "./") {
    return cwd;
  }

  if (targetPath === "~" || targetPath === "/" || targetPath === "/~") {
    return "~";
  }

  let parts = [];
  
  if (targetPath.startsWith("~") || targetPath.startsWith("/")) {
    // Absolute path
    const cleaned = targetPath.replace(/^[~/]+/, "");
    parts = cleaned ? cleaned.split("/") : [];
  } else {
    // Relative path
    const cwdCleaned = cwd.replace(/^[~/]+/, "");
    const baseParts = cwdCleaned ? cwdCleaned.split("/") : [];
    const targetParts = targetPath.split("/");
    
    parts = [...baseParts];
    for (const part of targetParts) {
      if (part === "..") {
        if (parts.length > 0) parts.pop();
      } else if (part !== ".") {
        parts.push(part);
      }
    }
  }

  return parts.length === 0 ? "~" : `~/${parts.join("/")}`;
}

/**
 * Retrieves filesystem node at given path
 */
export function getNodeAtPath(path) {
  if (path === "~" || path === "/" || path === "") {
    return VIRTUAL_FILESYSTEM["~"];
  }

  const cleaned = path.replace(/^[~/]+/, "");
  const parts = cleaned.split("/");
  
  let current = VIRTUAL_FILESYSTEM["~"];
  
  for (const part of parts) {
    if (!current || current.type !== "dir" || !current.children) {
      return null;
    }
    current = current.children[part];
  }

  return current || null;
}

/**
 * Gets formatted directory contents for ls
 */
export function getDirectoryContents(cwd, targetPath = "") {
  const resolved = resolveFsPath(cwd, targetPath);
  const node = getNodeAtPath(resolved);

  if (!node) {
    return { error: `ls: cannot access '${targetPath}': No such file or directory` };
  }

  if (node.type === "file") {
    return { path: resolved, isFile: true, entries: [node.name] };
  }

  const entries = Object.keys(node.children).map(name => {
    const child = node.children[name];
    return {
      name: child.type === "dir" ? `${name}/` : name,
      type: child.type,
      rawName: name
    };
  });

  return { path: resolved, isFile: false, entries };
}

/**
 * Gets ASCII tree representation
 */
export function getDirectoryTree(cwd, targetPath = "") {
  const resolved = resolveFsPath(cwd, targetPath);
  const node = getNodeAtPath(resolved);

  if (!node) {
    return { error: `tree: '${targetPath}': No such file or directory` };
  }

  const lines = [];
  lines.push(node.type === "dir" ? `${node.name}/` : node.name);

  function buildTreeLines(dirNode, prefix = "") {
    if (dirNode.type !== "dir" || !dirNode.children) return;
    
    const childKeys = Object.keys(dirNode.children);
    childKeys.forEach((indexKey, index) => {
      const child = dirNode.children[indexKey];
      const isLast = index === childKeys.length - 1;
      const connector = isLast ? "└── " : "├── ";
      const childPrefix = isLast ? "    " : "│   ";
      
      const displayName = child.type === "dir" ? `${indexKey}/` : indexKey;
      lines.push(`${prefix}${connector}${displayName}`);

      if (child.type === "dir") {
        buildTreeLines(child, `${prefix}${childPrefix}`);
      }
    });
  }

  if (node.type === "dir") {
    buildTreeLines(node, "");
  }

  return { path: resolved, lines };
}
