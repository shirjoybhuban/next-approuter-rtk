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
export const selectIsAdmin = (state) => state.auth.user?.role === 'admin';
export const selectUserRole = (state) => state.auth.user?.role;
export const selectIsAuthenticated = (state) => !!state.auth.user;

// Utility function to check if user has any of the specified roles
export const selectHasRole = (state, roles) => {
  const userRole = state.auth.user?.role;
  return userRole && roles.includes(userRole);
};

export const { setUser, clearUser } = authSlice.actions;
export default authSlice.reducer;
