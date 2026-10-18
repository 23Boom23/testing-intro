const products = require('../../src/data/products');
const { getProductById } = require('../../src/catalog');

describe('getProductById', () => {
  describe('товар существует', () => {
    test.each([
      [1, 0],
      [4, 3],
      [6, 5],
    ])('ID %s возвращает products[%s]', (id, index) => {
      expect(getProductById(products, id)).toBe(products[index]);
    });
  });

  describe('числовой ID отсутствует', () => {
    test.each([0, 999, -1])('ID %s возвращает null', (id) => {
      expect(getProductById(products, id)).toBeNull();
    });
  });

  describe('ID неверного типа', () => {
    test.each([
      ["'1'", '1'],
      ['undefined', undefined],
      ['NaN', NaN],
    ])('%s возвращает null', (_, id) => {
      expect(getProductById(products, id)).toBeNull();
    });
  });
});
