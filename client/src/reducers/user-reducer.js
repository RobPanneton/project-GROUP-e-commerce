const initialState = {
  cart: {},
  shopInv: null,
  isLogged: true,
  loadStatus: "",
  shopIndex: 0,
};

export const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "POPULATE_INVENTORY":
      return {
        ...state,
        shopInv: action.payload,
      };

    case "ADD_ITEM":
      const currentItem = state.cart[action.payload.name];
      const newShopInv = state.shopInv.map((item) => {
        if (action.payload._id === item._id) {
          return { ...item, numInStock: action.payload.numInStock - 1 };
        } else {
          return item;
        }
      });
      return {
        ...state,
        cart: {
          ...state.cart,
          [action.payload.name]: {
            ...action.payload,
            quantity: currentItem ? currentItem.quantity + 1 : 1,
            numInStock: action.payload.numInStock
              ? (action.payload.numInStock -= 1)
              : null,
          },
        },
        shopInv: [...newShopInv],
      };

    case "REMOVE_ITEM":
      const stateCopy = { ...state };

      const newShopInv4 = stateCopy.shopInv.map((item) => {
        if (action.payload._id === item._id) {
          return {
            ...item,
            numInStock: action.payload.numInStock + action.payload.quantity,
          };
        } else {
          return item;
        }
      });

      delete stateCopy.cart[action.payload.name];

      return { ...stateCopy, shopInv: [...newShopInv4] };

    case "FIX_STOCK_AMOUNT":
      const currentItem4 = state.cart[action.payload.name];

      return {
        ...state,
        cart: {
          ...state.cart,
          [action.payload.name]: {
            ...action.payload,
            numInStock: currentItem4.numInStock + currentItem4.quantity,
            quantity: 0,
          },
        },
      };

    case "INCREMENT_QUANTITY":
      console.log(state);
      const currentItem1 = state.cart[action.payload.name];
      const newShopInv1 = state.shopInv.map((item) => {
        if (action.payload._id === item._id) {
          return { ...item, numInStock: action.payload.numInStock - 1 };
        } else {
          return item;
        }
      });
      return {
        ...state,
        cart: {
          ...state.cart,
          [action.payload.name]: {
            ...action.payload,
            quantity:
              currentItem1.numInStock > 0
                ? currentItem1.quantity + 1
                : currentItem1.quantity,
            numInStock:
              currentItem1.numInStock > 0
                ? currentItem1.numInStock - 1
                : currentItem1.numInStock,
          },
        },
        shopInv: [...newShopInv1],
      };

    case "DECREMENT_QUANTITY":
      const currentItem2 = state.cart[action.payload.name];
      const newShopInv2 = state.shopInv.map((item) => {
        if (action.payload._id === item._id) {
          return { ...item, numInStock: action.payload.numInStock + 1 };
        } else {
          return item;
        }
      });
      return {
        ...state,
        cart: {
          ...state.cart,
          [action.payload.name]: {
            ...action.payload,
            quantity:
              currentItem2.quantity > 1
                ? currentItem2.quantity - 1
                : currentItem2.quantity,
            numInStock:
              currentItem2.quantity > 1
                ? currentItem2.numInStock + 1
                : currentItem2.numInStock,
          },
        },
        shopInv: [...newShopInv2],
      };

    default:
      return state;
  }
};

export const getCartItems = (state) => {
  return state ? { ...state.user?.cart } : {};
};
