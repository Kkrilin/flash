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
import NotFound from "./components/Common/NotFound";
import ProtectedRoute from "./components/Common/ProtectedRoute";

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
            <Route
              path="/user"
              element={
                <ProtectedRoute redirectTo="/">
                  <ProfileLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Navigate to="/user/profile" />}></Route>
              <Route path="profile" element={<ProfilePage />} />
              <Route path="activity" element={<ActivityPage />} />
              <Route path="performance" element={<PerformancePage />} />
              <Route path="dashboard" element={<DashBoardPage />} />
            </Route>
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </>
  );
}

export default App;
