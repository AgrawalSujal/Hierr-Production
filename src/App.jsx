import React from "react";
import { Button } from "./components/ui/button";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppLayout from "./layouts/layout";
import LandingPage from "./pages/LandingPage";
import OnBoarding from "./pages/OnBoarding";
import JobListing from "./pages/Job-Listing";
import Job from "./pages/Job";
import PostJob from "./pages/post-job";
import SavedJob from "./pages/saved-job";
import MyJob from "./pages/my-job";
import { ThemeProvider } from "./components/theme-provider";
import "./App.css";
import ProtectedRoute from "./components/protected-route";
const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <LandingPage />,
      },
      {
        path: "/onboarding",
        element: (
          <ProtectedRoute>
            <OnBoarding />
          </ProtectedRoute>
        ),
      },
      {
        path: "/jobs",
        element: (
          <ProtectedRoute>
            <JobListing />
          </ProtectedRoute>
        ),
      },
      {
        path: "/job/:id",
        element: (
          <ProtectedRoute>
            <Job />
          </ProtectedRoute>
        ),
      },
      {
        path: "/post-job",
        element: (
          <ProtectedRoute>
            <PostJob />
          </ProtectedRoute>
        ),
      },
      {
        path: "/my-jobs",
        element: (
          <ProtectedRoute>
            <MyJob />
          </ProtectedRoute>
        ),
      },
      {
        path: "/saved-jobs",
        element: (
          <ProtectedRoute>
            <SavedJob />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);
const App = () => {
  return (
    <>
      <ThemeProvider
        attribute="class"
        defaultTheme="dark"
        storageKey="vite-ui-Theme">
        <RouterProvider router={router} />
      </ThemeProvider>
    </>
  );
};

export default App;
