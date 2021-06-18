import { CLEAR_CART, REMOVE, GET_TOTALS, TOGGLE_AMOUNT } from './actions';
// items
import cartItems from './cart-items';

// initial state
const initialStore = {
  cart: cartItems,
  total: 0,
  amount: 0,
};

const reducer = (state = initialStore, action) => {
  // action for clearing the cart
  if (action.type === CLEAR_CART) {
    return { ...state, cart: [] };
  }

  // action for remove
  if (action.type === REMOVE) {
    return {
      ...state,
      cart: state.cart.filter(cartItem => cartItem.id !== action.payload.id),
    };
  }

  // action for getting amount and total
  if (action.type === GET_TOTALS) {
    let { total, amount } = state.cart.reduce(
      (cartTotal, cartItem) => {
        const { price, amount } = cartItem;
        const itemTotal = price * amount;

        cartTotal.total += itemTotal;
        cartTotal.amount += amount;
        return cartTotal;
      },
      {
        total: 0,
        amount: 0,
      }
    );
    total = parseFloat(total.toFixed(2));
    return { ...state, total, amount };
  }

  // action for increasing and decreasing
  if (action.type === TOGGLE_AMOUNT) {
    return {
      ...state,
      cart: state.cart.map(cartItem => {
        if (cartItem.id === action.payload.id) {
          if (action.payload.toggle === 'inc') {
            return (cartItem = { ...cartItem, amount: cartItem.amount + 1 });
          }
          if (action.payload.toggle === 'dec') {
            return (cartItem = { ...cartItem, amount: cartItem.amount - 1 });
          }
        }
        return cartItem;
      }),
    };
  }
  // return the previous state if no actions match
  return state;
};

export default reducer;
