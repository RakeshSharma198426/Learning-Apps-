import { configureStore } from "@reduxjs/toolkit";
import projectsReducer from "../src/api/projectsSlice";
import jobsReducer from "../src/api/jobsSlice";
const store = configureStore({
  reducer: {
    projects: projectsReducer,
    jobs: jobsReducer,
  },
});

export default store;
