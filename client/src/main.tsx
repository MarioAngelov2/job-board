import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";

import RootLayout from "./Layouts/RootLayout.tsx";
import DashboardLayout from "./Layouts/DashboardLayout.tsx";

import SignInPage from "./pages/SignIn.tsx";
import SignUpPage from "./pages/SignUp.tsx";
import MyJobs from "./pages/MyJobs.tsx";
import Home from "./pages/Home.tsx";
import JobDetails from "./pages/JobDetails.tsx";
import NotFound from "./pages/NotFound.tsx";

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
        children: [{ path: "/dashboard/my-jobs", element: <MyJobs /> }],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
