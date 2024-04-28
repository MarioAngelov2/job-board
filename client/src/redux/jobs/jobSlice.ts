import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { FetchedJob, SavedJob } from "../../types/index";
import { URL } from "../../constants/index";

type Job = {
  company: string;
  jobTitle: string;
  location: string;
  employmentType: string;
  salaryRange: number;
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
    jobs: {
      data: [] as FetchedJob[],
      totalCount: "" as string,
    },
    loading: false,
    error: null as string | null,
  },
  fetchedJobById: {
    job: [] as FetchedJob[],
    loading: false,
    error: null as string | null,
  },
  saveJobState: {
    loading: false,
    job: [] as SavedJob[],
    error: null as string | null,
  },
  savedJobsState: {
    jobs: [] as SavedJob[],
    loading: false,
    error: null as string | null,
  },
};

export const addJob = createAsyncThunk("jobs/addJob", async (data: Job) => {
  try {
    const res = await axios.post(`${URL}/jobs/createJob`, data);

    return res.data;
  } catch (error) {
    console.log(error);
  }
});

export const fetchJobs = createAsyncThunk(
  "jobs/fetchJobs",
  async ({
    search,
    location,
    limit,
    offset,
  }: {
    search: string;
    location: string;
    limit: number;
    offset: number;
  }) => {
    try {
      const res = await axios.get(
        `${URL}/jobs/getJobs?position=${search}&location=${location}&limit=${limit}&offset=${offset}`
      );

      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchJobById = createAsyncThunk(
  "job/fetchById",
  async (id: string) => {
    try {
      const res = await axios.get(`${URL}/jobs/getJob/${id}`);

      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const saveJob = createAsyncThunk(
  "job/saveJob",
  async ({ userId, jobId }: { userId: string; jobId: string }) => {
    try {
      const res = await axios.post(`${URL}/jobs/saveJob`, {
        userId,
        jobId,
      });

      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const fetchSavedJobs = createAsyncThunk(
  "job/fetchSavedJobs",
  async (userId: string) => {
    try {
      const res = await axios.post(`${URL}/jobs/savedJobsList`, {
        userId,
      });

      return res.data;
    } catch (error) {
      console.log(error);
    }
  }
);

export const deleteSavedJob = createAsyncThunk(
  "job/deleteSavedJob",
  async (jobId: string) => {
    try {
      const res = await axios.post(`${URL}/jobs/deleteSavedJob`, { jobId });

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

      // FETCH JOBS
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

      // FETCH JOB BY ID
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
      })

      // SAVE JOB
      .addCase(saveJob.pending, (state) => {
        state.saveJobState.loading = true;
        state.saveJobState.error = null;
      })
      .addCase(saveJob.fulfilled, (state, action) => {
        state.saveJobState.loading = false;
        state.saveJobState.job = action.payload;
      })
      .addCase(saveJob.rejected, (state, action) => {
        state.saveJobState.loading = false;
        state.saveJobState.error =
          action.error.message || "Failed to save job.";
      })

      // FETCH SAVED JOBS
      .addCase(fetchSavedJobs.pending, (state) => {
        state.savedJobsState.loading = true;
        state.savedJobsState.error = null;
      })
      .addCase(fetchSavedJobs.fulfilled, (state, action) => {
        state.savedJobsState.loading = false;
        state.savedJobsState.jobs = action.payload;
      })
      .addCase(fetchSavedJobs.rejected, (state, action) => {
        state.savedJobsState.loading = false;
        state.savedJobsState.error =
          action.error.message || "Failed to fetch saved jobs.";
      })

      // DELETE SAVED JOB
      .addCase(deleteSavedJob.pending, (state) => {
        state.savedJobsState.loading = true;
        state.savedJobsState.error = null;
      })
      .addCase(deleteSavedJob.fulfilled, (state, action) => {
        state.savedJobsState.loading = false;
        state.savedJobsState.jobs = state.savedJobsState.jobs.filter(
          (job) => job.jobId !== action.payload
        );
      })
      .addCase(deleteSavedJob.rejected, (state, action) => {
        state.savedJobsState.loading = false;
        state.savedJobsState.error =
          action.error.message || "Failed to delete saved job.";
      });
  },
});

export const selectFetchJobs = (state: {
  jobsReducer: {
    fetchJobs: {
      jobs: { data: FetchedJob[]; totalCount: string };
    };
  };
}) => state.jobsReducer.fetchJobs.jobs;

export const selectFetchById = (state: {
  jobsReducer: { fetchedJobById: { job: FetchedJob[] } };
}) => state.jobsReducer.fetchedJobById.job;

export const selectSavedJobs = (state: {
  jobsReducer: { savedJobsState: { jobs: SavedJob[] } };
}) => state.jobsReducer.savedJobsState?.jobs;

export default jobSlice.reducer;
