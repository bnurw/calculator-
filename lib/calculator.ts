export type AngleMode = 'DEG' | 'RAD' | 'GRAD';

export interface CalculationHistory {
  id: string;
  expression: string;
  result: string;
  timestamp: number;
}

export interface CalculatorState {
  expression: string;
  result: string;
  history: CalculationHistory[];
  historyIndex: number;
  angleMode: AngleMode;
  isShift: boolean;
  isAlpha: boolean;
  memory: Record<string, number>;
  ans: number;
  cursorPosition: number;
}

export function evaluateExpression(
  expr: string,
  angleMode: AngleMode = 'DEG',
  memory: Record<string, number> = {},
  ans: number = 0
): { result: string; numericValue: number } {
  if (!expr || expr.trim() === '') {
    return { result: '0', numericValue: 0 };
  }

  try {
    let processed = expr
      .replace(/×/g, '*')
      .replace(/÷/g, '/')
      .replace(/−/g, '-')
      .replace(/π/g, 'Math.PI')
      .replace(/e/g, 'Math.E')
      .replace(/Ans/g, String(ans))
      .replace(/²/g, '**2')
      .replace(/³/g, '**3')
      .replace(/√\(/g, 'Math.sqrt(')
      .replace(/∛\(/g, 'Math.cbrt(')
      .replace(/log\(/g, 'log10(')
      .replace(/ln\(/g, 'Math.log(')
      .replace(/sin\(/g, `sin_${angleMode}(`)
      .replace(/cos\(/g, `cos_${angleMode}(`)
      .replace(/tan\(/g, `tan_${angleMode}(`)
      .replace(/asin\(/g, `asin_${angleMode}(`)
      .replace(/acos\(/g, `acos_${angleMode}(`)
      .replace(/atan\(/g, `atan_${angleMode}(`)
      .replace(/(\d+)!/g, 'factorial($1)')
      .replace(/(\d+)\s*P\s*(\d+)/g, 'nPr($1, $2)')
      .replace(/(\d+)\s*C\s*(\d+)/g, 'nCr($1, $2)');

    for (const [key, val] of Object.entries(memory)) {
      const regex = new RegExp(`\\b${key}\\b`, 'g');
      processed = processed.replace(regex, String(val));
    }

    const log10 = (n: number) => Math.log10(n);

    const sin_DEG = (n: number) => Math.sin((n * Math.PI) / 180);
    const cos_DEG = (n: number) => Math.cos((n * Math.PI) / 180);
    const tan_DEG = (n: number) => {
      const rad = (n * Math.PI) / 180;
      if (Math.abs(n % 180) === 90) throw new Error('Math Error');
      return Math.tan(rad);
    };

    const sin_RAD = (n: number) => Math.sin(n);
    const cos_RAD = (n: number) => Math.cos(n);
    const tan_RAD = (n: number) => Math.tan(n);

    const sin_GRAD = (n: number) => Math.sin((n * Math.PI) / 200);
    const cos_GRAD = (n: number) => Math.cos((n * Math.PI) / 200);
    const tan_GRAD = (n: number) => Math.tan((n * Math.PI) / 200);

    const asin_DEG = (n: number) => (Math.asin(n) * 180) / Math.PI;
    const acos_DEG = (n: number) => (Math.acos(n) * 180) / Math.PI;
    const atan_DEG = (n: number) => (Math.atan(n) * 180) / Math.PI;

    const asin_RAD = (n: number) => Math.asin(n);
    const acos_RAD = (n: number) => Math.acos(n);
    const atan_RAD = (n: number) => Math.atan(n);

    const asin_GRAD = (n: number) => (Math.asin(n) * 200) / Math.PI;
    const acos_GRAD = (n: number) => (Math.acos(n) * 200) / Math.PI;
    const atan_GRAD = (n: number) => (Math.atan(n) * 200) / Math.PI;

    const factorial = (n: number): number => {
      if (n < 0 || !Number.isInteger(n)) throw new Error('Math Error');
      if (n === 0 || n === 1) return 1;
      let res = 1;
      for (let i = 2; i <= n; i++) res *= i;
      return res;
    };

    const nPr = (n: number, r: number): number => {
      if (n < r || n < 0 || r < 0) throw new Error('Math Error');
      return factorial(n) / factorial(n - r);
    };

    const nCr = (n: number, r: number): number => {
      if (n < r || n < 0 || r < 0) throw new Error('Math Error');
      return factorial(n) / (factorial(r) * factorial(n - r));
    };

    // eslint-disable-next-line no-new-func
    const evalFunc = new Function(
      'log10',
      'sin_DEG',
      'cos_DEG',
      'tan_DEG',
      'sin_RAD',
      'cos_RAD',
      'tan_RAD',
      'sin_GRAD',
      'cos_GRAD',
      'tan_GRAD',
      'asin_DEG',
      'acos_DEG',
      'atan_DEG',
      'asin_RAD',
      'acos_RAD',
      'atan_RAD',
      'asin_GRAD',
      'acos_GRAD',
      'atan_GRAD',
      'factorial',
      'nPr',
      'nCr',
      `return (${processed});`
    );

    const numericValue = evalFunc(
      log10,
      sin_DEG,
      cos_DEG,
      tan_DEG,
      sin_RAD,
      cos_RAD,
      tan_RAD,
      sin_GRAD,
      cos_GRAD,
      tan_GRAD,
      asin_DEG,
      acos_DEG,
      atan_DEG,
      asin_RAD,
      acos_RAD,
      atan_RAD,
      asin_GRAD,
      acos_GRAD,
      atan_GRAD,
      factorial,
      nPr,
      nCr
    );

    if (typeof numericValue !== 'number' || Number.isNaN(numericValue)) {
      return { result: 'Math Error', numericValue: NaN };
    }
    if (!Number.isFinite(numericValue)) {
      return { result: 'Math Error', numericValue: Infinity };
    }

    const formatted = Number(numericValue.toFixed(10)).toString();
    return { result: formatted, numericValue };
  } catch (err: any) {
    if (err.message === 'Math Error') {
      return { result: 'Math Error', numericValue: NaN };
    }
    return { result: 'Syntax Error', numericValue: NaN };
  }
}
