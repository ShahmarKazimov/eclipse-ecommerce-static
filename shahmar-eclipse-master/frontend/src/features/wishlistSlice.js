import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  wishListItems: JSON.parse(localStorage.getItem('wishListItems')) || [],
  loggedIn: false
};

export const wishListSlice = createSlice({
  name: 'wishList',
  initialState,
  reducers: {
    addWishListItem: (state, { payload }) => {
      state.wishListItems.push(payload);
      localStorage.setItem('wishListItems', JSON.stringify(state.wishListItems));
    },
    removeWishListItem: (state, { payload }) => {
      state.wishListItems = state.wishListItems.filter(item => item.id !== payload);
      localStorage.setItem('wishListItems', JSON.stringify(state.wishListItems));
    },
    resetWishListItems: (state) => {
      state.wishListItems = [];
      localStorage.setItem('wishListItems', JSON.stringify(state.wishListItems));
    },
    loggedInState: (state) => {
      state.loggedIn = true;
    },
    loggedOutState: (state) => {
      state.loggedIn = false;
    }
  }
});

export const { addWishListItem, removeWishListItem, resetWishListItems, loggedInState, loggedOutState } = wishListSlice.actions;
export default wishListSlice.reducer;
