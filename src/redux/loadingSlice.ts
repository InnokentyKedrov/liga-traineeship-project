import { createSlice } from '@reduxjs/toolkit';

const initialState: { isLoading: boolean } = {
  isLoading: false,
};

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    loading(state) {
      if (state.isLoading === false) {
        state.isLoading = true;
      }
    },
    received(state) {
      if (state.isLoading === true) {
        state.isLoading = false;
      }
    },
  },
});

export const { loading, received } = loadingSlice.actions;

export default loadingSlice.reducer;
