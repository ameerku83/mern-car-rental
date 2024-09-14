import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    id: null,  // Global user ID
  },
  reducers: {
    setUserId: (state, action) => {
      state.id = action.payload;
    },
    clearUserId: (state) => {
        state.id = null;
      },
},

   
  
});

export const { setUserId,clearUserId } = userSlice.actions;
export default userSlice.reducer;
