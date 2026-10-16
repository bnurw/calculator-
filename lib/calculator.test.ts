import test from 'node:test';
import assert from 'node:assert/strict';
import { evaluateExpression } from './calculator.ts';

test('basic arithmetic evaluation', () => {
  const { result, numericValue } = evaluateExpression('2 + 3 × 4');
  assert.equal(numericValue, 14);
  assert.equal(result, '14');
});

test('exponentiation and square root', () => {
  const { numericValue: val1 } = evaluateExpression('5²');
  assert.equal(val1, 25);

  const { numericValue: val2 } = evaluateExpression('√\((16\))');
  assert.equal(val2, 4);
});

test('trigonometric functions in DEG mode', () => {
  const { numericValue } = evaluateExpression('sin(90)', 'DEG');
  assert.equal(Math.round(numericValue), 1);
});

test('error handling division by zero', () => {
  const { result } = evaluateExpression('5 ÷ 0');
  assert.equal(result, 'Math Error');
});

test('factorial calculation', () => {
  const { numericValue } = evaluateExpression('5!');
  assert.equal(numericValue, 120);
});
