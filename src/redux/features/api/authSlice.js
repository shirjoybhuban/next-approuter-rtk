// store/authSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
    },
    clearUser(state) {
      state.user = null;
    },
  },
});
export const selectCurrentUser = (state) => state.auth.user;
export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
