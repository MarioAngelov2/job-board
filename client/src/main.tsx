import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import { Toaster } from "react-hot-toast";

import RootLayout from "./Layouts/RootLayout.tsx";
import DashboardLayout from "./Layouts/DashboardLayout.tsx";

import SignInPage from "./pages/SignIn.tsx";
import SignUpPage from "./pages/SignUp.tsx";
import AppliedJobs from "./pages/AppliedJobs.tsx";
import Home from "./pages/Home.tsx";
import JobDetails from "./pages/JobDetails.tsx";
import NotFound from "./pages/NotFound.tsx";
import SavedJobs from "./pages/SavedJobs.tsx";
import CreateJob from "./pages/CreateJob.tsx";

const router = createBrowserRouter([
  {
    errorElement: <NotFound />,
    element: <RootLayout />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/sign-in", element: <SignInPage /> },
      { path: "/sign-up", element: <SignUpPage /> },
      { path: "/job/:id", element: <JobDetails /> },
      {
        element: <DashboardLayout />,
        path: "dashboard",
        children: [
          { path: "/dashboard/applied-jobs", element: <AppliedJobs /> },
          { path: "/dashboard/saved-jobs", element: <SavedJobs /> },
          { path: "/dashboard/create-job", element: <CreateJob /> },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <Toaster />
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
