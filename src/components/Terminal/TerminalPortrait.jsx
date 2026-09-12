import React, { useState, useEffect, useRef, useCallback } from 'react';
import { imageToSquareHalfBlocks } from '../../utils/asciiRenderer';
import { PORTRAIT_B64 } from '../../data/imageB64';
import { PROFILE } from '../../data/profile';

const TARGET_SIZE = 180; // Fixed 1:1 180x180px frame

export default function TerminalPortrait() {
  const [artHtml, setArtHtml] = useState('');
  const [isRendered, setIsRendered] = useState(false);
  const preRef = useRef(null);

  // Scaler function: measures rendered natural width/height and applies CSS scale transform
  const fitToFrame = useCallback(() => {
    const pre = preRef.current;
    if (!pre) return;
    pre.style.transform = 'none';
    const naturalW = pre.offsetWidth;
    const naturalH = pre.offsetHeight;
    if (naturalW > 0 && naturalH > 0) {
      const scaleX = TARGET_SIZE / naturalW;
      const scaleY = TARGET_SIZE / naturalH;
      pre.style.transform = `scale(${scaleX}, ${scaleY})`;
      pre.style.transformOrigin = 'top left';
    }
  }, []);

  useEffect(() => {
    const img = new Image();
    img.onload = () => {
      // 1:1 Square half-block rendering with 100 columns for crisp resolution
      const html = imageToSquareHalfBlocks(img, 100);
      setArtHtml(html);
      setIsRendered(true);
    };
    img.src = PORTRAIT_B64;

    if (img.complete && img.naturalWidth !== 0) {
      img.onload();
    }
  }, []);

  useEffect(() => {
    if (isRendered) {
      // Allow DOM to paint before measuring natural dimensions
      const frameId = requestAnimationFrame(() => {
        fitToFrame();
      });
      window.addEventListener('resize', fitToFrame);
      return () => {
        cancelAnimationFrame(frameId);
        window.removeEventListener('resize', fitToFrame);
      };
    }
  }, [isRendered, fitToFrame]);

  return (
    <div className="py-2 space-y-3 font-mono text-sm w-full">
      {/* Top Banner Header: ashish@portfolio */}
      <div className="border-b border-emerald-500/30 pb-1.5 flex flex-wrap items-center justify-between gap-2">
        <span className="text-emerald-400 font-bold text-base">{PROFILE.fullHandle}</span>
        <span className="bg-emerald-500/20 text-emerald-300 text-xs px-2 py-0.5 rounded border border-emerald-500/30">
          {PROFILE.systemName}
        </span>
      </div>

      {/* Main Content Area: System Specs on Left, 180x180 Terminal Portrait on Right under ashish@portfolio */}
      <div className="flex flex-col-reverse md:flex-row gap-6 items-start pt-1">
        
        {/* Left Column: System & Profile Metadata */}
        <div className="space-y-3 flex-1 w-full">
          <div className="grid grid-cols-[100px_1fr] sm:grid-cols-[120px_1fr] gap-x-2 gap-y-1.5 text-xs text-slate-300">
            <span className="text-slate-400 font-bold">OS:</span>
            <span className="text-emerald-300 font-semibold">{PROFILE.systemName} {PROFILE.version}</span>

            <span className="text-slate-400 font-bold">Shell:</span>
            <span className="text-slate-300">{PROFILE.shell}</span>

            <span className="text-slate-400 font-bold">Developer:</span>
            <span className="text-slate-100 font-bold">{PROFILE.name}</span>

            <span className="text-slate-400 font-bold">Role:</span>
            <span className="text-cyan-300 font-semibold">{PROFILE.title} ({PROFILE.subtitle})</span>

            <span className="text-slate-400 font-bold">Focus:</span>
            <span className="text-slate-200">Java • Spring Boot • Microservices • Kafka • Redis</span>

            <span className="text-slate-400 font-bold">DSA Record:</span>
            <span className="text-emerald-400 font-bold">
              {PROFILE.dsaStats?.solvedCount ? `${PROFILE.dsaStats.solvedCount} Solved | CodeChef ${PROFILE.dsaStats.codechefRating}` : PROFILE.problemSolvingSummary}
            </span>

            <span className="text-slate-400 font-bold">Kernel:</span>
            <span className="text-slate-300">{PROFILE.kernel}</span>

            <span className="text-slate-400 font-bold">Uptime:</span>
            <span className="text-slate-300">{PROFILE.uptime}</span>

            <span className="text-slate-400 font-bold">Status:</span>
            <span className="text-emerald-400">{PROFILE.status}</span>
          </div>

          <div className="pt-2 border-t border-slate-800 text-xs text-slate-400 space-y-1 font-sans">
            <p>Welcome to Ashish Jha's interactive developer terminal workspace.</p>
            <p>
              Type <span className="text-emerald-400 font-mono font-bold">help</span> to view all commands, or <span className="text-emerald-400 font-mono font-bold">projects</span> to inspect backend architectures.
            </p>
          </div>
        </div>

        {/* Right Column: 1:1 180x180 Green Phosphor Terminal Image under ashish@portfolio */}
        <div 
          className="flex-shrink-0 relative overflow-hidden bg-black select-text mx-auto md:mx-0"
          style={{ width: `${TARGET_SIZE}px`, height: `${TARGET_SIZE}px` }}
        >
          <pre
            ref={preRef}
            className="font-mono text-[6px] leading-[6px] whitespace-pre absolute top-0 left-0 block select-text cursor-text"
            dangerouslySetInnerHTML={{ __html: artHtml }}
          />
        </div>

      </div>
    </div>
  );
}
