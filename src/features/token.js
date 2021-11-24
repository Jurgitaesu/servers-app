import { createSlice } from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'token',
  initialState: { value: '' },
  reducers: {
    token: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { token } = userSlice.actions;

export default userSlice.reducer;
