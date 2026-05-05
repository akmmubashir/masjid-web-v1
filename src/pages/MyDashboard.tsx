import React, { useId } from 'react';
import {
  Home,
  CheckCircle2,
  AlertCircle,
  Megaphone,
  Calendar,
  Users as UsersIcon,
  Info,
  DollarSign,
  Hash } from
'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Badge,
  Button } from
'../components/ui/Core';
import { useAppStore, useAuthStore } from '../stores';
export function MyDashboard() {
  const { user } = useAuthStore();
  const { houses, payments, announcements } = useAppStore();
  const myHouse = houses.find((h) => h.id === user?.houseId);
  const myPayments = payments.
  filter((p) => p.houseId === myHouse?.id).
  sort((a, b) => (b.date || b.dueDate).localeCompare(a.date || a.dueDate));
  const lastPaid = myPayments.find((p) => p.status === 'Paid');
  const outstanding = myPayments.filter(
    (p) => p.status === 'Pending' || p.status === 'Overdue'
  );
  const totalContributed = myPayments.
  filter((p) => p.status === 'Paid').
  reduce((s, p) => s + p.amount, 0);
  const recentAnnouncements = announcements.slice(0, 3);
  if (!myHouse) {
    return (
      <Card className="max-w-xl mx-auto mt-12">
        <CardContent className="p-8 text-center">
          <Info className="h-10 w-10 text-slate-400 mx-auto mb-4" />
          <h2 className="font-serif text-xl font-semibold mb-2">
            No House Linked
          </h2>
          <p className="text-sm text-slate-500">
            Your account isn't linked to a house yet. Please contact the masjid
            administration.
          </p>
        </CardContent>
      </Card>);

  }
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl font-bold text-slate-900 dark:text-white">
          As-salāmu ʿalaykum, {user?.name?.split(' ')[0]}
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Welcome to your guardian portal for {myHouse.name}.
        </p>
      </div>

      {/* House summary card */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row justify-between gap-4">
            <div className="flex items-start gap-4">
              <div className="rounded-full bg-masjid-50 dark:bg-masjid-900/30 p-3">
                <Home className="h-6 w-6 text-masjid-700 dark:text-masjid-400" />
              </div>
              <div>
                <h3 className="font-serif text-xl font-semibold text-slate-900 dark:text-white">
                  {myHouse.name}
                </h3>
                <p className="text-sm text-slate-500 mt-1">{myHouse.address}</p>
                <div className="flex flex-wrap items-center gap-2 mt-3 text-sm text-slate-600 dark:text-slate-300">
                  <Badge variant="outline">
                    <Hash className="h-3 w-3 mr-1 inline" />
                    {myHouse.mahalHouseNumber}
                  </Badge>
                  <span className="flex items-center">
                    <UsersIcon className="h-4 w-4 mr-1.5" />
                    {myHouse.members.length} members
                  </span>
                  <Badge
                    variant={
                    myHouse.status === 'Active' ? 'success' : 'default'
                    }>
                    
                    {myHouse.status}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Contribution & Payment status */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Your Contribution to the Masjid</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap items-baseline justify-between gap-2 mb-3">
              <div className="flex items-center gap-3">
                <div className="rounded-full bg-masjid-50 dark:bg-masjid-900/30 p-3">
                  <DollarSign className="h-7 w-7 text-masjid-700 dark:text-masjid-400" />
                </div>
                <div>
                  <h3 className="text-3xl font-bold text-slate-900 dark:text-white">
                    ${myHouse.contributionAmount}
                  </h3>
                  <p className="text-sm text-slate-500 mt-0.5">
                    per {myHouse.contributionFrequency.toLowerCase()}
                  </p>
                </div>
              </div>
              <Badge variant="success">Active</Badge>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-5 pt-4 border-t border-slate-100 dark:border-slate-800">
              <div>
                <p className="text-xs text-slate-500 mb-1">Total contributed</p>
                <p className="text-xl font-semibold text-slate-900 dark:text-white">
                  ${totalContributed}
                </p>
              </div>
              <div>
                <p className="text-xs text-slate-500 mb-1">Records</p>
                <p className="text-xl font-semibold text-slate-900 dark:text-white">
                  {myPayments.length}
                </p>
              </div>
            </div>

            <div className="mt-5 p-3 bg-masjid-50 dark:bg-masjid-900/20 rounded-md flex items-start gap-2 text-sm text-masjid-900 dark:text-masjid-200">
              <Info className="h-4 w-4 shrink-0 mt-0.5" />
              <span>
                Your contribution amount was set by the masjid based on family
                circumstances. All payments are collected directly by the masjid
                office.
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Payment Status</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="rounded-full bg-emerald-50 dark:bg-emerald-900/20 p-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600" />
              </div>
              <div>
                <p className="text-xs text-slate-500">Last payment</p>
                <p className="font-medium text-slate-900 dark:text-white">
                  {lastPaid ?
                  `$${lastPaid.amount} on ${lastPaid.date}` :
                  'No payments yet'}
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div
                className={`rounded-full p-2 ${outstanding.length > 0 ? 'bg-red-50 dark:bg-red-900/20' : 'bg-slate-100 dark:bg-slate-800'}`}>
                
                <AlertCircle
                  className={`h-4 w-4 ${outstanding.length > 0 ? 'text-red-600' : 'text-slate-400'}`} />
                
              </div>
              <div>
                <p className="text-xs text-slate-500">Outstanding</p>
                <p className="font-medium text-slate-900 dark:text-white">
                  {outstanding.length > 0 ?
                  `${outstanding.length} pending` :
                  'All up to date'}
                </p>
              </div>
            </div>

            <Button variant="outline" className="w-full mt-2">
              View Full History
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Recent announcements */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Megaphone className="h-5 w-5 mr-2 text-masjid-700 dark:text-masjid-400" />
            Latest Announcements
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {recentAnnouncements.map((a) =>
          <div
            key={a.id}
            className="border-b border-slate-100 dark:border-slate-800 last:border-0 pb-3 last:pb-0">
            
              <div className="flex justify-between items-start">
                <p className="font-medium text-slate-900 dark:text-white">
                  {a.title}
                </p>
                <span className="text-xs text-slate-500 flex items-center shrink-0 ml-3">
                  <Calendar className="h-3 w-3 mr-1" /> {a.date}
                </span>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-300 mt-1">
                {a.content}
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>);

}