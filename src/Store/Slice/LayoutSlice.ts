import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

type ThemeState = {
  theme: 'dark' | 'light'
}

const initialState: ThemeState = {
  theme: 'dark',
};

const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    setTheme(state, action: PayloadAction<'dark' | 'light'>) { state.theme = action.payload; },
    toggleTheme(state) { state.theme = state.theme === 'dark' ? 'light' : 'dark'; },
  },
});

export const { setTheme, toggleTheme } = layoutSlice.actions;
export default layoutSlice.reducer;
