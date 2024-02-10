import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const uploadImage = createAsyncThunk(
  "image/uploadImage",
  async (data: any) => {
    try {
      const res = await axios.post(
        "http://localhost:8080/images/upload-image",
        data
      );

      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const initialState = {
  image: null as string | null,
  loading: false,
  error: null as string | null,
};

const imageSlice = createSlice({
  name: "image",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(uploadImage.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(uploadImage.fulfilled, (state, action) => {
        state.loading = false;
        state.image = action.payload;
      })
      .addCase(uploadImage.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to upload image.";
      });
  },
});

export const selectImage = (state: {
  imageReducer: { image: string | null };
}) => state.imageReducer.image;

export default imageSlice.reducer;
