import { PayloadAction, createSlice } from '@reduxjs/toolkit';

const initialState: { search: string; filter: string } = {
  search: '',
  filter: '0',
};

const filterSlice = createSlice({
  name: 'filtering',
  initialState,
  reducers: {
    setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    setFilter: (state, action: PayloadAction<string>) => {
      state.filter = action.payload;
    },
  },
});

export const { setSearch, setFilter } = filterSlice.actions;

export default filterSlice.reducer;
