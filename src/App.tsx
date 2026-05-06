import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import { DashboardShell } from './components/layout/DashboardShell';
import PWAUpdatePrompt from './components/ui/PWAUpdatePrompt';

// Lazy-load pages for better performance
const Login = lazy(() => import('./pages/Login').then(m => ({ default: m.Login })));
const Dashboard = lazy(() => import('./pages/Dashboard').then(m => ({ default: m.Dashboard })));
const Houses = lazy(() => import('./pages/Houses').then(m => ({ default: m.Houses })));
const HouseDetail = lazy(() => import('./pages/HouseDetail').then(m => ({ default: m.HouseDetail })));
const Users = lazy(() => import('./pages/Users').then(m => ({ default: m.Users })));
const Payments = lazy(() => import('./pages/Payments').then(m => ({ default: m.Payments })));
const Announcements = lazy(() => import('./pages/Announcements').then(m => ({ default: m.Announcements })));
const Reports = lazy(() => import('./pages/Reports').then(m => ({ default: m.Reports })));
const Subscriptions = lazy(() => import('./pages/Subscriptions').then(m => ({ default: m.Subscriptions })));
const Settings = lazy(() => import('./pages/Settings').then(m => ({ default: m.Settings })));
const Notifications = lazy(() => import('./pages/Notifications').then(m => ({ default: m.Notifications })));
const MyDashboard = lazy(() => import('./pages/MyDashboard').then(m => ({ default: m.MyDashboard })));
const MyHouse = lazy(() => import('./pages/MyHouse').then(m => ({ default: m.MyHouse })));
const MyPayments = lazy(() => import('./pages/MyPayments').then(m => ({ default: m.MyPayments })));
const MyProfile = lazy(() => import('./pages/MyProfile').then(m => ({ default: m.MyProfile })));

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={
        <div className="flex h-screen items-center justify-center bg-slate-50 dark:bg-slate-900">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-[#1e3a5f] border-t-transparent" />
        </div>
      }>
        <Routes>
          <Route path="/login" element={<Login />} />

          {/* Admin routes */}
          <Route element={<DashboardShell />}>
            <Route index element={<Dashboard />} />
            <Route path="houses" element={<Houses />} />
            <Route path="houses/:id" element={<HouseDetail />} />
            <Route path="users" element={<Users />} />
            <Route path="payments" element={<Payments />} />
            <Route path="announcements" element={<Announcements />} />
            <Route path="reports" element={<Reports />} />
            <Route path="subscriptions" element={<Subscriptions />} />
            <Route path="settings" element={<Settings />} />
            <Route path="notifications" element={<Notifications />} />
          </Route>

          {/* Guardian / member routes */}
          <Route path="my" element={<DashboardShell />}>
            <Route index element={<MyDashboard />} />
            <Route path="house" element={<MyHouse />} />
            <Route path="payments" element={<MyPayments />} />
            <Route path="profile" element={<MyProfile />} />
            <Route path="announcements" element={<Announcements />} />
            <Route path="notifications" element={<Notifications />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>

      {/* PWA update notification */}
      <PWAUpdatePrompt />

      {/* Toast notifications */}
      <Toaster position="top-right" richColors />
    </BrowserRouter>
  );
}

export default App;
