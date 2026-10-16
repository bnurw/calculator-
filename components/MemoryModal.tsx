import React from 'react';
import { X, Cpu, RotateCcw } from 'lucide-react';

interface MemoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  memory: Record<string, number>;
  onClearMemory: () => void;
}

export const MemoryModal: React.FC<MemoryModalProps> = ({
  isOpen,
  onClose,
  memory,
  onClearMemory,
}) => {
  if (!isOpen) return null;

  const memoryKeys = ['A', 'B', 'C', 'D', 'X', 'Y', 'M'];

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#22303c] rounded-xl shadow-2xl border border-[#334d42] overflow-hidden flex flex-col p-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-700">
          <div className="flex items-center gap-2 text-slate-100 font-semibold text-lg">
            <Cpu size={20} className="text-amber-400" />
            <span>Memory Variables</span>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="py-4 space-y-3">
          {memoryKeys.map((key) => {
            const val = memory[key] ?? 0;
            return (
              <div
                key={key}
                className="flex items-center justify-between bg-[#2b3948] p-3 rounded-lg border border-slate-700/60 font-mono"
              >
                <span className="text-amber-400 font-bold text-lg">{key}</span>
                <span className="text-slate-100 text-base">{val}</span>
              </div>
            );
          })}
        </div>

        <div className="pt-4 border-t border-slate-700 flex justify-between items-center">
          <button
            onClick={onClearMemory}
            className="flex items-center gap-1.5 text-xs text-rose-400 hover:text-rose-300 transition-colors px-3 py-2 rounded-lg hover:bg-rose-950/30"
          >
            <RotateCcw size={16} />
            <span>Reset All Variables</span>
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-medium text-white bg-slate-800 rounded-lg hover:bg-slate-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
