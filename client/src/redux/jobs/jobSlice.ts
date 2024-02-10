import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

type Job = {
  company: string;
  jobTitle: string;
  location: string;
  employmentType: string;
  salaryRange: string;
  salaryType: string;
  seniorityLevel: string;
  seniorityType: string;
  aboutUs: string;
  tasks: string;
  requirements: string[];
  benefits: string[];
  companyLogo: string;
};

export const addJob = createAsyncThunk("jobs/addJob", async (data: any) => {
  try {
    const res = await axios.post(
      "http://localhost:8080/jobs/createJob",
      data
    );

    return res.data;
  } catch (error) {
    console.log(error);
  }
});

const initialState = {
  jobs: [] as Job[],
  loading: false,
  error: null as string | null,
};

const jobSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addJob.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addJob.fulfilled, (state, action) => {
        state.loading = false;
        state.jobs.push(action.payload);
      })
      .addCase(addJob.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to add job.";
      });
  },
});

export default jobSlice.reducer;