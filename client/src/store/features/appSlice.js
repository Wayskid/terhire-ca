import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
};

export const AppSlice = createSlice({
  name: "App",
  initialState,
  reducers: {
    setCart: (state, action) => {
      if (state.cart?.every((item) => item.id !== action.payload.id)) {
        state.cart.push(action.payload);
      } else {
        state.cart = state.cart?.map((item) => {
          if (item.id === action.payload.id) {
            return {
              ...item,
              qty: +item.qty + 1,
            };
          }
          return item;
        });
      }
    },
    updateQty: (state, action) => {
      state.cart = state.cart?.map((item) => {
        if (item.id === action.payload.id) {
          if (action.payload.update === "Add") {
            return {
              ...item,
              qty: +item.qty + 1,
            };
          } else if (action.payload.update === "Minus") {
            return {
              ...item,
              qty: item.qty < 2 ? +item.qty : +item.qty - 1,
            };
          }
        }
        return item;
      });
    },
    updateQtyBy: (state, action) => {
      state.cart = state.cart?.map((item) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            qty: action.payload.update,
          };
        }
        return item;
      });
    },
    removeFromCart: (state, action) => {
      state.cart = state.cart?.filter((item) => item.id !== action.payload);
    },
  },
});

export const { setCart, updateQty, updateQtyBy, removeFromCart } =
  AppSlice.actions;
export default AppSlice.reducer;
