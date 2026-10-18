const products = require('../../src/data/products');
const { filterByCategory } = require('../../src/catalog');

describe('filterByCategory', () => {
  describe('все категории', () => {
    test.each([
      ["'all'", 'all'],
      ['undefined', undefined],
      ["''", ''],
    ])('%s возвращает все товары', (_, category) => {
      expect(filterByCategory(products, category).map(({ id }) => id)).toEqual([1, 2, 3, 4, 5, 6]);
    });
  });

  describe('существующая категория', () => {
    test.each([
      ['electronics', [1, 2]],
      ['books', [3, 6]],
      ['home', [4, 5]],
    ])('%s возвращает нужные товары', (category, expectedIds) => {
      expect(filterByCategory(products, category).map(({ id }) => id)).toEqual(expectedIds);
    });
  });

  describe('несуществующая категория', () => {
    test.each(['clothes', 'toys', 'sports'])('%s возвращает пустой массив', (category) => {
      expect(filterByCategory(products, category).map(({ id }) => id)).toEqual([]);
    });
  });
});
