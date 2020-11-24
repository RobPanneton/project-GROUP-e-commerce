export const addItem = (item) => ({
  type: "ADD_ITEM",
  payload: item,
});

export const addItemWithQuantity = (item, quantity) => ({
  type: "ADD_ITEM_W_QUANTITY",
  payload: { item, quantity },
});

export const removeItem = (item) => ({
  type: "REMOVE_ITEM",
  payload: item,
});

export const increaseStock = (item) => ({
  type: "INCREASE_STOCK",
  payload: item,
});

export const IncrementQuantity = (item) => ({
  type: "INCREMENT_QUANTITY",
  payload: item,
});

export const DecrementQuantity = (item) => ({
  type: "DECREMENT_QUANTITY",
  payload: item,
});

export const fixStockAmount = (item) => ({
  type: "FIX_STOCK_AMOUNT",
  payload: item,
});

export const populateInventory = (data) => ({
  type: "POPULATE_INVENTORY",
  payload: data,
});

export const emptyCart = () => ({
  type: "EMPTY_CART",
});
