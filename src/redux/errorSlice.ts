import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: { error: string } = {
  error: '',
};

const loadingSlice = createSlice({
  name: 'error',
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    unsetError: (state) => {
      state.error = '';
    },
  },
});

export const { setError, unsetError } = loadingSlice.actions;

export default loadingSlice.reducer;
