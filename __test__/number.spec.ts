import { add } from '../src/utils/number';
import { expect, test } from '@jest/globals';

test('Index add fun', () => {
  const ret = add(1, 2);
  console.log(ret);
  expect(ret).toBe(3);
});
