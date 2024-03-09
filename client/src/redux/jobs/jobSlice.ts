import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { FetchedJob } from "../../types/index";

type Job = {
  company: string;
  jobTitle: string;
  location: string;
  employmentType: string;
  salaryRange: string;
  seniorityLevel: string;
  aboutUs: string;
  tasks: string;
  requirements: string[];
  benefits: string[];
  companyLogo: string | null;
};

const initialState = {
  addJob: {
    jobs: [] as Job[],
    loading: false,
    error: null as string | null,
  },
  fetchJobs: {
    jobs: [] as FetchedJob[],
    loading: false,
    error: null as string | null,
  },
  fetchedJobById: {
    job: [] as FetchedJob[],
    loading: false,
    error: null as string | null,
  },
};

export const addJob = createAsyncThunk("jobs/addJob", async (data: Job) => {
  try {
    const res = await axios.post("http://localhost:8080/jobs/createJob", data);

    return res.data;
  } catch (error) {
    console.log(error);
  }
});

export const fetchJobs = createAsyncThunk("jobs/fetchJobs", async () => {
  try {
    const res = await axios.get("http://localhost:8080/jobs/getJobs");

    return res.data;
  } catch (error) {
    console.log(error);
  }
});

export const fetchJobById = createAsyncThunk(
  "job/fetchById",
  async (id: string) => {
    try {
      const res = await axios.get(`http://localhost:8080/jobs/getJob/${id}`);

      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

const jobSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addJob.pending, (state) => {
        state.addJob.loading = true;
        state.addJob.error = null;
      })
      .addCase(addJob.fulfilled, (state, action) => {
        state.addJob.loading = false;
        state.addJob.jobs.push(action.payload);
      })
      .addCase(addJob.rejected, (state, action) => {
        state.addJob.loading = false;
        state.addJob.error = action.error.message || "Failed to add job.";
      })

      // Fetch Jobs
      .addCase(fetchJobs.pending, (state) => {
        state.fetchJobs.loading = true;
        state.fetchJobs.error = null;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.fetchJobs.loading = false;
        state.fetchJobs.jobs = action.payload;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.fetchJobs.loading = false;
        state.fetchJobs.error = action.error.message || "Failed to fetch jobs.";
      })

      // Fetch Job By Id
      .addCase(fetchJobById.pending, (state) => {
        state.fetchedJobById.loading = true;
        state.fetchedJobById.error = null;
      })

      .addCase(fetchJobById.fulfilled, (state, action) => {
        state.fetchedJobById.loading = false;
        state.fetchedJobById.job = action.payload;
      })
      .addCase(fetchJobById.rejected, (state, action) => {
        state.fetchedJobById.loading = false;
        state.fetchedJobById.error =
          action.error.message || "Failed to fetch job by id.";
      });
  },
});

export const selectFetchJobs = (state: {
  jobsReducer: { fetchJobs: { jobs: FetchedJob[] } };
}) => state.jobsReducer.fetchJobs.jobs;

export const selectFetchById = (state: {
  jobsReducer: { fetchedJobById: { job: FetchedJob[] } };
}) => state.jobsReducer.fetchedJobById.job;

export default jobSlice.reducer;
