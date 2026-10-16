import React from 'react';
import { AngleMode } from '@/lib/calculator';
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

interface KeypadProps {
  onButtonPress: (action: string, type?: 'primary' | 'shift' | 'alpha') => void;
  isShift: boolean;
  isAlpha: boolean;
  angleMode: AngleMode;
}

interface ButtonDef {
  id: string;
  primary: string;
  shift?: string;
  alpha?: string;
  bg?: string;
  textColor?: string;
  span?: number;
}

export const Keypad: React.FC<KeypadProps> = ({
  onButtonPress,
  isShift,
  isAlpha,
}) => {
  const row1: ButtonDef[] = [
    { id: 'SHIFT', primary: 'SHIFT', textColor: 'text-amber-300', bg: 'bg-[#1e293b]' },
    { id: 'ALPHA', primary: 'ALPHA', textColor: 'text-pink-400', bg: 'bg-[#1e293b]' },
    { id: 'MODE', primary: 'MODE', shift: 'CLR', bg: 'bg-[#1e293b]' },
    { id: 'ON', primary: 'ON', shift: 'OFF', bg: 'bg-[#1e293b]' },
  ];

  const row2: ButtonDef[] = [
    { id: 'x-1', primary: 'x⁻¹', shift: '!', bg: 'bg-[#1e293b]' },
    { id: 'nPr', primary: 'nPr', shift: 'nCr', bg: 'bg-[#1e293b]' },
    { id: 'pol', primary: 'Pol(', shift: 'Rec(', bg: 'bg-[#1e293b]' },
    { id: 'x3', primary: 'x³', shift: '∛', bg: 'bg-[#1e293b]' },
    { id: 'frac', primary: 'ab/c', shift: 'd/c', bg: 'bg-[#1e293b]' },
    { id: 'sqrt', primary: '√', shift: 'x²', bg: 'bg-[#1e293b]' },
    { id: 'square', primary: 'x²', shift: '^', bg: 'bg-[#1e293b]' },
    { id: 'power', primary: '^', shift: 'x√', bg: 'bg-[#1e293b]' },
    { id: 'log', primary: 'log', shift: '10ˣ', bg: 'bg-[#1e293b]' },
    { id: 'ln', primary: 'ln', shift: 'eˣ', bg: 'bg-[#1e293b]' },
  ];

  const row3: ButtonDef[] = [
    { id: 'neg', primary: '(-)', shift: 'e', alpha: 'A', bg: 'bg-[#1e293b]' },
    { id: 'deg', primary: '°\'"', shift: '←', alpha: 'B', bg: 'bg-[#1e293b]' },
    { id: 'hyp', primary: 'hyp', shift: 'abs', alpha: 'C', bg: 'bg-[#1e293b]' },
    { id: 'sin', primary: 'sin', shift: 'sin⁻¹', alpha: 'D', bg: 'bg-[#1e293b]' },
    { id: 'cos', primary: 'cos', shift: 'cos⁻¹', alpha: 'E', bg: 'bg-[#1e293b]' },
    { id: 'tan', primary: 'tan', shift: 'tan⁻¹', alpha: 'F', bg: 'bg-[#1e293b]' },
  ];

  const row4: ButtonDef[] = [
    { id: 'rcl', primary: 'RCL', shift: 'STO', alpha: 'X', bg: 'bg-[#1e293b]' },
    { id: 'eng', primary: 'ENG', shift: '←', alpha: 'Y', bg: 'bg-[#1e293b]' },
    { id: 'lpar', primary: '(', shift: '[', alpha: 'M', bg: 'bg-[#1e293b]' },
    { id: 'rpar', primary: ')', shift: ']', bg: 'bg-[#1e293b]' },
    { id: 'comma', primary: ',', shift: ':', bg: 'bg-[#1e293b]' },
    { id: 'mplus', primary: 'M+', shift: 'M-', alpha: 'M', bg: 'bg-[#1e293b]' },
  ];

  const row5: ButtonDef[] = [
    { id: '7', primary: '7', shift: 'CONST', alpha: 'A', bg: 'bg-[#2b3748]' },
    { id: '8', primary: '8', shift: 'CONV', alpha: 'B', bg: 'bg-[#2b3748]' },
    { id: '9', primary: '9', shift: 'CLR', alpha: 'C', bg: 'bg-[#2b3748]' },
    { id: 'DEL', primary: 'DEL', shift: 'INS', bg: 'bg-[#e06c28]', textColor: 'text-white font-bold' },
    { id: 'AC', primary: 'AC', shift: 'OFF', bg: 'bg-[#e06c28]', textColor: 'text-white font-bold' },
  ];

  const row6: ButtonDef[] = [
    { id: '4', primary: '4', shift: 'Matrix', bg: 'bg-[#2b3748]' },
    { id: '5', primary: '5', shift: 'Vector', bg: 'bg-[#2b3748]' },
    { id: '6', primary: '6', shift: 'Stats', bg: 'bg-[#2b3748]' },
    { id: 'times', primary: '×', shift: 'F', bg: 'bg-[#3b485c]' },
    { id: 'divide', primary: '÷', shift: 'G', bg: 'bg-[#3b485c]' },
  ];

  const row7: ButtonDef[] = [
    { id: '1', primary: '1', shift: 'Stat', bg: 'bg-[#2b3748]' },
    { id: '2', primary: '2', shift: 'Stat', bg: 'bg-[#2b3748]' },
    { id: '3', primary: '3', shift: 'Stat', bg: 'bg-[#2b3748]' },
    { id: 'plus', primary: '+', shift: 'Sum', bg: 'bg-[#3b485c]' },
    { id: 'minus', primary: '−', shift: 'Sum', bg: 'bg-[#3b485c]' },
  ];

  const row8: ButtonDef[] = [
    { id: '0', primary: '0', shift: 'Rnd', bg: 'bg-[#2b3748]' },
    { id: 'dot', primary: '.', shift: 'Ran#', bg: 'bg-[#2b3748]' },
    { id: 'exp', primary: 'EXP', shift: 'π', bg: 'bg-[#2b3748]' },
    { id: 'ans', primary: 'Ans', shift: 'DRG►', bg: 'bg-[#2b3748]' },
    { id: 'equals', primary: '=', shift: '%', bg: 'bg-[#1e3a8a]', textColor: 'text-white font-bold' },
  ];

  const renderButton = (btn: ButtonDef) => {
    return (
      <button
        key={btn.id}
        onClick={() => onButtonPress(btn.primary)}
        className={`${btn.bg || 'bg-[#2b3748]'} ${btn.textColor || 'text-slate-100'} rounded-md py-2 px-1 text-xs sm:text-sm font-medium shadow-[0_2px_4px_rgba(0,0,0,0.3)] active:translate-y-0.5 active:shadow-none transition-all flex flex-col items-center justify-center relative group min-h-[44px] cursor-pointer`}
      >
        {btn.shift && (
          <span className="absolute -top-3 text-[9px] font-semibold text-amber-300 pointer-events-none">
            {btn.shift}
          </span>
        )}
        {btn.alpha && (
          <span className="absolute top-0.5 right-1 text-[8px] font-semibold text-pink-400 pointer-events-none">
            {btn.alpha}
          </span>
        )}
        <span className="tracking-tight">{btn.primary}</span>
      </button>
    );
  };

  return (
    <div className="flex flex-col gap-2.5 w-full bg-[#1e293b]/20 p-3 rounded-xl border border-[#334d42]/30">
      <div className="grid grid-cols-5 gap-2 items-center">
        {renderButton(row1[0])}
        {renderButton(row1[1])}

        <div className="col-span-1 bg-[#1a2332] rounded-full p-1.5 flex items-center justify-center relative shadow-inner aspect-square">
          <div className="grid grid-cols-3 grid-rows-3 w-full h-full items-center justify-center">
            <button
              onClick={() => onButtonPress('REPLAY_UP')}
              className="col-start-2 row-start-1 text-slate-300 hover:text-white flex items-center justify-center"
              title="History Up"
            >
              <ChevronUp size={12} />
            </button>
            <button
              onClick={() => onButtonPress('REPLAY_LEFT')}
              className="col-start-1 row-start-2 text-slate-300 hover:text-white flex items-center justify-center"
              title="Cursor Left"
            >
              <ChevronLeft size={12} />
            </button>
            <button
              onClick={() => onButtonPress('REPLAY_EXE')}
              className="col-start-2 row-start-2 bg-[#2b3748] rounded-full w-4 h-4 shadow-sm flex items-center justify-center text-[8px] text-slate-200 font-bold"
              title="Execute"
            >
              •
            </button>
            <button
              onClick={() => onButtonPress('REPLAY_RIGHT')}
              className="col-start-3 row-start-2 text-slate-300 hover:text-white flex items-center justify-center"
              title="Cursor Right"
            >
              <ChevronRight size={12} />
            </button>
            <button
              onClick={() => onButtonPress('REPLAY_DOWN')}
              className="col-start-2 row-start-3 text-slate-300 hover:text-white flex items-center justify-center"
              title="History Down"
            >
              <ChevronDown size={12} />
            </button>
          </div>
        </div>

        {renderButton(row1[2])}
        {renderButton(row1[3])}
      </div>

      <div className="grid grid-cols-5 gap-1.5">
        {row2.map(renderButton)}
      </div>

      <div className="grid grid-cols-6 gap-1.5">
        {row3.map(renderButton)}
      </div>

      <div className="grid grid-cols-6 gap-1.5">
        {row4.map(renderButton)}
      </div>

      <div className="grid grid-cols-5 gap-1.5">
        {row5.map(renderButton)}
      </div>

      <div className="grid grid-cols-5 gap-1.5">
        {row6.map(renderButton)}
      </div>

      <div className="grid grid-cols-5 gap-1.5">
        {row7.map(renderButton)}
      </div>

      <div className="grid grid-cols-5 gap-1.5">
        {row8.map(renderButton)}
      </div>
    </div>
  );
};
