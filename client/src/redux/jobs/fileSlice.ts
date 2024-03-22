import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { URL } from "../../constants/index";

const initialState = {
  file: null as string | null,
  loading: false,
  error: null as string | null,
};


export const uploadFile = createAsyncThunk(
  "image/uploadImage",
  async (data: any) => {
    try {
      const res = await axios.post(
        `${URL}/files/uploadFile`,
        data
      );

      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);
const fileSlice = createSlice({
  name: "file",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadFile.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadFile.fulfilled, (state, action) => {
        state.loading = false;
        state.file = action.payload;
      })
      .addCase(uploadFile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to upload file.";
      });
  },
});

export const selectFile = (state: {
  fileReducer: { file: string | null };
}) => state.fileReducer.file

export default fileSlice.reducer;
