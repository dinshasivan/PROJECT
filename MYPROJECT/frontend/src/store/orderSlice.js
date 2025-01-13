// ordersSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  order: [],
};

const ordersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setOrders: (state, action) => {
      state.order = action.payload;
    },
    updateOrderStatus: (state, action) => {
      const { orderId, status } = action.payload;
      const orderIndex = state.order.findIndex((order) => order.orderId === orderId);
      if (orderIndex !== -1) {
        state.order[orderIndex].status = status;
      }
    },
  },
});

export const { setOrders, updateOrderStatus } = ordersSlice.actions;
export default ordersSlice.reducer;
