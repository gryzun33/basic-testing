// Uncomment the code below and write your tests
import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  test('should generate linked list from values 1', () => {
    const elements = [1, 5, 6];
    const expected = {
      value: 1,
      next: {
        value: 5,
        next: {
          value: 6,
          next: {
            value: null,
            next: null,
          },
        },
      },
    };
    const linkedList = generateLinkedList(elements);

    expect(linkedList).toStrictEqual(expected);
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    const elements = [1, 5, 7];
    const linkedList = generateLinkedList(elements);
    expect(linkedList).toMatchSnapshot();
  });
});
