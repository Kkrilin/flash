import "./App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AuthLayout from "./components/Pages/AuthLayout";
import SignIn from "./components/Pages/SignIn";
import SignUP from "./components/Pages/signUp";
import { Toaster } from "react-hot-toast";
import ProfileLayout from "./components/Pages/ProfileLayout";

function App() {
  return (
    <>
      <BrowserRouter>
        <Toaster position="top-center" />
        <Routes>
          <Route path="/" element={<AuthLayout />}>
            <Route index element={<SignIn />} />
            <Route path="signup" element={<SignUP />} />
            <Route path="signin" element={<SignIn />} />
          </Route>
          <Route path="/user" element={<ProfileLayout />}>
            <Route path="activity" element={<h1>activity</h1>} />
            <Route path="dashboard" element={<h1>dashboard</h1>} />
            <Route path="profile" element={<h1>profile</h1>} />
            <Route path="performance" element={<h1>performance</h1>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
