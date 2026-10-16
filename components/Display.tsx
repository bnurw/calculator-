import React from 'react';
import { AngleMode } from '@/lib/calculator';

interface DisplayProps {
  expression: string;
  result: string;
  livePreview: string;
  angleMode: AngleMode;
  isShift: boolean;
  isAlpha: boolean;
  hasMemory: boolean;
  isEvaluated: boolean;
}

export const Display: React.FC<DisplayProps> = ({
  expression,
  result,
  livePreview,
  angleMode,
  isShift,
  isAlpha,
  hasMemory,
  isEvaluated,
}) => {
  return (
    <div className="w-full bg-[#c2d6cd] border-4 border-[#334d42] rounded-xl p-3 shadow-inner flex flex-col justify-between font-mono relative overflow-hidden">
      {/* Solar Panel Graphic & Branding at top */}
      <div className="flex items-center justify-between mb-2 border-b border-[#334d42]/30 pb-1">
        <div className="flex items-center gap-1.5">
          <span className="text-[10px] font-bold tracking-widest text-[#22382e] uppercase">
            NATURAL-V·P·A·M
          </span>
        </div>
        {/* Solar panel grid lines */}
        <div className="grid grid-cols-4 gap-0.5 w-16 h-4 bg-[#1a2b23] p-0.5 rounded-sm shadow-sm">
          <div className="bg-[#2a4437] rounded-[1px]" />
          <div className="bg-[#2a4437] rounded-[1px]" />
          <div className="bg-[#2a4437] rounded-[1px]" />
          <div className="bg-[#2a4437] rounded-[1px]" />
        </div>
      </div>

      {/* Status Indicators Row */}
      <div className="flex items-center justify-between text-[11px] font-bold text-[#1a2b23] h-4 px-1 select-none">
        <div className="flex items-center gap-2">
          <span className={`transition-opacity ${isShift ? 'opacity-150 text-amber-600 font-black scale-110' : 'opacity-20'}`}>
            S
          </span>
          <span className={`transition-opacity ${isAlpha ? 'opacity-150 text-pink-600 font-black scale-110' : 'opacity-20'}`}>
            A
          </span>
          <span className={`transition-opacity ${hasMemory ? 'opacity-100 text-[#1a2b23]' : 'opacity-20'}`}>
            M
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="bg-[#b3cdc3] px-1 rounded text-[10px] border border-[#334d42]/25">
            {angleMode}
          </span>
        </div>
      </div>

      {/* LCD Screen Lines */}
      <div className="bg-[#a3b8af] border border-[#405e52] rounded-lg p-3 mt-1 min-h-[96px] flex flex-col justify-between shadow-sm">
        {/* Top line: Expression input + Live Preview */}
        <div className="flex items-center justify-between gap-2 overflow-x-auto whitespace-nowrap scrollbar-none min-h-[24px]">
          <span className="text-sm text-[#111f18] tracking-wider font-medium">
            {expression || '0'}
          </span>
          {!isEvaluated && livePreview && livePreview !== '0' && (
            <span className="text-xs text-[#3a5a4c] tracking-wider font-semibold opacity-80">
              = {livePreview}
            </span>
          )}
        </div>

        {/* Bottom line: Final Result */}
        <div className={`font-mono font-bold text-[#080f0c] tracking-widest text-right overflow-x-auto whitespace-nowrap scrollbar-none min-h-[36px] flex items-center justify-end transition-all duration-300 ${isEvaluated ? 'text-2xl sm:text-3xl text-blue-950 font-black scale-105 origin-right' : 'text-xl opacity-75'}`}>
          {result}
        </div>
      </div>
    </div>
  );
};
