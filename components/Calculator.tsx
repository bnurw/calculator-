'use client';

import React, { useState, useEffect } from 'react';
import { Display } from './Display';
import { Keypad } from './Keypad';
import { HistoryDrawer } from './HistoryDrawer';
import { MemoryModal } from './MemoryModal';
import {
  evaluateExpression,
  AngleMode,
  CalculationHistory,
} from '@/lib/calculator';
import { History, Cpu, HelpCircle } from 'lucide-react';

export default function Calculator() {
  const [expression, setExpression] = useState<string>('');
  const [result, setResult] = useState<string>('0');
  const [livePreview, setLivePreview] = useState<string>('0');
  const [isEvaluated, setIsEvaluated] = useState<boolean>(false);
  const [angleMode, setAngleMode] = useState<AngleMode>('DEG');
  const [isShift, setIsShift] = useState<boolean>(false);
  const [isAlpha, setIsAlpha] = useState<boolean>(false);
  const [ans, setAns] = useState<number>(0);
  const [memory, setMemory] = useState<Record<string, number>>({
    A: 0,
    B: 0,
    C: 0,
    D: 0,
    X: 0,
    Y: 0,
    M: 0,
  });
  const [history, setHistory] = useState<CalculationHistory[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number>(-1);

  const [isHistoryOpen, setIsHistoryOpen] = useState<boolean>(false);
  const [isMemoryOpen, setIsMemoryOpen] = useState<boolean>(false);
  const [isHelpOpen, setIsHelpOpen] = useState<boolean>(false);

  useEffect(() => {
    try {
      const savedHistory = localStorage.getItem('calc_history');
      if (savedHistory) {
        setHistory(JSON.parse(savedHistory));
      }
      const savedMemory = localStorage.getItem('calc_memory');
      if (savedMemory) {
        setMemory(JSON.parse(savedMemory));
      }
      const savedAns = localStorage.getItem('calc_ans');
      if (savedAns) {
        setAns(parseFloat(savedAns));
      }
    } catch (e) {
      console.error('Failed to load storage', e);
    }
  }, []);

  // Update live preview whenever expression changes
  useEffect(() => {
    if (!expression.trim()) {
      setLivePreview('0');
      return;
    }
    const evalRes = evaluateExpression(expression, angleMode, memory, ans);
    if (evalRes.result !== 'Math Error' && evalRes.result !== 'Syntax Error') {
      setLivePreview(evalRes.result);
    } else {
      setLivePreview('');
    }
  }, [expression, angleMode, memory, ans]);

  const saveHistoryToStorage = (newHistory: CalculationHistory[]) => {
    setHistory(newHistory);
    try {
      localStorage.setItem('calc_history', JSON.stringify(newHistory));
    } catch (e) {
      console.error('Failed to save history', e);
    }
  };

  const handleButtonPress = (btn: string) => {
    setIsEvaluated(false);

    if (btn === 'SHIFT') {
      setIsShift(!isShift);
      setIsAlpha(false);
      return;
    }
    if (btn === 'ALPHA') {
      setIsAlpha(!isAlpha);
      setIsShift(false);
      return;
    }

    if (btn === 'ON' || btn === 'AC') {
      if (isShift) {
        setExpression('');
        setResult('0');
        setLivePreview('0');
        setIsShift(false);
        return;
      }
      setExpression('');
      setResult('0');
      setLivePreview('0');
      setIsShift(false);
      setIsAlpha(false);
      return;
    }

    if (btn === 'DEL') {
      setExpression((prev) => (prev.length > 0 ? prev.slice(0, -1) : ''));
      return;
    }

    if (btn === 'MODE') {
      const modes: AngleMode[] = ['DEG', 'RAD', 'GRAD'];
      const nextMode = modes[(modes.indexOf(angleMode) + 1) % modes.length];
      setAngleMode(nextMode);
      setIsShift(false);
      return;
    }

    if (btn === 'DRG►' || (isShift && btn === 'Ans')) {
      const modes: AngleMode[] = ['DEG', 'RAD', 'GRAD'];
      const nextMode = modes[(modes.indexOf(angleMode) + 1) % modes.length];
      setAngleMode(nextMode);
      setIsShift(false);
      return;
    }

    if (btn === 'REPLAY_UP') {
      if (history.length > 0) {
        const nextIdx =
          historyIndex < history.length - 1 ? historyIndex + 1 : historyIndex;
        setHistoryIndex(nextIdx);
        setExpression(history[history.length - 1 - nextIdx]?.expression || '');
      }
      return;
    }
    if (btn === 'REPLAY_DOWN') {
      if (historyIndex > 0) {
        const nextIdx = historyIndex - 1;
        setHistoryIndex(nextIdx);
        setExpression(history[history.length - 1 - nextIdx]?.expression || '');
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setExpression('');
      }
      return;
    }

    if (btn === '=') {
      if (!expression.trim()) return;

      const evalRes = evaluateExpression(expression, angleMode, memory, ans);
      setResult(evalRes.result);
      setIsEvaluated(true);

      if (evalRes.result !== 'Math Error' && evalRes.result !== 'Syntax Error') {
        setAns(evalRes.numericValue);
        try {
          localStorage.setItem('calc_ans', evalRes.numericValue.toString());
        } catch (e) {}

        const newEntry: CalculationHistory = {
          id: Date.now().toString(),
          expression,
          result: evalRes.result,
          timestamp: Date.now(),
        };
        saveHistoryToStorage([...history, newEntry]);
      }
      setIsShift(false);
      setIsAlpha(false);
      return;
    }

    let tokenToAppend = btn;
    if (isShift) {
      if (btn === 'x-1') tokenToAppend = '!';
      else if (btn === 'nPr') tokenToAppend = 'C';
      else if (btn === 'pol') tokenToAppend = 'Rec(';
      else if (btn === 'x3') tokenToAppend = '∛(';
      else if (btn === 'sqrt') tokenToAppend = 'x²';
      else if (btn === 'square') tokenToAppend = '^';
      else if (btn === 'log') tokenToAppend = '10^';
      else if (btn === 'ln') tokenToAppend = 'e^';
      else if (btn === 'sin') tokenToAppend = 'asin(';
      else if (btn === 'cos') tokenToAppend = 'acos(';
      else if (btn === 'tan') tokenToAppend = 'atan(';
      else if (btn === 'rcl') {
        setIsShift(false);
        setIsAlpha(false);
        return;
      }
      setIsShift(false);
    } else if (isAlpha) {
      if (['neg', 'deg', 'hyp', 'sin', 'cos', 'tan', 'rcl', 'eng', 'lpar', 'mplus', '7', '8', '9', '4', '5', '6'].includes(btn)) {
        const alphaMap: Record<string, string> = {
          neg: 'A',
          deg: 'B',
          hyp: 'C',
          sin: 'D',
          rcl: 'X',
          eng: 'Y',
          lpar: 'M',
        };
        tokenToAppend = alphaMap[btn] || btn;
      }
      setIsAlpha(false);
    }

    let formattedToken = tokenToAppend;
    if (tokenToAppend === 'sqrt') formattedToken = '√(';
    else if (tokenToAppend === 'x²') formattedToken = '²';
    else if (tokenToAppend === 'x³') formattedToken = '³';
    else if (tokenToAppend === 'log') formattedToken = 'log(';
    else if (tokenToAppend === 'ln') formattedToken = 'ln(';
    else if (tokenToAppend === 'sin') formattedToken = 'sin(';
    else if (tokenToAppend === 'cos') formattedToken = 'cos(';
    else if (tokenToAppend === 'tan') formattedToken = 'tan(';
    else if (tokenToAppend === '(-)') formattedToken = '-';

    setExpression((prev) => prev + formattedToken);
  };

  return (
    <div className="w-full max-w-sm sm:max-w-md mx-auto bg-[#3b594f] rounded-3xl p-4 sm:p-5 shadow-2xl border-4 border-[#253932] flex flex-col gap-3 sm:gap-4 select-none">
      <div className="flex items-center justify-between px-2 text-slate-100">
        <div className="flex items-center gap-2">
          <span className="font-bold tracking-wider text-xs sm:text-sm text-[#d4ded8]">
            SCIENTIFIC V·P·A·M
          </span>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2">
          <button
            onClick={() => setIsHistoryOpen(true)}
            className="p-2 rounded-lg bg-[#2c443c] hover:bg-[#345248] text-slate-200 transition-colors shadow-sm flex items-center gap-1 text-xs font-medium cursor-pointer"
            title="History"
          >
            <History size={15} />
            <span className="hidden sm:inline">History</span>
          </button>
          <button
            onClick={() => setIsMemoryOpen(true)}
            className="p-2 rounded-lg bg-[#2c443c] hover:bg-[#345248] text-slate-200 transition-colors shadow-sm flex items-center gap-1 text-xs font-medium cursor-pointer"
            title="Memory"
          >
            <Cpu size={15} />
            <span className="hidden sm:inline">Mem</span>
          </button>
          <button
            onClick={() => setIsHelpOpen(true)}
            className="p-2 rounded-lg bg-[#2c443c] hover:bg-[#345248] text-slate-200 transition-colors shadow-sm cursor-pointer"
            title="Help & Info"
          >
            <HelpCircle size={15} />
          </button>
        </div>
      </div>

      <Display
        expression={expression}
        result={result}
        livePreview={livePreview}
        angleMode={angleMode}
        isShift={isShift}
        isAlpha={isAlpha}
        hasMemory={Object.values(memory).some((v) => v !== 0)}
        isEvaluated={isEvaluated}
      />

      <Keypad
        onButtonPress={handleButtonPress}
        isShift={isShift}
        isAlpha={isAlpha}
        angleMode={angleMode}
      />

      <HistoryDrawer
        isOpen={isHistoryOpen}
        onClose={() => setIsHistoryOpen(false)}
        history={history}
        onSelectHistory={(item) => {
          setExpression(item.expression);
          setResult(item.result);
          setIsEvaluated(true);
        }}
        onClearHistory={() => saveHistoryToStorage([])}
      />

      <MemoryModal
        isOpen={isMemoryOpen}
        onClose={() => setIsMemoryOpen(false)}
        memory={memory}
        onClearMemory={() => {
          const resetMem = { A: 0, B: 0, C: 0, D: 0, X: 0, Y: 0, M: 0 };
          setMemory(resetMem);
          localStorage.setItem('calc_memory', JSON.stringify(resetMem));
        }}
      />

      {isHelpOpen && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-[#22303c] rounded-xl shadow-2xl border border-[#334d42] p-6 text-slate-200 flex flex-col gap-4">
            <h3 className="text-lg font-bold text-sky-400">Scientific Calculator Pro Help</h3>
            <p className="text-sm text-slate-300 leading-relaxed">
              This professional scientific calculator is inspired by classic handheld models with a matte sky-blue casing, dual-line natural V·P·A·M display, and full scientific capabilities.
            </p>
            <ul className="text-xs text-slate-400 space-y-1.5 list-disc pl-4">
              <li>Use <strong className="text-amber-300">SHIFT</strong> or <strong className="text-pink-400">ALPHA</strong> to access secondary button functions.</li>
              <li>Press <strong className="text-sky-300">MODE</strong> to cycle angle modes (DEG, RAD, GRAD).</li>
              <li>Use the <strong className="text-slate-200">Replay Pad</strong> to review past calculation history.</li>
              <li>Calculations are automatically saved and persistent across sessions.</li>
            </ul>
            <div className="flex justify-end pt-2">
              <button
                onClick={() => setIsHelpOpen(false)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-xs font-medium transition-colors cursor-pointer"
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
