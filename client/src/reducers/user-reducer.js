const initialState = {
  cart: {},
  isLogged: true,
  loadStatus: "",
  shopIndex: 0,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      const currentItem = state.cart[action.payload.name];
      return {
        ...state,
        cart: {
          ...state.cart,
          [action.payload.name]: {
            ...action.payload,
            quantity: currentItem ? currentItem.quantity + 1 : 1,
          },
        },
      };

    case "REMOVE_ITEM":
      const stateCopy = { ...state };
      delete stateCopy.cart[action.payload.name];
      return stateCopy;

    default:
      return state;
  }
};

export const getCartItems = (state) => {
  return state ? { ...state.user?.cart } : {};
};
