const products = require('../../src/data/products');
const { sortProductsByPrice } = require('../../src/catalog');

const pickProducts = (ids) => ids.map((id) => products.find((product) => product.id === id));
const getIds = (items) => items.map(({ id }) => id);

describe('sortProductsByPrice', () => {
  describe('по возрастанию', () => {
    test("все товары с 'asc' сортируются по цене", () => {
      expect(getIds(sortProductsByPrice(products, 'asc'))).toEqual([3, 6, 5, 4, 2, 1]);
    });

    test('направление по умолчанию сортирует все товары по возрастанию', () => {
      expect(getIds(sortProductsByPrice(products))).toEqual([3, 6, 5, 4, 2, 1]);
    });

    test("товары [1, 3, 4] с 'asc' сортируются по цене", () => {
      expect(getIds(sortProductsByPrice(pickProducts([1, 3, 4]), 'asc'))).toEqual([3, 4, 1]);
    });
  });

  describe('по убыванию', () => {
    test("все товары с 'desc' сортируются по цене", () => {
      expect(getIds(sortProductsByPrice(products, 'desc'))).toEqual([1, 2, 4, 5, 6, 3]);
    });

    test("товары [3, 1, 4] с 'desc' сортируются по цене", () => {
      expect(getIds(sortProductsByPrice(pickProducts([3, 1, 4]), 'desc'))).toEqual([1, 4, 3]);
    });

    test("товары [5, 2, 6] с 'desc' сортируются по цене", () => {
      expect(getIds(sortProductsByPrice(pickProducts([5, 2, 6]), 'desc'))).toEqual([2, 5, 6]);
    });
  });

  describe('исходный массив не меняется', () => {
    test("'asc' сохраняет исходный порядок [1, 3, 4]", () => {
      const selected = pickProducts([1, 3, 4]);
      sortProductsByPrice(selected, 'asc');
      expect(getIds(selected)).toEqual([1, 3, 4]);
    });

    test("'desc' сохраняет исходный порядок [1, 3, 4]", () => {
      const selected = pickProducts([1, 3, 4]);
      sortProductsByPrice(selected, 'desc');
      expect(getIds(selected)).toEqual([1, 3, 4]);
    });

    test('направление по умолчанию сохраняет исходный порядок всех товаров', () => {
      sortProductsByPrice(products);
      expect(getIds(products)).toEqual([1, 2, 3, 4, 5, 6]);
    });
  });
});
