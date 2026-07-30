import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  language: "cpp",
  theme: "vs-dark",
  fontSize: 14,
  code: "",
  input: "",
  output: "",
  loading: false,
};

const editorSlice = createSlice({
  name: "editor",
  initialState,
  reducers: {
    setLanguage(state, action) {
      state.language = action.payload;
    },

    setTheme(state, action) {
      state.theme = action.payload;
    },

    setFontSize(state, action) {
      state.fontSize = action.payload;
    },

    setCode(state, action) {
      state.code = action.payload;
    },

    setInput(state, action) {
      state.input = action.payload;
    },

    setOutput(state, action) {
      state.output = action.payload;
    },

    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

export const {
  setLanguage,
  setTheme,
  setFontSize,
  setCode,
  setInput,
  setOutput,
  setLoading,
} = editorSlice.actions;

export default editorSlice.reducer;