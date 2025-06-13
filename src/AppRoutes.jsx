
import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Landing from "./pages/Landing";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import VerifyOtp from "./pages/VerifyOtp";
import Dashboard from "./dashboard/Dashboard";
import MyCodes from "./pages/MyCodes";
import BookingCodeList from "./pages/BookingCodeList";
import BookingCodes from "./pages/BookingCodes"; // ✅ Correct file
import BookingCodeDetail from "./pages/BookingCodeDetail";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";
import WithNavbar from "./layouts/WithNavbar";

import SubscribeRollover from "./pages/SubscribeRollover";
import SubscribePlanDetail from "./pages/SubscribePlanDetail";
import GroupedRolloverViewer from "./pages/GroupedRolloverViewer";
import MyRollover from "./pages/MyRollover";
import BuyCodes from "./pages/BuyCodes";
import FreeTips from "./pages/FreeTips";
import ManageRolloverPlans from "./pages/ManageRolloverPlans";
import RolloverPlans from "./pages/RolloverPlans";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/verify-otp" element={<VerifyOtp />} />
      <Route path="/subscribe/:id" element={<SubscribePlanDetail />} />
      <Route path="/subscribe" element={<SubscribeRollover />} />
      <Route path="/admin/manage-rollover" element={<ManageRolloverPlans />} />
      <Route path="/rollover-plans" element={<RolloverPlans />} />
	  <Route path="/booking-codes/:id" element={<BookingCodeDetail />} />

      {/* Protected Routes with Navbar */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <WithNavbar>
              <Dashboard />
            </WithNavbar>
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <WithNavbar>
              <Profile />
            </WithNavbar>
          </ProtectedRoute>
        }
      />
      <Route
        path="/my-codes"
        element={
          <ProtectedRoute>
            <WithNavbar>
              <MyCodes />
            </WithNavbar>
          </ProtectedRoute>
        }
      />
      <Route
        path="/codes"
        element={
          <ProtectedRoute>
            <WithNavbar>
              <BookingCodeList />
            </WithNavbar>
          </ProtectedRoute>
        }
      />
      <Route
        path="/booking-codes"
        element={
          <ProtectedRoute>
            <WithNavbar>
              <BookingCodes />
            </WithNavbar>
          </ProtectedRoute>
        }
      />
      <Route
        path="/rollover"
        element={
          <ProtectedRoute>
            <WithNavbar>
              <GroupedRolloverViewer />
            </WithNavbar>
          </ProtectedRoute>
        }
      />
      <Route
        path="/my-rollover"
        element={
          <ProtectedRoute>
            <WithNavbar>
              <MyRollover />
            </WithNavbar>
          </ProtectedRoute>
        }
      />
      <Route
        path="/buycodes"
        element={
          <ProtectedRoute>
            <WithNavbar>
              <BuyCodes />
            </WithNavbar>
          </ProtectedRoute>
        }
      />
      <Route
        path="/free"
        element={
          <ProtectedRoute>
            <WithNavbar>
              <FreeTips />
            </WithNavbar>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
