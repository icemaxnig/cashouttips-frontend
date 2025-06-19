// 📄 AppRoutes.jsx — Updated with WithNavbar applied consistently
import React from "react";
import { Routes, Route } from "react-router-dom";

import Landing from "./pages/landing";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import VerifyOtp from "./pages/VerifyOtp";

import ProtectedRoute from "./components/ProtectedRoute";
import WithNavbar from "./layouts/WithNavbar";

import Dashboard from "./dashboard/Dashboard";
import Profile from "./pages/Profile";
import Subscribe from "./pages/Subscribe";
import SubscribePlanDetail from "./pages/SubscribePlanDetail";
import GroupedRolloverViewer from "./pages/GroupedRolloverViewer";
import MyRollover from "./pages/MyRollover";
import BuyCodes from "./pages/BuyCodes";
import FreeTips from "./pages/FreeTips";
import AllBookingCodes from "./pages/AllBookingCodes";
import BookingCodeDetail from "./pages/BookingCodeDetail";
import MyPurchasedCodes from "./dashboard/components/MyPurchasedCodes";
import BookingCodeList from "./pages/BookingCodeList";
import BookingCodes from "./pages/BookingCodes";
import ManageRolloverPlans from "./pages/ManageRolloverPlans";
import RolloverPlans from "./pages/RolloverPlans";
import MyCodes from "./pages/MyCodes";
import Rollover from "./pages/Rollover";
import PastTips from "./pages/PastTips";

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
        path="/subscribe"
        element={
          <ProtectedRoute>
            <WithNavbar>
              <Subscribe />
            </WithNavbar>
          </ProtectedRoute>
        }
      />
      <Route
        path="/subscribe/:id"
        element={
          <ProtectedRoute>
            <WithNavbar>
              <SubscribePlanDetail />
            </WithNavbar>
          </ProtectedRoute>
        }
      />
      <Route
        path="/rollover-plans"
        element={
          <ProtectedRoute>
            <WithNavbar>
              <RolloverPlans />
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
        path="/booking-codes"
        element={
          <ProtectedRoute>
            <WithNavbar>
              <AllBookingCodes />
            </WithNavbar>
          </ProtectedRoute>
        }
      />
      <Route
        path="/booking-codes/:id"
        element={
          <ProtectedRoute>
            <WithNavbar>
              <BookingCodeDetail />
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
        path="/booking"
        element={
          <ProtectedRoute>
            <WithNavbar>
              <BookingCodes />
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
      <Route
        path="/past-tips"
        element={
          <ProtectedRoute>
            <WithNavbar>
              <PastTips />
            </WithNavbar>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
