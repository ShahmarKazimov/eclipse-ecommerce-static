import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  value: 0,
  basketItems: JSON.parse(localStorage.getItem('basketItems')) || [],
  basketQuantity: []
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state, { payload }) => {
      const existingProduct = state.basketItems.find(item => item.id === payload.id);
      if (existingProduct) {
        state.basketItems = state.basketItems.map(item =>
          item.id === payload.id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
        );
      } else {
        state.basketItems.push({ ...payload, quantity: 1 });
      }
      localStorage.setItem('basketItems', JSON.stringify(state.basketItems));
    },
    decrement: (state) => {
      state.value -= 1
    },
    addBasketQuantity: (state, { payload }) => {
      if (payload) {
        state.basketQuantity.push(payload)
      }
    },
    setBasketItems: (state, { payload }) => {
      state.basketItems = payload
      localStorage.setItem('basketItems', JSON.stringify(state.basketItems))
    }
  }
})

export const { increment, decrement, addBasketQuantity, setBasketItems } = counterSlice.actions

export default counterSlice.reducer
