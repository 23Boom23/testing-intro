const products = require('../../src/data/products');
const { searchProducts } = require('../../src/catalog');

describe('searchProducts', () => {
  describe('точное совпадение', () => {
    test.each([
      ['Наушники', [1]],
      ['Чистый код', [6]],
      ['Настольная лампа', [4]],
    ])('%s возвращает нужный товар', (query, expectedIds) => {
      expect(searchProducts(products, query).map(({ id }) => id)).toEqual(expectedIds);
    });
  });

  describe('регистр не влияет на поиск', () => {
    test.each([
      ['javascript', [3]],
      ['ЧЕХОЛ', [5]],
      ['наушники', [1]],
    ])('%s возвращает нужный товар', (query, expectedIds) => {
      expect(searchProducts(products, query).map(({ id }) => id)).toEqual(expectedIds);
    });
  });

  describe('пустой запрос', () => {
    test.each([
      ["''", ''],
      ['пробелы', '   '],
      ['табуляция и перевод строки', '\t\n'],
    ])('%s возвращает все товары', (_, query) => {
      expect(searchProducts(products, query).map(({ id }) => id)).toEqual([1, 2, 3, 4, 5, 6]);
    });
  });
});
