function validateQuantity(quantity, stock) {
  if (!Number.isInteger(quantity) || quantity <= 0 || quantity > stock) {
    throw new RangeError('Количество должно быть положительным и не больше остатка на складе.');
  }
}

function addToCart(cart, product, quantity) {
  validateQuantity(quantity, product.stock);
  const existingItem = cart.find((item) => item.id === product.id);
  const nextQuantity = (existingItem?.quantity || 0) + quantity;
  validateQuantity(nextQuantity, product.stock);

  if (existingItem) {
    return cart.map((item) => (
      item.id === product.id ? { ...item, quantity: nextQuantity } : item
    ));
  }

  return [...cart, { ...product, quantity }];
}

function changeQuantity(cart, id, quantity) {
  const itemToChange = cart.find((item) => item.id === id);
  if (!itemToChange) return [...cart];

  validateQuantity(quantity, itemToChange.stock);
  return cart.map((item) => (
    item.id === id ? { ...item, quantity } : item
  ));
}

function removeFromCart(cart, id) {
  return cart.filter((item) => item.id !== id);
}

function calculateCartSubtotal(cart) {
  return cart.reduce((subtotal, item) => subtotal + item.price * item.quantity, 0);
}

function calculateOrderTotal(cart, promoCode) {
  const subtotal = calculateCartSubtotal(cart);
  const discount = promoCode === 'SAVE10' && subtotal >= 20000
    ? Math.round(subtotal * 0.1)
    : 0;
  const delivery = subtotal > 0 && subtotal < 50000 ? 30000 : 0;

  return {
    subtotal,
    discount,
    delivery,
    total: subtotal - discount + delivery,
  };
}

const cartApi = { addToCart, changeQuantity, removeFromCart, calculateCartSubtotal, calculateOrderTotal };

if (typeof module !== 'undefined') module.exports = cartApi;
if (typeof window !== 'undefined') window.cartApi = cartApi;
