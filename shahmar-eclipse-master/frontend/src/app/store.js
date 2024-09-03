
import { configureStore } from '@reduxjs/toolkit'
import counterReducer from '../features/basketSlice.js'
import wishListReducer from "../features/wishlistSlice.js"

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    wishList: wishListReducer
  },
})