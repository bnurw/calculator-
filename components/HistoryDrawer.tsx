import React from 'react';
import { CalculationHistory } from '@/lib/calculator';
import { X, Trash2, History as HistoryIcon, ArrowRight } from 'lucide-react';

interface HistoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  history: CalculationHistory[];
  onSelectHistory: (item: CalculationHistory) => void;
  onClearHistory: () => void;
}

export const HistoryDrawer: React.FC<HistoryDrawerProps> = ({
  isOpen,
  onClose,
  history,
  onSelectHistory,
  onClearHistory,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex justify-end transition-all">
      <div className="w-full max-w-sm bg-[#22303c] h-full shadow-2xl flex flex-col p-5 border-l border-[#334d42]">
        <div className="flex items-center justify-between pb-4 border-b border-slate-700">
          <div className="flex items-center gap-2 text-slate-100 font-semibold text-lg">
            <HistoryIcon size={20} className="text-sky-400" />
            <span>Calculation History</span>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto py-4 space-y-3">
          {history.length === 0 ? (
            <div className="text-center py-12 text-slate-400 text-sm">
              No calculation history yet.
            </div>
          ) : (
            history.slice().reverse().map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  onSelectHistory(item);
                  onClose();
                }}
                className="bg-[#2b3948] hover:bg-[#344658] p-3 rounded-lg border border-slate-700/60 cursor-pointer transition-all group shadow-sm flex flex-col gap-1"
              >
                <div className="text-xs text-slate-400 font-mono flex items-center justify-between">
                  <span>{new Date(item.timestamp).toLocaleTimeString()}</span>
                  <ArrowRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity text-sky-400" />
                </div>
                <div className="text-sm font-mono text-slate-200 tracking-wide overflow-x-auto">
                  {item.expression}
                </div>
                <div className="text-base font-mono font-bold text-sky-400 text-right">
                  = {item.result}
                </div>
              </div>
            ))
          )}
        </div>

        {history.length > 0 && (
          <div className="pt-4 border-t border-slate-700 flex justify-between items-center">
            <button
              onClick={onClearHistory}
              className="flex items-center gap-1.5 text-xs text-rose-400 hover:text-rose-300 transition-colors px-3 py-2 rounded-lg hover:bg-rose-950/30"
            >
              <Trash2 size={16} />
              <span>Clear History</span>
            </button>
            <span className="text-xs text-slate-500 font-mono">
              {history.length} items
            </span>
          </div>
        )}
      </div>
    </div>
  );
};
