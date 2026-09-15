import React from 'react';
import { EXPERIENCE } from '../data/experience';
import { EDUCATION } from '../data/education';
import { ACHIEVEMENTS } from '../data/achievements';
import { personalInfo } from '../data/personal';
import { resumeData } from '../data/resume';
import TerminalResume from '../components/Resume/TerminalResume';
import { TerminalHeader, TerminalListOutput } from '../components/TerminalOutputs/TerminalNativeOutput';

export const profileCommands = {
  experience: {
    description: "Display professional work experience",
    category: "CORE",
    aliases: ["exp", "work"],
    handler: () => ({
      type: "jsx",
      content: (
        <div className="space-y-4 py-1 font-mono text-sm">
          <TerminalHeader title="PROFESSIONAL EXPERIENCE" />

          <div className="space-y-3">
            {EXPERIENCE && EXPERIENCE.length > 0 ? (
              EXPERIENCE.map((exp) => (
                <div key={exp.id} className="space-y-1.5 border-b border-slate-800 pb-3">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="text-emerald-400 font-bold text-base font-mono">
                      [{exp.id}] {exp.role}
                    </div>
                    <span className="text-xs text-slate-400 font-mono">({exp.period})</span>
                  </div>
                  <div className="text-cyan-400 text-xs font-semibold">{exp.company}</div>
                  
                  <div className="text-xs text-slate-300 pt-1">
                    <span className="text-slate-400 font-bold">TECHNOLOGIES:</span> {exp.technologies.join(" • ")}
                  </div>

                  <div className="text-xs text-slate-300">
                    <span className="text-slate-400 font-bold">ENVIRONMENT:</span> {exp.environment}
                  </div>

                  <div>
                    <div className="text-xs text-slate-400 font-bold uppercase tracking-wider mt-1">CONTRIBUTIONS:</div>
                    <TerminalListOutput items={exp.contributions} />
                  </div>
                </div>
              ))
            ) : (
              <div className="text-slate-400 text-xs py-1">
                No professional experience listed at this time.
              </div>
            )}
          </div>
        </div>
      )
    })
  },

  education: {
    description: "Display academic background and degree info",
    category: "CORE",
    aliases: ["edu"],
    handler: () => ({
      type: "jsx",
      content: (
        <div className="space-y-3 py-1 font-mono text-sm">
          <TerminalHeader title="EDUCATION" />

          <div className="space-y-2">
            {EDUCATION.map((edu, idx) => (
              <div key={idx} className="space-y-1 border-b border-slate-800 pb-2 text-xs">
                <div className="text-emerald-400 font-bold text-sm">{edu.degree}</div>
                <div className="text-cyan-400 font-semibold">{edu.institution}</div>
                <div className="text-slate-400">{edu.period}</div>
                <div className="text-slate-300 pt-1">Focus: {edu.focus}</div>
              </div>
            ))}
          </div>
        </div>
      )
    })
  },

  achievements: {
    description: "Display competitive programming achievements and contest ratings",
    category: "CORE",
    aliases: ["dsa", "rating", "cp"],
    handler: () => ({
      type: "jsx",
      content: (
        <div className="space-y-4 py-1 font-mono text-sm">
          <TerminalHeader title="COMPETITIVE PROGRAMMING" />

          <div className="space-y-3 font-mono text-xs">
            {ACHIEVEMENTS.map((item, idx) => (
              <div key={idx} className="space-y-0.5">
                <div className="text-emerald-400 font-bold text-sm">
                  {item.platform}
                </div>
                <div className="text-slate-200 pl-2">
                  {item.achievement}
                </div>
                {item.rating && (
                  <div className="text-slate-300 pl-2">
                    {item.rating}
                  </div>
                )}
                <div className="pl-2 pt-0.5">
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-400 underline font-semibold hover:text-cyan-300 break-all"
                  >
                    {item.url}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    })
  },

  resume: {
    description: "Display, view, or download Ashish's resume",
    category: "ACTIONS",
    aliases: ["cv"],
    handler: (args = []) => {
      const option = args && args[0] ? args[0].toLowerCase() : null;

      // Case 1: No flags -> Display resume in terminal
      if (!option) {
        return {
          type: "jsx",
          content: <TerminalResume />
        };
      }

      // Case 2: View formatted PDF (--view or -v)
      if (option === '--view' || option === '-v') {
        const targetUrl = resumeData.pdfConfig.pdfUrl;

        if (typeof window !== 'undefined') {
          try {
            window.open(targetUrl, '_blank', 'noopener,noreferrer');
          } catch (e) {
            console.error('Error opening resume PDF:', e);
          }
        }

        return {
          type: "jsx",
          content: (
            <div className="space-y-2 py-1 font-mono text-sm">
              <div className="text-emerald-400 font-bold flex items-center gap-2">
                <span className="text-cyan-400 font-bold">[OK]</span> Opening formatted resume...
              </div>
              <div className="text-xs text-slate-300 pl-2">
                If the PDF did not open automatically, click here:{" "}
                <a
                  href={targetUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-400 underline font-bold hover:text-cyan-300"
                >
                  [open resume]
                </a>
              </div>
            </div>
          )
        };
      }

      // Case 3: Download PDF (--download or -d)
      if (option === '--download' || option === '-d') {
        const downloadUrl = resumeData.pdfConfig.fallbackUrl || resumeData.pdfConfig.pdfUrl;
        const filename = resumeData.pdfConfig.downloadFilename;

        if (typeof window !== 'undefined') {
          try {
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          } catch (e) {
            console.error('Error triggering download:', e);
          }
        }

        return {
          type: "jsx",
          content: (
            <div className="space-y-1.5 py-1 font-mono text-sm">
              <div className="text-emerald-400 font-bold flex items-center gap-2">
                <span className="text-cyan-400 font-bold">[OK]</span> Resume download started.
              </div>
              <div className="text-xs text-slate-300 pl-2">
                File: <span className="text-emerald-300 font-bold">{filename}</span>
              </div>
              <div className="text-xs text-slate-400 pl-2 pt-0.5">
                If download does not begin automatically:{" "}
                <a
                  href={downloadUrl}
                  download={filename}
                  className="text-cyan-400 underline hover:text-cyan-300"
                >
                  [click to download]
                </a>
              </div>
            </div>
          )
        };
      }

      // Case 4: Invalid option -> Helpful terminal response with usage guide
      return {
        type: "jsx",
        content: (
          <div className="space-y-3 py-1 font-mono text-sm">
            <div className="text-red-400 font-bold">
              Unknown resume option: <span className="underline">{args[0]}</span>
            </div>
            <div className="space-y-1 text-xs text-slate-300">
              <div className="text-cyan-400 font-bold uppercase tracking-wider">Usage:</div>
              <div className="pl-2 space-y-0.5">
                <div><span className="text-emerald-400 font-bold">resume</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Display resume in terminal</div>
                <div><span className="text-emerald-400 font-bold">resume --view</span> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;- Open formatted PDF resume (-v)</div>
                <div><span className="text-emerald-400 font-bold">resume --download</span> &nbsp;&nbsp;- Download PDF resume (-d)</div>
              </div>
            </div>
          </div>
        )
      };
    }
  },

  github: {
    description: "Open GitHub profile in a new browser tab",
    category: "ACTIONS",
    aliases: ["gh"],
    handler: () => {
      if (typeof window !== 'undefined') {
        window.open(personalInfo.github, "_blank", "noopener,noreferrer");
      }
      return {
        type: "jsx",
        content: (
          <div className="space-y-2 py-1 font-mono text-sm">
            <TerminalHeader title="GitHub" />
            <div className="text-slate-200">{personalInfo.name}</div>
            <div className="text-emerald-400 font-bold">github.com/Ash8389</div>
            <div className="text-slate-400 text-xs pt-1">Opening GitHub profile...</div>
          </div>
        )
      };
    }
  },

  linkedin: {
    description: "Open LinkedIn profile in a new browser tab",
    category: "ACTIONS",
    aliases: ["in"],
    handler: () => {
      if (typeof window !== 'undefined') {
        window.open(personalInfo.linkedin, "_blank", "noopener,noreferrer");
      }
      return {
        type: "jsx",
        content: (
          <div className="space-y-2 py-1 font-mono text-sm">
            <TerminalHeader title="LinkedIn" />
            <div className="text-slate-200">{personalInfo.name}</div>
            <div className="text-cyan-400 font-bold">linkedin.com/in/ashish-jha-0344a4243/</div>
            <div className="text-slate-400 text-xs pt-1">Opening LinkedIn profile...</div>
          </div>
        )
      };
    }
  },

  email: {
    description: "Send an email to Ashish Jha",
    category: "ACTIONS",
    aliases: ["mail"],
    handler: () => {
      if (typeof window !== 'undefined') {
        window.location.href = `mailto:${personalInfo.email}`;
      }
      return {
        type: "jsx",
        content: (
          <div className="space-y-2 py-1 font-mono text-sm">
            <TerminalHeader title="Email" />
            <div className="text-emerald-400 font-bold">{personalInfo.email}</div>
            <div className="text-slate-400 text-xs pt-1">Opening email client...</div>
          </div>
        )
      };
    }
  },

  phone: {
    description: "Call or open phone dialer for Ashish Jha",
    category: "ACTIONS",
    aliases: ["call", "mobile", "tel"],
    handler: () => {
      if (typeof window !== 'undefined') {
        window.location.href = `tel:${personalInfo.phone}`;
      }
      return {
        type: "jsx",
        content: (
          <div className="space-y-2 py-1 font-mono text-sm">
            <TerminalHeader title="Phone" />
            <div className="text-emerald-400 font-bold">{personalInfo.phone}</div>
            <div className="text-slate-400 text-xs pt-1">Opening phone dialer...</div>
          </div>
        )
      };
    }
  },

  contact: {
    description: "Display direct contact channels",
    category: "ACTIONS",
    aliases: ["connect", "hire"],
    handler: () => ({
      type: "jsx",
      content: (
        <div className="space-y-3 py-1 font-mono text-sm">
          <TerminalHeader title="CONTACT" />
          <div className="space-y-1.5 text-xs pl-1 font-mono">
            <div className="grid grid-cols-[100px_1fr] gap-2">
              <span className="text-slate-400 font-bold">Name</span>
              <span className="text-slate-100">{personalInfo.name}</span>
            </div>
            <div className="grid grid-cols-[100px_1fr] gap-2">
              <span className="text-slate-400 font-bold">Email</span>
              <a href={`mailto:${personalInfo.email}`} className="text-emerald-400 underline font-bold hover:text-emerald-300">
                {personalInfo.email}
              </a>
            </div>
            <div className="grid grid-cols-[100px_1fr] gap-2">
              <span className="text-slate-400 font-bold">Phone</span>
              <a href={`tel:${personalInfo.phone}`} className="text-emerald-400 underline font-bold hover:text-emerald-300">
                {personalInfo.phone}
              </a>
            </div>
            <div className="grid grid-cols-[100px_1fr] gap-2">
              <span className="text-slate-400 font-bold">GitHub</span>
              <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="text-cyan-400 underline font-bold hover:text-cyan-300">
                github.com/Ash8389
              </a>
            </div>
            <div className="grid grid-cols-[100px_1fr] gap-2">
              <span className="text-slate-400 font-bold">LinkedIn</span>
              <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="text-cyan-400 underline font-bold hover:text-cyan-300">
                linkedin.com/in/ashish-jha-0344a4243/
              </a>
            </div>
          </div>
        </div>
      )
    })
  }
};
