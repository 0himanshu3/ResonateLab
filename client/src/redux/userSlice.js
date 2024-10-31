import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {
    email: '',
    // other user properties
  },
};

const userSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserEmail(state, action) {
      state.user.email = action.payload; r
    },
  },
});

export const { setUserEmail } = userSlice.actions;
export default userSlice.reducer;
