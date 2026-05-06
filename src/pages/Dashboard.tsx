import React from 'react';
import { Home, Users as UsersIcon, IndianRupeeIcon, AlertCircle, ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, CardHeader, CardTitle, Badge, Button } from '../components/ui/Core';
import { useAppStore } from '../stores';
import { mockRevenueData } from '../lib/mockData';
import { useT } from '../lib/useT';

export function Dashboard() {
  const t = useT();
  const { houses, payments } = useAppStore();

  const activeHouses = houses.filter((h) => h.status === 'Active').length;
  const totalMembers = houses.reduce((s, h) => s + h.members.length, 0);
  const pendingPayments = payments.filter((p) => p.status === 'Overdue' || p.status === 'Pending');
  const expectedMonthlyRevenue = Math.round(
    houses.filter((h) => h.status === 'Active').reduce(
      (s, h) => s + (h.contributionFrequency === 'Monthly' ? h.contributionAmount : h.contributionAmount / 12), 0
    )
  );
  const currentMonthRevenue =
    payments.filter((p) => p.status === 'Paid' && new Date(p.date).getMonth() === new Date().getMonth())
      .reduce((sum, p) => sum + p.amount, 0) || 5100;

  const stats = [
    { title: t.dashboard.totalHouses, value: activeHouses, icon: Home, trend: '+12%', positive: true },
    { title: t.dashboard.activeMembers, value: totalMembers, icon: UsersIcon, trend: '+5%', positive: true },
    { title: t.dashboard.monthlyRevenue, value: `${expectedMonthlyRevenue}`, icon: IndianRupeeIcon, trend: '+4.5%', positive: true },
    { title: t.dashboard.pendingPayments, value: pendingPayments.length, icon: AlertCircle, trend: '-2%', positive: false },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white">
          {t.dashboard.title}
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">{t.dashboard.subtitle}</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{stat.title}</p>
                  <p className="mt-2 text-3xl font-bold text-slate-900 dark:text-white">{stat.value}</p>
                </div>
                <div className="rounded-full bg-masjid-50 dark:bg-masjid-900/30 p-3">
                  <stat.icon className="h-6 w-6 text-masjid-600 dark:text-masjid-400" />
                </div>
              </div>
              <div className="mt-4 flex items-center text-sm">
                {stat.positive
                  ? <ArrowUpRight className="mr-1 h-4 w-4 text-emerald-500" />
                  : <ArrowDownRight className="mr-1 h-4 w-4 text-red-500" />}
                <span className={stat.positive ? 'text-emerald-500' : 'text-red-500'}>{stat.trend}</span>
                <span className="ml-2 text-slate-500 dark:text-slate-400">vs last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>{t.dashboard.revenueOverview}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={mockRevenueData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#14532d" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#14532d" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={10} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fill: '#64748b', fontSize: 12 }} tickFormatter={(val) => `${val}`} />
                  <Tooltip
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    formatter={(value: number) => [`${value}`, 'Revenue']}
                  />
                  <Area type="monotone" dataKey="revenue" stroke="#14532d" strokeWidth={3} fillOpacity={1} fill="url(#colorRevenue)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Action Required</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {pendingPayments.slice(0, 5).map((payment) => {
                const house = houses.find((h) => h.id === payment.houseId);
                return (
                  <div key={payment.id} className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-4 last:border-0 last:pb-0">
                    <div>
                      <p className="font-medium text-slate-900 dark:text-white">{house?.name}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{house?.mahalHouseNumber} · Due {payment.dueDate}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-slate-900 dark:text-white">₹{payment.amount}</p>
                      <Badge variant={payment.status === 'Overdue' ? 'danger' : 'warning'} className="mt-1">
                        {payment.status}
                      </Badge>
                    </div>
                  </div>
                );
              })}
              {pendingPayments.length === 0 && (
                <p className="text-sm text-slate-500 text-center py-4">No pending payments.</p>
              )}
            </div>
            {pendingPayments.length > 0 && (
              <Button variant="outline" className="w-full mt-4">View All Pending</Button>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
