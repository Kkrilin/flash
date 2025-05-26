import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { Suspense } from "react";
import CircularLoader from "./components/Common/Loader/CircularLoader";

// pages
import SignIn from "./components/Pages/SignInPage";
import SignUP from "./components/Pages/signUpPage";
import ActivityPage from "./components/Pages/ActivityPage";
import ProfilePage from "./components/Pages/ProfilePage";
import PerformancePage from "./components/Pages/PerformancePage";
import DashBoardPage from "./components/Pages/DashBoardPage";

// Layout
import ProfileLayout from "./components/Layout/ProfileLayout";
import AuthLayout from "./components/Layout/AuthLayout";

function App() {
  return (
    <>
      <BrowserRouter>
        <Suspense fallback={<CircularLoader />}>
          <Toaster position="top-center" />
          <Routes>
            <Route path="/" element={<AuthLayout />}>
              <Route index element={<SignIn />} />
              <Route path="signup" element={<SignUP />} />
              <Route path="signin" element={<SignIn />} />
            </Route>
            <Route path="/user" element={<ProfileLayout />}>
              <Route path="profile" element={<ProfilePage />} />
              <Route path="activity" element={<ActivityPage />} />
              <Route path="performance" element={<PerformancePage />} />
              <Route path="dashboard" element={<DashBoardPage />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
