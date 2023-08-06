import { sum } from '../src/func';

describe('My first test', () => {
  it('Test should work', () => {
    expect(true).toBe(true);
  });
  it('should sum a&b', () => {
    expect(sum(2, 2)).toBe(4);
  });
});
