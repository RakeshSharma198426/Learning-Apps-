import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "./axios";

export const fetchJobs = createAsyncThunk(
  "fetchJobs",
  async (params = {}, { rejectWithValue }) => {
    try {
      const cleanedParams = Object.fromEntries(
        Object.entries(params).filter(([_, v]) => v !== undefined)
      );

      const response = await api.get("/jobs", {
        params: cleanedParams,
      });
      return {
        totalRecords: response.data.data.totalRecords,
        allJobs: response.data.data.jobs,
        jobsCompletedCount: response.data.data.jobsCompletedCount,
        jobsInProgressCount: response.data.data.jobsInProgressCount,
      };
    } catch (err) {
      return rejectWithValue(err.response.status || "Failed to fetch jobs.");
    }
  }
);

const jobsSlice = createSlice({
  name: "jobs",
  initialState: {
    allJobs: [],
    totalRecords: 0,
    jobsCompletedCount: 0,
    jobsInProgressCount: 0,
    jobsLoading: false,
    error: null,
  },
  reducers: {
    clearAllJobs: (state) => {
      state.allJobs = [];
      state.totalRecords = 0;
      state.jobsCompletedCount = 0;
      state.jobsInProgressCount = 0;
      state.jobsLoading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchJobs.pending, (state) => {
        state.jobsLoading = true;
        state.error = null;
      })
      .addCase(fetchJobs.fulfilled, (state, action) => {
        state.allJobs = action.payload.allJobs;
        state.totalRecords = action.payload.totalRecords;
        state.jobsCompletedCount = action.payload.jobsCompletedCount;
        state.jobsInProgressCount = action.payload.jobsInProgressCount;
        state.jobsLoading = false;
      })
      .addCase(fetchJobs.rejected, (state, action) => {
        state.error = action.payload;
        state.jobsLoading = false;
      });
  },
});

export const { clearAllJobs } = jobsSlice.actions;
export default jobsSlice.reducer;
