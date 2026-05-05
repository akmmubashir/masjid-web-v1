import React from 'react';
import { Bell, Mail, MessageSquare } from 'lucide-react';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Badge } from
'../components/ui/Core';
export function Notifications() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-serif text-3xl font-bold text-slate-900 dark:text-white">
          Notifications
        </h1>
        <p className="text-slate-500 dark:text-slate-400 mt-1">
          Manage automated alerts and reminders.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Alerts Sent</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[1, 2, 3].map((i) =>
                <div
                  key={i}
                  className="flex items-start p-3 border border-slate-100 dark:border-slate-800 rounded-lg">
                  
                    <div className="bg-slate-100 dark:bg-slate-800 p-2 rounded-full mr-3">
                      <Mail className="h-4 w-4 text-slate-600 dark:text-slate-300" />
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <p className="font-medium text-slate-900 dark:text-white">
                          Payment Reminder: The Ahmed Family
                        </p>
                        <span className="text-xs text-slate-500">
                          2 hours ago
                        </span>
                      </div>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                        Automated email sent for overdue payment of $50.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-slate-900 dark:text-white">
                    Email Alerts
                  </p>
                  <p className="text-xs text-slate-500">For due payments</p>
                </div>
                <Badge variant="success">Enabled</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-slate-900 dark:text-white">
                    SMS Alerts
                  </p>
                  <p className="text-xs text-slate-500">For urgent notices</p>
                </div>
                <Badge variant="default">Disabled</Badge>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium text-slate-900 dark:text-white">
                    Admin Digest
                  </p>
                  <p className="text-xs text-slate-500">Weekly summary</p>
                </div>
                <Badge variant="success">Enabled</Badge>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>);

}