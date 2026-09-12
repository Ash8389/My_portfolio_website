import React from 'react';
import { resumeData } from '../../data/resume';
import { TerminalHeader } from '../TerminalOutputs/TerminalNativeOutput';

export default function TerminalResume() {
  const { personalInfo, summary, education, experience, projects, technicalSkills, competitiveProgramming } = resumeData;

  return (
    <div className="space-y-4 py-1 font-mono text-sm leading-relaxed max-w-full overflow-x-hidden">
      {/* Header Banner */}
      <TerminalHeader title="RESUME — ASHISH KUMAR JHA" />

      {/* 1. Header & Contact Information */}
      <div className="border-b border-emerald-500/30 pb-3 space-y-1">
        <div className="text-emerald-400 font-bold text-base sm:text-lg">
          {personalInfo.fullName.toUpperCase()}
        </div>
        <div className="text-cyan-300 font-semibold text-xs sm:text-sm">
          {personalInfo.title}
        </div>
        <div className="text-xs text-slate-300 flex flex-wrap items-center gap-x-3 gap-y-1 pt-1">
          <span>📧 <a href={`mailto:${personalInfo.email}`} className="text-cyan-400 underline hover:text-cyan-300">{personalInfo.email}</a></span>
          <span>📞 <a href={`tel:${personalInfo.phone.replace(/[^0-9+]/g, '')}`} className="text-cyan-400 underline hover:text-cyan-300">{personalInfo.phone}</a></span>
          <span>📍 {personalInfo.location}</span>
        </div>
        <div className="text-xs text-slate-300 flex flex-wrap items-center gap-x-3 gap-y-1 pt-0.5">
          <span>GitHub: <a href={personalInfo.github} target="_blank" rel="noopener noreferrer" className="text-emerald-400 underline hover:text-emerald-300">{personalInfo.github}</a></span>
          <span>LinkedIn: <a href={personalInfo.linkedin} target="_blank" rel="noopener noreferrer" className="text-emerald-400 underline hover:text-emerald-300">{personalInfo.linkedin}</a></span>
        </div>
      </div>

      {/* 2. SUMMARY */}
      <div className="space-y-1">
        <div className="text-cyan-400 font-bold text-xs uppercase tracking-wider">SUMMARY</div>
        <p className="text-xs text-slate-200 pl-2 leading-relaxed">
          {summary}
        </p>
      </div>

      {/* 3. EDUCATION */}
      <div className="space-y-2">
        <div className="text-cyan-400 font-bold text-xs uppercase tracking-wider">EDUCATION</div>
        <div className="pl-2 space-y-1 text-xs">
          {education.map((edu, idx) => (
            <div key={idx} className="space-y-0.5">
              <div className="flex flex-wrap items-center justify-between text-slate-100 font-bold">
                <span>{edu.institution}</span>
                <span className="text-slate-400 font-normal">({edu.period})</span>
              </div>
              <div className="text-emerald-400 font-semibold">{edu.degree}</div>
              {edu.details && <div className="text-slate-300">{edu.details}</div>}
            </div>
          ))}
        </div>
      </div>

      {/* 4. EXPERIENCE */}
      <div className="space-y-2">
        <div className="text-cyan-400 font-bold text-xs uppercase tracking-wider">EXPERIENCE</div>
        <div className="pl-2 space-y-2 text-xs">
          {experience.map((exp, idx) => (
            <div key={idx} className="space-y-1 border-l-2 border-emerald-500/30 pl-3">
              <div className="flex flex-wrap items-center justify-between text-slate-100 font-bold">
                <span>{exp.company} — <span className="text-emerald-300 font-semibold">{exp.role}</span></span>
                <span className="text-slate-400 font-normal">({exp.period})</span>
              </div>
              <ul className="list-disc list-inside text-slate-300 space-y-0.5 pt-0.5">
                {exp.highlights.map((h, i) => (
                  <li key={i} className="leading-relaxed">{h}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* 5. PROJECTS */}
      <div className="space-y-3">
        <div className="text-cyan-400 font-bold text-xs uppercase tracking-wider">PROJECTS</div>
        <div className="pl-2 space-y-3 text-xs">
          {projects.map((proj, idx) => (
            <div key={idx} className="space-y-1.5 border-l-2 border-cyan-500/30 pl-3">
              <div className="text-emerald-400 font-bold text-sm">
                {proj.title}
              </div>
              <div className="text-slate-400 font-mono text-[11px]">
                <span className="text-slate-400 font-bold">Stack:</span> {proj.techStack}
              </div>
              {proj.services && (
                <div className="text-slate-300">
                  <span className="text-slate-400 font-bold">Services:</span> {proj.services}
                </div>
              )}
              {proj.architectureNotes && (
                <div className="text-amber-300/90 text-[11px] bg-amber-500/10 p-1.5 rounded border border-amber-500/20">
                  <span className="font-bold">Architecture:</span> {proj.architectureNotes}
                </div>
              )}
              <ul className="list-disc list-inside text-slate-300 space-y-0.5 pt-0.5">
                {proj.highlights.map((h, i) => (
                  <li key={i} className="leading-relaxed">{h}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* 6. TECHNICAL SKILLS */}
      <div className="space-y-2">
        <div className="text-cyan-400 font-bold text-xs uppercase tracking-wider">TECHNICAL SKILLS</div>
        <div className="pl-2 space-y-1 text-xs text-slate-200">
          <div>
            <span className="text-emerald-400 font-bold">Languages:</span> {technicalSkills.languages}
          </div>
          <div>
            <span className="text-emerald-400 font-bold">Backend & Distributed Systems:</span> {technicalSkills.backendAndDistributed}
          </div>
          <div>
            <span className="text-emerald-400 font-bold">AI/ML & LLM:</span> {technicalSkills.aiMlAndLlm}
          </div>
          <div>
            <span className="text-emerald-400 font-bold">Tools & Cloud:</span> {technicalSkills.toolsAndCloud}
          </div>
        </div>
      </div>

      {/* 7. COMPETITIVE PROGRAMMING */}
      <div className="space-y-2 border-t border-slate-800 pt-3">
        <div className="text-cyan-400 font-bold text-xs uppercase tracking-wider">COMPETITIVE PROGRAMMING</div>
        <div className="pl-2 grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
          {competitiveProgramming.map((cp, idx) => (
            <div key={idx} className="bg-slate-900/50 p-2 rounded border border-slate-800 space-y-0.5">
              <div className="flex items-center justify-between">
                <span className="text-emerald-400 font-bold">{cp.platform}</span>
                <a href={cp.url} target="_blank" rel="noopener noreferrer" className="text-cyan-400 underline text-[11px] hover:text-cyan-300">
                  [profile]
                </a>
              </div>
              <div className="text-slate-300">{cp.summary}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="pt-2 text-xs text-slate-400 border-t border-slate-800">
        Type <span className="text-emerald-400 font-bold">resume --view</span> to open visual PDF, or <span className="text-emerald-400 font-bold">resume --download</span> to download PDF.
      </div>
    </div>
  );
}
