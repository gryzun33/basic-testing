// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },
  { a: 5, b: 4, action: Action.Subtract, expected: 1 },
  { a: 3, b: 2, action: Action.Subtract, expected: 1 },
  { a: 2, b: 3, action: Action.Subtract, expected: -1 },
  { a: 6, b: 2, action: Action.Divide, expected: 3 },
  { a: 10, b: 2, action: Action.Divide, expected: 5 },
  { a: -15, b: 3, action: Action.Divide, expected: -5 },
  { a: 6, b: 2, action: Action.Multiply, expected: 12 },
  { a: 10, b: 2, action: Action.Multiply, expected: 20 },
  { a: -5, b: 3, action: Action.Multiply, expected: -15 },
  { a: 6, b: 2, action: Action.Exponentiate, expected: 36 },
  { a: 10, b: 3, action: Action.Exponentiate, expected: 1000 },
  { a: -5, b: 2, action: Action.Exponentiate, expected: 25 },
  { a: 6, b: 2, action: 'wrongaction1', expected: null },
  { a: 10, b: 3, action: 'wrongaction2', expected: null },
  { a: -5, b: 2, action: 'wrongaction3', expected: null },
  { a: 6, b: '2', action: Action.Add, expected: null },
  { a: 10, b: true, action: Action.Subtract, expected: null },
  { a: -5, b: null, action: Action.Divide, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'should execute $action between $a and $b and return $expected',
    ({ a, b, action, expected }) => {
      const result = simpleCalculator({ a, b, action });
      expect(result).toBe(expected);
    },
  );
});
