import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { URL } from "../../constants/index";

type Application = {
  name: string;
  email: string;
  jobId: string;
  userCV: {
    file: string;
    fileID: string;
  };
};

type ApplicationData = {
  name: string;
  email: string;
  jobId: string;
  userCV: {
    file: string;
    fileID: string;
  };
  company: string;
  dateApplied: string;
  applicantId: string;
  jobTitle: string;
  id: string;
};

const initialState = {
  applyJob: {
    application: null as Application | null,
    loading: false,
    error: null as string | null,
  },
  appliedJobs: {
    applications: [] as ApplicationData[],
    loading: false,
    error: null as string | null,
  },
};

export const applyJob = createAsyncThunk(
  "jobs/applyJob",
  async (data: Application) => {
    try {
      const res = await axios.post(`${URL}/jobs/applyJob`, data);

      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchAppliedJobs = createAsyncThunk(
  "jobs/fetchAppliedJobs",
  async (userId: string) => {
    try {
      const res = await axios.post(`${URL}/jobs/getAppliedJobs`, { userId });

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
      })

      // FETCH APPLIED JOBS
      .addCase(fetchAppliedJobs.pending, (state) => {
        state.appliedJobs.loading = true;
        state.appliedJobs.error = null;
      })
      .addCase(fetchAppliedJobs.fulfilled, (state, action) => {
        state.appliedJobs.loading = false;
        state.appliedJobs.applications = action.payload;
      })
      .addCase(fetchAppliedJobs.rejected, (state, action) => {
        state.appliedJobs.loading = false;
        state.appliedJobs.error = action.error.message || null;
      });
  },
});

export const selectApplications = (state: {
  applicationReducer: { appliedJobs: { applications: ApplicationData[] } };
}) => state.applicationReducer.appliedJobs.applications;

export default applicationSlice.reducer;
