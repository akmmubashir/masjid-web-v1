import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import { DashboardShell } from './src/components/layout/DashboardShell';
import { Login } from './src/pages/Login';
import { Dashboard } from './src/pages/Dashboard';
import { Houses } from './src/pages/Houses';
import { HouseDetail } from './src/pages/HouseDetail';
import { Payments } from './src/pages/Payments';
import { Subscriptions } from './src/pages/Subscriptions';
import { Announcements } from './src/pages/Announcements';
import { Reports } from './src/pages/Reports';
import { Users } from './src/pages/Users';
import { Settings } from './src/pages/Settings';
import { Notifications } from './src/pages/Notifications';
import { MyDashboard } from './src/pages/MyDashboard';
import { MyHouse } from './src/pages/MyHouse';
import { MyProfile } from './src/pages/MyProfile';
import { MyPayments } from './src/pages/MyPayments';
export function App() {
  return (
    <BrowserRouter>
      <Toaster richColors position="top-right" />
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route element={<DashboardShell />}>
          {/* Admin routes */}
          <Route path="/" element={<Dashboard />} />
          <Route path="/houses" element={<Houses />} />
          <Route path="/houses/:id" element={<HouseDetail />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/subscriptions" element={<Subscriptions />} />
          <Route path="/announcements" element={<Announcements />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/users" element={<Users />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/notifications" element={<Notifications />} />

          {/* Guardian (house owner) routes */}
          <Route path="/my" element={<MyDashboard />} />
          <Route path="/my/house" element={<MyHouse />} />
          <Route path="/my/payments" element={<MyPayments />} />
          <Route path="/my/profile" element={<MyProfile />} />
          <Route path="/my/announcements" element={<Announcements />} />
          <Route path="/my/notifications" element={<Notifications />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>);

}