import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

type Application = {
  name: string;
  email: string;
  jobId: string;
  userCV: {
    file: string;
    fileID: string;
  };
};

const initialState = {
  applyJob: {
    application: null as Application | null,
    loading: false,
    error: null as string | null,
  },
};

export const applyJob = createAsyncThunk(
  "jobs/applyJob",
  async (data: Application) => {
    try {
      const res = await axios.post("http://localhost:8080/jobs/applyJob", data);

      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const applicationSlice = createSlice({
  name: "application",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(applyJob.pending, (state) => {
        state.applyJob.loading = true;
        state.applyJob.error = null;
      })
      .addCase(applyJob.fulfilled, (state, action) => {
        state.applyJob.loading = false;
        state.applyJob.application = action.payload;
      })
      .addCase(applyJob.rejected, (state, action) => {
        state.applyJob.loading = false;
        state.applyJob.error = action.error.message || null;
      });
  },
});

export default applicationSlice.reducer;
