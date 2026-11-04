import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/axios";

export const fetchProjects = createAsyncThunk(
  "projects/fetchProjects",
  async (params = {}, { rejectWithValue }) => {
    try {
      const cleanedParams = Object.fromEntries(
        Object.entries(params).filter(([_, v]) => v !== undefined)
      );

      const response = await api.get("/projects", {
        params: cleanedParams,
      });
      return {
        total: response.data.data.totalRecords,
        allProjects: response.data.data.projects,
      };
    } catch (err) {
      return rejectWithValue(
        err.response.status || "Failed to fetch projects."
      );
    }
  }
);

const projectsSlice = createSlice({
  name: "projects",
  initialState: {
    allProjects: [],
    totalCount: 0,
    loading: false,
    error: null,
  },
  reducers: {
    clearAllProjects: (state) => {
      state.allProjects = [];
      state.totalCount = 0;
      state.loading = false;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.allProjects = action.payload.allProjects;
        state.totalCount = action.payload.total;
        state.loading = false;
      })
      .addCase(fetchProjects.rejected, (state, action) => {
        state.error = action.payload;
        state.loading = false;
      });
  },
});

export const { clearAllProjects } = projectsSlice.actions;
export default projectsSlice.reducer;
